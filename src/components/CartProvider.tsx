"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CONTENT_ONE_LIST } from "./utils/Helper"; // Import CONTENT_ONE_LIST for validation

// Define CartItem type
export interface CartItem {
  tittle: string;
  description: string;
  count: number;
  source: string; // Add the source property here
}

// Create Context
interface CartContextType {
  cart: CartItem[];
  totalItems: number;
  addToCart: (item: CartItem) => void;
  updateCartItem: (tittle: string, count: number) => void;
  clearCart: () => void; // Add clearCart function
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const totalItems = cart.reduce((total, item) => total + item.count, 0);

  // Function to clear the cart
  const clearCart = () => {
    setCart([]); // Directly clear the cart
  };

  // Function to add a new item to the cart
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.tittle === item.tittle);
      const isContentOne = CONTENT_ONE_LIST.some((content) => content.tittle === item.tittle);
      const totalItems = prev.reduce((total, cartItem) => total + cartItem.count, 0);

      if (totalItems >= 6 && !existingItem) return prev; 

      if (existingItem) {
        const newCount = existingItem.count + item.count;
        if (isContentOne && newCount > 2) return prev; // Restrict CONTENT_ONE_LIST items to 2
        if (totalItems + item.count - existingItem.count > 6) return prev; // Prevent exceeding total count
        return prev.map((cartItem) =>
          cartItem.tittle === item.tittle
            ? { ...cartItem, count: newCount }
            : cartItem
        );
      }

      if (isContentOne && item.count > 2) return prev; // Restrict new CONTENT_ONE_LIST items to 2
      if (totalItems + item.count > 6) return prev; // Prevent exceeding total count

      return [...prev, item];
    });
  };

  // Function to update the count of an existing item
  const updateCartItem = (tittle: string, count: number) => {
    setCart((prev) =>
      prev
        .map((cartItem) =>
          cartItem.tittle === tittle ? { ...cartItem, count } : cartItem
        )
        .filter((cartItem) => cartItem.count > 0)
    );
  };

  return (
    <CartContext.Provider value={{ cart, totalItems, addToCart, updateCartItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
