import { useRef, useEffect } from "react";

import PropTypes from "prop-types";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

import YouTube from "react-youtube";

export const VideoSwiper = (props) => {
	const videoSwiperRef = useRef(null);

	useEffect(() => {
		if (videoSwiperRef.current && videoSwiperRef.current.swiper) {
			videoSwiperRef.current.swiper.slideTo(0);
		}
	}, [props.array.posters]);

	const renderTrailer = () => {
		if (props.array.length > 0) {
			return props.array.map((item, index) => {
				const key = item.key ? item.key : props.array[0].key;
				return (
					<SwiperSlide key={index}>
						<YouTube videoId={key} className="youtube-trailer" />
					</SwiperSlide>
				);
			});
		}
	};

	return (
		<div className="movie-show-video">
			{props.array.length > 0 ? (
				<Swiper
					ref={videoSwiperRef}
					navigation={true}
					modules={[Navigation, Pagination]}
					pagination={{
						type: "progressbar",
					}}
					className="mySwiper">
					{renderTrailer()}
				</Swiper>
			) : (
				<p>No Videos Available.</p>
			)}
		</div>
	);
};
VideoSwiper.propTypes = {
	array: PropTypes.array,
};
