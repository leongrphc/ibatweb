"use client";

import Link from "next/link";
import { useProducts } from "@/context/ProductContext";
import { useAuth } from "@/context/AuthContext";

export default function AdminDashboard() {
  const { products, loading } = useProducts();
  const { logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  const totalProducts = products.length;
  const totalStock = products.reduce(
    (sum, product) =>
      sum +
      product.sizeVariants.reduce(
        (variantSum, variant) => variantSum + variant.stock,
        0,
      ),
    0,
  );
  const featuredProducts = products.filter((p) => p.isFeatured).length;
  const newArrivals = products.filter((p) => p.isNewArrival).length;
  const lowStockProducts = products.filter(
    (p) => p.sizeVariants.reduce((sum, v) => sum + v.stock, 0) < 20,
  ).length;

  const recentProducts = [...products]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  const stats = [
    {
      name: "Toplam Ürün",
      value: totalProducts,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      color: "bg-primary",
      href: "/admin/products",
    },
    {
      name: "Toplam Stok",
      value: totalStock,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      color: "bg-success",
      href: "/admin/products",
    },
    {
      name: "Öne Çıkan",
      value: featuredProducts,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ),
      color: "bg-accent",
      href: "/admin/products?filter=featured",
    },
    {
      name: "Düşük Stok",
      value: lowStockProducts,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
      color: "bg-error",
      href: "/admin/products?filter=low-stock",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary">Admin Paneli</h1>
              <p className="text-neutral-500 text-sm">
                İbat Ayakkabı Yönetim Sistemi
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/" className="btn-ghost btn-sm">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Siteye Dön
              </Link>
              <Link href="/admin/products/new" className="btn-primary btn-sm">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Yeni Ürün
              </Link>
              <button
                onClick={logout}
                className="btn-ghost btn-sm text-error hover:bg-error/10"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Çıkış
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-white rounded-xl p-6 hover:shadow-product-hover transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-500 text-sm font-medium">
                    {stat.name}
                  </p>
                  <p className="text-3xl font-bold text-primary mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} text-white p-3 rounded-xl`}>
                  {stat.icon}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-primary mb-4">
            Hızlı İşlemler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/products/new"
              className="flex items-center gap-4 p-4 border-2 border-dashed border-neutral-200 rounded-xl hover:border-accent hover:bg-accent/5 transition-all group"
            >
              <div className="bg-accent/10 text-accent p-3 rounded-xl group-hover:bg-accent group-hover:text-white transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-primary">Yeni Ürün Ekle</h3>
                <p className="text-sm text-neutral-500">Kataloğa ürün ekle</p>
              </div>
            </Link>

            <Link
              href="/admin/products"
              className="flex items-center gap-4 p-4 border-2 border-dashed border-neutral-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="bg-primary/10 text-primary p-3 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-primary">Ürünleri Yönet</h3>
                <p className="text-sm text-neutral-500">Düzenle ve sil</p>
              </div>
            </Link>

            <Link
              href="/shop"
              target="_blank"
              className="flex items-center gap-4 p-4 border-2 border-dashed border-neutral-200 rounded-xl hover:border-success hover:bg-success/5 transition-all group"
            >
              <div className="bg-success/10 text-success p-3 rounded-xl group-hover:bg-success group-hover:text-white transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-primary">Mağazayı Gör</h3>
                <p className="text-sm text-neutral-500">
                  Canlı görünümü kontrol et
                </p>
              </div>
            </Link>

            <Link
              href="/admin/announcements"
              className="flex items-center gap-4 p-4 border-2 border-dashed border-neutral-200 rounded-xl hover:border-warning hover:bg-warning/5 transition-all group"
            >
              <div className="bg-warning/10 text-warning p-3 rounded-xl group-hover:bg-warning group-hover:text-white transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-primary">Duyuru Yönetimi</h3>
                <p className="text-sm text-neutral-500">
                  Kayan yazıları düzenle
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Products & Category Overview */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Products */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-primary">
                Son Eklenen Ürünler
              </h2>
              <Link
                href="/admin/products"
                className="text-accent hover:text-accent-700 font-medium text-sm"
              >
                Tümünü Gör
              </Link>
            </div>

            {recentProducts.length > 0 ? (
              <div className="space-y-4">
                {recentProducts.map((product) => {
                  const totalStock = product.sizeVariants.reduce(
                    (sum, v) => sum + v.stock,
                    0,
                  );
                  return (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-neutral-200 rounded-lg flex items-center justify-center text-neutral-400">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-primary">
                            {product.name}
                          </h4>
                          <p className="text-sm text-neutral-500">
                            {product.category.join(" • ")} •{" "}
                            {product.retailPrice.toLocaleString("tr-TR")} TL
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className={`text-sm font-medium ${totalStock < 20 ? "text-error" : "text-neutral-600"}`}
                        >
                          {totalStock} adet
                        </span>
                        <Link
                          href={`/admin/products/edit/${product.id}`}
                          className="p-2 hover:bg-white rounded-lg transition-colors"
                        >
                          <svg
                            className="w-5 h-5 text-neutral-400 hover:text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-neutral-500">
                <svg
                  className="w-12 h-12 mx-auto mb-3 text-neutral-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <p>Henüz ürün eklenmemiş</p>
                <Link
                  href="/admin/products/new"
                  className="text-accent hover:underline text-sm mt-2 inline-block"
                >
                  İlk ürününüzü ekleyin
                </Link>
              </div>
            )}
          </div>

          {/* Category Overview */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-bold text-primary mb-6">
              Kategori Özeti
            </h2>
            <div className="space-y-4">
              {["BEBE", "PATİK", "FİLET"].map((category) => {
                const categoryProducts = products.filter((p) =>
                  p.category.includes(category as any),
                );
                const categoryStock = categoryProducts.reduce(
                  (sum, product) =>
                    sum +
                    product.sizeVariants.reduce(
                      (variantSum, variant) => variantSum + variant.stock,
                      0,
                    ),
                  0,
                );
                const sizeRange =
                  category === "BEBE"
                    ? "22-25"
                    : category === "PATİK"
                      ? "26-30"
                      : "31-35";
                const bgColor =
                  category === "BEBE"
                    ? "bg-accent/10"
                    : category === "PATİK"
                      ? "bg-primary/10"
                      : "bg-success/10";
                const textColor =
                  category === "BEBE"
                    ? "text-accent"
                    : category === "PATİK"
                      ? "text-primary"
                      : "text-success";

                return (
                  <Link
                    key={category}
                    href={`/admin/products?category=${category}`}
                    className="block p-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span
                          className={`${bgColor} ${textColor} text-xs font-bold px-2 py-1 rounded`}
                        >
                          {sizeRange}
                        </span>
                        <span className="font-semibold text-primary">
                          {category}
                        </span>
                      </div>
                      <svg
                        className="w-4 h-4 text-neutral-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500">
                        {categoryProducts.length} ürün
                      </span>
                      <span className="text-neutral-500">
                        {categoryStock} stok
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
