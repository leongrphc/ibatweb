"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/lib/mockData";
import { useProducts } from "@/context/ProductContext";

export default function HomePage() {
  const { products, loading } = useProducts();
  const featured = products.filter((product) => product.isFeatured).slice(0, 4);
  const arrivals = products
    .filter((product) => product.isNewArrival)
    .slice(0, 4);

  return (
    <div className="storefront min-h-screen">
      <Header />
      <main id="main-content">
        <section className="home-hero">
          <div className="container-custom hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="brand-dot" /> İBAT KIDS KOLEKSİYONU
              </p>
              <h1>
                Küçük adımlar.
                <br /> <span>Büyük keşifler.</span>
              </h1>
              <p className="hero-description">
                İlk adımlardan okul yollarına, oyun dolu günlere eşlik eden
                ayakkabılar.
              </p>
              <div className="hero-actions">
                <Link href="/shop" className="btn-primary btn-lg">
                  Koleksiyonu keşfet <span aria-hidden="true">↗</span>
                </Link>
                <Link href="/shop?filter=new" className="text-link">
                  Yeni gelenler <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="hero-footnote">
                <span>22–35</span>
                <p>
                  numara aralığı
                  <br />
                  <strong>Her adım için bir seçenek.</strong>
                </p>
              </div>
            </div>
            <div className="hero-stage">
              <span className="stage-caption">OYUNA HAZIR.</span>
              <div className="hero-orbit" aria-hidden="true" />
              <Image
                src="/images/1194215_SSRT1907CİLTF_1.jpg"
                alt="Pembe detaylı çocuk spor ayakkabısı"
                fill
                priority
                sizes="(max-width: 767px) 100vw, 55vw"
                className="hero-shoe"
              />
              <Link href="/shop?category=BEBE" className="stage-note">
                <span>Bebe koleksiyonu</span>
                <strong>
                  İlk keşiflere eşlik et <span aria-hidden="true">↗</span>
                </strong>
              </Link>
              <span className="stage-size">
                22–25
                <br />
                <small>NUMARA</small>
              </span>
            </div>
          </div>
        </section>

        <section
          className="size-discovery container-custom"
          aria-labelledby="size-heading"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">ADIM ADIM BÜYÜRKEN</p>
              <h2 id="size-heading">Onun numarası, onun dünyası.</h2>
            </div>
            <p>Doğru koleksiyona numarasından başlayın.</p>
          </div>
          <div className="category-collection">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/shop?category=${encodeURIComponent(category.name)}`}
                className={`category-tile category-tone-${index}`}
              >
                <div className="category-tile-top">
                  <span>
                    {category.name === "BEBE"
                      ? "İlk keşifler"
                      : category.name === "PATİK"
                        ? "Oyun zamanı"
                        : "Kendi yolunda"}
                  </span>
                  <span aria-hidden="true">↗</span>
                </div>
                <div className="category-photo">
                  <Image
                    src={category.imageUrl}
                    alt={category.displayName}
                    fill
                    sizes="(max-width: 639px) 90vw, 33vw"
                  />
                </div>
                <div className="category-tile-bottom">
                  <h3>
                    {category.name === "BEBE"
                      ? "Bebe"
                      : category.name === "PATİK"
                        ? "Patik"
                        : "Filet"}
                  </h3>
                  <span>{category.sizeRange} numara</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section
          className="home-products container-custom"
          aria-labelledby="featured-heading"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">KOLEKSİYONDAN SEÇTİKLERİMİZ</p>
              <h2 id="featured-heading">Günün her adımına.</h2>
            </div>
            <Link href="/shop?filter=featured" className="text-link">
              Tümünü keşfet <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="product-grid" aria-busy={loading}>
            {loading
              ? Array.from({ length: 4 }, (_, index) => (
                  <div key={index} className="product-skeleton" role="status">
                    <span className="sr-only">Ürünler yükleniyor</span>
                  </div>
                ))
              : featured.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
          {!loading && featured.length === 0 && (
            <p>
              Yeni modelleri{" "}
              <Link href="/shop" className="text-link">
                koleksiyonda keşfedin.
              </Link>
            </p>
          )}
        </section>

        <section className="collection-story container-custom">
          <div className="story-image">
            <Image
              src="/images/1195413_TOMWS1017BOTF_1.jpg"
              alt="Çocuk bot koleksiyonundan bir model"
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
            />
          </div>
          <div className="story-copy">
            <p className="eyebrow">KENDİ YOLUNU BULANLARA</p>
            <h2>
              Her gün yeni
              <br />
              bir macera.
            </h2>
            <p>
              Okulda, parkta, arkadaşlarıyla… Büyüyen çocukların dünyasına spor
              ayakkabılardan botlara uzanan bir koleksiyon.
            </p>
            <Link href="/shop?category=F%C4%B0LET" className="btn-primary">
              Filet koleksiyonunu incele <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        {(loading || arrivals.length > 0) && (
          <section
            className="home-products container-custom"
            aria-labelledby="arrivals-heading"
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow">YENİ KEŞİFLER</p>
                <h2 id="arrivals-heading">Koleksiyona yeni katılanlar.</h2>
              </div>
              <Link href="/shop?filter=new" className="text-link">
                Yeni gelenler <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="product-grid">
              {arrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
        <section className="wholesale-strip container-custom">
          <div>
            <p className="eyebrow">TOPTAN & PERAKENDE</p>
            <h2>Mağazanız için de İbat.</h2>
            <p>
              Ürün detaylarında toptan fiyatlarını ve numara seçeneklerini
              inceleyin.
            </p>
          </div>
          <Link href="/shop" className="btn-secondary">
            Ürünleri incele <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
