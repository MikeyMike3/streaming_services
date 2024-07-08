import { Link, useLoaderData } from "react-router-dom";
import { MovieShowCard } from "./MovieShowCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { HomeLoaderTuple } from "../types/homeTypes";

export const Trending = () => {
	const trending = useLoaderData() as HomeLoaderTuple;

	return (
		<>
			<div className="heading-flex">
				<h1>Trending Now</h1>
			</div>
			<div className="movie-show-flex">
				<Swiper
					grabCursor={true}
					spaceBetween={0}
					slidesPerView={"auto"}
					direction="horizontal"
					modules={[FreeMode]}
					freeMode={true}>
					{trending[0].results.map((item) => (
						<SwiperSlide key={`trending${item.id}`}>
							{"title" in item && (
								<Link
									to={`${item.media_type}/${item.id.toString()}`}>
									<MovieShowCard
										mediaType={item.media_type}
										posterPath={item.poster_path}
										title={item.title}
									/>
								</Link>
							)}
							{"name" in item && (
								<Link
									to={`${item.media_type}/${item.id.toString()}`}>
									<MovieShowCard
										mediaType={item.media_type}
										posterPath={item.poster_path}
										name={item.name}
									/>
								</Link>
							)}
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</>
	);
};
