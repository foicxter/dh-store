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

        <p className="text-zinc-400 mb-12">
          Premium Apps & Digital Services
        </p>

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

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                {categoryProducts.map((product) => {

                  const productVariants =
                    variants?.filter(
                      (v) => v.product_id === product.id
                    ) || [];

                  const lowestPrice =
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
                      className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 block hover:border-zinc-600 hover:bg-zinc-800 transition h-full"
                    >
                      <div className="flex items-center gap-3 mb-3">

                        {product.icon_url && (
                          <img
                            src={product.icon_url}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg"
                          />
                        )}

                        <div>
                          <h3 className="font-semibold">
                            {product.name}
                          </h3>

                          {product.badge && (
                            <span className="inline-block text-xs bg-orange-500 text-white px-2 py-1 rounded-full mt-1">
                              {product.badge}
                            </span>
                          )}
                        </div>

                      </div>

                      <p className="text-sm text-zinc-400 mt-2 line-clamp-2">
                        {product.description}
                      </p>

                      {lowestPrice && (
                        <p className="text-green-400 font-bold mt-4">
                          Mulai Rp{" "}
                          {lowestPrice.toLocaleString("id-ID")}
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