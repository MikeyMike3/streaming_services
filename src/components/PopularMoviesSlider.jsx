import { useEffect, useState, useRef } from "react";

import { Link, useLoaderData } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import { MovieShowCard } from "./MovieShowCard";

export const PopularMoviesSlider = () => {
	const loaderData = useLoaderData();
	const [popularMovies, setPopularMovies] = useState([]);
	const [loading, setLoading] = useState(true);

	const swiperRef = useRef(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await loaderData;
				setPopularMovies(data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, [loaderData]);

	useEffect(() => {}, [popularMovies]);

	if (loading) {
		return <div className="display-none">Loading...</div>;
	}

	// Ensure popularMovies[5] and popularMovies[5].results are defined
	if (
		!popularMovies ||
		popularMovies.length < 6 ||
		!popularMovies[3] ||
		!popularMovies[3].results
	) {
		return <div>Data not available</div>;
	}

	return (
		<>
			<div className="heading-flex">
				<h1>Popular Movies</h1>
				<button className="view-more-btn">
					<Link to={"movie"}>View More</Link>
				</button>
			</div>
			<div className="movie-show-flex">
				<Swiper
					ref={swiperRef}
					grabCursor={true}
					spaceBetween={0}
					slidesPerView={"auto"}
					direction="horizontal"
					modules={[FreeMode]}
					freeMode={{
						freeMode: { enabled: true },
					}}>
					{popularMovies[3].results.map((item) => (
						<SwiperSlide key={`popularMovies${item.id}`}>
							<Link to={`movie/${item.id.toString()}`}>
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
									movieGenres={popularMovies[1].genres}
									showGenres={popularMovies[2].genres}
								/>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</>
	);
};
