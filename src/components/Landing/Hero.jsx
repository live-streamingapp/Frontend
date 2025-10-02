import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import axios from "axios";

import "swiper/css";
import "swiper/css/pagination";

const Hero = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/banners`
        );
        // Use the "data" field from API response
        setSlides(res.data.data);
        console.log("banners", res.data.data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <section className="py-[3rem]">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide._id}>
            <div
              className="h-[400px] py-[2rem] flex items-center text-white justify-between gap-[5rem] px-[4rem] max-[900px]:px-[1rem] relative overflow-hidden"
              style={{
                background: slide.background, // directly use color hex from API
              }}
            >
              <div className="bg-transparent">
                <div className="w-full max-w-[600px]">
                  <h1 className="text-4xl font-bold mb-6 leading-tight max-[1050px]:text-[2.5rem] max-[600px]:text-3xl">
                    {slide.title}
                  </h1>
                  <p className="text-lg opacity-90 leading-relaxed max-w-2xl mb-8 max-[600px]:text-[1rem]">
                    {slide.description}
                  </p>
                  {slide.buttonText && (
                    <button
                      className="bg-white cursor-pointer px-8 py-2 max-[500px]:text-sm rounded-md text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
                      style={{
                        color: slide.background,
                      }}
                    >
                      {slide.buttonText}
                    </button>
                  )}
                </div>
              </div>

              {slide.image && (
                <div className="max-[900px]:hidden">
                  <img
                    src={slide.image}
                    alt="Hero Slide"
                    className="object-contain h-[350px] w-[350px]"
                  />
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
