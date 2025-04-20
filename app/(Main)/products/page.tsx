"use client";
import Loader from "@/src/components/Loader";
import { useErrorBoundary } from "react-error-boundary";
import Link from "next/link";
import ProductCard from "@/src/components/ProductCard";
import { useGetAllProducts } from "@/src/hooks/useProducts.hooks";
import { useGetCartDetails } from "@/src/hooks/useCarts.hook";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "@/src/utils/helpers";
import { useEffect } from "react";

const ProductsPage = () => {
  const userId = getFromLocalStorage("userId");

  const { showBoundary } = useErrorBoundary();
  const { data: productsResponse, isLoading, error } = useGetAllProducts();
  const {
    data: cartsResponse,
    isLoading: cartLoading,
    error: cartError,
  } = useGetCartDetails(userId);

  const products = productsResponse?.data?.products || [];
  const cartDetails = cartsResponse?.data?.cartItems || [];

  const totalCartItems =
    cartDetails?.reduce((acc: any, item: any) => acc + item.quantity, 0) || 0;

  if (isLoading || cartLoading) return <Loader />;
  if (error || cartError) showBoundary(error);


  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">All Products</h1>
        <div className="flex gap-4">
          <Link
            href="/cart"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-all"
          >
            Cart - {totalCartItems}
          </Link>
          <Link
            href="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-all"
            onClick={() => {
              removeFromLocalStorage("token");
              removeFromLocalStorage("userId");
            }}
          >
            Logout
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 justify-center">
        {products.length > 0 ? (
          products.map((product: any) => (
            <div
              key={product.id}
              className="w-full sm:w-[48%] lg:w-[30%] xl:w-[23%]"
            >
              <ProductCard
                {...product}
                quantity={
                  cartDetails.find(
                    (item: any) => item.product_id === product.id
                  )?.quantity || 0
                }
              />
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-lg">No Products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
