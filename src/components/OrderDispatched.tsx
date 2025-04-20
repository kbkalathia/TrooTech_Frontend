import React from "react";
import Link from "next/link";

const OrderDispatchedPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="text-green-500 mb-4">
          <svg
            className="mx-auto h-16 w-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 21l6 6L39 9"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Order Dispatched!
        </h1>
        <p className="text-gray-600 mb-6">Your order has been dispatched</p>
        <Link
          href="/products"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors mb-4 cursor-pointer"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderDispatchedPage;
