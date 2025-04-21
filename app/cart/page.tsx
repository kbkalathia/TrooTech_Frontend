"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useErrorBoundary } from "react-error-boundary";
import {
  useAddToCart,
  useDeleteCart,
  useGetCartDetails,
} from "@/src/hooks/useCarts.hook";
import Loader from "@/src/components/Loader";
import OrderDispatchedPage from "@/src/components/OrderDispatched";
import { getFromLocalStorage } from "@/src/utils/helpers";

const CartPage = () => {
  const userId = getFromLocalStorage("userId");

  const { showBoundary } = useErrorBoundary();
  const { data: cartsResponse, isLoading, error } = useGetCartDetails(userId);
  const { mutate: addToCart } = useAddToCart(userId);
  const { mutate: deleteCart } = useDeleteCart();

  const [isOrderDispatched, setIsOrderDispatched] = useState(false);

  const cartItems = cartsResponse?.data?.cartItems || [];
  const cartId = cartItems[0]?.cart_id;

  const total = cartItems.reduce(
    (acc: any, item: any) => acc + item.productDetails.price * item.quantity,
    0
  );

  if (isLoading) return <Loader />;
  if (error) showBoundary(error);

  const handleProductQuantity = (productId: number, quantity: number) => {
    const payload = {
      productId,
      quantity,
    };
    addToCart(payload);
  };

  const handleCheckout = () => {
    deleteCart(cartId);
    setIsOrderDispatched(true);
  };

  if (isOrderDispatched) {
    return <OrderDispatchedPage />;
  }

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>Your cart is currently empty.</p>
          <Link href="/products">
            <span className="text-blue-600 hover:underline">
              Browse Products
            </span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item: any) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row bg-white rounded-lg shadow-md p-4"
              >
                <div className="md:ml-4 mt-4 md:mt-0 flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.productDetails.name}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {item.productDetails.description}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Price: ₹{item.productDetails.price.toLocaleString()}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Quantity: {item.quantity}
                  </p>
                  <p
                    className={`text-sm ${
                      item.productDetails.stock > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.productDetails.stock > 0
                      ? `In Stock: ${item.productDetails.stock}`
                      : "Out of Stock"}
                  </p>
                  <div className="mt-2 flex space-x-2">
                    <button
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer w-[50px]"
                      onClick={() =>
                        handleProductQuantity(
                          item.product_id,
                          item.quantity - 1
                        )
                      }
                    >
                      -
                    </button>
                    <button
                      className={`px-3 py-1 bg-blue-600 text-white rounded w-[50px] ${
                        item.productDetails.stock === 0 && item.quantity == 0
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 cursor-pointer hover:bg-blue-700"
                      }`}
                      disabled={
                        item.productDetails.stock === 0 && item.quantity == 0
                      }
                      onClick={() =>
                        handleProductQuantity(
                          item.product_id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>

                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                      onClick={() => handleProductQuantity(item.product_id, 0)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Order Summary
            </h2>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Subtotal</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Shipping</span>
              <span>₹0</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-gray-900 font-bold text-lg">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <button
              className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 cursor-pointer"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
