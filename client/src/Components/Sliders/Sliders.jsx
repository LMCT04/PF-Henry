//import React, { useRef, useState } from "react";
import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./Sliders.module.css";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css";

const Sliders = () => {
    return (
        <div className={style.container}>
            <Swiper
                // install Swiper modules
                modules={[Autoplay, Pagination, Navigation]}
                cssMode={true}
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                navigation
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
                className={style.container}
            >
                <SwiperSlide className={style.slide1} ></SwiperSlide>
                <SwiperSlide className={style.slide2} ></SwiperSlide>
                <SwiperSlide className={style.slide3} ></SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Sliders;
