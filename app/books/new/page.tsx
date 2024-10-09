import { BookForm } from '@/components/BookForm';

export default function NewBookPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">新規蔵書追加</h1>
      <BookForm />
    </div>
  );
}