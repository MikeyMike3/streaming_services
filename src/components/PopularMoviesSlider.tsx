import { useEffect, useState, useRef } from "react";

import { Link, useLoaderData } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import { MovieShowCard } from "./MovieShowCard";

import { HomeLoaderTuple } from "../types/homeTypes";

export const PopularMoviesSlider = () => {
	const loaderData = useLoaderData() as HomeLoaderTuple;
	const [popularMovies, setPopularMovies] = useState<HomeLoaderTuple>();
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
					freeMode={true}>
					{popularMovies[3].results.map((item) => (
						<SwiperSlide key={`popularMovies${item.id}`}>
							<Link to={`movie/${item.id.toString()}`}>
								<MovieShowCard
									mediaType={"movie"}
									posterPath={item.poster_path}
									title={item.title}
								/>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</>
	);
};
