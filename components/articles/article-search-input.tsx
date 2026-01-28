"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

const ArticleSearchInput = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const defaultValue = searchParams.get("search") || "";
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!value.trim()) {
      router.push("/articles");
      return;
    }

    router.push(`/articles?search=${encodeURIComponent(value)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search articles..."
          className="w-full pl-10 pr-4 py-6 text-lg"
        />
      </div>
    </form>
  );
};

export default ArticleSearchInput;
