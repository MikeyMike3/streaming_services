import { MovieShowCard } from "./MovieShowCard";
import { Link, useLoaderData } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { useEffect, useState, useRef } from "react";
import { options } from "../api/options";

export const PopularMovies = () => {
	const loaderData = useLoaderData();
	const [popularMovies, setPopularMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [pages, setPages] = useState(1);

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

	const handleClick = () => {
		const nextPage = pages + 1;
		fetch(
			`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${nextPage}`,
			options
		)
			.then((response) => response.json())
			.then((response) => {
				// Update only the 5th array's results property
				const updatedData = [...popularMovies];
				updatedData[3].results = [
					...updatedData[3].results,
					...response.results,
				];

				// Update the state with the modified array
				setPopularMovies(updatedData);

				// Update the page state
				setPages(nextPage);

				swiperRef.current.swiper.update();

				setTimeout(() => {
					swiperRef.current.swiper.slideTo(
						swiperRef.current.swiper.slides.length - 21
					);
				}, 50);
			})
			.catch((err) => console.error(err));
	};

	return (
		<>
			<div className="heading-flex">
				<h1>Popular Movies</h1>
				<button className="view-more-btn" onClick={handleClick}>
					View More
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
