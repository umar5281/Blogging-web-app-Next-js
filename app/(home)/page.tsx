import {Navbar} from "@/components/home/header/navbar"
import HeroSection from "@/components/home/hero-section"
import { TopArticles } from "@/components/home/top-articles";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlogFooter } from "@/components/home/blog-footer";




export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-xl">
              Feature Articles
            </h2>
            <p>Discover our most popular articles</p>

          </div>

        </div>

      <TopArticles />

      <div className="mt-12 text-center">
        <Link href={"/articles"}>
           <Button className="rounded-full px-8 py-6 text-lg hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 cursor-pointer">View All Articles</Button>
        </Link>
      </div>

      </section>
      <BlogFooter />
    </div>
  );
}
