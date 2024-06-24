import PropTypes from "prop-types";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

export const PosterSwiper = (props) => {
	return (
		<div className="poster-container">
			{props.array.posters.length > 0 ? (
				<Swiper
					slidesPerView={"auto"}
					grabCursor={"true"}
					spaceBetween={10}
					modules={[FreeMode]}
					freeMode={{
						freeMode: true,
					}}
					className="mySwiper">
					{props.array.posters.map((item) => (
						<SwiperSlide key={item.file_path}>
							<div
								className="poster-image"
								style={{
									backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.file_path})`,
								}}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			) : (
				<p>No posters available.</p>
			)}
		</div>
	);
};

PosterSwiper.propTypes = {
	array: PropTypes.object,
};
