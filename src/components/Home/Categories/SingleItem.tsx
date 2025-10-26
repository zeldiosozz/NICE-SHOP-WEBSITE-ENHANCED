"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SingleItem = ({ item }) => {
  const router = useRouter();

  // دي النطة الذكية يا نجم 😎
  const handleClick = () => {
    // بننط لصفحة المنتجات و بنبعت اسم الكاتيجوري كـ query
    router.push(`/shop-with-sidebar?category=${item.query}`);
  };

  return (
    <div
      onClick={handleClick}
className="group flex flex-col items-center"    >
      <div className="relative w-24 h-24 md:w-28 md:h-28 mx-auto mb-3">
        <Image
          src={item.img}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100px, 150px"
          className="object-contain"
        />
      </div>
<h3 className="single_item_category">  
        {item.title}
      </h3>
    </div>
  );
};

export default SingleItem;

