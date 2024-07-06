import { useRef, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import { MovieShowDetailsMovie5 } from "../../types/movieShowInDepthTypes";

type PosterSwiperProps = {
	array: MovieShowDetailsMovie5;
};

export const PosterSwiper = (props: PosterSwiperProps) => {
	const posterSwiperRef: any = useRef(null);

	useEffect(() => {
		if (posterSwiperRef.current && posterSwiperRef.current.swiper) {
			posterSwiperRef.current.swiper.slideTo(0);
		}
	}, [props.array.posters]);

	return (
		<div className="poster-container">
			{props.array.posters !== null && props.array.posters.length > 0 ? (
				<Swiper
					ref={posterSwiperRef}
					slidesPerView={"auto"}
					grabCursor={true}
					spaceBetween={10}
					modules={[FreeMode]}
					freeMode={true}
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
