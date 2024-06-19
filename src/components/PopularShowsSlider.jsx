import { useEffect, useState, useRef } from "react";

import { Link, useLoaderData } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import { MovieShowCard } from "./MovieShowCard";

export const PopularShowsSlider = () => {
	const loaderData = useLoaderData();
	const [popularShows, setPopularShows] = useState([]);
	const [loading, setLoading] = useState(true);

	const swiperRef = useRef(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await loaderData;
				setPopularShows(data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, [loaderData]);

	if (loading) {
		return <div className="display-none">Loading...</div>;
	}

	if (
		!popularShows ||
		popularShows.length < 6 ||
		!popularShows[4] ||
		!popularShows[4].results
	) {
		return <div>Data not available</div>;
	}

	return (
		<>
			<div className="heading-flex">
				<h1>Popular Shows</h1>
				<button className="view-more-btn">
					<Link to={"tv"}>View More</Link>
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
					{popularShows[4].results.map((item) => (
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
									movieGenres={popularShows[1].genres}
									showGenres={popularShows[2].genres}
								/>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</>
	);
};
