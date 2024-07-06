import { useRef, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

import YouTube from "react-youtube";
import { VideoResults } from "../../types/movieShowInDepthTypes";

type VideoSwiperProps = {
	array: VideoResults[];
};

export const VideoSwiper = (props: VideoSwiperProps) => {
	const videoSwiperRef: any = useRef(null);

	useEffect(() => {
		if (videoSwiperRef.current && videoSwiperRef.current.swiper) {
			videoSwiperRef.current.swiper.slideTo(0);
		}
	}, [props.array]);

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
				<p>No videos available.</p>
			)}
		</div>
	);
};
