import {
  Product,
  Category,
  SizeCategory,
  getSizeCategory,
  ShoeSize,
} from "@/types";

// Image base path
const IMG_PATH = "/images";

// Category data
export const categories: Category[] = [
  {
    id: "1",
    name: "BEBE",
    displayName: "Bebe (22-25)",
    description: "İlk adım ayakkabıları ve bebekler için özel tasarımlar",
    imageUrl: `${IMG_PATH}/1194215_SSRT1907CİLTF_1.jpg`,
    sizeRange: "22-25",
  },
  {
    id: "2",
    name: "PATİK",
    displayName: "Patik (26-30)",
    description: "Aktif çocuklar için rahat ve dayanıklı ayakkabılar",
    imageUrl: `${IMG_PATH}/1195404_TOMWS1017BOTP_120.jpg`,
    sizeRange: "26-30",
  },
  {
    id: "3",
    name: "FİLET",
    displayName: "Filet (31-35)",
    description: "Büyüyen çocuklar için stil ve konfor",
    imageUrl: `${IMG_PATH}/1195413_TOMWS1017BOTF_1.jpg`,
    sizeRange: "31-35",
  },
];

// Helper function to create size variants
function createSizeVariants(sizes: ShoeSize[]): any[] {
  return sizes.map((size) => ({
    size,
    sizeCategory: getSizeCategory(size),
    stock: Math.floor(Math.random() * 50) + 10,
    sku: `IBT-${size}-${Math.random().toString(36).substring(7).toUpperCase()}`,
  }));
}

