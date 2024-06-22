import { Link, useLoaderData } from "react-router-dom";
import { MovieShowCard } from "../components/MovieShowCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";

export const Trending = () => {
	const trending = useLoaderData();

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
					freeMode={{
						freeMode: { enabled: true },
					}}>
					{trending[0].results.map((item) => (
						<SwiperSlide key={`trending${item.id}`}>
							<Link
								to={`${item.media_type}/${item.id.toString()}`}>
								<MovieShowCard
									genreIds={item.genre_ids}
									id={item.id}
									mediaType={item.media_type}
									overview={item.overview}
									posterPath={item.poster_path}
									backdropPath={item.backdrop_path}
									releaseDate={item.release_date}
									voteAverage={item.vote_average}
									title={item.title}
									name={item.name}
									movieGenres={trending[1].genres}
									showGenres={trending[2].genres}
								/>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</>
	);
};
