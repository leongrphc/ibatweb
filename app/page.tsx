"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/lib/mockData";
import { useProducts } from "@/context/ProductContext";

// Hero slider images
const heroImages = [
  "/images/1194215_SSRT1907CİLTF_1.jpg",
  "/images/1194212_SSRT1907CİLTF_3.jpg",
  "/images/1194214_SSRT1907CİLTF_5.jpg",
  "/images/1195404_TOMWS1017BOTP_120.jpg",
  "/images/1195413_TOMWS1017BOTF_1.jpg",
];

// B2B section slider images
const b2bImages = [
  "/images/1195413_TOMWS1017BOTF_1.jpg",
  "/images/1195413_TOMWS1017BOTF_2.jpg",
  "/images/1195404_TOMWS1017BOTP_12.jpg",
  "/images/1194208_SSRT1907CİLTF_6.jpg",
  "/images/1194207_SSRT1907CİLTF_4.jpg",
];

export default function HomePage() {
  const { products, loading } = useProducts();
  const [heroIndex, setHeroIndex] = useState(0);
  const [b2bIndex, setB2bIndex] = useState(0);

  // Hero slider auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // B2B slider auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setB2bIndex((prev) => (prev + 1) % b2bImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const featuredProducts = products.filter((p) => p.isFeatured);
  const newArrivals = products.filter((p) => p.isNewArrival);

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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Clean & Bold */}
        <section className="relative bg-neutral-100 overflow-hidden">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[500px] lg:min-h-[600px] py-12 lg:py-0">
              {/* Content */}
              <div className="relative z-10 space-y-6 animate-fade-up">
                <div className="flex items-center gap-2">
                  <span className="badge-new">YENİ SEZON</span>
                  <span className="text-sm text-neutral-500">
                    2024 Koleksiyonu
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
                  Her Adımda
                  <br />
                  <span className="text-accent">Premium Konfor</span>
                </h1>

                <p className="text-lg text-neutral-600 max-w-md">
                  Çocuklarınız için özel tasarlanmış, kaliteden ödün vermeyen
                  ayakkabılar.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link href="/shop" className="btn-primary btn-lg">
                    Koleksiyonu Keşfet
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
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="/shop?filter=new"
                    className="btn-secondary btn-lg"
                  >
                    Yeni Ürünler
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center gap-6 pt-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
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
                    Ücretsiz Kargo
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
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
                    30 Gün İade
                  </div>
                </div>
              </div>

              {/* Hero Image Slider */}
              <div className="relative h-[400px] lg:h-full">
                <div className="absolute inset-0 lg:inset-y-0 lg:-right-24 overflow-hidden">
                  {heroImages.map((src, index) => (
                    <Image
                      key={src}
                      src={src}
                      alt={`İbat Ayakkabı ${index + 1}`}
                      fill
                      className={`object-cover object-center transition-opacity duration-1000 ${
                        index === heroIndex ? "opacity-100" : "opacity-0"
                      }`}
                      priority={index === 0}
                    />
                  ))}
                </div>
                {/* Slider Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setHeroIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === heroIndex
                          ? "bg-white w-6"
                          : "bg-white/50 hover:bg-white/75"
                      }`}
                      aria-label={`Görsel ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 lg:py-24">
          <div className="container-custom">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  Kategoriler
                </h2>
                <p className="text-neutral-500">Yaş grubuna göre ayakkabılar</p>
              </div>
              <Link
                href="/shop"
                className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <Link
                  key={category.id}
                  href={`/shop?category=${category.name}`}
                  className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Image
                    src={category.imageUrl}
                    alt={category.displayName}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                        {category.sizeRange} Beden
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
                    <p className="text-sm text-white/80">
                      {category.description}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Koleksiyonu Gör
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 lg:py-24 bg-neutral-50">
          <div className="container-custom">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="badge-sale mb-3 inline-block">İNDİRİM</span>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  Öne Çıkan Ürünler
                </h2>
                <p className="text-neutral-500">
                  En çok satanlar ve indirimli ürünler
                </p>
              </div>
              <Link
                href="/shop?filter=featured"
                className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
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
              {featuredProducts.slice(0, 4).map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <div className="text-center mt-10 md:hidden">
              <Link href="/shop?filter=featured" className="btn-secondary">
                Tüm Ürünleri Gör
              </Link>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-16 lg:py-24">
          <div className="container-custom">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="badge-new mb-3 inline-block">YENİ</span>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  Yeni Gelenler
                </h2>
                <p className="text-neutral-500">En son eklenen ürünler</p>
              </div>
              <Link
                href="/shop?filter=new"
                className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
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
              {newArrivals.slice(0, 4).map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <div className="text-center mt-10 md:hidden">
              <Link href="/shop?filter=new" className="btn-secondary">
                Tüm Yeni Ürünler
              </Link>
            </div>
          </div>
        </section>

        {/* App Download / B2B Section */}
        <section className="py-16 lg:py-24 bg-primary text-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">
                  Toptan Satış
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  İşletmeniz İçin Özel Fırsatlar
                </h2>
                <p className="text-neutral-300 text-lg mb-8 max-w-md">
                  Toptan satış fiyatlarımız ve avantajlı koşullarımız hakkında
                  bilgi almak için bizimle iletişime geçin.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Özel Fiyatlar</h4>
                      <p className="text-neutral-400 text-sm">
                        Rekabetçi toptan fiyatları ile kar marjınızı artırın
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-accent"
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
                      <h4 className="font-semibold mb-1">Hızlı Teslimat</h4>
                      <p className="text-neutral-400 text-sm">
                        Siparişleriniz 24 saat içinde kargoya verilir
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Güvenli Alışveriş</h4>
                      <p className="text-neutral-400 text-sm">
                        256-bit SSL ile güvenli ödeme
                      </p>
                    </div>
                  </div>
                </div>

                <Link href="/shop" className="btn-accent btn-lg">
                  Bilgi Al
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
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>

              <div className="relative hidden lg:block">
                <div className="relative aspect-square rounded-3xl overflow-hidden">
                  {b2bImages.map((src, index) => (
                    <Image
                      key={src}
                      src={src}
                      alt={`Toptan Satış ${index + 1}`}
                      fill
                      className={`object-cover transition-opacity duration-1000 ${
                        index === b2bIndex ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                  {/* Slider Dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {b2bImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setB2bIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === b2bIndex
                            ? "bg-white w-6"
                            : "bg-white/50 hover:bg-white/75"
                        }`}
                        aria-label={`Görsel ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 bg-white text-primary p-6 rounded-2xl shadow-product-hover max-w-xs">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-success"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-lg">%25&apos;e varan</p>
                      <p className="text-sm text-neutral-500">
                        Toptan indirimler
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Features */}
        <section className="py-12 border-t border-neutral-100">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-sm mb-1">Ücretsiz Kargo</h4>
                <p className="text-xs text-neutral-500">
                  500 TL üzeri siparişlerde
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-sm mb-1">Kolay İade</h4>
                <p className="text-xs text-neutral-500">
                  30 gün içinde ücretsiz
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-sm mb-1">Güvenli Ödeme</h4>
                <p className="text-xs text-neutral-500">256-bit SSL koruma</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-sm mb-1">7/24 Destek</h4>
                <p className="text-xs text-neutral-500">Müşteri hizmetleri</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
