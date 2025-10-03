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
		<section className="py-8 sm:py-12 md:py-16">
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
							className="min-h-[300px] sm:min-h-[350px] md:h-[400px] py-8 sm:py-12 md:py-16 flex flex-col md:flex-row items-center text-white justify-between gap-6 sm:gap-8 md:gap-16 lg:gap-20 px-4 sm:px-8 md:px-12 lg:px-16 relative overflow-hidden"
							style={{
								background: slide.background, // directly use color hex from API
							}}
						>
							<div className="bg-transparent w-full md:w-auto">
								<div className="w-full max-w-full md:max-w-[600px]">
									<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
										{slide.title}
									</h1>
									<p className="text-sm sm:text-base md:text-lg opacity-90 leading-relaxed max-w-2xl mb-6 sm:mb-8">
										{slide.description}
									</p>
									{slide.buttonText && (
										<button
											className="bg-white cursor-pointer px-6 sm:px-8 py-2 rounded-md text-base sm:text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
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
								<div className="hidden md:block flex-shrink-0">
									<img
										src={slide.image}
										alt="Hero Slide"
										className="object-contain h-[250px] w-[250px] lg:h-[350px] lg:w-[350px]"
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
