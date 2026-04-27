import { prisma } from "../../db/client";

interface SearchParams {
  query?: string;
  postType?: string;
  state?: string;
  page: number;
  limit: number;
}

export const searchService = {
  async searchAll(params: SearchParams) {
    const { query, postType, state, page, limit } = params;

    const skip = (page - 1) * limit;

    // Dynamic filters
    const where: any = {};

    //  Text Search
    if (query) {
      where.OR = [
        {
          title: {
            contains: query,
            mode: "insensitive"
          }
        },
        {
          description: {
            contains: query,
            mode: "insensitive"
          }
        }
      ];
    }

    // Filter by postType
    if (postType) {
      where.postType = postType;
    }

    // Filter by state
    if (state) {
      where.state = state;
    }

    const [data, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc"
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
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
};