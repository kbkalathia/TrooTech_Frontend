import React, { useEffect, useState } from "react";

const SearchBox = ({
  handleSearch,
}: {
  handleSearch: (value: string) => void;
}) => {
  const [query, setQuery] = useState("");

  // For Debouncing Purpose
  useEffect(() => {
    const handler = setTimeout(() => {
      handleSearch(query);
    }, 500);

    return () => clearTimeout(handler);
  }, [query, handleSearch]);
  return (
    <>
      <div className="w-full max-w-md flex">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white"
        />
      </div>
      {query && (
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 block cursor-pointer"
          onClick={() => setQuery("")}
        >
          Clear
        </button>
      )}
    </>
  );
};

export default SearchBox;
