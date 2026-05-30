import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const { data: product } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();

    if (!product) {
        return (
            <div className="p-10 text-white">
                Produk tidak ditemukan
            </div>
        );
    }

    const { data: variants } = await supabase
        .from("variants")
        .select("*")
        .eq("product_id", product.id)
        .eq("is_active", true)
        .order("price", { ascending: true });

    return (
        <main className="min-h-screen bg-black text-white">
            <div className="max-w-5xl mx-auto p-8">

                <Link
                    href="/"
                    className="inline-block mb-8 text-zinc-400 hover:text-white"
                >
                    ← Kembali ke Home
                </Link>

                <div className="flex items-center gap-4 mb-8">

                    <img
                        src={`/icons/${product.slug}.png`}
                        alt={product.name}
                        className="w-14 h-14 rounded-xl"
                    />

                    <div>
                        <h1 className="text-4xl font-bold">
                            {product.name}
                        </h1>

                        {product.badge && (
                            <span className="inline-block mt-2 text-sm font-semibold bg-gradient-to-r from-orange-500 to-yellow-500 text-black px-3 py-1 rounded-full">
                                {product.badge}
                            </span>
                        )}
                    </div>

                </div>

                <p className="text-zinc-400 mb-8">
                    {product.description}
                </p>

                <div className="grid md:grid-cols-2 gap-5">

                    {variants?.map((item) => (
                        <div
                            key={item.id}
                            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
                        >
                            {item.badge && (
                                <span className="inline-block mb-3 px-3 py-1 rounded-full bg-green-600 text-sm">
                                    {item.badge}
                                </span>
                            )}

                            <h3 className="font-bold text-2xl">
                                {item.title}
                            </h3>

                            <p className="text-4xl font-bold text-green-400 mt-4">
                                Rp {item.price?.toLocaleString("id-ID")}
                            </p>

                            <div className="mt-4 space-y-2 text-zinc-300">

                                {item.duration && (
                                    <p>
                                        ⏳ Durasi: {item.duration}
                                    </p>
                                )}

                                {item.guarantee && (
                                    <p>
                                        🛡️ Garansi: {item.guarantee}
                                    </p>
                                )}

                                {item.description && (
                                    <p>
                                        📋 {item.description}
                                    </p>
                                )}

                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-6">

                                <a
                                    href={`https://wa.me/6289510588347?text=${encodeURIComponent(
                                        `Halo Beb, saya ingin membeli:

Produk: ${product.name}
Paket: ${item.title}
Harga: Rp ${item.price?.toLocaleString("id-ID")}`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-center bg-green-600 hover:bg-green-500 py-3 rounded-xl font-semibold"
                                >
                                    WhatsApp
                                </a>

                                <a
                                    href="https://t.me/dihisell"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-center bg-sky-600 hover:bg-sky-500 py-3 rounded-xl font-semibold"
                                >
                                    Telegram
                                </a>

                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </main>
    );
}