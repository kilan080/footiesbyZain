'use client';

import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  isCartOpen: boolean;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id); // ← remove the ()

      if (existing) {
        // check if adding more would exceed stock
        if (item.stock !== undefined && existing.quantity >= item.stock) {
          toast.error(`Only ${item.stock} item${item.stock === 1 ? "" : "s"} available in stock!`);
          return prev;
        }
        // increase quantity
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      // new item — add to cart
      return [...prev, { ...item, quantity: 1 }];
    });
  };
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const decreaseQuantity = (id: string) => {
    setCart(prev =>
      prev
      .map(i => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
      .filter(i => i.quantity > 0)
    );
};

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, decreaseQuantity, removeFromCart, clearCart, cartCount, isCartOpen, toggleCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
