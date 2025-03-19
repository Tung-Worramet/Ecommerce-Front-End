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

const ContentCarousel = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    hdlGetImage();
  }, []);

  const hdlGetImage = () => {
    axios
      .get("https://picsum.photos/v2/list?page=1&limit=15")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mx-auto">
      <img
        src="/images/DIY.jpg"
        alt="Computer Set"
        className="w-full h-auto max-h-[650px] object-cover rounded-md shadow-md"
      />
    </div>

    // โค้ดเก่า
    // <div>
    //   <Swiper
    //     autoplay={{
    //       delay: 2500,
    //       disableOnInteraction: false,
    //     }}
    //     pagination={true}
    //     // navigation={true}
    //     modules={[Pagination, Autoplay, Navigation]}
    //     className="mySwiper h-80 rounded-md mb-6"
    //   >
    //     {data?.map((item, index) => (
    //       <SwiperSlide key={index}>
    //         <img src={item.download_url} />
    //       </SwiperSlide>
    //     ))}
    //   </Swiper>

    //   <Swiper
    //     slidesPerView={5}
    //     spaceBetween={10}
    //     autoplay={{
    //       delay: 2500,
    //       disableOnInteraction: false,
    //     }}
    //     pagination={true}
    //     navigation={true}
    //     modules={[Pagination, Autoplay, Navigation]}
    //     className="mySwiper rounded-md"
    //   >
    //     {data?.map((item, index) => (
    //       <SwiperSlide key={index}>
    //         <img className="rounded-md" src={item.download_url} />
    //       </SwiperSlide>
    //     ))}
    //   </Swiper>
    // </div>
  );
};

export default ContentCarousel;
