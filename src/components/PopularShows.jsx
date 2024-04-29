import { MovieShowCard } from "./MovieShowCard";
import { Link, useLoaderData } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { useEffect, useState } from "react";
import { options } from "../api/options";

export const PopularShows = () => {
	const loaderData = useLoaderData();
	const [popularShows, setPopularShows] = useState([]);
	const [loading, setLoading] = useState(true);
	const [pages, setPages] = useState(1);

	useEffect(() => {
		console.log("loaderData:", loaderData);
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
		return <div>Loading...</div>;
	}

	if (
		!popularShows ||
		popularShows.length < 6 ||
		!popularShows[4] ||
		!popularShows[4].results
	) {
		return <div>Data not available</div>;
	}

	const handleClick = () => {
		const nextPage = pages + 1;
		fetch(
			`https://api.themoviedb.org/3/tv/popular?language=en-US&page=${nextPage}`,
			options
		)
			.then((response) => response.json())
			.then((response) => {
				// Update only the 5th array's results property
				const updatedData = [...popularShows];
				updatedData[4].results = [
					...updatedData[4].results,
					...response.results,
				];

				// Update the state with the modified array
				setPopularShows(updatedData);

				// Update the page state
				setPages(nextPage);
			})
			.catch((err) => console.error(err));
	};
	return (
		<>
			<div className="heading-flex">
				<h1>Popular Shows:</h1>
				<button onClick={handleClick}>See More</button>
			</div>
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
