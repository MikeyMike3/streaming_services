import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

export const PosterSlider = (props) => {
	return (
		<div className="poster-container">
			<Swiper
				slidesPerView={"auto"}
				grabCursor={"true"}
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
		</div>
	);
};
