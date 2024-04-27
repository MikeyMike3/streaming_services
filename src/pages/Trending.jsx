import { Link, useLoaderData } from "react-router-dom";
import { MovieShowCard } from "../components/MovieShowCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const Trending = () => {
	const trending = useLoaderData();

	return (
		<div className="movie-show-flex">
			<Swiper
				grabCursor={true}
				spaceBetween={10}
				slidesPerView={6.5}
				direction="horizontal">
				{trending[0].results.map((item) => (
					<SwiperSlide key={item.id}>
						<Link to={`${item.media_type}/${item.id.toString()}`}>
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
	);
};
