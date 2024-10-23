"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  published_at: string;
};

export function BookEditForm({ id }: { id: string }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch book");
        }
        const data: Book = await response.json();
        setTitle(data.title);
        setAuthor(data.author);
        setDescription(data.description);
        setPublishedAt(data.published_at);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 本のデータを準備
    const bookData = {
      title,
      author,
      description,
      published_at: publishedAt, // APIの期待するフィールド名と一致させる
    };

    try {
      // PUTリクエストを送信
      const response = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update book");
      }

      const data = await response.json();
      console.log("Book updated:", data); // レスポンスデータをログに出力

      // 編集後に詳細ページにリダイレクト
      router.push(`/books/${id}`);
    } catch (error) {
      console.error("Error updating book:", error); // エラーをログに出力
      setError("Failed to update the book.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          タイトル
        </label>
        <Input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
          著者
        </label>
        <Input id="author" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          説明
        </label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
      </div>
      <div>
        <label htmlFor="publishedAt" className="block text-sm font-medium text-gray-700">
          出版日 (YYYY/MM/DD)
        </label>
        <Input
          id="publishedAt"
          type="date" // 日付入力に変更
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)}
          required
        />
      </div>
      <Button type="submit">更新</Button>
    </form>
  );
}
