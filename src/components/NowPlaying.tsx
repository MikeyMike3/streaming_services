import { MovieShowCard } from "./MovieShowCard";
import { Link, useLoaderData } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { useEffect, useState } from "react";
import { options } from "../api/options";
import { HomeLoaderTuple } from "../types/homeTypes";

export const NowPlaying = () => {
	const loaderData = useLoaderData() as HomeLoaderTuple;
	const [nowPlaying, setNowPlaying] = useState<HomeLoaderTuple>();
	const [loading, setLoading] = useState(true);
	const [pages, setPages] = useState(1);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await loaderData;
				setNowPlaying(data);
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

	// Ensure nowPlaying[5] and nowPlaying[5].results are defined
	if (
		!nowPlaying ||
		nowPlaying.length < 6 ||
		!nowPlaying[5] ||
		!nowPlaying[5].results
	) {
		return <div>Data not available</div>;
	}

	const handleClick = () => {
		const nextPage = pages + 1;
		fetch(
			`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${nextPage}`,
			options
		)
			.then((response) => response.json())
			.then((response) => {
				// Update only the 5th array's results property
				const updatedData: HomeLoaderTuple = [...nowPlaying];
				if (updatedData[5]) {
					updatedData[5].results = [
						...updatedData[5].results,
						...response.results,
					];
				}

				// Update the state with the modified array
				setNowPlaying(updatedData);

				// Update the page state
				setPages(nextPage);
			})
			.catch((err) => console.error(err));
	};

	return (
		<>
			<div className="heading-flex">
				<h1>Now Playing In Theatres</h1>
				<button className="view-more-btn" onClick={handleClick}>
					View More
				</button>
			</div>
			<div className="movie-show-flex">
				<Swiper
					grabCursor={true}
					spaceBetween={0}
					slidesPerView={"auto"}
					direction="horizontal"
					modules={[FreeMode]}
					freeMode={true}>
					{nowPlaying[5].results.map((item) => (
						<SwiperSlide key={item.id}>
							<Link to={`movie/${item.id.toString()}`}>
								<MovieShowCard
									posterPath={item.poster_path}
									mediaType={"movie"}
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
