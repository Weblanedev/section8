"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { CartItem, Product } from "@/types";
import toast from "react-hot-toast";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const toastIdRef = useRef<string | null>(null);
  const lastActionRef = useRef<{
    type: string;
    id: string;
    timestamp: number;
  } | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (
    product: Product & { selectedColor?: string; selectedSize?: string }
  ) => {
    try {
      const now = Date.now();
      const cartItem = product as CartItem;
      const itemKey = `${product.id}-${
        cartItem.selectedColor || product.color
      }-${cartItem.selectedSize || product.spec}`;
      const actionKey = `add-${itemKey}`;

      // Prevent duplicate calls within 500ms (StrictMode double-invocation)
      if (
        lastActionRef.current &&
        lastActionRef.current.type === actionKey &&
        now - lastActionRef.current.timestamp < 500
      ) {
        return;
      }

      lastActionRef.current = {
        type: actionKey,
        id: product.id,
        timestamp: now,
      };

      // Dismiss any existing toast to prevent duplicates
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
      }

      setCart((prevCart) => {
        // Check if product with same ID already exists (regardless of color/size)
        const existingItem = prevCart.find((item) => item.id === product.id);

        if (existingItem) {
          const id = toast.success(`${product.name} quantity updated!`, {
            icon: "🛒",
            id: `toast-${actionKey}`,
          });
          toastIdRef.current = id;
          return prevCart.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  // Update selected color/size if provided
                  selectedColor: cartItem.selectedColor || product.color,
                  selectedSize: cartItem.selectedSize || product.spec,
                }
              : item
          );
        }

        const id = toast.success(`${product.name} added to cart!`, {
          icon: "✅",
          id: `toast-${actionKey}`,
        });
        toastIdRef.current = id;
        return [
          ...prevCart,
          {
            ...product,
            quantity: 1,
            selectedColor: cartItem.selectedColor || product.color,
            selectedSize: cartItem.selectedSize || product.spec,
          },
        ];
      });
    } catch (error) {
      toast.error("Failed to add item to cart. Please try again.");
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = (productId: string) => {
    try {
      const now = Date.now();
      const actionKey = `remove-${productId}`;

      // Prevent duplicate calls within 500ms (StrictMode double-invocation)
      if (
        lastActionRef.current &&
        lastActionRef.current.type === actionKey &&
        now - lastActionRef.current.timestamp < 500
      ) {
        return;
      }

      lastActionRef.current = {
        type: actionKey,
        id: productId,
        timestamp: now,
      };

      // Dismiss any existing toast to prevent duplicates
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
      }

      setCart((prevCart) => {
        const itemToRemove = prevCart.find((item) => item.id === productId);
        if (itemToRemove) {
          const id = toast.success(`${itemToRemove.name} removed from cart`, {
            icon: "🗑️",
            id: `toast-${actionKey}`,
          });
          toastIdRef.current = id;
        }
        return prevCart.filter((item) => item.id !== productId);
      });
    } catch (error) {
      toast.error("Failed to remove item from cart. Please try again.");
      console.error("Error removing from cart:", error);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      toast.error("Failed to update quantity. Please try again.");
      console.error("Error updating quantity:", error);
    }
  };

  const clearCart = () => {
    try {
      const now = Date.now();
      const actionKey = "clear-cart";

      // Prevent duplicate calls within 500ms (StrictMode double-invocation)
      if (
        lastActionRef.current &&
        lastActionRef.current.type === actionKey &&
        now - lastActionRef.current.timestamp < 500
      ) {
        return;
      }

      lastActionRef.current = { type: actionKey, id: "cart", timestamp: now };

      // Dismiss any existing toast to prevent duplicates
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
      }

      setCart([]);
      localStorage.removeItem("cart");
      const id = toast.success("Cart cleared successfully!", {
        id: `toast-${actionKey}`,
      });
      toastIdRef.current = id;
    } catch (error) {
      toast.error("Failed to clear cart. Please try again.");
      console.error("Error clearing cart:", error);
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
