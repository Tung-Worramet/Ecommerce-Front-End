import React from "react";
import ContentCarousel from "../components/home/ContentCarousel";
import BestSeller from "../components/home/BestSeller";
import NewProduct from "../components/home/NewProduct";

const Home = () => {
  return (
    <div className="container mx-auto pt-6">
      <ContentCarousel />

      <p className="text-3xl font-bold text-center my-4 pt-20">สินค้าขายดี</p>
      <BestSeller />

      <p className="text-3xl font-bold text-center my-4 pt-20">สินค้าใหม่</p>
      <NewProduct />
    </div>
  );
};

export default Home;
