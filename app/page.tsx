import Link from "next/link";
import { supabase } from "../lib/supabase";

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
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-4">
          DH Store
        </h1>

        <p className="text-zinc-400 mb-8">
          Premium Apps & Digital Services
        </p>

        <input
          type="text"
          placeholder="Cari produk..."
          className="w-full mb-12 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800"
        />

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
                      className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 block hover:border-zinc-600 hover:bg-zinc-800 transition"
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