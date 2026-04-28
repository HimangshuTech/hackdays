import { prisma } from "../src/db/client";
import fs from "fs";
import path from "path";

async function main() {
  // 1. Read JSON from root
  const filePath = path.join(process.cwd(), "data.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const json = JSON.parse(raw);

  const posts = json.data;

  // 2. Fetch existing user
  const user = await prisma.user.findUnique({
    where: { email: "admin@admin.com" },
  });

  if (!user) {
    throw new Error("User not found. Seed aborted.");
  }

  // 3. Allowed enum values (safety)
  const validPostTypes = ["PLACE", "EVENT", "SERVICE"];

  // 4. Insert posts
  for (const item of posts) {
    try {
      // Skip invalid postType
      if (!validPostTypes.includes(item.postType)) {
        console.warn(`Skipping invalid postType: ${item.postType}`);
        continue;
      }

      const createdPost = await prisma.post.create({
        data: {
          userId: user.id,

          title: item.title,
          description: item.description,
          postType: item.postType,
          state: item.state ?? null,
          metadata: item.metadata ?? undefined,

          location: item.location
            ? {
              create: {
                name: item.location.name,
                latitude: item.location.latitude ?? null,
                longitude: item.location.longitude ?? null,
              },
            }
            : undefined,

          images: item.images?.length
            ? {
              create: item.images.map((img: any) => ({
                url:
                  img.url && img.url.length > 10
                    ? img.url
                    : "/img/default.jpg",
                publicId: "seed",
                order: img.order ?? 0,
              })),
            }
            : undefined,
        },
      });

      console.log(`Created: ${createdPost.title}`);
    } catch (err) {
      console.error(`❌ Failed for: ${item.title}`);
      console.error(err);
    }
  }

  console.log("✅ Seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
