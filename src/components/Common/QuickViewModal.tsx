"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";

import { useModalContext } from "@/app/context/QuickViewModalContext";
import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { addItemToCart } from "@/redux/features/cart-slice";
import { resetQuickView } from "@/redux/features/quickView-slice";
import { updateproductDetails } from "@/redux/features/product-details";

const QuickViewModal = () => {
  const { isModalOpen, closeModal } = useModalContext();
  const { openPreviewModal } = usePreviewSlider();
  const dispatch = useDispatch<AppDispatch>();

  const product = useAppSelector((state) => state.quickViewReducer.value);
  const [activePreview, setActivePreview] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [quantityOfPackages, setQuantityOfPackages] = useState(1);
  const [quantityOfBoxs, setQuantityOfBoxs] = useState(0);

  const handlePreviewSlider = () => {
    dispatch(updateproductDetails(product));
    openPreviewModal();
  };

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        ...product,
        quantity_of_packages: quantityOfPackages,
        quantity_of_boxs: quantityOfBoxs,
      })
    );
    closeModal();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".modal-content")) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      setQuantity(1);
    };
  }, [isModalOpen, closeModal]);

  if (!product) return null;

  return (
    <div
      className={`${
        isModalOpen ? "z-99999" : "hidden"
      } fixed top-0 left-0 w-full h-screen overflow-y-auto no-scrollbar sm:py-20 xl:py-25 2xl:py-[230px] bg-dark/70 sm:px-8 px-4 py-5`}
    >
      <div className="flex items-center justify-center">
        <div className="w-full max-w-[1100px] rounded-xl shadow-3 bg-white p-7.5 relative modal-content">
          {/* Close button */}
          <button
            onClick={closeModal}
            aria-label="Close modal"
            className="absolute top-0 right-0 sm:top-6 sm:right-6 flex items-center justify-center w-10 h-10 rounded-full bg-meta text-body hover:text-dark transition duration-150"
          >
            <svg
              className="fill-current"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.3108 13L19.2291 8.08167C19.5866 7.72417 19.5866 7.12833 19.2291 6.77083C19.0543 6.59895 18.8189 6.50262 18.5737 6.50262C18.3285 6.50262 18.0932 6.59895 17.9183 6.77083L13 11.6892L8.08164 6.77083C7.90679 6.59895 7.67142 6.50262 7.42623 6.50262C7.18104 6.50262 6.94566 6.59895 6.77081 6.77083C6.41331 7.12833 6.41331 7.72417 6.77081 8.08167L11.6891 13L6.77081 17.9183C6.41331 18.2758 6.41331 18.8717 6.77081 19.2292C7.12831 19.5867 7.72414 19.5867 8.08164 19.2292L13 14.3108L17.9183 19.2292C18.2758 19.5867 18.8716 19.5867 19.2291 19.2292C19.5866 18.8717 19.5866 18.2758 19.2291 17.9183L14.3108 13Z"
              />
            </svg>
          </button>

          <div className="flex flex-wrap items-center gap-12.5">
            {/* Image gallery */}
            <div className="max-w-[526px] w-full flex gap-5">
              <div className="flex flex-col gap-5">
{product.imags?.thumbnails?.length
  ? product.imags.thumbnails.map((img, key) => (
      <button
        onClick={() => setActivePreview(key)}
        key={key}
        className={`flex items-center justify-center w-20 h-20 overflow-hidden rounded-lg bg-gray-1 ease-out duration-200 hover:border-2 hover:border-blue ${
          activePreview === key && "border-2 border-blue"
        }`}
      >
        <Image
          src={img}
          alt="thumbnail"
          width={61}
          height={61}
          className="aspect-square"
        />
      </button>
    ))
  : <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
    No image available
  </div>}

              </div>

              <div className="relative z-1 flex items-center justify-center w-full sm:min-h-[508px] bg-gray-1 rounded-lg border border-gray-3 overflow-hidden">
                <button
                  onClick={handlePreviewSlider}
                  aria-label="Zoom"
                  className="absolute top-4 lg:top-8 right-4 lg:right-8 z-50 w-10 h-10 rounded-[5px] bg-white shadow-1 flex items-center justify-center text-dark hover:text-blue transition"
                >
                  {/* zoom icon */}
                  <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.11493 1.14581L9.16665 1.14581C9.54634 1.14581 9.85415 1.45362 9.85415 1.83331C9.85415 2.21301 9.54634 2.52081 9.16665 2.52081C7.41873 2.52081 6.17695 2.52227 5.23492 2.64893C4.31268 2.77292 3.78133 3.00545 3.39339 3.39339C3.00545 3.78133 2.77292 4.31268 2.64893 5.23492C2.52227 6.17695 2.52081 7.41873 2.52081 9.16665C2.52081 9.54634 2.21301 9.85415 1.83331 9.85415C1.45362 9.85415 1.14581 9.54634 1.14581 9.16665L1.14581 9.11493C1.1458 7.43032 1.14579 6.09599 1.28619 5.05171C1.43068 3.97699 1.73512 3.10712 2.42112 2.42112C3.10712 1.73512 3.97699 1.43068 5.05171 1.28619C6.09599 1.14579 7.43032 1.1458 9.11493 1.14581Z" />
                  </svg>
                </button>

                <Image
                  src={product?.imags?.previews?.[activePreview] || "https://res.cloudinary.com/dj8hypsia/image/upload/v1760365394/logo-white_haysjq.png"}
                  alt="Product Preview"
                  width={400}
                  height={400}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Product info */}
            <div className="max-w-[445px] w-full">
              <span className="inline-block text-custom-xs font-medium text-white py-1 px-3 bg-green mb-6.5">
                SALE 20% OFF
              </span>

              <h3 className="font-semibold text-xl xl:text-heading-5 text-dark mb-4">
                {product.title}
              </h3>

              <div className="flex flex-wrap items-center gap-5 mb-6">
                {/* Ratings & Stock */}
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1">
                    {[...Array(3)].map((_, i) => (
                      <svg
                        key={i}
                        className="fill-[#FFA645]"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                      >
                        <path d="..." />
                      </svg>
                    ))}
                    {[...Array(2)].map((_, i) => (
                      <svg
                        key={i}
                        className="fill-gray-4"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                      >
                        <path d="..." />
                      </svg>
                    ))}
                  </div>
                  <span>
                    <span className="font-medium text-dark"> 4.7 Rating </span>
                    <span className="text-dark-2"> (5 reviews) </span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <path d="..." fill="#22AD5C" />
                  </svg>
                  <span className="font-medium text-dark">In Stock</span>
                </div>
              </div>

              <p>{product.title || "Lorem Ipsum is simply dummy text."}</p>

              <div className="flex flex-wrap justify-between gap-5 mt-6 mb-7.5">
                <div>
                  <h4 className="font-semibold text-lg text-dark mb-3.5">
                    Price
                  </h4>
                  <span className="flex items-center gap-2">
                    <span className="font-semibold text-dark text-xl xl:text-heading-4">
                      ${product.price_in_box}
                    </span>
                    <span className="font-medium text-dark-4 text-lg xl:text-2xl line-through">
                      ${product.price_in_package}
                    </span>
                  </span>
                </div>

                <div>
                  <h4 className="font-semibold text-lg text-dark mb-3.5">
                    Quantity
                  </h4>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2 text-dark hover:text-blue transition"
                    >
                      -
                    </button>
                    <span className="flex items-center justify-center w-20 h-10 rounded-[5px] border border-gray-4 bg-white font-medium text-dark">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2 text-dark hover:text-blue transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={quantity === 0}
                  className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md hover:bg-blue-dark transition"
                >
                  Add to Cart
                </button>

                <button className="inline-flex items-center gap-2 font-medium text-white bg-dark py-3 px-6 rounded-md hover:bg-opacity-95 transition">
                  {/* Wishlist icon */}
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <path d="..." />
                  </svg>
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
