import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const Hero = () => {
	const loaderData = useLoaderData();
	const [nowPlaying, setNowPlaying] = useState([]);
	const [loading, setLoading] = useState(true);

	const formatRating = (rating) => {
		let percentage = 0;
		const parsedRating = parseFloat(rating) * 10;

		const roundedRating = Math.round(parsedRating);

		percentage = roundedRating.toString();
		return percentage;
	};

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

	return (
		<>
			<div className="hero-container">
				<Swiper
					grabCursor={true}
					spaceBetween={0}
					slidesPerView={1}
					direction="horizontal"
					autoplay={{
						delay: 8000,
						disableOnInteraction: false,
					}}
					modules={[Autoplay]}>
					{nowPlaying[5].results.map((item) => (
						<SwiperSlide key={item.id}>
							<div
								className="hero-backdrop hero-overlay"
								style={{
									backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.backdrop_path})`,
								}}>
								<div className="hero-wrapper">
									<div className="hero-details-container">
										<h2 className="hero-title">
											{item.title || item.name}
										</h2>

										<div className="hero-genres-container">
											<div className="movie-show-rating">
												<CircularProgressbar
													value={formatRating(
														item.vote_average
													)}
													text={`${formatRating(
														item.vote_average
													)}`}
													styles={buildStyles({
														textSize: "30px",
														textColor: "white",
														trailColor: "white",
														pathColor: "aqua",
													})}
												/>
											</div>

											{item.genre_ids.map((genreId) => {
												return loaderData[1].genres.map(
													(loaderGenre) => {
														return loaderGenre.id ===
															genreId ? (
															<p className="movie-show-genres">
																{
																	loaderGenre.name
																}
															</p>
														) : null;
													}
												);
											})}
										</div>

										<p className="hero-overview">
											{item.overview}
										</p>

										<Link
											to={`/movie/${item.id.toString()}`}>
											<button className=" hero-btn">
												More Details
											</button>
										</Link>
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</>
	);
};
