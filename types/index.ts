// Size Category Types based on İbat Ayakkabı's sizing system
export type SizeCategory = "BEBE" | "PATİK" | "FİLET";

// Individual shoe sizes
export type ShoeSize =
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35;

// Helper function to determine category from size
export function getSizeCategory(size: ShoeSize): SizeCategory {
  if (size >= 22 && size <= 25) return "BEBE";
  if (size >= 26 && size <= 30) return "PATİK";
  return "FİLET"; // 31-35
}

// Gender options
export type Gender = "Erkek" | "Kız" | "Unisex";

// Product color option
export interface ColorOption {
  id: string;
  name: string;
  hexCode: string;
}

// Size variant with stock information
export interface SizeVariant {
  size: ShoeSize;
  sizeCategory: SizeCategory;
  stock: number;
  sku: string;
}

// Product image
export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

// Main Product interface - Supabase ready
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  wholesalePrice?: number; // B2B price
  retailPrice: number; // B2C price
  discountPercent?: number; // Discount percentage (0-100)
  isOnSale: boolean; // Whether product is on sale
  brand?: string;
  gender: Gender;
  colors: ColorOption[];
  sizeVariants: SizeVariant[];
  images: ProductImage[];
  category: SizeCategory[];
  tags?: string[];
  isFeatured: boolean;
  isNewArrival: boolean;
  createdAt: string;
  updatedAt: string;
}

// Category for navigation and filtering
export interface Category {
  id: string;
  name: SizeCategory;
  displayName: string;
  description: string;
  imageUrl: string;
  sizeRange: string;
}

// Cart item
export interface CartItem {
  id: string;
  product: Product;
  selectedSize: ShoeSize;
  selectedColor: ColorOption;
  quantity: number;
}

// Cart state
export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Filter options for shop page
export interface FilterOptions {
  categories: SizeCategory[];
  sizes: ShoeSize[];
  colors: string[];
  gender: Gender[];
  priceRange: {
    min: number;
    max: number;
  };
}

// Admin user interface (for future implementation)
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "manager";
  createdAt: string;
}
