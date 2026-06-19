import { useState, useEffect } from "react";
import { DEFAULT_PRODUCTS } from "../config";

const STORAGE_KEY = "affiliate_store_products";

/**
 * useProducts — manages products with localStorage persistence.
 * Products saved in Admin panel survive page refresh and browser restarts.
 */
export function useProducts() {
  const [products, setProductsState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Could not load saved products:", e);
    }
    return DEFAULT_PRODUCTS;
  });

  // Auto-save to localStorage whenever products change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.warn("Could not save products:", e);
    }
  }, [products]);

  const setProducts = (updater) => {
    setProductsState(updater);
  };

  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now() };
    setProductsState((prev) => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (id, updates) => {
    setProductsState((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id) => {
    setProductsState((prev) => prev.filter((p) => p.id !== id));
  };

  const resetToDefaults = () => {
    if (window.confirm("Reset all products to defaults? This cannot be undone.")) {
      localStorage.removeItem(STORAGE_KEY);
      setProductsState(DEFAULT_PRODUCTS);
    }
  };

  return { products, setProducts, addProduct, updateProduct, deleteProduct, resetToDefaults };
}
