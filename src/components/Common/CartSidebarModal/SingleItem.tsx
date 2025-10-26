"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { removeItemFromCart } from "@/redux/features/cart-slice";

interface SingleItemProps {
  item: {
    id: number;
    title: string;
    price_in_box: number;
    price_in_package: number;
    quantity_of_packages: number;
    quantity_of_boxs: number;
    quantity_per_package: number;
    quantity_per_box: number;
    imags?: {
      thumbnails: string[];
      previews: string[];
    };
  };
}

const SingleItem: React.FC<SingleItemProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveFromCart = () => {
    dispatch(removeItemFromCart(item.id));
  };

  const totalBoxPrice = item.quantity_of_boxs * (item.price_in_box * item.quantity_per_box);
  const totalPackagePrice = item.quantity_of_packages * (item.price_in_package * item.quantity_per_package);
  const totalItemPrice = totalBoxPrice + totalPackagePrice;

  return (
    <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded-xl bg-gray-50">
      {/* -------- الصورة والعنوان -------- */}
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center rounded-[10px] bg-white w-[80px] h-[80px] overflow-hidden border border-gray-200">
          <Image
            src={item.imags?.thumbnails?.[0] || "/images/placeholder.png"}
            alt={item.title || "product"}
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-dark mb-1">{item.title}</h3>
          <p className="text-sm text-gray-500">ID: {item.id}</p>
        </div>

        <button
          onClick={handleRemoveFromCart}
          aria-label="Remove item from cart"
          className="flex items-center justify-center rounded-lg w-9 h-9 bg-gray-200 text-gray-700 hover:bg-red-100 hover:text-red-600 transition"
        >
          <svg
            className="fill-current"
            width="20"
            height="20"
            viewBox="0 0 22 22"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.45 2.06h3.1c.2 0 .38 0 .54.03.65.1 1.2.5 1.5 1.08.08.15.13.31.19.5l.1.31c.16.44.57.74 1.05.76h2.75c.38 0 .69.31.69.69s-.31.69-.69.69H3.21a.69.69 0 0 1 0-1.38h2.75c.48-.02.89-.32 1.05-.76l.1-.31c.06-.18.11-.34.19-.5.3-.58.86-.98 1.51-1.08.16-.03.34-.03.54-.03Zm3.06 16.5c-1.24.16-3.98.16-5.22 0-.63-.08-1.1-.25-1.41-.55-.31-.3-.48-.66-.58-1.21-.1-.56-.15-1.4-.24-2.7L4.47 7.84a.69.69 0 0 1 1.38-.08l.42 6.33c.08 1.23.13 2.1.24 2.7.11.61.28.93.56 1.17.28.23.63.36 1.23.44 1.18.15 3.7.15 4.88 0 .6-.08.95-.21 1.23-.44.28-.24.45-.56.56-1.17.11-.6.16-1.47.24-2.7l.42-6.33a.69.69 0 1 1 1.38.08l-.42 6.33c-.09 1.3-.14 2.14-.24 2.7-.1.55-.27.91-.58 1.21-.31.3-.78.47-1.41.55Z"
            />
          </svg>
        </button>
      </div>

      {/* -------- تفاصيل السعر -------- */}
      <div className="ml-[6px] space-y-1 text-sm text-gray-700">
        {item.quantity_of_packages > 0 && (
          <p>
            <span className="font-medium text-blue-700">By Package:</span>{" "}
            {item.quantity_of_packages} × ${Number(item.price_in_package.toFixed(2))*item.quantity_per_package}{" "}
            ={" "}
            <span className="font-semibold">
              ${totalPackagePrice.toFixed(2)}
            </span>
          </p>
        )}

        {item.quantity_of_boxs > 0 && (
          <p>
            <span className="font-medium text-purple-700">By Box:</span>{" "}
            {item.quantity_of_boxs} × ${Number(item.price_in_box.toFixed(2))*item.quantity_of_boxs} ={" "}
            <span className="font-semibold">${totalBoxPrice.toFixed(2)}</span>
          </p>
        )}

        <hr className="my-2 border-gray-300" />

        <p className="font-semibold text-dark">
          Subtotal: ${totalItemPrice.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default SingleItem;
