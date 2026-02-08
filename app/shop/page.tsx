"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/context/ProductContext";
import { SizeCategory, Gender, ShoeSize } from "@/types";

export default function ShopPage() {
  const { products, loading } = useProducts();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get URL parameters
  const categoryParam = searchParams.get("category") as SizeCategory | null;
  const filterParam = searchParams.get("filter");

  const [selectedCategories, setSelectedCategories] = useState<SizeCategory[]>(
    [],
  );
  const [selectedSizes, setSelectedSizes] = useState<ShoeSize[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<Gender[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState<string[]>([
    "category",
    "size",
    "gender",
  ]);

  // Apply URL parameters on mount and when they change
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    } else {
      setSelectedCategories([]);
    }

    if (filterParam === "new") {
      setSortBy("newest");
    } else if (filterParam === "sale" || filterParam === "featured") {
      setSortBy("discount");
    } else {
      setSortBy("featured");
    }
  }, [categoryParam, filterParam]);

  const toggleFilter = (filterName: string) => {
    setExpandedFilters((prev) =>
      prev.includes(filterName)
        ? prev.filter((f) => f !== filterName)
        : [...prev, filterName],
    );
  };

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply URL filter param first
    if (filterParam === "new") {
      filtered = filtered.filter((product) => product.isNewArrival);
    } else if (filterParam === "sale" || filterParam === "featured") {
      filtered = filtered.filter((product) => product.isOnSale);
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        product.category.some((cat) => selectedCategories.includes(cat)),
      );
    }

    if (selectedSizes.length > 0) {
      filtered = filtered.filter((product) =>
        product.sizeVariants.some((variant) =>
          selectedSizes.includes(variant.size),
        ),
      );
    }

    if (selectedGenders.length > 0) {
      filtered = filtered.filter((product) =>
        selectedGenders.includes(product.gender),
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.retailPrice >= priceRange[0] &&
        product.retailPrice <= priceRange[1],
    );

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.retailPrice - b.retailPrice);
        break;
      case "price-high":
        filtered.sort((a, b) => b.retailPrice - a.retailPrice);
        break;
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "discount":
        filtered.sort(
          (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0),
        );
        break;
      case "featured":
      default:
        filtered.sort(
          (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0),
        );
    }

    return filtered;
  }, [
    products,
    selectedCategories,
    selectedSizes,
    selectedGenders,
    priceRange,
    sortBy,
    filterParam,
  ]);

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

  const toggleCategory = (category: SizeCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const toggleSize = (size: ShoeSize) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const toggleGender = (gender: Gender) => {
    setSelectedGenders((prev) =>
      prev.includes(gender)
        ? prev.filter((g) => g !== gender)
        : [...prev, gender],
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedGenders([]);
    setPriceRange([0, 50000]);
    // Clear URL parameters and navigate to plain shop page
    router.push("/shop");
  };

  const activeFilterCount =
    selectedCategories.length +
    selectedSizes.length +
    selectedGenders.length +
    (filterParam ? 1 : 0) +
    (categoryParam ? 1 : 0);

  const FilterSection = ({
    title,
    name,
    children,
  }: {
    title: string;
    name: string;
    children: React.ReactNode;
  }) => (
    <div className="filter-section">
      <button
        onClick={() => toggleFilter(name)}
        className="filter-title w-full"
      >
        <span>{title}</span>
        <svg
          className={`w-4 h-4 transition-transform ${expandedFilters.includes(name) ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {expandedFilters.includes(name) && (
        <div className="filter-options animate-fade-in">{children}</div>
      )}
    </div>
  );

  const FiltersContent = () => (
    <>
      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <button
          onClick={clearFilters}
          className="w-full text-sm text-accent hover:text-accent-700 font-medium mb-4 flex items-center gap-2"
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
          Filtreleri Temizle ({activeFilterCount})
        </button>
      )}

      {/* Category Filter */}
      <FilterSection title="Kategori" name="category">
        {(["BEBE", "PATİK", "FİLET"] as SizeCategory[]).map((category) => (
          <label key={category} className="filter-option">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => toggleCategory(category)}
              className="checkbox"
            />
            <span className="flex-1">
              {category}
              <span className="text-neutral-400 ml-1">
                (
                {category === "BEBE"
                  ? "22-25"
                  : category === "PATİK"
                    ? "26-30"
                    : "31-35"}
                )
              </span>
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Size Filter */}
      <FilterSection title="Beden" name="size">
        <div className="grid grid-cols-4 gap-2">
          {(
            [
              22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
            ] as ShoeSize[]
          ).map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                selectedSizes.includes(size)
                  ? "bg-primary text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Gender Filter */}
      <FilterSection title="Cinsiyet" name="gender">
        {(["Erkek", "Kız", "Unisex"] as Gender[]).map((gender) => (
          <label key={gender} className="filter-option">
            <input
              type="checkbox"
              checked={selectedGenders.includes(gender)}
              onChange={() => toggleGender(gender)}
              className="checkbox"
            />
            <span>{gender}</span>
          </label>
        ))}
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Fiyat Aralığı" name="price">
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="50000"
            step="500"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-sm">
            <span className="text-neutral-500">0 TL</span>
            <span className="font-medium">
              {priceRange[1].toLocaleString("tr-TR")} TL
            </span>
          </div>
        </div>
      </FilterSection>
    </>
  );

  // Dynamic page title and description based on filters
  const getPageInfo = () => {
    if (filterParam === "new") {
      return {
        title: "Yeni Gelenler",
        description: "En son eklenen ürünlerimizi keşfedin",
        breadcrumb: "Yeni Gelenler",
      };
    }
    if (filterParam === "sale" || filterParam === "featured") {
      return {
        title: "İndirimli Ürünler",
        description: "Kaçırılmayacak fırsatlar ve indirimler",
        breadcrumb: "İndirimli Ürünler",
      };
    }
    if (categoryParam) {
      const categoryNames: Record<string, { title: string; desc: string }> = {
        BEBE: {
          title: "Bebe (22-25)",
          desc: "İlk adım ayakkabıları ve bebekler için özel tasarımlar",
        },
        PATİK: {
          title: "Patik (26-30)",
          desc: "Aktif çocuklar için rahat ve dayanıklı ayakkabılar",
        },
        FİLET: {
          title: "Filet (31-35)",
          desc: "Büyüyen çocuklar için stil ve konfor",
        },
      };
      const info = categoryNames[categoryParam] || {
        title: categoryParam,
        desc: "",
      };
      return {
        title: info.title,
        description: info.desc,
        breadcrumb: categoryParam,
      };
    }
    return {
      title: "Tüm Ürünler",
      description: "Tüm çocuk ayakkabılarını keşfedin",
      breadcrumb: "Tüm Ürünler",
    };
  };

  const pageInfo = getPageInfo();

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
              {(categoryParam || filterParam) && (
                <>
                  <Link
                    href="/shop"
                    className="hover:text-accent transition-colors"
                  >
                    Tüm Ürünler
                  </Link>
                  <span className="breadcrumb-separator">/</span>
                </>
              )}
              <span className="text-primary font-medium">
                {pageInfo.breadcrumb}
              </span>
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <div className="border-b border-neutral-100">
          <div className="container-custom py-8">
            <div className="flex items-center gap-3 mb-2">
              {filterParam === "new" && <span className="badge-new">YENİ</span>}
              {(filterParam === "sale" || filterParam === "featured") && (
                <span className="badge-sale">İNDİRİM</span>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-primary">
                {pageInfo.title}
              </h1>
            </div>
            <p className="text-neutral-500">
              {filteredProducts.length} ürün bulundu
            </p>
            {pageInfo.description && (
              <p className="text-neutral-600 mt-2">{pageInfo.description}</p>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="container-custom py-8">
          <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-10">
            {/* Desktop Filters */}
            <aside className="hidden lg:block">
              <div className="sticky top-32">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">Filtreler</h3>
                  {activeFilterCount > 0 && (
                    <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <FiltersContent />
              </div>
            </aside>

            {/* Products Section */}
            <div>
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-100">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden btn-secondary btn-sm"
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
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  Filtrele {activeFilterCount > 0 && `(${activeFilterCount})`}
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-3 ml-auto">
                  <span className="text-sm text-neutral-500 hidden sm:inline">
                    Sırala:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input py-2 pr-10 pl-4 text-sm min-w-[180px]"
                  >
                    <option value="featured">Öne Çıkanlar</option>
                    <option value="newest">Yeni Gelenler</option>
                    <option value="price-low">Fiyat: Düşükten Yükseğe</option>
                    <option value="price-high">Fiyat: Yüksekten Düşüğe</option>
                    <option value="discount">İndirim Oranı</option>
                  </select>
                </div>
              </div>

              {/* Active Filters Pills */}
              {activeFilterCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 rounded-full text-sm hover:bg-neutral-200 transition-colors"
                    >
                      {cat}
                      <svg
                        className="w-3.5 h-3.5"
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
                    </button>
                  ))}
                  {selectedSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 rounded-full text-sm hover:bg-neutral-200 transition-colors"
                    >
                      {size} Numara
                      <svg
                        className="w-3.5 h-3.5"
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
                    </button>
                  ))}
                  {selectedGenders.map((gender) => (
                    <button
                      key={gender}
                      onClick={() => toggleGender(gender)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 rounded-full text-sm hover:bg-neutral-200 transition-colors"
                    >
                      {gender}
                      <svg
                        className="w-3.5 h-3.5"
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
                    </button>
                  ))}
                </div>
              )}

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="product-grid">
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-fade-up"
                      style={{ animationDelay: `${(index % 8) * 50}ms` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-neutral-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Ürün Bulunamadı
                  </h3>
                  <p className="text-neutral-500 mb-4">
                    Seçtiğiniz filtrelere uygun ürün bulunamadı.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="btn-secondary btn-sm"
                  >
                    Filtreleri Temizle
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filters Modal */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowMobileFilters(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white overflow-y-auto animate-slide-in-right">
              <div className="sticky top-0 bg-white border-b border-neutral-100 px-6 py-4 flex items-center justify-between">
                <h3 className="font-semibold text-lg">Filtreler</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <FiltersContent />
              </div>
              <div className="sticky bottom-0 bg-white border-t border-neutral-100 px-6 py-4">
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="btn-primary w-full"
                >
                  {filteredProducts.length} Ürün Göster
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
