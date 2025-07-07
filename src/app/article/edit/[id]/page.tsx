"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";

interface Article {
  id: string;
  title: string;
  content: string;
}

export default function EditArticlePage() {
  const params = useParams();
  const paramId = params ? params.id : null;
  const id = Array.isArray(paramId) ? paramId[0] : paramId;
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    // TODO: Fetch article by id
  }, [id]);

  const handleSave = () => {
    // TODO: Save the updated article
  };

  if (!article) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold">Modifier l'article</h1>
      <div className="mt-8 w-full max-w-2xl">
        <Input
          value={article.title}
          onChange={(e) => setArticle({ ...article, title: e.target.value })}
        />
        <Textarea
          className="mt-4"
          value={article.content}
          onChange={(e) => setArticle({ ...article, content: e.target.value })}
        />
        <Button className="mt-4" onClick={handleSave}>
          Sauvegarder
        </Button>
      </div>
    </div>
  );
}
