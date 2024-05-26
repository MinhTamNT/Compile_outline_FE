import React from "react";

const SearchBar = () => {
  return (
    <div className="hidden md:block">
      <input
        type="text"
        placeholder="Tìm kiếm..."
        className="px-4 py-2 rounded w-[350px]  bg-white text-black"
      />
    </div>
  );
};

export default SearchBar;
