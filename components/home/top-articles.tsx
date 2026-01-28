import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

export async function TopArticles() {
  const articles = await prisma.articles.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      comments: true,
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-6 lg:px-8">
      {articles.slice(0, 3).map((article: any) => (
        <Card
          key={article.id}
          className={cn(
            "group relative overflow-hidden transition-transform hover:scale-105",
            "border border-gray-200/50 dark:border-white/10",
            "bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg"
          )}
        >
          <div className="p-4 sm:p-5">
            <Link href={`/articles/${article.id}`}>
              <div className="relative mb-3 h-40 w-full overflow-hidden rounded-lg sm:h-48">
                <Image
                  src={article.featuredImage as string}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                  <AvatarImage src={article.author.imageUrl as string} />
                  <AvatarFallback>
                    {article.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span>{article.author.name}</span>
              </div>

              <h3 className="mt-3 text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                {article.title}
              </h3>
              <p className="mt-1 text-gray-600 dark:text-gray-300 text-sm">
                {article.category}
              </p>

              <div className="mt-4 flex items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <span>{new Date(article.createdAt).toDateString()}</span>
                <span>{12} min read</span>
              </div>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
}
