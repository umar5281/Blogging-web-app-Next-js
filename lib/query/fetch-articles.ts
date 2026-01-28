import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const fetchArticleByQuery = async (
  searchText: string,
  skip: number,
  take: number
) => {

  const where: Prisma.ArticlesWhereInput = searchText
    ? {
        OR: [
          {
            title: {
              contains: searchText,
              mode: "insensitive",
            },
          },
          {
            category: {
              contains: searchText,
              mode: "insensitive",
            },
          },
        ],
      }
    : {};

  const [articles, total] = await prisma.$transaction([
    prisma.articles.findMany({
      where,
      include: {
        author: {
          select: {
            name: true,
            imageUrl: true,
            email: true,
          },
        },
      },
      skip,
      take,
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.articles.count({
      where,
    }),
  ]);

  return { articles, total };
};
