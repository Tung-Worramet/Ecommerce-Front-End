import React, { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const SwiperShowProduct = ({ children }) => {
  return (
    // <div className="container mx-auto px-4 py-6">
    //   <Swiper
    //     slidesPerView={1} // ค่าเริ่มต้น
    //     spaceBetween={10}
    //     autoplay={{
    //       delay: 2500,
    //       disableOnInteraction: false,
    //     }}
    //     pagination={{ clickable: true, dynamicBullets: true }}
    //     navigation={true}
    //     modules={[Pagination, Autoplay, Navigation]}
    //     breakpoints={{
    //       320: { slidesPerView: 2, spaceBetween: 10 }, // มือถือเล็ก
    //       640: { slidesPerView: 3, spaceBetween: 15 }, // มือถือกลาง
    //       768: { slidesPerView: 4, spaceBetween: 20 }, // Tablet
    //       1024: { slidesPerView: 5, spaceBetween: 25 }, // Laptop
    //       1280: { slidesPerView: 6, spaceBetween: 30 }, // จอใหญ่
    //     }}
    //     className="rounded-md shadow-lg"
    //   >
    //     {children.map((child, index) => (
    //       <SwiperSlide
    //         key={index}
    //         className="hover:scale-105 transition-all duration-300"
    //       >
    //         {child}
    //       </SwiperSlide>
    //     ))}
    //   </Swiper>
    // </div>

    // โค้ดเก่า
    <div>
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        navigation={true}
        modules={[Pagination, Autoplay, Navigation]}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        className="mySwiper rounded-md"
      >
        {children}
      </Swiper>
    </div>
  );
};

export default SwiperShowProduct;
