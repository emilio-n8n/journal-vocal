"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ArticleContent() {
  const searchParams = useSearchParams();
  const article = searchParams ? searchParams.get("article") : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold">Article généré</h1>
      <div className="mt-8 w-full max-w-2xl">
        <p className="mt-4 text-lg">{article}</p>
      </div>
    </div>
  );
}

export default function ArticlePage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <ArticleContent />
    </Suspense>
  );
}
