import { prisma } from "../../db/client";

interface SearchParams {
  query?: string;
  postType?: string;
  state?: string;
  page: number;
  limit: number;
}

const postTypeAlias: Record<string, "PLACE" | "EVENT" | "SERVICE"> = {
  place: "PLACE",
  places: "PLACE",
  event: "EVENT",
  events: "EVENT",
  service: "SERVICE",
  services: "SERVICE",
};

const includesTerm = (value: unknown, term: string) =>
  typeof value === "string" && value.toLowerCase().includes(term);

const postMatchesTerm = (post: any, term: string) => {
  const mappedPostType = postTypeAlias[term];

  if (mappedPostType && post.postType === mappedPostType) {
    return true;
  }

  if (
    includesTerm(post.title, term) ||
    includesTerm(post.description, term) ||
    includesTerm(post.state, term) ||
    includesTerm(post.location?.name, term) ||
    includesTerm(post.user?.name, term)
  ) {
    return true;
  }

  if (post.metadata) {
    const metadataAsText = JSON.stringify(post.metadata).toLowerCase();
    if (metadataAsText.includes(term)) {
      return true;
    }
  }

  return false;
};

export const searchService = {
  async searchAll(params: SearchParams) {
    const { query, postType, state, page, limit } = params;

    const safePage = Number.isFinite(page) && page > 0 ? page : 1;
    const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 10;
    const normalizedQuery = query?.trim();
    const normalizedPostType = postType?.trim().toUpperCase();
    const normalizedState = state?.trim();

    const skip = (safePage - 1) * safeLimit;
    const terms = normalizedQuery
      ?.toLowerCase()
      .split(/\s+/)
      .map((term) => term.trim())
      .filter(Boolean) ?? [];

    // Base filters that should always apply (with or without text query)
    const where: any = {};

    // Filter by postType
    if (normalizedPostType) {
      where.postType = normalizedPostType;
    }

    // Filter by state
    if (normalizedState) {
      where.state = {
        equals: normalizedState,
        mode: "insensitive",
      };
    }

    // For broad keyword queries (e.g. climbing/cycling/photography), we fetch
    // by base filters and do a robust, case-insensitive relevance filter in memory.
    if (terms.length > 0) {
      const candidates = await prisma.post.findMany({
        where,
        orderBy: {
          createdAt: "asc"
        },
        include: {
          user: {
            select: {
              id: true,
              name: true
            }
          },
          images: true,
          location: true,
          event: true,
          service: true
        }
      });

      const filtered = candidates.filter((post) =>
        terms.every((term) => postMatchesTerm(post, term))
      );

      const paginated = filtered.slice(skip, skip + safeLimit);
      const total = filtered.length;

      return {
        data: paginated,
        pagination: {
          total,
          page: safePage,
          limit: safeLimit,
          totalPages: Math.ceil(total / safeLimit)
        }
      };
    }

    const [data, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: safeLimit,
        orderBy: {
          createdAt: "asc"
        },
        include: {
          user: {
            select: {
              id: true,
              name: true
            }
          },
          images: true,
          location: true,
          event: true,
          service: true
        }
      }),
      prisma.post.count({ where })
    ]);

    return {
      data,
      pagination: {
        total,
        page: safePage,
        limit: safeLimit,
        totalPages: Math.ceil(total / safeLimit)
      }
    };
  }
};
