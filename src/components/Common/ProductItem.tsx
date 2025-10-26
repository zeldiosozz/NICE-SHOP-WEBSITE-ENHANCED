"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { addItemToCart } from "@/redux/features/cart-slice";
import { updateproductDetails } from "@/redux/features/product-details";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

const ProductItem = ({ item }: { item: Product }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [quantityPackages, setQuantityPackages] = useState(1);
  const [quantityBoxes, setQuantityBoxes] = useState(1);

  const handleAddToCart = (type: "package" | "box") => {
    dispatch(
      addItemToCart({
        id: item.id,
        title: item.title,
        price_in_package: Number(item.price_in_package),
        price_in_box: Number(item.price_in_box),
        quantity_of_packages: type === "package" ? quantityPackages : 0,
        quantity_of_boxs: type === "box" ? quantityBoxes : 0,
        quantity_per_package: Number(item.quantity_per_package) || 0,
        quantity_per_box: Number(item.quantity_per_box) || 0,
        imags: item.imags ? { ...item.imags } : undefined,
      })
    );
  };

  const handleProductDetails = () => {
    dispatch(updateproductDetails({ ...item }));
  };

  return (
    <div className="product-card group">

      {/* ===== Image Section ===== */}
      <div className="product-image-container">
        <Image
          src={
 Array.isArray(item.imags?.previews) && item.imags?.previews.length > 0
    ? item.imags.previews[0]
    : "/images/placeholder.png"          }
          alt={item.title || "Product Title"}
          fill
          className="product-image"
        />

        {/* ===== Hover Buttons ===== */}
        <div className="product-buttons">
          <button
            onClick={() => handleAddToCart("package")}
            className="btn btn-primary"
          >
            Add Package ({quantityPackages})
          </button>
          {/* <button
            onClick={() => handleAddToCart("box")}
            className="btn btn-primary"
          >
            Add Box ({quantityBoxes})
          </button> */}
        </div>
      </div>

      {/* ===== Content Section ===== */}
      <div className="product-content">

        {/* Product Title */}
        <h3
          className="product-title"
          onClick={handleProductDetails}
          title={item.title}
        >
          {item.title}
        </h3>

        {/* Prices */}
        <div className="product-prices">
          <div className="product-price-item">
            <span >{item.price_in_package} L.E</span>
            <span >:السعر بالدستة</span>
          </div>
          {/* <div className="product-price-item">
            <span >{item.price_in_box} L.E</span>
            <span >:السعر بالكرتونة</span>
          </div> */}
        </div>

        {/* Quantity Info */}
        <div className="product-quantity-info">
          <div className="quantity-item">
            <span className="font-medium">قطعة بالدستة: {item.quantity_per_package}</span>
          </div>
          {/* <div className="quantity-item">
            <span className="">قطعة بالكرتونة</span>
            <span className="font-medium ">{item.quantity_per_box}</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
