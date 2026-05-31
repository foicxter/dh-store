"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;

    router.push(`/?search=${encodeURIComponent(query)}`);
  };

  return (
    <input
      type="text"
      placeholder="BELUM BISA DIPAKE HEHE..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSearch();
        }
      }}
      className="w-full mb-12 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800"
    />
  );
}