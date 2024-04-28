import { MovieShowCard } from "./MovieShowCard";
import { Link, useLoaderData } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

export const TopRatedShows = () => {
	const topRatedShows = useLoaderData();
	return (
		<div className="movie-show-flex">
			<Swiper
				grabCursor={true}
				spaceBetween={10}
				slidesPerView={"auto"}
				direction="horizontal"
				modules={[FreeMode]}
				freeMode={{
					freeMode: { enabled: true },
				}}>
				{topRatedShows[4].results.map((item) => (
					<SwiperSlide key={item.id}>
						<Link to={`tv/${item.id.toString()}`}>
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
								movieGenres={topRatedShows[1].genres}
								showGenres={topRatedShows[2].genres}
							/>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
