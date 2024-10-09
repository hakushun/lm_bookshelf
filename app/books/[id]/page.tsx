import { BookDetail } from "@/components/BookDetail";

// Main component for the book detail page
export default function BookDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">蔵書詳細</h1>
      <BookDetail id={params.id} />
    </div>
  );
}

// Function to generate static parameters for the dynamic route
export async function generateStaticParams() {
  // Fetch the list of books or define the IDs you want to pre-render
  const books = await fetchBooks(); // Replace with your actual data fetching logic
  return books.map((book) => ({
    id: book.id,
  }));
}

// Example function to fetch books (replace with your actual implementation)
async function fetchBooks() {
  // This is a placeholder. Replace it with your actual API call or data fetching logic.
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    // Add more book IDs as needed
  ];
}
