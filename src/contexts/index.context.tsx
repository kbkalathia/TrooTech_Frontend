"use client";
import React from "react";
import { CartProvider } from "./cart.context";

interface ProvidersProps {
  children: React.ReactNode;
}

// Wrap Children with Providers
const ContextProviders = ({ children }: ProvidersProps) => {
  return (
    <>
      <CartProvider>{children}</CartProvider>
    </>
  );
};

export default ContextProviders;
