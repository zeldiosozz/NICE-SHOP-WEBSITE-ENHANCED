"use client";

import { useState, useEffect } from "react";

interface Product {
  id: number;
  title: string;
  category: string | null;
}

interface CategoryItemProps {
  name: string;
  count: number;
  isSelected: boolean;
  onSelect: (name: string) => void;
}

interface CategoryDropdownProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const CategoryItem = ({ name, count, isSelected, onSelect }: CategoryItemProps) => {
  return (
    <button
      className={`${
        isSelected ? "text-blue dark:text-[#ff00ff] dark-red:text-[#8b1a1a]" : ""
      } group flex items-center justify-between ease-out duration-200 hover:text-blue dark:hover:text-[#ff00ff] dark-red:hover:text-[#8b1a1a]`}
      onClick={() => onSelect(name)}
    >
      <div className="flex items-center gap-2">
        <div
          className={`cursor-pointer flex items-center justify-center rounded w-4 h-4 border ${
            isSelected ? "border-blue dark:border-[#ff00ff] dark-red:border-[#8b1a1a] bg-blue dark:bg-[#ff00ff] dark-red:bg-[#8b1a1a]" : "bg-white dark:bg-[#000000] border-gray-3 dark:border-[#ff00ff] dark-red:border-[#8b1a1a]"
          }`}
        >
          <svg
            className={isSelected ? "block" : "hidden"}
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.33317 2.5L3.74984 7.08333L1.6665 5"
              stroke="white"
              strokeWidth="1.94437"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span>{name}</span>
      </div>

      <span
        className={`${
          isSelected ? "text-white bg-blue dark:bg-[#ff00ff] dark-red:bg-[#8b1a1a]" : "bg-gray-2 dark:bg-[#ff00ff] dark-red:bg-[#8b1a1a]"
        } inline-flex rounded-[30px] text-custom-xs px-2 ease-out duration-200 group-hover:text-white group-hover:bg-blue dark:group-hover:bg-[#ffffff] dark:group-hover:text-[#ff00ff] dark-red:group-hover:text-[#8b1a1a]`}
      >
        {count}
      </span>
    </button>
  );
};

const CategoryDropdown = ({ selectedCategory, onCategorySelect }: CategoryDropdownProps) => {
  const [toggleDropdown, setToggleDropdown] = useState(true);
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");

        const data: Product[] = await res.json();

        const categoryMap = new Map<string, number>();
        data.forEach((p) => {
          if (p.category) {
            categoryMap.set(p.category, (categoryMap.get(p.category) || 0) + 1);
          }
        });

        const formatted = Array.from(categoryMap, ([name, count]) => ({
          name,
          count,
        }));

        setCategories([{ name: "All", count: data.length }, ...formatted]);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-white dark:bg-[#000000] shadow-1 rounded-lg">
      <div
        onClick={() => setToggleDropdown(!toggleDropdown)}
        className={`cursor-pointer flex items-center justify-between py-3 pl-6 pr-5.5 ${
          toggleDropdown ? "shadow-filter" : ""
        }`}
      >
        <p className="text-dark dark:text-[#ff00ff] dark-red:text-[#8b1a1a]">Category</p>
        <button
          aria-label="toggle category dropdown"
          className={`text-dark dark:text-[#ff00ff] dark-red:text-[#8b1a1a] ease-out duration-200 ${
            toggleDropdown ? "rotate-180" : ""
          }`}
        >
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.43 8.51C4.7 8.2 5.17 8.16 5.49 8.43L12 14.01L18.51 8.43C18.83 8.16 19.3 8.2 19.57 8.51C19.84 8.83 19.8 9.3 19.49 9.57L12.49 15.57C12.21 15.81 11.79 15.81 11.51 15.57L4.51 9.57C4.2 9.3 4.16 8.83 4.43 8.51Z"
            />
          </svg>
        </button>
      </div>

      <div
        className={`flex-col gap-3 py-6 pl-6 pr-5.5 ${
          toggleDropdown ? "flex" : "hidden"
        }`}
      >
        {loading ? (
          <p className="text-gray-400 dark:text-[#ff00ff] dark-red:text-[#8b1a1a] text-sm">Loading categories...</p>
        ) : categories.length > 0 ? (
          categories.map((category, key) => (
            <CategoryItem
              key={key}
              name={category.name}
              count={category.count}
              isSelected={selectedCategory === category.name}
              onSelect={onCategorySelect}
            />
          ))
        ) : (
          <p className="text-gray-400 dark:text-[#ff00ff] dark-red:text-[#8b1a1a] text-sm">No categories found</p>
        )}
      </div>
    </div>
  );
};

export default CategoryDropdown;
