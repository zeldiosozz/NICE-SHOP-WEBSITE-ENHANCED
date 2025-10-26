import React from "react";
import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";
import Image from "next/image";

const Hero = () => {
  return (
<section className="hero_and_features_bg overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-30 sm:pt-28 md:pt-32 lg:pt-30 xl:pt-45 ">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap gap-5">
<div className="w-full">
  <div className="relative z-1 rounded-[10px] bg-white overflow-hidden">
    <Image
      src="/images/hero/hero-bg.png"
      alt="hero bg shapes"
      className="absolute right-0 bottom-0 -z-1"
      width={534}
      height={520}
    />
    <HeroCarousel />
  </div>
</div>
        </div>
      </div>

      {/* <!-- Hero features --> */}
      <HeroFeature />
    </section>
  );
};

export default Hero;
