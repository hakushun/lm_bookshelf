"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Book = {
  id: string;
  title: string;
  author: string;
};

export function BookList({ searchTerm }: { searchTerm: string }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books"); // Fetch from the API
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Book[] = await response.json();
        setBooks(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message); // Set error message
        } else {
          setError("An unknown error occurred"); // Set error message for unknown error
        }
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => book.title.includes(searchTerm) || book.author.includes(searchTerm));

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Error state
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredBooks.map((book) => (
        <Link href={`/books/${book.id}`} key={book.id}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">{book.author}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
