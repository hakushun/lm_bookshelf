import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookSearch } from '@/components/BookSearch';
import { BookList } from '@/components/BookList';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">蔵書管理アプリ</h1>
      <div className="mb-8">
        <BookSearch />
      </div>
      <div className="mb-8">
        <Link href="/books/new">
          <Button>新規蔵書追加</Button>
        </Link>
      </div>
      <BookList />
    </div>
  );
}