'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

type Book = {
  id: string;
  title: string;
  author: string;
};

export function BookList() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // TODO: Fetch books from API
    const dummyBooks: Book[] = [
      { id: '1', title: '1984', author: 'George Orwell' },
      { id: '2', title: '風の歌を聴け', author: '村上春樹' },
      { id: '3', title: 'ハリーポッターと賢者の石', author: 'J.K. Rowling' },
    ];
    setBooks(dummyBooks);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
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