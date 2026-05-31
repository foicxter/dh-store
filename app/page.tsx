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

  const promoVariants =
  variants?.filter(
    (v) =>
      v.promo_price &&
      v.promo_price > 0 &&
      v.promo_price < v.price
  ) || [];

  return (
    <main className="min-h-screen text-white relative overflow-hidden">
    <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-green-500/20 blur-[180px] rounded-full" />

    <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-500/20 blur-[180px] rounded-full" />

    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-purple-500/10 blur-[200px] rounded-full" />

    <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 blur-[120px]" />

    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px]" />

    <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">

        <div className="mb-8">

  <span className="inline-block px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm font-medium mb-4">
    🔥 Harga Reseller
  </span>

  <div className="flex items-center gap-6">

    <img
      src="/icons/dh-store-logo.png"
      alt="DH Store"
      className="
        h-20
        w-auto
        object-contain
        drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]
      "
    />

    <div>
      <h1 className="text-4xl lg:text-5xl font-bold">
        DH Store Reseller
      </h1>

      <p className="text-zinc-400 mt-2 text-lg">
        Premium Apps & Digital Services
      </p>
    </div>

  </div>

</div>

        <p className="text-zinc-400 text-lg mb-8 max-w-4xl">
  Jual ChatGPT, Netflix, Spotify, Canva, YouTube Premium, Microsoft 365, VPN dan layanan digital premium dengan harga reseller terbaik.
</p>

<div className="flex flex-wrap gap-3 mb-8">

  <div className="px-4 py-2 rounded-xl bg-zinc-900/60 border border-zinc-700">
    ✅ 50+ Produk
  </div>

  <div className="px-4 py-2 rounded-xl bg-zinc-900/60 border border-zinc-700">
    ⚡ Fast Response
  </div>

  <div className="px-4 py-2 rounded-xl bg-zinc-900/60 border border-zinc-700">
    💰 Harga Reseller
  </div>

</div>

    {promoVariants.length > 0 && (
  <div className="mb-8 rounded-3xl border border-red-500/20 bg-gradient-to-r from-red-500/10 to-orange-500/10 p-6">

    <div className="flex items-center justify-between mb-5">
      <h2 className="text-2xl font-bold text-red-400">
        🔥 Promo Hari Ini
      </h2>

      <span className="text-sm text-zinc-400">
        {promoVariants.length} Produk Promo
      </span>
    </div>

    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
      {promoVariants.slice(0, 8).map((item) => {

        const discount =
          Math.round(
            ((item.price - item.promo_price) /
              item.price) *
              100
          );

        const saving =
          item.price - item.promo_price;

        return (
          <div
            key={item.id}
            className="bg-zinc-900/80 border border-zinc-700 rounded-2xl p-4"
          >
            <p className="font-semibold line-clamp-2">
              {item.title}
            </p>

            <p className="text-zinc-500 text-sm line-through">
              Rp {item.price.toLocaleString("id-ID")}
            </p>

            <p className="text-red-400 font-bold text-xl">
              Rp {item.promo_price.toLocaleString("id-ID")}
            </p>

            <div className="flex gap-2 mt-3 flex-wrap">

              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                -{discount}%
              </span>

              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                Hemat Rp {saving.toLocaleString("id-ID")}
              </span>

            </div>
          </div>
        );
      })}
    </div>
  </div>
)}

        <SearchBar />

        {categories?.map((category) => {
          const categoryProducts =
  products?.filter(
    (p) => p.category_id === category.id
  ) || [];

const sortedProducts = [...categoryProducts].sort(
  (a, b) => {

    const aPromo = variants?.some(
      (v) =>
        v.product_id === a.id &&
        v.promo_price &&
        v.promo_price > 0
    );

    const bPromo = variants?.some(
      (v) =>
        v.product_id === b.id &&
        v.promo_price &&
        v.promo_price > 0
    );

    return Number(bPromo) - Number(aPromo);
  }
);

          return (
            <section
              key={category.id}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-6">

  <div className="w-1.5 h-8 rounded-full bg-green-500" />

  <h2 className="text-3xl font-bold">
    {category.name}
  </h2>

</div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {sortedProducts.map((product) => {
                  const productVariants =
                    variants?.filter(
                      (v) => v.product_id === product.id
                    ) || [];

                  const cheapestPrice =
                  productVariants.length > 0
                    ? Math.min(
                        ...productVariants.map(
                          (v) => v.promo_price || v.price || 0
                        )
                      )
                    : null;

                  return (
                    <Link
                      key={product.id}
                      href={`/produk/${product.slug}`}
                      className="
                      rounded-2xl
                      border border-zinc-800
                      bg-zinc-900/50
                      backdrop-blur-xl
                      p-5
                      block
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-green-500/40
                      hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]
"                    >
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