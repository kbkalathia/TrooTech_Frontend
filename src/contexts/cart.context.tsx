"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface CartContextType {
  totalQuantityInCart: number;
  setTotalQuantityInCart: React.Dispatch<React.SetStateAction<number>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [totalQuantityInCart, setTotalQuantityInCart] = useState(0);

  return (
    <CartContext.Provider
      value={{ totalQuantityInCart, setTotalQuantityInCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
