"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  published_at: string;
};

export function BookDetail({ id }: { id: string }) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch book");
        }
        const data: Book = await response.json();
        setBook(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete book");
      }

      console.log("Book deleted successfully."); // デバッグログ

      // 一覧ページにリダイレクト
      router.push("/");
    } catch (err: any) {
      console.error("Error deleting book:", err); // エラーをログに出力
      setError(err.message);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!book) {
    return <div>No book found.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">{book.title}</h2>
      <p className="text-gray-700">著者: {book.author}</p>
      <p className="mt-4">{book.description}</p>
      <p className="mt-2 text-sm text-gray-500">出版日: {book.published_at}</p>

      {/* 編集ページへのリンク */}
      <Link href={`/books/${id}/edit`} className="mt-4 inline-block text-blue-500 hover:underline">
        編集する
      </Link>

      {/* 一覧ページへのリンク */}
      <Link href="/books" className="mt-4 inline-block text-blue-500 hover:underline ml-4">
        一覧へ戻る
      </Link>

      {/* 削除ボタン */}
      <button
        onClick={() => setShowConfirm(true)}
        className="mt-4 ml-4 inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        削除する
      </button>

      {/* 確認ダイアログ */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl font-bold mb-4">本を削除しますか？</h3>
            <p className="mb-6">この操作は元に戻せません。</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
                キャンセル
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                {isDeleting ? "削除中..." : "削除"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
