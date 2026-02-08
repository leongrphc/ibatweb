"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/context/ProductContext";
import { ShoeSize, ColorOption, Product } from "@/types";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { products, getProductById, loading } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<ShoeSize | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!loading) {
      const foundProduct = getProductById(params.id);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(
          foundProduct.images.find((img) => img.isPrimary) ||
            foundProduct.images[0],
        );
        setSelectedColor(foundProduct.colors[0] || null);
      }
    }
  }, [loading, params.id, getProductById]);

  // Get related products from the same category
  const relatedProducts = product
    ? products
        .filter(
          (p) =>
            p.id !== product.id &&
            p.category.some((cat) => product.category.includes(cat)),
        )
        .slice(0, 4)
    : [];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-neutral-600">Yükleniyor...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Product not found
  if (!product || !selectedImage) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
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
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-xl font-bold text-primary mb-2">
              Ürün Bulunamadı
            </h2>
            <p className="text-neutral-500 mb-4">
              Aradığınız ürün mevcut değil.
            </p>
            <Link href="/shop" className="btn-primary btn-sm">
              Mağazaya Dön
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get size variant for selected size
  const selectedSizeVariant = selectedSize
    ? product.sizeVariants.find((v) => v.size === selectedSize)
    : null;

  // Mock discount calculation
  const originalPrice = Math.round(product.retailPrice * 1.25);
  const discountPercent = Math.round(
    ((originalPrice - product.retailPrice) / originalPrice) * 100,
  );
  const hasDiscount = product.isFeatured;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Lütfen bir beden seçiniz");
      return;
    }
    alert(
      `Sepete eklendi: ${product.name} - Beden: ${selectedSize} - Renk: ${selectedColor?.name || "Belirtilmedi"} - Adet: ${quantity}`,
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-neutral-100">
          <div className="container-custom py-4">
            <nav className="breadcrumb">
              <Link href="/">Ana Sayfa</Link>
              <span className="breadcrumb-separator">/</span>
              <Link href="/shop">Ürünler</Link>
              <span className="breadcrumb-separator">/</span>
              <span className="text-primary font-medium line-clamp-1">
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        {/* Product Details */}
        <div className="container-custom py-8 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-neutral-100 rounded-2xl overflow-hidden">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/images/1194215_SSRT1907CİLTF_1.jpg";
                  }}
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  {product.isNewArrival && (
                    <span className="badge-new">YENİ</span>
                  )}
                  {hasDiscount && (
                    <span className="badge-sale">%{discountPercent}</span>
                  )}
                </div>

                {/* Favorite Button */}
                <button
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors shadow-sm z-10"
                  aria-label="Favorilere Ekle"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(image)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage.id === image.id
                        ? "border-primary"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "/images/1194215_SSRT1907CİLTF_1.jpg";
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              {/* Brand */}
              {product.brand && (
                <p className="text-sm text-neutral-500 font-medium uppercase tracking-wide mb-2">
                  {product.brand}
                </p>
              )}

              {/* Product Name */}
              <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                {product.name}
              </h1>

              {/* Category & Gender */}
              <div className="flex items-center gap-3 mb-6">
                <span className="badge-category">
                  {product.category.join(" • ")}
                </span>
                <span className="text-sm text-neutral-500">
                  {product.gender}
                </span>
              </div>

              {/* Pricing */}
              <div className="mb-6 pb-6 border-b border-neutral-100">
                <div className="flex items-baseline gap-3 mb-2">
                  {hasDiscount && (
                    <span className="text-xl text-neutral-400 line-through">
                      {originalPrice.toLocaleString("tr-TR")} TL
                    </span>
                  )}
                  <span
                    className={`text-3xl font-bold ${hasDiscount ? "text-error" : "text-primary"}`}
                  >
                    {product.retailPrice.toLocaleString("tr-TR")} TL
                  </span>
                </div>
                {hasDiscount && (
                  <div className="lowest-price-badge">
                    Son 30 günün en düşük fiyatı
                  </div>
                )}
                {product.wholesalePrice && (
                  <p className="text-sm text-neutral-500 mt-2">
                    Toptan Fiyat:{" "}
                    <span className="font-semibold text-primary">
                      {product.wholesalePrice.toLocaleString("tr-TR")} TL
                    </span>
                  </p>
                )}
              </div>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-sm">
                      Renk:{" "}
                      <span className="text-neutral-500">
                        {selectedColor?.name || "Seçiniz"}
                      </span>
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectedColor(color)}
                        className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor?.id === color.id
                            ? "border-primary scale-110"
                            : "border-neutral-200 hover:border-neutral-300"
                        }`}
                        style={{ backgroundColor: color.hexCode }}
                        title={color.name}
                      >
                        {selectedColor?.id === color.id && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-white drop-shadow-md"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-sm">
                    Beden
                    {selectedSize && selectedSizeVariant && (
                      <span className="text-neutral-500 ml-1">
                        ({selectedSizeVariant.sizeCategory})
                      </span>
                    )}
                  </span>
                  <button className="text-sm text-accent hover:underline">
                    Beden Rehberi
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizeVariants.map((variant) => (
                    <button
                      key={variant.sku}
                      onClick={() => setSelectedSize(variant.size)}
                      disabled={variant.stock === 0}
                      className={`py-3 px-2 rounded-lg font-medium text-sm transition-all ${
                        selectedSize === variant.size
                          ? "bg-primary text-white"
                          : variant.stock > 0
                            ? "bg-neutral-100 text-primary hover:bg-neutral-200"
                            : "bg-neutral-50 text-neutral-300 cursor-not-allowed line-through"
                      }`}
                    >
                      {variant.size}
                    </button>
                  ))}
                </div>
                {selectedSizeVariant &&
                  selectedSizeVariant.stock < 10 &&
                  selectedSizeVariant.stock > 0 && (
                    <p className="text-sm text-accent mt-2">
                      Son {selectedSizeVariant.stock} adet kaldı!
                    </p>
                  )}
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <span className="font-medium text-sm block mb-3">Adet</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="w-12 text-center font-semibold text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
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
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex gap-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="btn-primary btn-lg flex-1"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Sepete Ekle
                </button>
              </div>

              {/* Features */}
              <div className="space-y-3 pt-6 border-t border-neutral-100">
                <div className="flex items-center gap-3 text-sm">
                  <svg
                    className="w-5 h-5 text-success"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Ücretsiz Kargo (500 TL üzeri)</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <svg
                    className="w-5 h-5 text-success"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>30 Gün İade Garantisi</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <svg
                    className="w-5 h-5 text-success"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Orijinal Ürün Garantisi</span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-8 pt-8 border-t border-neutral-100">
                <h3 className="font-semibold text-lg mb-3">Ürün Açıklaması</h3>
                <p className="text-neutral-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-neutral-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-primary">
                  Benzer Ürünler
                </h2>
                <Link
                  href="/shop"
                  className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-2"
                >
                  Tümünü Gör
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
              <div className="product-grid">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
