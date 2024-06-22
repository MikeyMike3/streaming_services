import PropTypes from "prop-types";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css";
import "swiper/css/free-mode";

const swiperSpaceBetween = 10;
const swiperGrab = true;

export const PlatformSlider = (props) => {
	return (
		<div className="platform-container">
			<h2 className="platform-headings">Stream On</h2>
			<div className="heading-underline"></div>
			<Swiper
				spaceBetween={swiperSpaceBetween}
				grabCursor={swiperGrab}
				slidesPerView={"auto"}
				direction="horizontal"
				modules={[FreeMode]}
				freeMode={{
					freeMode: { enabled: true },
				}}>
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
				spaceBetween={swiperSpaceBetween}
				grabCursor={swiperGrab}
				slidesPerView={"auto"}
				direction="horizontal"
				modules={[FreeMode]}
				freeMode={{
					freeMode: { enabled: true },
				}}>
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
				spaceBetween={swiperSpaceBetween}
				grabCursor={swiperGrab}
				slidesPerView={"auto"}
				direction="horizontal"
				modules={[FreeMode]}
				freeMode={{
					freeMode: { enabled: true },
				}}>
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
PlatformSlider.propTypes = {
	buyStreamingServices: PropTypes.array,
	rentStreamingServices: PropTypes.array,
	flatRateStreamingServices: PropTypes.array,
};
