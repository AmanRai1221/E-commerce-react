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
    const { API } = await import("../utils/api");
    // If not authenticated, keep a guest cart locally
    if (!API.token) {
      const existing = items.find((i) => i.id === product.id);
      if (existing) {
        const updated = items.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
        save(updated);
      } else {
        save([...items, { ...product, qty: 1 }]);
      }
      return;
    }
    const itemId = await API.resolveItemIdByProduct(product);
    if (!itemId) {
      // Fallback to local behavior if not resolvable
      const existing = items.find((i) => i.id === product.id);
      if (existing) {
        const updated = items.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
        save(updated);
      } else {
        save([...items, { ...product, qty: 1 }]);
      }
      return;
    }
    try {
      const res = await API.addToCart(itemId, 1);
      // Mirror backend cart locally by mapping to display shape using product info if available
      // We only store minimal: use product image/name if matches
      const backendItems = res.items || [];
      const mapped = backendItems.map((c) => {
        // Always use backend itemId for id to keep API ops working
        if (product && itemId === c.itemId) {
          return {
            id: c.itemId,
            name: product.name || "",
            price: product.price || 0,
            image: product.image || "",
            qty: c.qty,
          };
        }
        const found = items.find(
          (i) => i.id === c.itemId || i.id === product.id
        );
        return found
          ? { ...found, id: c.itemId, qty: c.qty }
          : { id: c.itemId, name: "Item", price: 0, image: "", qty: c.qty };
      });
      save(mapped);
    } catch (e) {
      // Fallback to local-only cart if backend errors
      const existing = items.find((i) => i.id === product.id);
      if (existing) {
        const updated = items.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
        save(updated);
      } else {
        save([...items, { ...product, qty: 1 }]);
      }
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