// Products with real images from components/images
export const mockProducts: Product[] = [
  // SSRT1907CİLTF Serisi - Çocuk Spor Ayakkabı
  {
    id: "1",
    name: "Çocuk Spor Ayakkabı - Mavi",
    description:
      "Rahat ve şık tasarımıyla günlük kullanım için ideal çocuk spor ayakkabısı. Esnek taban yapısı ve nefes alan kumaşı ile tüm gün konfor sağlar.",
    price: 549,
    wholesalePrice: 420,
    retailPrice: 549,
    brand: "İbat Kids",
    gender: "Unisex",
    colors: [
      { id: "c1", name: "Mavi", hexCode: "#3B82F6" },
      { id: "c2", name: "Beyaz", hexCode: "#FFFFFF" },
    ],
    sizeVariants: createSizeVariants([22, 23, 24, 25]),
    images: [
      {
        id: "i1",
        url: `${IMG_PATH}/1194215_SSRT1907CİLTF_1.jpg`,
        alt: "Çocuk Spor Ayakkabı - Mavi Ön",
        isPrimary: true,
      },
      {
        id: "i2",
        url: `${IMG_PATH}/1194216_SSRT1907CİLTF_2.jpg`,
        alt: "Çocuk Spor Ayakkabı - Mavi Yan",
        isPrimary: false,
      },
    ],
    category: ["BEBE"],
    tags: ["yeni", "spor", "rahat"],
    isFeatured: true,
    isNewArrival: true,
    isOnSale: true,
    discountPercent: 21,
    createdAt: "2025-12-15T10:00:00Z",
    updatedAt: "2025-12-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Çocuk Spor Ayakkabı - Siyah",
    description:
      "Şık siyah tasarımıyla okul ve günlük kullanım için mükemmel. Dayanıklı yapısı ve ortopedik taban desteği ile sağlıklı ayak gelişimini destekler.",
    price: 579,
    wholesalePrice: 450,
    retailPrice: 579,
    brand: "İbat Kids",
    gender: "Erkek",
    colors: [
      { id: "c3", name: "Siyah", hexCode: "#1F2937" },
      { id: "c4", name: "Gri", hexCode: "#6B7280" },
    ],
    sizeVariants: createSizeVariants([26, 27, 28, 29, 30]),
    images: [
      {
        id: "i3",
        url: `${IMG_PATH}/1194212_SSRT1907CİLTF_3.jpg`,
        alt: "Çocuk Spor Ayakkabı - Siyah Ön",
        isPrimary: true,
      },
      {
        id: "i4",
        url: `${IMG_PATH}/1194207_SSRT1907CİLTF_4.jpg`,
        alt: "Çocuk Spor Ayakkabı - Siyah Yan",
        isPrimary: false,
      },
    ],
    category: ["PATİK"],
    tags: ["klasik", "okul", "dayanıklı"],
    isFeatured: true,
    isNewArrival: false,
    isOnSale: true,
    discountPercent: 20,
    createdAt: "2025-11-20T10:00:00Z",
    updatedAt: "2025-11-20T10:00:00Z",
  },
  {
    id: "3",
    name: "Çocuk Spor Ayakkabı - Beyaz",
    description:
      "Saf beyaz rengiyle her kıyafetle uyumlu spor ayakkabı. Hafif yapısı ve yumuşak iç astarı ile maksimum konfor.",
    price: 529,
    wholesalePrice: 400,
    retailPrice: 529,
    brand: "İbat Sport",
    gender: "Kız",
    colors: [
      { id: "c5", name: "Beyaz", hexCode: "#FFFFFF" },
      { id: "c6", name: "Pembe", hexCode: "#EC4899" },
    ],
    sizeVariants: createSizeVariants([31, 32, 33, 34, 35]),
    images: [
      {
        id: "i5",
        url: `${IMG_PATH}/1194214_SSRT1907CİLTF_5.jpg`,
        alt: "Çocuk Spor Ayakkabı - Beyaz Ön",
        isPrimary: true,
      },
      {
        id: "i6",
        url: `${IMG_PATH}/1194208_SSRT1907CİLTF_6.jpg`,
        alt: "Çocuk Spor Ayakkabı - Beyaz Yan",
        isPrimary: false,
      },
    ],
    category: ["FİLET"],
    tags: ["spor", "beyaz", "şık"],
    isFeatured: true,
    isNewArrival: true,
    isOnSale: true,
    discountPercent: 18,
    createdAt: "2025-12-01T10:00:00Z",
    updatedAt: "2025-12-01T10:00:00Z",
  },
  {
    id: "4",
    name: "Çocuk Spor Ayakkabı - Lacivert",
    description:
      "Lacivert tonlarıyla klasik ve zarif bir görünüm. Kaymaz taban teknolojisi ile güvenli adımlar.",
    price: 599,
    wholesalePrice: 470,
    retailPrice: 599,
    brand: "İbat Kids",
    gender: "Unisex",
    colors: [
      { id: "c7", name: "Lacivert", hexCode: "#1E3A8A" },
      { id: "c8", name: "Beyaz", hexCode: "#FFFFFF" },
    ],
    sizeVariants: createSizeVariants([22, 23, 24, 25]),
    images: [
      {
        id: "i7",
        url: `${IMG_PATH}/1194210_SSRT1907CİLTF_8.jpg`,
        alt: "Çocuk Spor Ayakkabı - Lacivert Ön",
        isPrimary: true,
      },
      {
        id: "i8",
        url: `${IMG_PATH}/1194213_SSRT1907CİLTF_9.jpg`,
        alt: "Çocuk Spor Ayakkabı - Lacivert Yan",
        isPrimary: false,
      },
    ],
    category: ["BEBE"],
    tags: ["lacivert", "klasik", "güvenli"],
    isFeatured: false,
    isNewArrival: true,
    createdAt: "2025-12-10T10:00:00Z",
    updatedAt: "2025-12-10T10:00:00Z",
  },
  {
    id: "5",
    name: "Çocuk Spor Ayakkabı - Gri",
    description:
      "Nötr gri tonuyla her ortama uygun şık tasarım. Nefes alan mesh yapısı ile yazın bile serin ayaklar.",
    price: 559,
    wholesalePrice: 430,
    retailPrice: 559,
    brand: "İbat Sport",
    gender: "Erkek",
    colors: [
      { id: "c9", name: "Gri", hexCode: "#6B7280" },
      { id: "c10", name: "Siyah", hexCode: "#1F2937" },
    ],
    sizeVariants: createSizeVariants([26, 27, 28, 29, 30]),
    images: [
      {
        id: "i9",
        url: `${IMG_PATH}/1194209_SSRT1907CİLTF_10.jpg`,
        alt: "Çocuk Spor Ayakkabı - Gri Ön",
        isPrimary: true,
      },
      {
        id: "i10",
        url: `${IMG_PATH}/1194211_SSRT1907CİLTF_11.jpg`,
        alt: "Çocuk Spor Ayakkabı - Gri Yan",
        isPrimary: false,
      },
    ],
    category: ["PATİK"],
    tags: ["gri", "nefes-alan", "modern"],
    isFeatured: false,
    isNewArrival: false,
    createdAt: "2025-10-15T10:00:00Z",
    updatedAt: "2025-10-15T10:00:00Z",
  },

  // TOMWS1017BOTP Serisi - Bot Modelleri
  {
    id: "6",
    name: "Çocuk Bot - Kahverengi",
    description:
      "Kış ayları için tasarlanmış sıcak tutma özellikli çocuk botu. Su geçirmez dış yüzeyi ve yumuşak iç astarı ile soğuk havalarda bile konfor.",
    price: 749,
    wholesalePrice: 580,
    retailPrice: 749,
    brand: "İbat Outdoor",
    gender: "Erkek",
    colors: [
      { id: "c11", name: "Kahverengi", hexCode: "#92400E" },
      { id: "c12", name: "Siyah", hexCode: "#1F2937" },
    ],
    sizeVariants: createSizeVariants([26, 27, 28, 29, 30]),
    images: [
      {
        id: "i11",
        url: `${IMG_PATH}/1195404_TOMWS1017BOTP_120.jpg`,
        alt: "Çocuk Bot - Kahverengi Ön",
        isPrimary: true,
      },
      {
        id: "i12",
        url: `${IMG_PATH}/1195404_TOMWS1017BOTP_121.jpg`,
        alt: "Çocuk Bot - Kahverengi Yan",
        isPrimary: false,
      },
    ],
    category: ["PATİK"],
    tags: ["bot", "kış", "su-geçirmez"],
    isFeatured: true,
    isNewArrival: true,
    createdAt: "2025-11-01T10:00:00Z",
    updatedAt: "2025-11-01T10:00:00Z",
  },
  {
    id: "7",
    name: "Çocuk Bot - Siyah Klasik",
    description:
      "Şık siyah tasarımıyla hem okul hem de özel günler için ideal. Dayanıklı taban yapısı ve kolay giyim için fermuar detayı.",
    price: 699,
    wholesalePrice: 540,
    retailPrice: 699,
    brand: "İbat Kids",
    gender: "Unisex",
    colors: [{ id: "c13", name: "Siyah", hexCode: "#1F2937" }],
    sizeVariants: createSizeVariants([22, 23, 24, 25]),
    images: [
      {
        id: "i13",
        url: `${IMG_PATH}/1195404_TOMWS1017BOTP_122.jpg`,
        alt: "Çocuk Bot - Siyah Klasik Ön",
        isPrimary: true,
      },
      {
        id: "i14",
        url: `${IMG_PATH}/1195407_TOMWS1017BOTP_117.jpg`,
        alt: "Çocuk Bot - Siyah Klasik Yan",
        isPrimary: false,
      },
    ],
    category: ["BEBE"],
    tags: ["bot", "klasik", "şık"],
    isFeatured: false,
    isNewArrival: false,
    createdAt: "2025-09-20T10:00:00Z",
    updatedAt: "2025-09-20T10:00:00Z",
  },
  {
    id: "8",
    name: "Çocuk Bot - Bordo",
    description:
      "Bordo rengiyle dikkat çeken şık bot modeli. Sıcak tutma özelliği ve kaymaz tabanıyla kış aylarının vazgeçilmezi.",
    price: 779,
    wholesalePrice: 600,
    retailPrice: 779,
    brand: "İbat Premium",
    gender: "Kız",
    colors: [
      { id: "c14", name: "Bordo", hexCode: "#7C2D12" },
      { id: "c15", name: "Pembe", hexCode: "#EC4899" },
    ],
    sizeVariants: createSizeVariants([31, 32, 33, 34, 35]),
    images: [
      {
        id: "i15",
        url: `${IMG_PATH}/1195407_TOMWS1017BOTP_118.jpg`,
        alt: "Çocuk Bot - Bordo Ön",
        isPrimary: true,
      },
      {
        id: "i16",
        url: `${IMG_PATH}/1195407_TOMWS1017BOTP_119.jpg`,
        alt: "Çocuk Bot - Bordo Yan",
        isPrimary: false,
      },
    ],
    category: ["FİLET"],
    tags: ["bot", "bordo", "premium"],
    isFeatured: true,
    isNewArrival: true,
    createdAt: "2025-12-05T10:00:00Z",
    updatedAt: "2025-12-05T10:00:00Z",
  },

  // TOMWS1017BOTF Serisi - Deri Bot Modelleri
  {
    id: "9",
    name: "Deri Çocuk Bot - Taba",
    description:
      "Hakiki deri görünümlü şık tasarım. Rahat kalıbı ve esnek yapısıyla çocukların favorisi.",
    price: 849,
    wholesalePrice: 660,
    retailPrice: 849,
    brand: "İbat Premium",
    gender: "Erkek",
    colors: [
      { id: "c16", name: "Taba", hexCode: "#A16207" },
      { id: "c17", name: "Kahverengi", hexCode: "#92400E" },
    ],
    sizeVariants: createSizeVariants([26, 27, 28, 29, 30]),
    images: [
      {
        id: "i17",
        url: `${IMG_PATH}/1195411_TOMWS1017BOTF_114.jpg`,
        alt: "Deri Çocuk Bot - Taba Ön",
        isPrimary: true,
      },
      {
        id: "i18",
        url: `${IMG_PATH}/1195411_TOMWS1017BOTF_115.jpg`,
        alt: "Deri Çocuk Bot - Taba Yan",
        isPrimary: false,
      },
    ],
    category: ["PATİK"],
    tags: ["deri", "premium", "şık"],
    isFeatured: true,
    isNewArrival: false,
    createdAt: "2025-10-01T10:00:00Z",
    updatedAt: "2025-10-01T10:00:00Z",
  },
  {
    id: "10",
    name: "Deri Çocuk Bot - Koyu Kahve",
    description:
      "Koyu kahve tonuyla zamansız elegans. Özel günler ve resmi etkinlikler için ideal seçim.",
    price: 899,
    wholesalePrice: 700,
    retailPrice: 899,
    brand: "İbat Premium",
    gender: "Unisex",
    colors: [{ id: "c18", name: "Koyu Kahve", hexCode: "#78350F" }],
    sizeVariants: createSizeVariants([31, 32, 33, 34, 35]),
    images: [
      {
        id: "i19",
        url: `${IMG_PATH}/1195411_TOMWS1017BOTF_116.jpg`,
        alt: "Deri Çocuk Bot - Koyu Kahve Ön",
        isPrimary: true,
      },
      {
        id: "i20",
        url: `${IMG_PATH}/1195412_TOMWS1017BOTF_111.jpg`,
        alt: "Deri Çocuk Bot - Koyu Kahve Yan",
        isPrimary: false,
      },
    ],
    category: ["FİLET"],
    tags: ["deri", "özel-gün", "elegans"],
    isFeatured: false,
    isNewArrival: true,
    createdAt: "2025-11-25T10:00:00Z",
    updatedAt: "2025-11-25T10:00:00Z",
  },
  {
    id: "11",
    name: "Deri Çocuk Bot - Açık Kahve",
    description:
      "Açık kahve tonuyla bahar ve sonbahar mevsimlerine uygun. Yumuşak deri dokusu ve rahat kesimi ile gün boyu konfor.",
    price: 829,
    wholesalePrice: 640,
    retailPrice: 829,
    brand: "İbat Premium",
    gender: "Kız",
    colors: [
      { id: "c19", name: "Açık Kahve", hexCode: "#B45309" },
      { id: "c20", name: "Krem", hexCode: "#FEF3C7" },
    ],
    sizeVariants: createSizeVariants([22, 23, 24, 25]),
    images: [
      {
        id: "i21",
        url: `${IMG_PATH}/1195412_TOMWS1017BOTF_112.jpg`,
        alt: "Deri Çocuk Bot - Açık Kahve Ön",
        isPrimary: true,
      },
      {
        id: "i22",
        url: `${IMG_PATH}/1195412_TOMWS1017BOTF_113.jpg`,
        alt: "Deri Çocuk Bot - Açık Kahve Yan",
        isPrimary: false,
      },
    ],
    category: ["BEBE"],
    tags: ["deri", "mevsimlik", "rahat"],
    isFeatured: false,
    isNewArrival: false,
    createdAt: "2025-08-15T10:00:00Z",
    updatedAt: "2025-08-15T10:00:00Z",
  },
  {
    id: "12",
    name: "Deri Çocuk Bot - Vintage",
    description:
      "Vintage tarzıyla öne çıkan özel seri. El işçiliği detayları ve kaliteli malzemesiyle uzun ömürlü kullanım.",
    price: 949,
    wholesalePrice: 740,
    retailPrice: 949,
    brand: "İbat Premium",
    gender: "Unisex",
    colors: [
      { id: "c21", name: "Vintage Kahve", hexCode: "#854D0E" },
      { id: "c22", name: "Antik Siyah", hexCode: "#1C1917" },
    ],
    sizeVariants: createSizeVariants([26, 27, 28, 29, 30]),
    images: [
      {
        id: "i23",
        url: `${IMG_PATH}/1195413_TOMWS1017BOTF_1.jpg`,
        alt: "Deri Çocuk Bot - Vintage Ön",
        isPrimary: true,
      },
      {
        id: "i24",
        url: `${IMG_PATH}/1195413_TOMWS1017BOTF_2.jpg`,
        alt: "Deri Çocuk Bot - Vintage Yan",
        isPrimary: false,
      },
    ],
    category: ["PATİK"],
    tags: ["deri", "vintage", "özel-seri"],
    isFeatured: true,
    isNewArrival: true,
    isOnSale: true,
    discountPercent: 17,
    createdAt: "2025-12-20T10:00:00Z",
    updatedAt: "2025-12-20T10:00:00Z",
  },
].map((product) => ({
  ...product,
  isOnSale: product.isOnSale ?? false,
  discountPercent: product.discountPercent ?? undefined,
})) as Product[];

// Get products by category
export function getProductsByCategory(category: SizeCategory): Product[] {
  return mockProducts.filter((product) => product.category.includes(category));
}

// Get featured products
export function getFeaturedProducts(): Product[] {
  return mockProducts.filter((product) => product.isFeatured);
}

// Get new arrivals
export function getNewArrivals(): Product[] {
  return mockProducts.filter((product) => product.isNewArrival);
}

// Get on sale products
export function getOnSaleProducts(): Product[] {
  return mockProducts.filter((product) => product.isOnSale);
}

// Get product by ID
export function getProductById(id: string): Product | undefined {
  return mockProducts.find((product) => product.id === id);
}
