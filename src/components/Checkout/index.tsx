"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import Breadcrumb from "../Common/Breadcrumb";
import Billing from "./Billing";
import Image from "next/image";
import PaymentMethod from "./PaymentMethod";
import { selectCartItems, selectTotalPrice } from "../../redux/features/cart-slice";
const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const [notes, setNotes] = useState("");
const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const handleBillingChange = (data: any) => {
    setCustomerData(data);
  };

    const invalidItem = cartItems.find(
      (item) => item.quantity_of_boxs < 0 || item.quantity_of_packages < 0
    );
    if (invalidItem) {
      alert("❌ بعض الكميات غير صالحة!");
      return;
    }
     const handlePlaceOrder = async () => {
    if (!cartItems.length) return alert("الكارت فاضي!");
    if (!customerData.name || !customerData.phone || !customerData.address)
      return alert("⚠️ برجاء إدخال بيانات العميل بالكامل!");

    const orderData = {
      customer: customerData,
      items: cartItems,
      totalPrice,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error("فشل إرسال الطلب!");

      alert("تم إرسال الطلب بنجاح!");
    } catch (err) {
      console.error(err);
      alert("❌ حصل خطأ أثناء إرسال الطلب.");
    }
  };

  return (
    <>
      <Breadcrumb title={"Checkout"} pages={["checkout"]} />
      <section className="overflow-hidden py-20 bg-gray-2 dark:bg-[#000000]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
            {/* left side */}
            <div className="lg:max-w-[670px] w-full ">
              <Billing onChange={handleBillingChange}/>
              {/* <Shipping /> */}
              {/* <div className="bg-white dark:bg-[#000000] shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                <label className="block mb-2.5">Other Notes (optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) =>  {
    const value = e.target.value;
    // ❌ إزالة أي رموز أو علامات غير مسموح بيها
    const filtered = value.replace(/[^a-zA-Z0-9\u0600-\u06FF\s.,!?]/g, "");
    setNotes(filtered);
  }}
                  rows={5}
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  className="rounded-md border border-gray-3 dark:border-[#ff00ff] bg-gray-1  dark:bg-[#000000] w-full p-5 outline-none duration-200 "
                />
              </div> */}
            </div>

            {/* right side */}
            <div className="max-w-[455px] w-full flex flex-col gap-5">
              {/* order list box */}
              <div className="bg-white dark:bg-[#000000] shadow-1 rounded-[10px]">
                <div className="border-b border-gray-3 dark:border-[#ff00ff]  dark-red:border-[#8b1a1a] dark:bg-[#000000] py-5 px-4 sm:px-8.5">
                  <h3 className="font-medium text-xl text-dark dark:text-[#ffffff]">Your Order</h3>
                </div>
                <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                  <div className="flex items-center justify-between py-5 border-b dark:border-[#ff00ff] dark-red:border-[#8b1a1a] dark:bg-[#000000] border-gray-3">
                    <div>
                      <h4 className="font-medium text-dark dark:text-[#ffffff]">Product</h4>
                    </div>
                    <div>
                      <h4 className="font-medium text-dark dark:text-[#ffffff] text-right">Subtotal</h4>
                    </div>
                  </div>

                  {cartItems.map((item) => (
                    
<div
  key={item.id}
  className="flex items-center justify-between py-5 border-b dark:border-[#ff00ff] dark-red:border-[#8b1a1a] dark:bg-[#000000] border-gray-3"
>
  {/* الصورة + العنوان */}
  <div className="flex items-center gap-3">
    <Image
      src={item?.imags?.previews[0]}
      alt="cash"
      width={40}
      height={21}
      className="object-contain"
    />
    <div>
      <p className="text-dark dark:text-[#ffffff] font-semibold">{item.title}</p>
      {/* <p className="text-sm text-gray-500 dark:text-[#ffffff]">
        Boxes: {item.quantity_of_boxs}
      </p> */}
      <p className="text-sm text-gray-500 dark:text-[#ffffff]">
        Packages: {item.quantity_of_packages}
      </p>
    </div>
  </div>

  {/* السعر */}
  
  <div>
    <p className="text-[#ffffff] dark:text-[#000000]">``</p>
    <p className="text-dark text-right dark:text-[#ffffff]">
      {item.quantity_of_boxs*item.price_in_box*item.quantity_per_package} L.E
    </p>
    <p className="text-dark text-right dark:text-[#ffffff]">
      {item.price_in_package*item.quantity_of_packages*item.quantity_per_package} L.E
    </p>

  </div>
</div>
                  ))}

                  <div className="flex items-center justify-between pt-5">
                    <div>
                      <p className="font-medium text-lg text-dark dark:text-[#ffffff]">Total</p>
                    </div>
                    <div>
                      <p className="font-medium text-lg text-dark dark:text-[#ffffff] text-right">
                        {totalPrice.toFixed(2)} L.E
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <PaymentMethod />

<button
  onClick={handlePlaceOrder}
  className="w-full flex justify-center items-center font-semibold text-white bg-blue dark:bg-[#ff00ff] dark:hover:bg-[#ffffff] dark:hover:text-[#ff00ff] dark-red:bg-[#8b1a1a] dark-red:hover:bg-[#ffffff] dark-red:hover:text-[#8b1a1a] hover:bg-blue-dark py-3 px-6 rounded-md mt-3 transition-all duration-300 ease-out shadow-md hover:shadow-lg hover:scale-[1.02]"
>
  Place Order
</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
