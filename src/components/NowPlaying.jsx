import { MovieShowCard } from "./MovieShowCard";
import { Link, useLoaderData } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { useEffect, useState } from "react";

const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDZmMTNhYzg4ZWFkNmM0MTBmYmEzMDM3NWZiYTJhNyIsInN1YiI6IjY2MjJjYjdmOTYwY2RlMDEzMWE2MTJmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NppGm2uYC8Gg7Pe0eUTVPYgwr3M9dw3JWk-8BgO-mtk",
	},
};

export const NowPlaying = () => {
	const loaderData = useLoaderData();
	const [nowPlaying, setNowPlaying] = useState([]);
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
		return <div>Loading...</div>;
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
				const updatedData = [...nowPlaying];
				updatedData[5].results = [
					...updatedData[5].results,
					...response.results,
				];

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
				<h1>Now Playing In Theatres:</h1>
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
					{nowPlaying[5].results.map((item) => (
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
									movieGenres={nowPlaying[1].genres}
									showGenres={nowPlaying[2].genres}
								/>
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</>
	);
};
