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

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { title, author, description, published_at } = await request.json();

    // 入力のバリデーション
    if (!title || !author || !description || !published_at) {
      return NextResponse.json({ message: "Title, author, description, and published_at are required." }, { status: 400 });
    }

    // Supabaseで特定の本を更新
    const { data, error } = await supabase
      .from("books")
      .update({ title, author, description, published_at })
      .eq("id", id)
      .single(); // 更新後の単一のレコードを取得

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    return NextResponse.json(data, { status: 200 }); // 更新されたデータを返す
  } catch (error: any) {
    console.error("Error updating book:", error);
    return NextResponse.json({ message: error.message }, { status: 500 }); // エラーメッセージを返す
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Supabaseで特定の本を削除
    const { data, error } = await supabase.from("books").delete().eq("id", id).single(); // 削除後の単一のレコードを取得

    if (error) {
      console.error("Supabase error:", error);
      if (error.code === "PGRST116") {
        // レコードが見つからない場合のエラーコード
        return NextResponse.json({ message: "Book not found" }, { status: 404 });
      }
      throw error; // その他のエラーは投げる
    }

    return NextResponse.json({ message: "Book deleted successfully." }, { status: 200 }); // 削除成功のメッセージを返す
  } catch (error: any) {
    console.error("Error deleting book:", error);
    return NextResponse.json({ message: error.message }, { status: 500 }); // エラーメッセージを返す
  }
}
