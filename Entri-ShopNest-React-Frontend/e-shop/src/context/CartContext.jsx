import { useEffect, useMemo, useState } from "react";
import { CartContext } from "./cartContextValue";
const storageKey = "shopnest-cart";

function readCart() {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      return existing
        ? current.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [...current, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setItems((current) => current.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setItems((current) =>
      current.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => setItems([]);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      tax: subtotal * 0.08,
      total: subtotal * 1.08,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [items, itemCount, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
