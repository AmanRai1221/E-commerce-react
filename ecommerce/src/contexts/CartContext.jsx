import React, { createContext, useContext, useMemo, useState } from "react";
import { storage } from "../utils/localStorage";

const STORAGE_KEY = "ecommerce_cart";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => storage.get(STORAGE_KEY, []));

  const save = (next) => {
    setItems(next);
    storage.set(STORAGE_KEY, next);
  };

  const addToCart = async (product) => {
    console.log('Adding product to cart:', product);
    console.log('Current cart items:', items);
    
    // Simplified local-first approach
    try {
      const existing = items.find((i) => i.id === product.id);
      if (existing) {
        console.log('Product exists, updating quantity');
        const updated = items.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
        save(updated);
        console.log('Updated cart:', updated);
      } else {
        console.log('New product, adding to cart');
        const newCart = [...items, { ...product, qty: 1 }];
        save(newCart);
        console.log('New cart:', newCart);
      }
      
      // Optional: Try to sync with backend if needed
      // This can be implemented later without breaking local functionality
    } catch (e) {
      console.error('Error adding to cart:', e);
    }
  };

  const removeFromCart = async (id) => {
    const { API } = await import("../utils/api");
    // Try backend remove by treating id as backend itemId when possible
    try {
      await API.removeCartItem(id);
      // Reflect locally
      save(items.filter((i) => i.id !== id));
    } catch (e) {
      // Fallback local only
      save(items.filter((i) => i.id !== id));
    }
  };

  const updateQty = async (id, qty) => {
    if (qty <= 0) return removeFromCart(id);
    const { API } = await import("../utils/api");
    try {
      await API.updateCartItem(id, qty);
      const updated = items.map((i) => (i.id === id ? { ...i, qty } : i));
      save(updated);
    } catch (e) {
      const updated = items.map((i) => (i.id === id ? { ...i, qty } : i));
      save(updated);
    }
  };

  const clearCart = async () => {
    // No backend endpoint to clear all; replace with empty cart
    const { API } = await import("../utils/api");
    try {
      await API.replaceCart([]);
    } catch {}
    save([]);
  };

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const value = useMemo(
    () => ({ items, addToCart, removeFromCart, updateQty, clearCart, total }),
    [items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};
