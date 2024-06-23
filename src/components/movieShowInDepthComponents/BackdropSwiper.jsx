import PropTypes from "prop-types";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const BackdropSwiper = (props) => {
	return (
		<div className="movie-show-video">
			<Swiper
				navigation={true}
				grabCursor={"true"}
				modules={[Navigation, Pagination]}
				pagination={{
					type: "progressbar",
				}}
				className="mySwiper">
				{props.array.backdrops.map((item) => (
					<SwiperSlide key={item.file_path}>
						<div
							className="backdrop-image"
							style={{
								backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.file_path})`,
							}}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

BackdropSwiper.propTypes = {
	array: PropTypes.object,
};
