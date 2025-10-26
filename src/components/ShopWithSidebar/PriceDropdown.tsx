"use client";

import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

interface PriceDropdownProps {
  onPriceChange?: (range: { from: number; to: number }) => void; // ✅ خليها اختيارية عشان تتفادى الخطأ
}

const PriceDropdown = ({ onPriceChange }: PriceDropdownProps) => {
  const [toggleDropdown, setToggleDropdown] = useState(true);

  const [selectedPrice, setSelectedPrice] = useState({
    from: 0,
    to: 1000,
  });

  const handlePriceChange = (e: number[]) => {
    const newRange = {
      from: Math.floor(e[0]),
      to: Math.ceil(e[1]),
    };
    setSelectedPrice(newRange);

    if (onPriceChange) {
      onPriceChange(newRange); // ✅ يبعت القيم للـ parent لو موجود
    }
  };

  return (
    <div className="bg-white dark:bg-[#000000] shadow-1 rounded-lg">
      <div
        onClick={() => setToggleDropdown(!toggleDropdown)}
        className="cursor-pointer flex items-center justify-between py-3 pl-6 pr-5.5"
      >
        <p className="text-dark dark:text-[#ff00ff] dark-red:text-[#8b1a1a] ">Price</p>
        <button
          id="price-dropdown-btn"
          aria-label="toggle price dropdown"
          className={`text-dark dark:text-[#ff00ff] dark-red:text-[#8b1a1a] ease-out duration-200 ${
            toggleDropdown && "rotate-180"
          }`}
        >
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.43 8.51C4.7 8.2 5.17 8.16 5.49 8.43L12 14.01L18.51 8.43C18.83 8.16 19.3 8.2 19.57 8.51C19.84 8.83 19.8 9.3 19.49 9.57L12.49 15.57C12.21 15.81 11.79 15.81 11.51 15.57L4.51 9.57C4.2 9.3 4.16 8.83 4.43 8.51Z"
            />
          </svg>
        </button>
      </div>

      <div className={`p-6 ${toggleDropdown ? "block" : "hidden"}`}>
        <div className="price-range">
          <RangeSlider
            min={0}
            max={1000}
            step={10}
            defaultValue={[selectedPrice.from, selectedPrice.to]}
            onInput={handlePriceChange}
            className="price-slider"
          />

          <div className="price-amount flex items-center  justify-between pt-4">
            <div className="text-custom-xs text-dark-4 dark:text-[#ff00ff] dark-red:text-[#8b1a1a] flex rounded border border-gray-3/80">
              <span className="block border-r border-gray-3/80 px-2.5 py-1.5">L.E</span>
              <span className="block px-3 py-1.5">{selectedPrice.from}</span>
            </div>

            <div className="text-custom-xs text-dark-4 dark:text-[#ff00ff] dark-red:text-[#8b1a1a] flex rounded border border-gray-3/80">
              <span className="block border-r border-gray-3/80 px-2.5 py-1.5">L.E</span>
              <span className="block px-3 py-1.5">{selectedPrice.to}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceDropdown;
