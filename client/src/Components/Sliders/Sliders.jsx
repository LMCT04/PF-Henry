import React from "react";
// import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import style from "./Sliders.module.css";

import slide1 from "../../imgAssets/banner-01.png";
import slide2 from "../../imgAssets/banner-02.png";
import slide3 from "../../imgAssets/banner-03.png";

const Sliders = () => {

    return (
        <div className={style.container}>
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                cssMode={true}
                spaceBetween={10}
                slidesPerView={1}
                centeredSlides={true}
                loop={true}
                navigation
                bulletclass="swiper-pagination-bullet"
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                className={style.container}
            >
                <SwiperSlide>
                    <img src={slide1} alt="slide1" className={style.slide} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide2} alt="slide2" className={style.slide} />
                </SwiperSlide>
                <SwiperSlide className={style.slide}>
                    <img src={slide3} alt="slide3" className={style.slide} />
                </SwiperSlide>
                <div className="swiper-pagination"></div>
            </Swiper>
        </div>
    );
};

export default Sliders;
