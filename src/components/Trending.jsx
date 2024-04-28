import { Link, useLoaderData } from "react-router-dom";
import { MovieShowCard } from "../components/MovieShowCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { useEffect, useState } from "react";
import { options } from "../api/options";

export const Trending = () => {
	const loaderData = useLoaderData();
	const [trending, setTrending] = useState([]);
	const [loading, setLoading] = useState(true);
	const [pages, setPages] = useState(1);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await loaderData;
				setTrending(data);
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

	// Ensure trending[5] and nowPlaying[5].results are defined
	if (
		!trending ||
		trending.length < 6 ||
		!trending[0] ||
		!trending[0].results
	) {
		return <div>Data not available</div>;
	}

	// const handleClick = () => {
	// 	const nextPage = pages + 1;
	// 	fetch(
	// 		`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${nextPage}`,
	// 		options
	// 	)
	// 		.then((response) => response.json())
	// 		.then((response) => {
	// 			// Update only the 0th array's results property
	// 			const updatedData = [...trending];
	// 			updatedData[0].results = [
	// 				...updatedData[0].results,
	// 				...response.results,
	// 			];

	// 			// Update the state with the modified array
	// 			setTrending(updatedData);

	// 			// Update the page state
	// 			setPages(nextPage);
	// 		})
	// 		.catch((err) => console.error(err));
	// };

	return (
		<>
			<div className="heading-flex">
				<h1>Trending Now:</h1>
				{/* <button onClick={handleClick}>adw</button> */}
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
					{trending[0].results.map((item) => (
						<SwiperSlide key={item.id}>
							<Link
								to={`${item.media_type}/${item.id.toString()}`}>
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
		</>
	);
};
