"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

import Image from "next/image";

const HeroCarousal = () => {
  
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
 className="hero w-full max-w-[1200px] mx-auto px-4"    >
      <SwiperSlide>
<div className="flex items-center justify-between pt-6 sm:pt-0 flex-col-reverse sm:flex-row gap-6 sm:gap-10 lg:gap-20">
  {/* النص */}
  <div className="max-w-[394px] py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5">
    <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
      <span className="price_logo block font-semibold text-heading-3 sm:text-heading-1">
        333 L.E
      </span>
      <span className="title_beside_price_logo block text-sm sm:text-custom-1 sm:leading-[24px]">
        سعر القطعة
        <br />
        بالدستة
      </span>
    </div>

    <h1 className="title_under_price_logo font-semibold text-xl sm:text-3xl mb-3">
      <a href="#">قفاز ملاكمة مقاس 10 جودة عالية</a>
    </h1>

    <p className="title_under_under_price_logo">متوفر جميع المقاسات 8 ~ 15 بأعلى جودة عالمية</p>

    <a
      href="http://localhost:3000/shop-with-sidebar"
      className="shop_now_btn inline-flex font-medium text-custom-sm rounded-md py-3 px-9 ease-out duration-200 mt-10"
    >
      Shop Now
    </a>
  </div>

  {/* الصورة */}
  <div className="flex justify-end w-full sm:w-auto">
    <Image
      src="https://res.cloudinary.com/dj8hypsia/image/upload/v1760346108/%D9%82%D9%81%D8%A7%D8%B2_%D9%85%D9%84%D8%A7%D9%83%D9%85%D8%A9_%D9%81%D9%8A%D9%86%D9%88%D9%85_%D9%85%D9%82%D8%A7%D8%B3_14-removebg-preview_onz0k3.png"
      alt="headphone"
      width={351}
      height={358}
      className="mx-auto sm:ml-auto sm:mr-0"
    />
  </div>
</div>
      </SwiperSlide>
      <SwiperSlide>
        {" "}
<div className="flex items-center justify-between pt-6 sm:pt-0 flex-col-reverse sm:flex-row gap-6 sm:gap-10 lg:gap-20">
  {/* النص */}
  <div className="max-w-[394px] py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5">
    <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
      <span className="price_logo block font-semibold text-heading-3 sm:text-heading-1">
        333 L.E
      </span>
      <span className="title_beside_price_logo block text-sm sm:text-custom-1 sm:leading-[24px]">
        سعر القطعة
        <br />
        بالدستة
      </span>
    </div>

    <h1 className="title_under_price_logo font-semibold text-xl sm:text-3xl mb-3">
      <a href="#">قفاز ملاكمة مقاس 10 جودة عالية</a>
    </h1>

    <p className="title_under_under_price_logo">متوفر جميع المقاسات 8 ~ 15 بأعلى جودة عالمية</p>

    <a
      href="http://localhost:3000/shop-with-sidebar"
      className="shop_now_btn inline-flex font-medium text-custom-sm rounded-md py-3 px-9 ease-out duration-200 mt-10"
    >
      Shop Now
    </a>
  </div>

  {/* الصورة */}
  <div className="flex justify-end w-full sm:w-auto">
    <Image
      src="https://res.cloudinary.com/dj8hypsia/image/upload/v1760346108/%D9%82%D9%81%D8%A7%D8%B2_%D9%85%D9%84%D8%A7%D9%83%D9%85%D8%A9_%D9%81%D9%8A%D9%86%D9%88%D9%85_%D9%85%D9%82%D8%A7%D8%B3_14-removebg-preview_onz0k3.png"
      alt="headphone"
      width={351}
      height={358}
      className="mx-auto sm:ml-auto sm:mr-0"
    />
  </div>
</div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroCarousal;
