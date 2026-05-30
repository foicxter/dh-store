import Link from "next/link";
import { supabase } from "../lib/supabase";
import SearchBar from "@/components/SearchBar";

export default async function Home() {
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  const { data: products } = await supabase
    .from("products")
    .select("*");

  const { data: variants } = await supabase
    .from("variants")
    .select("*")
    .eq("is_active", true);


  return (
    <main className="min-h-screen text-white relative overflow-hidden">
    <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-green-500/20 blur-[180px] rounded-full" />

    <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-500/20 blur-[180px] rounded-full" />

    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-purple-500/10 blur-[200px] rounded-full" />

    <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 blur-[120px]" />

    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px]" />

    <div className="relative z-10 p-8">

        <h1 className="text-5xl font-bold mb-4">
          DH Store - Premium Apps & Digital Services
        </h1>

        <p className="text-zinc-400 mb-8">
          Jual ChatGPT, Netflix, Spotify, Canva, YouTube Premium, Microsoft 365, VPN dan layanan digital premium dengan harga terjangkau.
        </p>

        <SearchBar />

        {categories?.map((category) => {
          const categoryProducts =
            products?.filter(
              (p) => p.category_id === category.id
            ) || [];

          return (
            <section
              key={category.id}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-6">
                {category.name}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {categoryProducts.map((product) => {
                  const productVariants =
                    variants?.filter(
                      (v) => v.product_id === product.id
                    ) || [];

                  const cheapestPrice =
                    productVariants.length > 0
                      ? Math.min(
                        ...productVariants.map(
                          (v) => v.price || 0
                        )
                      )
                      : null;

                  return (
                    <Link
                      key={product.id}
                      href={`/produk/${product.slug}`}
                      className="rounded-2xl border border-zinc-700 bg-zinc-900/80 backdrop-blur-md p-5 block hover:border-zinc-600 hover:bg-zinc-800 transition hover:shadow-[0_0_30px_rgba(34,197,94,0.25)]"
                    >
                      <div className="flex items-center gap-3 mb-4">

                        <img
                          src={`/icons/${product.slug}.png`}
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />

                        <div>
                          <h3 className="font-bold text-xl">
                            {product.name}
                          </h3>

                          {product.badge && (
                            <span className="inline-block mt-1 text-xs bg-green-600 px-2 py-1 rounded-full">
                              {product.badge}
                            </span>
                          )}
                        </div>

                      </div>

                      <p className="text-sm text-zinc-400 line-clamp-2 min-h-[40px]">
                        {product.description}
                      </p>

                      {cheapestPrice && (
                        <p className="mt-4 text-green-400 font-bold text-2xl">
                          Mulai Rp{" "}
                          {cheapestPrice.toLocaleString("id-ID")}
                        </p>
                      )}
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}