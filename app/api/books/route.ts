import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

// 全ての本を取得するAPIエンドポイント
export async function GET() {
  try {
    const { data: books, error } = await supabase.from("books").select("*");

    if (error) {
      throw error; // Throw error if there is an issue
    }

    return NextResponse.json(books); // Return the fetched data
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 }); // Handle errors
  }
}
