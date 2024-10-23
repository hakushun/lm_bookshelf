import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// 特定の本をIDで取得するAPIエンドポイント
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Supabaseから特定の本を取得
    const { data, error } = await supabase
      .from("books") // 実際のテーブル名に置き換えてください
      .select("*")
      .eq("id", id)
      .single(); // 単一のレコードを取得

    if (error) {
      if (error.code === "PGRST116") {
        // レコードが見つからない場合のエラーコード
        return NextResponse.json({ message: "Book not found" }, { status: 404 });
      }
      throw error; // その他のエラーは投げる
    }

    return NextResponse.json(data, { status: 200 }); // データを返す
  } catch (error: any) {
    console.error("Error fetching book:", error);
    return NextResponse.json({ message: error.message }, { status: 500 }); // エラーメッセージを返す
  }
}
