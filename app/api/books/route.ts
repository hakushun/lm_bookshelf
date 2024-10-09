import { NextResponse } from "next/server";

// サンプルの本データ
const books = [
  { id: "1", title: "1984", author: "George Orwell" },
  { id: "2", title: "風の歌を聴け", author: "村上春樹" },
  { id: "3", title: "ハリーポッターと賢者の石", author: "J.K. Rowling" },
];

// 全ての本を取得するAPIエンドポイント
export async function GET() {
  return NextResponse.json(books);
}
