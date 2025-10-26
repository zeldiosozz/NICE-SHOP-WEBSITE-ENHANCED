import React from "react";
import Image from "next/image";

const featureData = [
  {
    img: "https://res.cloudinary.com/dj8hypsia/image/upload/v1760984638/transportation_ciybe9.png",
    title: "Free Shipping",
    description: "For all orders $200",
  },
  {
    img: "https://res.cloudinary.com/dj8hypsia/image/upload/v1760984639/return-of-investment_cgote6.png",
    title: "1 & 1 Returns",
    description: "Cancellation after 1 day",
  },
  {
    img: "https://res.cloudinary.com/dj8hypsia/image/upload/v1760984637/money_1_nz6r9a.png",
    title: "100% Secure Payments",
    description: "Gurantee secure payments",
  },
  {
    img: "https://res.cloudinary.com/dj8hypsia/image/upload/v1761115400/headphones_eytvam.png",
    title: "24/7 Dedicated Support",
    description: "Anywhere & anytime",
  },
];

const HeroFeature = () => {
  return (
    <div className="max-w-[1060px] w-full mx-auto px-4 sm:px-8 xl:px-0">
      <div className="flex flex-wrap items-center gap-7.5 xl:gap-8.5 mt-10">
        {featureData.map((item, key) => (
          <div className="flex items-center gap-4" key={key}>
            <Image src={item.img} alt="icons" width={66} height={41} />

            <div>
              <h3 className="hero_feature_font font-medium text-sm">{item.title}</h3>
              <p className="hero_feature_desc text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroFeature;
