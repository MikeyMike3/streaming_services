import { useRef, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MovieShowDetailsMovie5 } from "../../pages/MovieShowInDepth";

type BackdropSwiperProps = {
	array: MovieShowDetailsMovie5;
};

export const BackdropSwiper = (props: BackdropSwiperProps) => {
	const backdropSwiperRef: any = useRef(null);

	useEffect(() => {
		if (backdropSwiperRef.current && backdropSwiperRef.current.swiper) {
			backdropSwiperRef.current.swiper.slideTo(0);
		}
	}, [props.array.posters]);

	return (
		<div className="movie-show-video">
			{props.array.backdrops !== null &&
			props.array.backdrops.length > 0 ? (
				<Swiper
					ref={backdropSwiperRef}
					navigation={true}
					grabCursor={true}
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
			) : (
				<p>No backdrops available.</p>
			)}
		</div>
	);
};
