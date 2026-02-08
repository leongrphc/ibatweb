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
  const primaryImage =
    product.images.find((img) => img.isPrimary) || product.images[0];
  const secondaryImage =
    product.images.find((img) => !img.isPrimary) || product.images[0];

  // Use actual discount data from product
  const hasDiscount = product.isOnSale && (product.discountPercent || 0) > 0;
  const discountPercent = product.discountPercent || 0;
  // Original price is the retailPrice, discounted price is calculated from discount percentage
  const originalPrice = product.retailPrice;
  const discountedPrice = hasDiscount
    ? Math.round(product.retailPrice * (1 - discountPercent / 100))
    : product.retailPrice;

  // Available colors count
  const colorCount = product.colors.length;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/images/1194215_SSRT1907CİLTF_1.jpg";
  };

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="product-card">
        {/* Image Container */}
        <div className="product-card-image relative">
          {/* Primary Image */}
          <img
            src={primaryImage?.url || "/images/1194215_SSRT1907CİLTF_1.jpg"}
            alt={primaryImage?.alt || product.name}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
            onError={handleImageError}
          />
          {/* Secondary Image on Hover */}
          <img
            src={
              secondaryImage?.url ||
              primaryImage?.url ||
              "/images/1194215_SSRT1907CİLTF_1.jpg"
            }
            alt={secondaryImage?.alt || product.name}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            onError={handleImageError}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.isNewArrival && <span className="badge-new">YENİ</span>}
            {hasDiscount && (
              <span className="badge-sale">%{discountPercent}</span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-neutral-100 z-10 shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              // Add to favorites logic
            }}
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

          {/* Quick Add Button */}
          {showQuickAdd && (
            <button
              className="absolute bottom-3 left-3 right-3 btn-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-xs py-2.5"
              onClick={(e) => {
                e.preventDefault();
                // Quick add logic
              }}
            >
              Hızlı Ekle
            </button>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Color Options */}
          {colorCount > 1 && (
            <div className="flex items-center gap-1.5 mb-2">
              {product.colors.slice(0, 4).map((color) => (
                <span
                  key={color.id}
                  className="w-4 h-4 rounded-full border border-neutral-200"
                  style={{ backgroundColor: color.hexCode }}
                  title={color.name}
                />
              ))}
              {colorCount > 4 && (
                <span className="text-xs text-neutral-500">
                  +{colorCount - 4}
                </span>
              )}
            </div>
          )}

          {/* Brand */}
          {product.brand && (
            <p className="text-xs text-neutral-500 font-medium uppercase tracking-wide mb-1">
              {product.brand}
            </p>
          )}

          {/* Product Name */}
          <h3 className="font-medium text-primary text-sm mb-2 line-clamp-2 group-hover:text-neutral-600 transition-colors">
            {product.name}
          </h3>

          {/* Category & Gender */}
          <div className="flex items-center gap-2 mb-3">
            <span className="badge-category text-xs">
              {product.category[0]}
            </span>
            <span className="text-xs text-neutral-400">{product.gender}</span>
          </div>

          {/* Pricing */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {hasDiscount && (
                <span className="price-original">
                  {originalPrice.toLocaleString("tr-TR")} TL
                </span>
              )}
              <span
                className={`price-current ${hasDiscount ? "text-error" : ""}`}
              >
                {discountedPrice.toLocaleString("tr-TR")} TL
              </span>
            </div>

            {/* Lowest Price Badge */}
            {hasDiscount && (
              <div className="lowest-price-badge">
                Son 30 günün en düşük fiyatı
              </div>
            )}

            {/* Wholesale Price */}
            {product.wholesalePrice && (
              <p className="text-xs text-neutral-500">
                Toptan:{" "}
                <span className="font-medium">
                  {product.wholesalePrice.toLocaleString("tr-TR")} TL
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
