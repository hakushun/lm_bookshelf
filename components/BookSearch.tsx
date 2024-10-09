"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function BookSearch({ setSearchTerm }: { setSearchTerm: (term: string) => void }) {
  const [searchTerm, setSearchTermState] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    setSearchTerm(searchTerm); // Update the search term in the parent component
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <Input
        type="text"
        placeholder="蔵書を検索..."
        value={searchTerm}
        onChange={(e) => setSearchTermState(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit">検索</Button>
    </form>
  );
}
