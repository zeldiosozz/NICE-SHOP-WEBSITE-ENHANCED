"use client";
import React, { useState } from "react";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import Image from "next/image";

const SingleListItem = ({ item }: { item: Product }) => {
  const { openModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();

  // كمية الدستات والعلب
  const [quantityPackages, setQuantityPackages] = useState(1);
  const [quantityBoxes, setQuantityBoxes] = useState(0);

  const handleQuickViewUpdate = () => {
    dispatch(updateQuickView({ ...item }));
  };

  const handleAddToCart = (type: "package" | "box") => {
    dispatch(
      addItemToCart({
        id: item.id,
        title: item.title,
        price_in_package: item.price_in_package,
        price_in_box: item.price_in_box,
        quantity_of_packages: type === "package" ? quantityPackages : 0,
        quantity_of_boxs: type === "box" ? quantityBoxes : 0,
        quantity_per_package:item.quantity_per_package,
        quantity_per_box:item.quantity_per_box,
        imags: {
          thumbnails: [item.imags.previews[0]],
          previews: [item.imags.previews[0]],
        },
      })
    );
  };

  const handleAddToWishlist = () => {
    dispatch(
      addItemToWishlist({
        id: item.id,
        title: item.title,
        price_in_package: item.price_in_package,
        price_in_box: item.price_in_box,
        quantity_of_packages: quantityPackages,
        quantity_of_boxs: quantityBoxes,
        quantity_per_package:item.quantity_per_package,
        quantity_per_box:item.quantity_per_box,

        imags: {
          thumbnails: [item.imags.previews[0]],
          previews: [item.imags.previews[0]],
        },
      })
    );
  };

  return (
    <div className="group rounded-lg bg-white dark:bg-[#000000] shadow-1 flex flex-col sm:flex-row gap-4 p-4">
      <div className="relative max-w-[270px] w-full flex items-center justify-center">
        <Image src={item.imags.previews[0]} alt={item.title} width={250} height={250} />

        <button
          onClick={() => {
            openModal();
            handleQuickViewUpdate();
          }}
          aria-label="Quick view"
          className="absolute left-2 top-2 w-9 h-9 rounded-[5px] bg-white shadow hover:text-blue flex items-center justify-center"
        >
          🔍
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <h3 className="font-medium text-dark hover:text-blue mb-2">
          <Link href="/shop-details">{item.title}</Link>
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-dark">${item.price_in_package}</span>
          <span className="text-dark-4 line-through">${item.price_in_box}</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={() => handleAddToCart("package")}
            className="bg-blue text-white px-4 py-2 rounded hover:bg-blue-dark"
          >
            Add Package
          </button>
          <button
            onClick={() => handleAddToCart("box")}
            className="bg-blue text-white px-4 py-2 rounded hover:bg-blue-dark"
          >
            Add Box
          </button>
          <button
            onClick={() => handleAddToWishlist()}
            className="bg-white border px-3 py-2 rounded shadow hover:text-blue"
          >
            ❤️ Wishlist
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label>
            Packages:
            <input
              type="number"
              value={quantityPackages}
              min={1}
              onChange={(e) => setQuantityPackages(Number(e.target.value))}
              className="ml-2 w-16 border rounded px-1"
            />
          </label>
          <label>
            Boxes:
            <input
              type="number"
              value={quantityBoxes}
              min={0}
              onChange={(e) => setQuantityBoxes(Number(e.target.value))}
              className="ml-2 w-16 border rounded px-1"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default SingleListItem;
