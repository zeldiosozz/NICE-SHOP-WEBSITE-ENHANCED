"use client";
import React, { useEffect } from "react";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import {
  removeItemFromCart,
  selectTotalPrice,
} from "@/redux/features/cart-slice";
import { useSelector, useDispatch } from "react-redux";
import { useAppSelector, AppDispatch } from "@/redux/store";
import Link from "next/link";
import EmptyCart from "./EmptyCart";

const CartSidebarModal = () => {
  const { isCartModalOpen, closeCartModal } = useCartModalContext();
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch<AppDispatch>();

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if ((event.target as HTMLElement).closest(".cart-sidebar")) return;
      closeCartModal();
    }
    if (isCartModalOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCartModalOpen, closeCartModal]);

  return (
    <>
      {/* Overlay with blur */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
          isCartModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeCartModal}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 min-h-[100dvh] bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl 
        shadow-2xl border-l border-gray-200 dark:border-[#ff00ff]/40 dark-red:border-[#8b1a1a]/40
        flex flex-col justify-between z-[99999] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] 
        cart-sidebar
        ${
          isCartModalOpen
            ? "translate-x-0"
            : "translate-x-full"
        } 
        w-[90%] sm:w-[400px] md:w-[480px] lg:w-[520px] xl:w-[600px]`}
        style={{
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)",
        }}
      >
        {/* Header */}
        <header className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-[#ff00ff]/40 dark-red:border-[#8b1a1a]">
          <h2 className="text-lg sm:text-2xl font-semibold text-dark dark:text-white">
             Cart Details
          </h2>
          <button
            onClick={closeCartModal}
            className="text-gray-600 dark:text-gray-200 hover:text-red-500 font-bold text-lg transition"
          >
            ✕
          </button>
        </header>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4 space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item, key) => (
              <div
                key={key}
                className="border border-gray-200 dark:border-[#ff00ff]/40 dark-red:border-[#8b1a1a]/40 rounded-lg p-3 bg-gray-50/70 dark:bg-[#1a1a1a]/70 backdrop-blur-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img
                      src={item.imags?.previews?.[0] || "/placeholder.png"}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-semibold text-dark dark:text-white">
                        {item.title}
                      </p>
                      <button
                        onClick={() => dispatch(removeItemFromCart(item.id))}
                        className="text-red-500 text-xs sm:text-sm hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      {item.quantity_of_packages > 0 && (
                        <p>
                          <span className="font-medium">By Package:</span>{" "}
                          {item.quantity_of_packages} ×{" "}
                          {item.price_in_package * item.quantity_per_package} L.E ={" "}
                          <span className="font-semibold">
                            {item.quantity_of_packages *
                              item.price_in_package *
                              item.quantity_per_package}{" "}
                            L.E
                          </span>
                        </p>
                      )}
                      {item.quantity_of_boxs > 0 && (
                        <p>
                          <span className="font-medium">By Box:</span>{" "}
                          {item.quantity_of_boxs} ×{" "}
                          {item.price_in_box * item.quantity_per_box} L.E ={" "}
                          <span className="font-semibold">
                            {item.quantity_of_boxs *
                              item.price_in_box *
                              item.quantity_per_box}{" "}
                            L.E
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <EmptyCart />
          )}
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-[#ff00ff]/40 dark-red:border-[#8b1a1a]/40 px-5 py-4 pb-[calc(env(safe-area-inset-bottom,0)+1rem)] backdrop-blur-md bg-white/60 dark:bg-[#0a0a0a]/60">
          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-medium text-dark dark:text-white">Total:</p>
            <p className="text-lg font-semibold text-dark dark:text-[#ff00ff] dark-red:text-[#8b1a1a]">
              {totalPrice} L.E
            </p>
          </div>
          <Link
            href="/checkout"
            className="block w-full text-center font-medium text-white bg-[#3c75e0] dark:text-[#ffffff] dark:bg-[#ff00ff] dark-red:bg-[#8b1a1a] dark:hover:text-[#ff00ff] dark-red:hover:text-[#8b1a1a] py-3 rounded-md hover:bg-blue-700 dark:hover:bg-[#ffffff] dark-red:hover:bg-[#ffffff] transition-colors"
          >
            Checkout
          </Link>
        </footer>
      </aside>
    </>
  );
};

export default CartSidebarModal;
