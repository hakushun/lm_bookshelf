import { BookDetail } from "@/components/BookDetail";
import { supabase } from "@/lib/supabaseClient";

// メインコンポーネント
export default function BookDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">蔵書詳細</h1>
      <BookDetail id={params.id} />
    </div>
  );
}

// 動的ルートの静的パラメータを生成
export async function generateStaticParams() {
  try {
    const { data: books, error } = await supabase.from("books").select("id");

    if (error) {
      console.error("Error fetching book IDs:", error);
      return [];
    }

    return books.map((book: { id: string | number }) => ({
      id: String(book.id), // 数値を文字列に変換
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}
