"use client";
import React, { useState } from "react";
import Image from "next/image";
import { formatedDate, getFromLocalStorage } from "@/src/utils/helpers";
import { useAddToCart } from "../hooks/useCarts.hook";

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  quantity: number;
  createdAt: string;
  imageUrl?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  stock,
  quantity,
  createdAt,
  imageUrl,
}) => {
  const userId = getFromLocalStorage("userId");

  const [productQuantityInCart, setProductQuantityInCart] = useState(quantity);
  const [productStock, setProductStock] = useState(stock);
  const { mutate: addToCart } = useAddToCart(userId);

  const handleProductQuantity = (operation: "Add" | "Remove") => {
    if (operation === "Add") {
      if (productStock <= 0) return;

      setProductQuantityInCart((prev) => prev + 1);
      setProductStock((prev) => prev - 1);
    } else if (operation === "Remove") {
      if (productQuantityInCart <= 0) return;

      setProductQuantityInCart((prev) => prev - 1);
      setProductStock((prev) => prev + 1);
    }

    const payload = {
      productId: id,
      quantity:
        operation === "Add"
          ? productQuantityInCart + 1
          : productQuantityInCart - 1,
    };

    addToCart(payload, {
      onSuccess: (data) => {
        const updatedStock = data?.data?.product?.stock;
        if (typeof updatedStock === "number") {
          setProductStock(updatedStock);
        }
      },
    });
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-xl transition duration-200 ease-out transform hover:scale-105 overflow-hidden">
      {/* Product Image */}
      {imageUrl && (
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col p-4 flex-grow">
        {/* Product Name */}
        <h2 className="text-lg font-semibold text-gray-900">{name}</h2>

        {/* Description */}
        <p className="text-gray-700 text-sm mt-1 line-clamp-2">{description}</p>

        {/* Price and Stock */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-blue-600 font-bold text-md">₹{price}</span>
          <span
            className={`text-sm ${
              productStock === 0 ? "text-red-500" : "text-green-600"
            }`}
          >
            {productStock === 0
              ? productQuantityInCart > 0
                ? "In Stock: 0"
                : "Out of Stock"
              : `In Stock: ${productStock}`}
          </span>
        </div>

        {/* Created At */}
        {createdAt && (
          <span className="text-xs text-gray-500 mt-1">
            {formatedDate(createdAt)}
          </span>
        )}

        {/* Action Buttons */}
        <div className="mt-4">
          {productStock === 0 && productQuantityInCart === 0 ? (
            <button
              disabled
              className="w-full py-2 px-4 bg-gray-400 text-white text-sm rounded-md cursor-not-allowed"
            >
              Out of Stock
            </button>
          ) : productQuantityInCart === 0 ? (
            <button
              onClick={() => handleProductQuantity("Add")}
              className="w-full py-2 px-4 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-all cursor-pointer"
              disabled={productStock === 0}
            >
              Add To Cart
            </button>
          ) : (
            <div className="flex items-center justify-between bg-gray-100 rounded-md p-2">
              <button
                onClick={() => handleProductQuantity("Remove")}
                disabled={productQuantityInCart === 0}
                className={`px-4 py-2 text-white text-sm rounded-md transition-all ${
                  productQuantityInCart === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                }`}
              >
                −
              </button>
              <span className="text-md font-medium text-black">
                {productQuantityInCart}
              </span>
              <button
                onClick={() => handleProductQuantity("Add")}
                disabled={productStock === 0}
                className={`px-4 py-2 text-white text-sm rounded-md transition-all ${
                  productStock === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                }`}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
