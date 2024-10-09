import { BookDetail } from '@/components/BookDetail';

export default function BookDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">蔵書詳細</h1>
      <BookDetail id={params.id} />
    </div>
  );
}