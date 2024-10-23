"use client";

import { useState, useEffect } from "react";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  published_at: string;
};

export function BookDetail({ id }: { id: string }) {
  const [book, setBook] = useState<Book | null>(null);
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
        setBook(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!book) {
    return <div>No book found.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">{book.title}</h2>
      <p className="text-gray-700">著者: {book.author}</p>
      <p className="mt-4">{book.description}</p>
      <p className="mt-2 text-sm text-gray-500">出版日: {book.published_at}</p>
    </div>
  );
}
