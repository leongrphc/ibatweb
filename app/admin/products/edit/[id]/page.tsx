"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useProducts } from "@/context/ProductContext";
import {
  SizeCategory,
  Gender,
  ShoeSize,
  ColorOption,
  ProductImage,
} from "@/types";

const AVAILABLE_SIZES: ShoeSize[] = [
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
];

const PRESET_COLORS: ColorOption[] = [
  { id: "white", name: "Beyaz", hexCode: "#FFFFFF" },
  { id: "black", name: "Siyah", hexCode: "#1F2937" },
  { id: "red", name: "Kırmızı", hexCode: "#EF4444" },
  { id: "blue", name: "Mavi", hexCode: "#3B82F6" },
  { id: "pink", name: "Pembe", hexCode: "#EC4899" },
  { id: "green", name: "Yeşil", hexCode: "#10B981" },
  { id: "yellow", name: "Sarı", hexCode: "#FACC15" },
  { id: "purple", name: "Mor", hexCode: "#A855F7" },
  { id: "orange", name: "Turuncu", hexCode: "#F97316" },
  { id: "brown", name: "Kahverengi", hexCode: "#92400E" },
  { id: "gray", name: "Gri", hexCode: "#6B7280" },
  { id: "navy", name: "Lacivert", hexCode: "#1E3A8A" },
];

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const { getProductById, updateProduct, loading } = useProducts();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    gender: "Unisex" as Gender,
    retailPrice: "",
    wholesalePrice: "",
    discountPercent: "",
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
  });

  const [selectedCategories, setSelectedCategories] = useState<SizeCategory[]>(
    [],
  );
  const [selectedSizes, setSelectedSizes] = useState<ShoeSize[]>([]);
  const [selectedColors, setSelectedColors] = useState<ColorOption[]>([]);
  const [stockValues, setStockValues] = useState<Record<ShoeSize, number>>(
    {} as any,
  );
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState<ProductImage[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // Load product data
  useEffect(() => {
    if (!loading && productId) {
      const product = getProductById(productId);
      if (product) {
        setFormData({
          name: product.name,
          description: product.description,
          brand: product.brand || "",
          gender: product.gender,
          retailPrice: product.retailPrice.toString(),
          wholesalePrice: product.wholesalePrice?.toString() || "",
          discountPercent: product.discountPercent?.toString() || "",
          isFeatured: product.isFeatured,
          isNewArrival: product.isNewArrival,
          isOnSale: product.isOnSale || false,
        });
        setSelectedCategories(product.category);

        // Extract sizes and stock from sizeVariants
        const sizes = product.sizeVariants.map((v) => v.size);
        setSelectedSizes(sizes);

        const stocks: Record<ShoeSize, number> = {} as any;
        product.sizeVariants.forEach((v) => {
          stocks[v.size] = v.stock;
        });
        setStockValues(stocks);

        // Match colors with preset colors or use product colors
        const matchedColors: ColorOption[] = [];
        product.colors.forEach((color) => {
          const preset = PRESET_COLORS.find((p) => p.id === color.id);
          if (preset) {
            matchedColors.push(preset);
          } else {
            matchedColors.push(color);
          }
        });
        setSelectedColors(matchedColors);

        setImages(product.images);
      } else {
        setNotFound(true);
      }
    }
  }, [loading, productId, getProductById]);

  const toggleCategory = (category: SizeCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const toggleSize = (size: ShoeSize) => {
    setSelectedSizes((prev) => {
      if (prev.includes(size)) {
        const newSizes = prev.filter((s) => s !== size);
        const newStock = { ...stockValues };
        delete newStock[size];
        setStockValues(newStock);
        return newSizes;
      } else {
        setStockValues((prev) => ({ ...prev, [size]: 0 }));
        return [...prev, size].sort((a, b) => a - b);
      }
    });
  };

  const toggleColor = (color: ColorOption) => {
    setSelectedColors((prev) =>
      prev.some((c) => c.id === color.id)
        ? prev.filter((c) => c.id !== color.id)
        : [...prev, color],
    );
  };

  const addImage = () => {
    if (!imageUrl.trim()) return;

    const newImage: ProductImage = {
      id: Date.now().toString(),
      url: imageUrl.trim(),
      alt: formData.name || "Ürün görseli",
      isPrimary: images.length === 0,
    };
    setImages((prev) => [...prev, newImage]);
    setImageUrl("");
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const newImages = prev.filter((img) => img.id !== id);
      if (newImages.length > 0 && !newImages.some((img) => img.isPrimary)) {
        newImages[0].isPrimary = true;
      }
      return newImages;
    });
  };

  const setPrimaryImage = (id: string) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isPrimary: img.id === id,
      })),
    );
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Ürün adı zorunludur";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Ürün açıklaması zorunludur";
    }
    if (!formData.retailPrice || parseFloat(formData.retailPrice) <= 0) {
      newErrors.retailPrice = "Geçerli bir perakende fiyatı girin";
    }
    if (selectedCategories.length === 0) {
      newErrors.categories = "En az bir kategori seçin";
    }
    if (selectedSizes.length === 0) {
      newErrors.sizes = "En az bir beden seçin";
    }
    if (selectedColors.length === 0) {
      newErrors.colors = "En az bir renk seçin";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSaving(true);

    try {
      const sizeVariants = selectedSizes.map((size) => ({
        size,
        sizeCategory: (size >= 22 && size <= 25
          ? "BEBE"
          : size >= 26 && size <= 30
            ? "PATİK"
            : "FİLET") as SizeCategory,
        stock: stockValues[size] || 0,
        sku: `IBT-${size}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      }));

      updateProduct(productId, {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.retailPrice),
        retailPrice: parseFloat(formData.retailPrice),
        wholesalePrice: formData.wholesalePrice
          ? parseFloat(formData.wholesalePrice)
          : undefined,
        brand: formData.brand.trim() || undefined,
        gender: formData.gender,
        colors: selectedColors,
        sizeVariants,
        images:
          images.length > 0
            ? images
            : [
                {
                  id: "default",
                  url: "/images/1194215_SSRT1907CİLTF_1.jpg",
                  alt: formData.name,
                  isPrimary: true,
                },
              ],
        category: selectedCategories,
        isFeatured: formData.isFeatured,
        isNewArrival: formData.isNewArrival,
        isOnSale: formData.isOnSale,
        discountPercent: formData.discountPercent
          ? parseFloat(formData.discountPercent)
          : undefined,
      });

      router.push("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      setErrors({ submit: "Ürün güncellenirken bir hata oluştu" });
    } finally {
      setSaving(false);
    }
  };

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

  if (notFound) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
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
            Aradığınız ürün mevcut değil veya silinmiş olabilir.
          </p>
          <Link href="/admin/products" className="btn-primary btn-sm">
            Ürünlere Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary">Ürünü Düzenle</h1>
              <p className="text-neutral-500 text-sm">
                Ürün bilgilerini güncelleyin
              </p>
            </div>
            <Link href="/admin/products" className="btn-ghost btn-sm">
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
              İptal
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-bold text-primary mb-6">
              Temel Bilgiler
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Ürün Adı <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className={`input ${errors.name ? "border-error" : ""}`}
                  placeholder="Örn: Klasik Spor Ayakkabı"
                />
                {errors.name && (
                  <p className="text-error text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Açıklama <span className="text-error">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={4}
                  className={`input ${errors.description ? "border-error" : ""}`}
                  placeholder="Ürün açıklamasını yazın..."
                />
                {errors.description && (
                  <p className="text-error text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Marka
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        brand: e.target.value,
                      }))
                    }
                    className="input"
                    placeholder="Örn: İbat Kids"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Cinsiyet
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        gender: e.target.value as Gender,
                      }))
                    }
                    className="input"
                  >
                    <option value="Unisex">Unisex</option>
                    <option value="Erkek">Erkek</option>
                    <option value="Kız">Kız</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-bold text-primary mb-6">
              Kategoriler <span className="text-error">*</span>
            </h2>

            <div className="grid grid-cols-3 gap-4">
              {(["BEBE", "PATİK", "FİLET"] as SizeCategory[]).map(
                (category) => {
                  const sizeRange =
                    category === "BEBE"
                      ? "22-25"
                      : category === "PATİK"
                        ? "26-30"
                        : "31-35";
                  const isSelected = selectedCategories.includes(category);

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => toggleCategory(category)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-neutral-200 hover:border-neutral-300"
                      }`}
                    >
                      <div className="font-semibold text-primary">
                        {category}
                      </div>
                      <div className="text-sm text-neutral-500">
                        {sizeRange} beden
                      </div>
                    </button>
                  );
                },
              )}
            </div>
            {errors.categories && (
              <p className="text-error text-sm mt-2">{errors.categories}</p>
            )}
          </div>

          {/* Sizes & Stock */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-bold text-primary mb-6">
              Bedenler ve Stok <span className="text-error">*</span>
            </h2>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {AVAILABLE_SIZES.map((size) => {
                const isSelected = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`py-3 rounded-lg font-medium transition-all ${
                      isSelected
                        ? "bg-primary text-white"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>

            {selectedSizes.length > 0 && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Stok Miktarları
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {selectedSizes.map((size) => (
                    <div key={size} className="flex items-center gap-2">
                      <span className="w-10 text-sm font-medium text-neutral-600">
                        {size}:
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={stockValues[size] || ""}
                        onChange={(e) =>
                          setStockValues((prev) => ({
                            ...prev,
                            [size]: parseInt(e.target.value) || 0,
                          }))
                        }
                        className="input py-2 text-center"
                        placeholder="0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {errors.sizes && (
              <p className="text-error text-sm mt-2">{errors.sizes}</p>
            )}
          </div>

          {/* Colors */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-bold text-primary mb-6">
              Renkler <span className="text-error">*</span>
            </h2>

            <div className="grid grid-cols-6 gap-3">
              {PRESET_COLORS.map((color) => {
                const isSelected = selectedColors.some(
                  (c) => c.id === color.id,
                );
                return (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => toggleColor(color)}
                    className={`relative p-3 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-primary"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <div
                      className="w-full aspect-square rounded-lg border border-neutral-200"
                      style={{ backgroundColor: color.hexCode }}
                    />
                    <div className="text-xs text-center mt-2 font-medium text-neutral-600">
                      {color.name}
                    </div>
                    {isSelected && (
                      <div className="absolute top-1 right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            {errors.colors && (
              <p className="text-error text-sm mt-2">{errors.colors}</p>
            )}
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-bold text-primary mb-6">
              Fiyatlandırma
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Perakende Fiyatı (TL) <span className="text-error">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.retailPrice}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      retailPrice: e.target.value,
                    }))
                  }
                  className={`input ${errors.retailPrice ? "border-error" : ""}`}
                  placeholder="0.00"
                />
                {errors.retailPrice && (
                  <p className="text-error text-sm mt-1">
                    {errors.retailPrice}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Toptan Fiyatı (TL)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.wholesalePrice}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      wholesalePrice: e.target.value,
                    }))
                  }
                  className="input"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Discount Section */}
            <div className="border-t border-neutral-100 pt-6 mt-6">
              <label className="flex items-center gap-3 cursor-pointer mb-4">
                <input
                  type="checkbox"
                  checked={formData.isOnSale}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isOnSale: e.target.checked,
                      discountPercent: e.target.checked
                        ? prev.discountPercent
                        : "",
                    }))
                  }
                  className="checkbox"
                />
                <div>
                  <div className="font-medium text-primary">İndirimli Ürün</div>
                  <div className="text-sm text-neutral-500">
                    Bu ürün için indirim uygulansın
                  </div>
                </div>
              </label>

              {formData.isOnSale && (
                <div className="pl-8 animate-fade-in">
                  <div className="max-w-xs">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      İndirim Oranı (%)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={formData.discountPercent}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          discountPercent: e.target.value,
                        }))
                      }
                      className="input"
                      placeholder="Örn: 20"
                    />
                    {formData.discountPercent && formData.retailPrice && (
                      <p className="text-sm text-neutral-500 mt-2">
                        İndirimli fiyat:{" "}
                        <span className="font-semibold text-error">
                          {Math.round(
                            parseFloat(formData.retailPrice) *
                              (1 - parseFloat(formData.discountPercent) / 100),
                          ).toLocaleString("tr-TR")}{" "}
                          TL
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-bold text-primary mb-6">Görseller</h2>

            <div className="flex gap-3 mb-4">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="input flex-1"
                placeholder="Görsel URL'si girin..."
              />
              <button
                type="button"
                onClick={addImage}
                className="btn-secondary"
              >
                Ekle
              </button>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image) => (
                  <div key={image.id} className="relative group">
                    <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/images/1194215_SSRT1907CİLTF_1.jpg";
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setPrimaryImage(image.id)}
                        className={`p-2 rounded-lg ${image.isPrimary ? "bg-accent text-white" : "bg-white text-neutral-700"}`}
                        title={
                          image.isPrimary ? "Ana görsel" : "Ana görsel yap"
                        }
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="p-2 bg-white text-error rounded-lg"
                        title="Sil"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                    {image.isPrimary && (
                      <span className="absolute top-2 left-2 bg-accent text-white text-xs px-2 py-1 rounded">
                        Ana
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            <p className="text-sm text-neutral-500 mt-4">
              Görsel eklemezseniz mevcut görseller korunur.
            </p>
          </div>

          {/* Status */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-lg font-bold text-primary mb-6">Durum</h2>

            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isNewArrival}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isNewArrival: e.target.checked,
                    }))
                  }
                  className="checkbox"
                />
                <div>
                  <div className="font-medium text-primary">Yeni Ürün</div>
                  <div className="text-sm text-neutral-500">
                    Ürün "Yeni Gelenler" bölümünde gösterilir
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isFeatured: e.target.checked,
                    }))
                  }
                  className="checkbox"
                />
                <div>
                  <div className="font-medium text-primary">Öne Çıkan</div>
                  <div className="text-sm text-neutral-500">
                    Ürün ana sayfada öne çıkarılır
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Submit */}
          {errors.submit && (
            <div className="bg-error/10 text-error p-4 rounded-xl text-center">
              {errors.submit}
            </div>
          )}

          <div className="flex gap-4">
            <Link href="/admin/products" className="btn-secondary flex-1">
              İptal
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex-1"
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                <>
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Değişiklikleri Kaydet
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
