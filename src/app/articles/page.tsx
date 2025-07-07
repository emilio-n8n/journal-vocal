"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  content: string;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // TODO: Fetch saved articles
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold">Mes articles</h1>
      <div className="mt-8 w-full max-w-2xl">
        {articles.map((article) => (
          <div key={article.id} className="p-4 border rounded-md">
            <h2 className="text-2xl font-bold">{article.title}</h2>
            <p className="mt-2 text-lg">{article.content}</p>
            <div className="mt-4 flex gap-4">
              <Link href={`/article/edit/${article.id}`}>
                <Button>Modifier</Button>
              </Link>
              <Button>Partager</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
