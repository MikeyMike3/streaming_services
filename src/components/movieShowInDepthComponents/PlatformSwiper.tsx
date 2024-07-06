import { useEffect, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css";
import "swiper/css/free-mode";

import { Provider } from "../../types/movieShowInDepthTypes";

const swiperSpaceBetween = 10;
const swiperGrab = true;

type PlatformSwiperProps = {
	flatRateStreamingServices: Provider[];
	rentStreamingServices: Provider[];
	buyStreamingServices: Provider[];
};

export const PlatformSwiper = (props: PlatformSwiperProps) => {
	const streamSwiperRef: any = useRef(null);
	const rentSwiperRef: any = useRef(null);
	const buySwiperRef: any = useRef(null);

	useEffect(() => {
		if (streamSwiperRef.current && streamSwiperRef.current.swiper) {
			streamSwiperRef.current.swiper.slideTo(0);
		}
		if (rentSwiperRef.current && rentSwiperRef.current.swiper) {
			rentSwiperRef.current.swiper.slideTo(0);
		}
		if (buySwiperRef.current && buySwiperRef.current.swiper) {
			buySwiperRef.current.swiper.slideTo(0);
		}
	});

	return (
		<div className="platform-container">
			<h2 className="platform-headings">Stream On</h2>
			<div className="heading-underline"></div>
			<Swiper
				ref={streamSwiperRef}
				spaceBetween={swiperSpaceBetween}
				grabCursor={swiperGrab}
				slidesPerView={"auto"}
				direction="horizontal"
				modules={[FreeMode]}
				freeMode={true}>
				<div className="provider-img-container">
					{props.flatRateStreamingServices.length > 0 ? (
						props.flatRateStreamingServices.map((item) => (
							<SwiperSlide key={`stream${item.provider_id}`}>
								<div
									className="provider-img provider-img-overlay"
									style={{
										backgroundImage: `url(https://image.tmdb.org/t/p/w500/${item.logo_path})`,
									}}
									title={item.provider_name}
								/>
							</SwiperSlide>
						))
					) : (
						<p>Currently unavailable to stream.</p>
					)}
				</div>
			</Swiper>

			<h2 className="platform-headings">Rent On</h2>
			<div className="heading-underline"></div>
			<Swiper
				ref={rentSwiperRef}
				spaceBetween={swiperSpaceBetween}
				grabCursor={swiperGrab}
				slidesPerView={"auto"}
				direction="horizontal"
				modules={[FreeMode]}
				freeMode={true}>
				<div className="provider-img-container">
					{props.rentStreamingServices.length > 0 ? (
						props.rentStreamingServices.map((item) => (
							<SwiperSlide key={`rent${item.provider_id}`}>
								<div
									className="provider-img provider-img-overlay"
									style={{
										backgroundImage: `url(https://image.tmdb.org/t/p/w500/${item.logo_path})`,
									}}
									title={item.provider_name}
								/>
							</SwiperSlide>
						))
					) : (
						<p>Currently unavailable for rent.</p>
					)}
				</div>
			</Swiper>
			<h2 className="platform-headings">Buy On</h2>
			<div className="heading-underline"></div>
			<Swiper
				ref={buySwiperRef}
				spaceBetween={swiperSpaceBetween}
				grabCursor={swiperGrab}
				slidesPerView={"auto"}
				direction="horizontal"
				modules={[FreeMode]}
				freeMode={true}>
				<div className="provider-img-container">
					{props.buyStreamingServices.length > 0 ? (
						props.buyStreamingServices.map((item) => (
							<SwiperSlide key={`buy ${item.provider_id}`}>
								<div
									className="provider-img provider-img-overlay"
									style={{
										backgroundImage: `url(https://image.tmdb.org/t/p/w500/${item.logo_path})`,
									}}
									title={item.provider_name}
								/>
							</SwiperSlide>
						))
					) : (
						<p>Currently unavailable for purchase.</p>
					)}
				</div>
			</Swiper>
		</div>
	);
};
