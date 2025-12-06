"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
const CounDown = () => {
            const router = useRouter();

      const handleClick = (item:string) => {
      // بننط لصفحة المنتجات و بنبعت اسم الكاتيجوري كـ query
      
      router.push(`/shop-with-sidebar?title=${item}`);
    };

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const deadline = "December, 31, 2024";

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    // @ts-ignore
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="overflow-hidden py-20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="relative overflow-hidden z-1 rounded-lg bg-[#ffffff] dark:bg-[#000000] p-4 sm:p-7.5 lg:p-10 xl:p-15">
          <div className="max-w-[422px] w-full">
            <span className="block font-medium text-custom-1 text-blue dark:text-[#000000] mb-2.5">
              Don’t Miss!!
            </span>

            <h2 className="font-bold text-dark dark:text-[#ffffff] text-xl lg:text-heading-4 xl:text-heading-3 mb-3">
             مع نايس منتجاتك أفضل
            </h2>

            <p>كورة كاس عالم مقاس 8 لفترة محدودة</p>

            {/* <!-- Countdown timer --> */}
            <div
              className="flex flex-wrap gap-6 mt-6"
              x-data="timer()"
              x-init="countdown()"
            >
            </div>
            <a
            onClick={()=>handleClick("كورة قدم  كبس كاس عالم 2026 مقاس 5")}
              className="inline-flex font-medium text-custom-sm text-white bg-[#3c75e0ff] dark:bg-[#ff00ff] dark:hover:bg-[#ffffff] dark:hover:text-[#ff00ff]  dark-red:bg-[#8b1a1a] dark-red:hover:bg-[#ffffff] dark-red:hover:text-[#8b1a1a] py-3 px-9.5 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
            >
              Check it Out!
            </a>
          </div>

          {/* <!-- bg shapes --> */}
          <Image
            src="/images/countdown/countdown-bg.png"
            alt="bg shapes"
            className="hidden sm:block absolute right-0 bottom-0 -z-1"
            width={737}
            height={482}
          />
          <Image
            src="https://res.cloudinary.com/dj8hypsia/image/upload/v1760550317/%D9%83%D9%88%D8%B1%D8%A9_%D9%82%D8%AF%D9%85__%D9%83%D8%A8%D8%B3_%D9%83%D8%A7%D8%B3_%D8%B9%D8%A7%D9%84%D9%85_2026_%D9%85%D9%82%D8%A7%D8%B3_5-removebg-preview_p4rzkv.png"
            alt="product"
            className="hidden lg:block absolute left-4 xl:left-33 bottom-4 xl:bottom-10 -z-1"
            width={320}
            height={30}
          />
        </div>
      </div>
    </section>
  );
};

export default CounDown;
