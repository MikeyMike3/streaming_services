import PropTypes from "prop-types";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

import YouTube from "react-youtube";

export const GeneralSwiper = (props) => {
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
		} else {
			return <p>No Videos Available.</p>;
		}
	};

	return (
		<div className="movie-show-video">
			<Swiper
				navigation={true}
				modules={[Navigation, Pagination]}
				pagination={{
					type: "progressbar",
				}}
				className="mySwiper">
				{renderTrailer()}
			</Swiper>
		</div>
	);
};
GeneralSwiper.propTypes = {
	array: PropTypes.array,
};
