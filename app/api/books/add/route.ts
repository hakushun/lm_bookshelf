import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient"; // Import the Supabase client

// 新規蔵書を追加するAPIエンドポイント
export async function POST(request: Request) {
  try {
    const { title, author, description, published_at } = await request.json(); // Get the book data from the request body

    // Validate input
    if (!title || !author || !description || !published_at) {
      return NextResponse.json({ message: "Title, author, description, and published_at are required." }, { status: 400 });
    }
    // Insert the new book into the Supabase table
    const { data, error } = await supabase
      .from("books") // Replace 'books' with your actual table name
      .insert([{ title, author, description, published_at }]);

    if (error) {
      throw error; // Throw error if there is an issue
    }

    return NextResponse.json(data, { status: 201 }); // Return the inserted data with a 201 status
  } catch (error: any) {
    console.error("Error adding book:", error); // Log the error
    return NextResponse.json({ message: error.message }, { status: 500 }); // Handle errors
  }
}
