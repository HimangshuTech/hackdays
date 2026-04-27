import { CreatePostRequest } from "./types/post.type"
import { prisma } from "../../db/client"

export const PostService = {

  async createPost(body: CreatePostRequest & {
    userId: string;
    images?: { url: string; publicId: string; order?: number }[];
  }) {

    if (!body.images || body.images.length === 0) {
      throw new Error("At least one image is required");
    }

    if (body.postType === "EVENT" && !body.event) {
      throw new Error("EVENT requires event data");
    }

    if (body.postType === "SERVICE" && !body.service) {
      throw new Error("SERVICE requires service data");
    }

    let eventData;

    if (body.postType === "EVENT") {
      const start = new Date(body.event!.startTime);
      const end = new Date(body.event!.endTime);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error("Invalid event dates");
      }

      eventData = {
        create: {
          startTime: start,
          endTime: end,
        },
      };
    }

    const post = await prisma.post.create({
      data: {
        user: {
          connect: { id: body.userId },
        },

        title: body.title,
        description: body.description,
        postType: body.postType,
        state: body.state,
        metadata: body.metadata ?? undefined,

        location: body.location
          ? { create: body.location }
          : undefined,

        images: {
          create: body.images.map(img => ({
            url: img.url,
            publicId: img.publicId,
            order: img.order ?? null,
          })),
        },

        event: eventData,

        service:
          body.postType === "SERVICE"
            ? { create: body.service! }
            : undefined,
      },
    });

    return post;
  }

};






