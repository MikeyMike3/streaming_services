import { useEffect, useState, useRef } from "react";

import { Link, useLoaderData } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import { MovieShowCard } from "./MovieShowCard";
import { HomeLoaderTuple } from "../types/homeTypes";

export const PopularShowsSlider = () => {
	const loaderData = useLoaderData() as HomeLoaderTuple;
	const [popularShows, setPopularShows] = useState<HomeLoaderTuple | []>([]);
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
					freeMode={true}>
					{popularShows[4].results.map((item) => (
						<SwiperSlide key={`popularShows${item.id}`}>
							<Link to={`tv/${item.id.toString()}`}>
								<MovieShowCard
									mediaType={"tv"}
									posterPath={item.poster_path}
									name={item.name}
								/>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</>
	);
};
