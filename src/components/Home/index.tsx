import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import NewArrival from "./NewArrivals";
import CounDown from "./Countdown";
import Testimonials from "./Testimonials";


const Home = () => {
  return (
    <main>
      <Hero />
      <Categories />
      <NewArrival />
      <CounDown />
      <Testimonials />
     
    </main>
  );
};

export default Home;
