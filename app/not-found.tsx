"use client";
import React from "react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-white">404 - Page Not Found</h1>
      <p className="text-gray-300 mt-4">
        The page you are looking for does not exist.
      </p>
      <button
        onClick={() => router.back()}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
