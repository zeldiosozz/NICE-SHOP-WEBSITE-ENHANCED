"use client";

import React from "react";
import Image from "next/image";

const PaymentMethod = () => {
  return (
    <div className="bg-white dark:bg-[#000000] shadow-1 rounded-[10px] mt-7.5">
      <div className="border-b border-gray-3 dark:border-[#ff00ff] dark-red:border-[#8b1a1a] py-5 px-4 sm:px-8.5">
        <h3 className="font-medium text-xl text-dark dark:text-[#ffffff]">Payment Method</h3>
      </div>

      <div className="p-4 sm:p-8.5">
        <div className="flex flex-col gap-3">
          {/* Cash on Delivery - مجرد عرض */}
          <div className="flex cursor-pointer select-none items-center gap-4">
            <div className="flex h-4 w-4 items-center justify-center rounded-full border-4 border-blue dark:border-[#ff00ff] dark-red:border-[#8b1a1a]"></div>

            <div className="rounded-md border-[0.5px] py-3.5 px-5 ease-out duration-200 bg-gray-2 dark:bg-[#000000] min-w-[240px] flex items-center hover:shadow-none">
              <div className="pr-2.5">
                <Image
                  src="https://res.cloudinary.com/dj8hypsia/image/upload/v1761148606/money_huckjc.png"
                  alt="cash"
                  width={40}
                  height={21}
                />
              </div>

              <div className="border-l border-gray-4 dark:border-[#ffffff] pl-2.5">
                <p>Cash on delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
