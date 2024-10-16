"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function BookForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [publishedAt, setPublishedAt] = useState(""); // Change variable name to publishedAt

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the book data
    const bookData = {
      title,
      author,
      description,
      published_at: publishedAt, // Ensure this matches your API's expected field
    };

    try {
      // Send a POST request to the API
      const response = await fetch("/api/books/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error("Failed to add book");
      }

      const data = await response.json();

      // Redirect to the home page or another page after successful addition
      router.push("/");
    } catch (error) {
      console.error("Error adding book:", error); // Log any errors
    }
  };

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
          type="date" // Change input type to date
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)}
          required
        />
      </div>
      <Button type="submit">保存</Button>
    </form>
  );
}
