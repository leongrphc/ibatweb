"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  Product,
  SizeCategory,
  Gender,
  ShoeSize,
  ColorOption,
  SizeVariant,
  ProductImage,
} from "@/types";
import { mockProducts as initialProducts } from "@/lib/mockData";

interface ProductContextType {
  products: Product[];
  addProduct: (
    product: Omit<Product, "id" | "createdAt" | "updatedAt">,
  ) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  loading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const STORAGE_KEY = "ibat_products";
const STORAGE_VERSION_KEY = "ibat_products_version";
const CURRENT_VERSION = "5"; // Increment this to force refresh of mock data

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Load products from localStorage on mount
  useEffect(() => {
    const loadProducts = () => {
      try {
        const storedVersion = localStorage.getItem(STORAGE_VERSION_KEY);
        const stored = localStorage.getItem(STORAGE_KEY);

        // If version doesn't match or no stored data, use fresh mock data
        if (storedVersion !== CURRENT_VERSION || !stored) {
          setProducts(initialProducts);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
          localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
        } else {
          const parsed = JSON.parse(stored);
          setProducts(parsed);
        }
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts(initialProducts);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
        localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
      }
      setLoading(false);
    };

    loadProducts();
  }, []);

  // Save to localStorage whenever products change
  useEffect(() => {
    if (!loading && products.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  }, [products, loading]);

  const addProduct = (
    productData: Omit<Product, "id" | "createdAt" | "updatedAt">,
  ) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, ...updates, updatedAt: new Date().toISOString() }
          : product,
      ),
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const getProductById = (id: string) => {
    return products.find((product) => product.id === id);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}

// Helper function to generate size variants
export function generateSizeVariants(sizes: ShoeSize[]): SizeVariant[] {
  return sizes.map((size) => ({
    size,
    sizeCategory: getSizeCategory(size),
    stock: 0,
    sku: `IBT-${size}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
  }));
}

function getSizeCategory(size: ShoeSize): SizeCategory {
  if (size >= 22 && size <= 25) return "BEBE";
  if (size >= 26 && size <= 30) return "PATİK";
  return "FİLET";
}

// Default product template
export const defaultProduct: Omit<Product, "id" | "createdAt" | "updatedAt"> = {
  name: "",
  description: "",
  price: 0,
  wholesalePrice: 0,
  retailPrice: 0,
  brand: "İbat Kids",
  gender: "Unisex",
  colors: [],
  sizeVariants: [],
  images: [],
  category: [],
  tags: [],
  isFeatured: false,
  isNewArrival: true,
  isOnSale: false,
};
