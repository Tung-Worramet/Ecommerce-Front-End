import React, { useState, useEffect } from "react";
import { listProductBy } from "../../api/product";
import ProductCard from "../card/ProductCard";
import SwiperShowProduct from "../../utils/SwiperShowProduct";
import { Swiper, SwiperSlide } from "swiper/react";

const BestSeller = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listProductBy("sold", "desc", 7)
      .then((res) => {
        // console.log(res);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <SwiperShowProduct>
      {data?.map((item, index) => (
        <SwiperSlide key={index}>
          <ProductCard item={item} key={index} />
        </SwiperSlide>
      ))}
    </SwiperShowProduct>
  );
};

export default BestSeller;
