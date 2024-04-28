import { MovieShowCard } from "./MovieShowCard";
import { Link, useLoaderData } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { useEffect, useState } from "react";
import { options } from "../api/options";

export const TopRatedMovies = () => {
	const loaderData = useLoaderData();
	const [topRatedMovies, setTopRatedMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [pages, setPages] = useState(1);

	useEffect(() => {
		console.log("loaderData:", loaderData);
		const fetchData = async () => {
			try {
				const data = await loaderData;
				setTopRatedMovies(data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, [loaderData]);

	useEffect(() => {
		console.log("now playing", topRatedMovies);
	}, [topRatedMovies]);

	if (loading) {
		return <div>Loading...</div>;
	}

	// Ensure topRatedMovies[5] and topRatedMovies[5].results are defined
	if (
		!topRatedMovies ||
		topRatedMovies.length < 6 ||
		!topRatedMovies[3] ||
		!topRatedMovies[3].results
	) {
		return <div>Data not available</div>;
	}

	const handleClick = () => {
		const nextPage = pages + 1;
		fetch(
			`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${nextPage}`,
			options
		)
			.then((response) => response.json())
			.then((response) => {
				// Update only the 5th array's results property
				const updatedData = [...topRatedMovies];
				updatedData[3].results = [
					...updatedData[3].results,
					...response.results,
				];

				// Update the state with the modified array
				setTopRatedMovies(updatedData);

				// Update the page state
				setPages(nextPage);
			})
			.catch((err) => console.error(err));
	};

	return (
		<>
			<div className="heading-flex">
				<h1>Top Rated Movies:</h1>
				<button onClick={handleClick}>adw</button>
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
					{topRatedMovies[3].results.map((item) => (
						<SwiperSlide key={item.id}>
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
									movieGenres={topRatedMovies[1].genres}
									showGenres={topRatedMovies[2].genres}
								/>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</>
	);
};
