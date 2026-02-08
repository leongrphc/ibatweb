"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useProducts } from "@/context/ProductContext";
import { SizeCategory } from "@/types";

export default function AdminProductsPage() {
  const { products, deleteProduct, loading } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<SizeCategory | "ALL">(
    "ALL",
  );
  const [filterStatus, setFilterStatus] = useState<
    "all" | "featured" | "new" | "low-stock"
  >("all");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.brand?.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term),
      );
    }

    // Category filter
    if (filterCategory !== "ALL") {
      filtered = filtered.filter((product) =>
        product.category.includes(filterCategory),
      );
    }

    // Status filter
    if (filterStatus === "featured") {
      filtered = filtered.filter((product) => product.isFeatured);
    } else if (filterStatus === "new") {
      filtered = filtered.filter((product) => product.isNewArrival);
    } else if (filterStatus === "low-stock") {
      filtered = filtered.filter(
        (product) =>
          product.sizeVariants.reduce((sum, v) => sum + v.stock, 0) < 20,
      );
    }

    // Sort by newest first
    filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return filtered;
  }, [products, searchTerm, filterCategory, filterStatus]);

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setDeleteConfirm(null);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterCategory("ALL");
    setFilterStatus("all");
  };

  const hasFilters =
    searchTerm || filterCategory !== "ALL" || filterStatus !== "all";

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

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary">Ürün Yönetimi</h1>
              <p className="text-neutral-500 text-sm">
                {products.length} toplam ürün
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/admin" className="btn-ghost btn-sm">
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
                Panele Dön
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
                Yeni Ürün Ekle
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Ürün Ara
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Ürün adı, marka veya açıklama..."
                  className="input pl-10"
                />
                <svg
                  className="absolute left-3 top-3.5 w-5 h-5 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Kategori
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as any)}
                className="input"
              >
                <option value="ALL">Tüm Kategoriler</option>
                <option value="BEBE">BEBE (22-25)</option>
                <option value="PATİK">PATİK (26-30)</option>
                <option value="FİLET">FİLET (31-35)</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Durum
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="input"
              >
                <option value="all">Tümü</option>
                <option value="featured">Öne Çıkan</option>
                <option value="new">Yeni Ürünler</option>
                <option value="low-stock">Düşük Stok</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-neutral-600">
              <span className="font-semibold text-primary">
                {filteredProducts.length}
              </span>{" "}
              ürün gösteriliyor
            </p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-accent hover:text-accent-700 font-medium text-sm flex items-center gap-1"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Filtreleri Temizle
              </button>
            )}
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl overflow-hidden">
          {filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      Ürün
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      Kategori
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      Fiyat
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      Stok
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      Durum
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredProducts.map((product) => {
                    const totalStock = product.sizeVariants.reduce(
                      (sum, v) => sum + v.stock,
                      0,
                    );
                    const primaryImage =
                      product.images.find((img) => img.isPrimary) ||
                      product.images[0];

                    return (
                      <tr key={product.id} className="hover:bg-neutral-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="relative w-14 h-14 flex-shrink-0 bg-neutral-100 rounded-lg overflow-hidden">
                              {primaryImage ? (
                                <img
                                  src={primaryImage.url}
                                  alt={product.name}
                                  className="absolute inset-0 w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src =
                                      "/images/1194215_SSRT1907CİLTF_1.jpg";
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-neutral-400">
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
                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-primary">
                                {product.name}
                              </div>
                              {product.brand && (
                                <div className="text-sm text-neutral-500">
                                  {product.brand}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {product.category.map((cat) => (
                              <span
                                key={cat}
                                className="badge-category text-xs"
                              >
                                {cat}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="font-medium text-primary">
                              {product.retailPrice.toLocaleString("tr-TR")} TL
                            </div>
                            {product.wholesalePrice && (
                              <div className="text-neutral-500">
                                Toptan:{" "}
                                {product.wholesalePrice.toLocaleString("tr-TR")}{" "}
                                TL
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className={`font-medium ${totalStock < 20 ? "text-error" : "text-neutral-700"}`}
                          >
                            {totalStock} adet
                          </div>
                          {totalStock < 20 && (
                            <div className="text-xs text-error">
                              Düşük stok!
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            {product.isFeatured && (
                              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-accent/10 text-accent">
                                Öne Çıkan
                              </span>
                            )}
                            {product.isNewArrival && (
                              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-success/10 text-success">
                                Yeni
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              href={`/product/${product.id}`}
                              target="_blank"
                              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                              title="Önizle"
                            >
                              <svg
                                className="w-5 h-5 text-neutral-500 hover:text-primary"
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
                            </Link>
                            <Link
                              href={`/admin/products/edit/${product.id}`}
                              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                              title="Düzenle"
                            >
                              <svg
                                className="w-5 h-5 text-neutral-500 hover:text-primary"
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
                            <button
                              onClick={() => setDeleteConfirm(product.id)}
                              className="p-2 hover:bg-error/10 rounded-lg transition-colors"
                              title="Sil"
                            >
                              <svg
                                className="w-5 h-5 text-neutral-500 hover:text-error"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <svg
                className="w-16 h-16 mx-auto text-neutral-300 mb-4"
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
              <h3 className="text-lg font-semibold text-primary mb-2">
                {hasFilters ? "Ürün Bulunamadı" : "Henüz Ürün Yok"}
              </h3>
              <p className="text-neutral-500 mb-4">
                {hasFilters
                  ? "Arama kriterlerinize uygun ürün bulunamadı."
                  : "İlk ürününüzü ekleyerek başlayın."}
              </p>
              {hasFilters ? (
                <button onClick={clearFilters} className="btn-secondary btn-sm">
                  Filtreleri Temizle
                </button>
              ) : (
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
                  Yeni Ürün Ekle
                </Link>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDeleteConfirm(null)}
          />
          <div className="relative bg-white rounded-2xl p-6 max-w-md w-full animate-scale-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-error"
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
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Ürünü Sil</h3>
              <p className="text-neutral-600 mb-6">
                Bu ürünü silmek istediğinizden emin misiniz? Bu işlem geri
                alınamaz.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="btn-secondary flex-1"
                >
                  İptal
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="btn bg-error text-white hover:bg-error/90 flex-1"
                >
                  Evet, Sil
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
