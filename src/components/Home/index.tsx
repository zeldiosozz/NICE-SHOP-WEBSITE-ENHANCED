import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import CounDown from "./Countdown";
import Testimonials from "./Testimonials";


const Home = () => {
  return (
    <main>
       <h1 className="sr-only">
Nice Shop Sports Store – Best Deals on Gloves, Balls, and Sports Equipment
      </h1>
      <Hero />
      <Categories />
      <NewArrival />
      <CounDown />
      <Testimonials />
     
    </main>
  );
};

export default Home;
