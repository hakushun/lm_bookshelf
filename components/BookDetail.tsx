'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  publishedYear: number;
};

export function BookDetail({ id }: { id: string }) {
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    // TODO: Fetch book details from API
    const dummyBook: Book = {
      id,
      title: '1984',
      author: 'George Orwell',
      description: 'A dystopian novel set in a totalitarian society.',
      publishedYear: 1949,
    };
    setBook(dummyBook);
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-2">著者: {book.author}</p>
        <p className="text-lg mb-2">出版年: {book.publishedYear}</p>
        <p className="text-gray-600">{book.description}</p>
      </CardContent>
    </Card>
  );
}