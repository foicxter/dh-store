"use client";

import { useState } from "react";

export default function SearchBar({
    products,
}: {
    products: any[];
}) {
    const [search, setSearch] = useState("");

    const filtered = products.filter((item) =>
        item.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <>
            <input
                type="text"
                placeholder="Cari produk..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-700 mb-8"
            />

            {filtered.map((item) => (
                <div key={item.id}>{item.name}</div>
            ))}
        </>
    );
}