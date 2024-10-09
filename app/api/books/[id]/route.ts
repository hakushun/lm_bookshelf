import { NextResponse } from "next/server";

// サンプルの本データ
const books = [
  { id: "1", title: "1984", author: "George Orwell" },
  { id: "2", title: "風の歌を聴け", author: "村上春樹" },
  { id: "3", title: "ハリーポッターと賢者の石", author: "J.K. Rowling" },
];

// 特定の本をIDで取得するAPIエンドポイント
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const book = books.find((b) => b.id === id);

  if (book) {
    return NextResponse.json(book);
  } else {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }
}
