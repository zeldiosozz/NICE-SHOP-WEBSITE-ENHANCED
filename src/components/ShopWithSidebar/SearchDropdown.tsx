"use client";
import React from "react";

interface SearchDropdownProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // يمنع أي رموز غير الحروف أو الأرقام أو المسافات
    const value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
    setSearchQuery(value);
  };

  return (
    <div className="bg-white shadow-1 rounded-lg py-4 px-5">
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search products..."
        className="w-full border border-gray-3 rounded px-3 py-2 focus:outline-none focus:border-blue"
      />
    </div>
  );
};

export default SearchDropdown;
