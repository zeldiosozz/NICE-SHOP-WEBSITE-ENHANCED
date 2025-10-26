"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectTotalPrice } from "../../redux/features/cart-slice";

interface BillingProps {
  onChange: (data: { name: string; phone: string; address: string }) => void;
}

const Billing: React.FC<BillingProps> = ({ onChange }) => {
  const cartTotal = useSelector(selectTotalPrice);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // تحديث البيانات + إرسالها للـ Checkout
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;
  let cleanedValue = value;

  // 🧼 لو الحقل هو الاسم → نسمح بالحروف العربية والإنجليزية والمسافات فقط
  if (name === "name") {
    cleanedValue = value.replace(/[^a-zA-Z\u0600-\u06FF\s]/g, "");
  }

  // 🧼 لو الحقل هو العنوان → نسمح بالحروف + الأرقام + بعض الرموز (., -)
  if (name === "address") {
    cleanedValue = value.replace(/[^a-zA-Z0-9\u0600-\u06FF\s.,-]/g, "");
  }

  // 🧼 لو الحقل هو رقم الموبايل → نسمح بالأرقام فقط
  if (name === "phone") {
    cleanedValue = value.replace(/[^0-9]/g, "");
  }

  const updated = { ...formData, [name]: cleanedValue };
  setFormData(updated);
  onChange(updated);
};

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-[#000000] shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-[#ffffff] mb-6 text-center">
        تفاصيل العميل
      </h2>

      {/* الاسم */}
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-gray-700 dark:text-[#ffffff] dark:text-[#000000] font-medium">
          الاسم بالكامل <span className="text-red-500 dark:text-[#ffffff]">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="اكتب اسمك هنا"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 dark:border-[#ff00ff] dark-red:border-[#8b1a1a] bg-gray-50 dark:bg-[#000000] py-2.5 px-4 outline-none"
          required
        />
      </div>

      {/* رقم الهاتف */}
      <div className="mb-5">
        <label htmlFor="phone" className="block mb-2 text-gray-700 font-medium">
          رقم الهاتف <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="مثال: 01012345678"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 dark:border-[#ff00ff] dark-red:border-[#8b1a1a] dark:bg-[#000000] bg-gray-50 py-2.5 px-4 outline-none "
          required
        />
      </div>

      {/* العنوان */}
      <div className="mb-5">
        <label
          htmlFor="address"
          className="block mb-2 text-gray-700  font-medium"
        >
          العنوان بالتفصيل <span className="text-red-500 " >*</span>
        </label>
        <textarea
          id="address"
          name="address"
          rows={3}
          placeholder="اكتب العنوان كاملاً (مثلاً: القاهرة - مدينة نصر - شارع كذا)"
          value={formData.address}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 bg-gray-50 dark:border-[#ff00ff] dark-red:border-[#8b1a1a] dark:bg-[#000000] py-2.5 px-4 outline-none "
          required
        />
      </div>

      {/* السعر الإجمالي */}
      <div className="flex justify-between text-lg font-semibold mt-4">
        <span>الإجمالي:</span>
        <span>{cartTotal.toFixed(2)} ج.م</span>
      </div>
    </div>
  );
};

export default Billing;
