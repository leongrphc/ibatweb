"use client";

import Link from "next/link";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  showQuickAdd?: boolean;
}

export default function ProductCard({
  product,
  showQuickAdd = true,
}: ProductCardProps) {
  const primary =
    product.images.find((image) => image.isPrimary) || product.images[0];
  const secondary = product.images.find((image) => image.url !== primary?.url);
  const discount = product.isOnSale
    ? Math.min(100, Math.max(0, product.discountPercent || 0))
    : 0;
  const price = Math.round(product.retailPrice * (1 - discount / 100));
  const sizes = product.sizeVariants
    .filter((variant) => variant.stock > 0)
    .map((variant) => variant.size)
    .sort((a, b) => a - b);
  const imageFallback = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = "/images/1194215_SSRT1907CİLTF_1.jpg";
  };

  return (
    <Link
      href={`/product/${product.id}`}
      className="catalog-card group"
      aria-label={`${product.name}, ${price.toLocaleString("tr-TR")} TL, ürünü incele`}
    >
      <article className="product-card">
        <div className="catalog-image">
          {/* Product images may be uploaded as data URLs in the existing admin. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={primary?.url || "/images/1194215_SSRT1907CİLTF_1.jpg"}
            alt={primary?.alt || product.name}
            loading="lazy"
            width="600"
            height="600"
            onError={imageFallback}
          />
          {secondary && (
            <img
              src={secondary.url}
              alt=""
              loading="lazy"
              width="600"
              height="600"
              className="catalog-image-secondary"
              onError={imageFallback}
            />
          )}
          <div className="catalog-badges">
            {product.isNewArrival && <span>Yeni</span>}
            {discount > 0 && (
              <span className="catalog-discount">%{discount} indirim</span>
            )}
          </div>
          {showQuickAdd && (
            <span className="catalog-view">
              Ürünü incele <span aria-hidden="true">↗</span>
            </span>
          )}
        </div>
        <div className="catalog-info">
          <div className="catalog-meta">
            <span>{product.brand || "İbat Kids"}</span>
            <span className="catalog-swatches">
              {product.colors.slice(0, 3).map((color) => (
                <span
                  key={color.id}
                  style={{ backgroundColor: color.hexCode }}
                  title={color.name}
                />
              ))}
            </span>
          </div>
          <h3>{product.name}</h3>
          <p className="catalog-sizes">
            {product.category.join(" · ")}
            <span aria-hidden="true"> / </span>
            {sizes.length > 0
              ? `${sizes[0]}${sizes.length > 1 ? `–${sizes[sizes.length - 1]}` : ""} numara`
              : "Stokta yok"}
          </p>
          <div className="catalog-prices">
            <strong>{price.toLocaleString("tr-TR")} TL</strong>
            {discount > 0 && (
              <del>{product.retailPrice.toLocaleString("tr-TR")} TL</del>
            )}
          </div>
          {!!product.wholesalePrice && (
            <p className="catalog-wholesale">
              Toptan: {product.wholesalePrice.toLocaleString("tr-TR")} TL
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
