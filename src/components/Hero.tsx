import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import {
	HomeLoader0,
	HomeLoader1,
	HomeLoader2,
	HomeLoader3,
	HomeLoader4,
	HomeLoader5,
	HomeLoaderMovieResults,
	HomeLoaderShowResults,
} from "../types/homeTypes";

type HomeLoader =
	| HomeLoader0
	| HomeLoader1
	| HomeLoader2
	| HomeLoader3
	| HomeLoader4
	| HomeLoader5;

type HomeLoaderMovieShow =
	| HomeLoader5[]
	| HomeLoader4[]
	| HomeLoader3[]
	| HomeLoader0[];

type HomeLoaderGenre = HomeLoader1[] | HomeLoader2[];

type HeroProps = {
	loaderData: HomeLoader[];
	loaderIndex: number;
	genreIndex: number;
	mediaType: string;
};

function isMovie(
	details: HomeLoaderMovieResults | HomeLoaderShowResults
): details is HomeLoaderMovieResults {
	return (details as HomeLoaderMovieResults).title !== undefined;
}

function isShow(
	details: HomeLoaderMovieResults | HomeLoaderShowResults
): details is HomeLoaderShowResults {
	return (details as HomeLoaderShowResults).name !== undefined;
}

export const Hero = (props: HeroProps) => {
	const [nowPlaying, setNowPlaying] = useState<HomeLoader[]>([]);

	const formatRating = (rating: number): number => {
		const roundedRating = Math.round(rating);

		return roundedRating;
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await props.loaderData;
				setNowPlaying(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [props.loaderData]);

	// Ensure nowPlaying[5] and nowPlaying[5].results are defined
	if (
		!nowPlaying ||
		nowPlaying.length < 6 ||
		!nowPlaying[5] ||
		!(nowPlaying as HomeLoader5[])[5].results
	) {
		return null;
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
					{(nowPlaying as HomeLoaderMovieShow)[
						props.loaderIndex
					].results.map((item) => (
						<SwiperSlide key={`hero${item.id}`}>
							<div
								className="hero-backdrop hero-overlay"
								style={{
									backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.backdrop_path})`,
								}}>
								<div className="hero-wrapper">
									<div className="hero-details-container">
										<h2 className="hero-title">
											{isMovie(item)
												? item.title
												: item.name}
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
												return (
													props.loaderData as HomeLoaderGenre
												)[props.genreIndex].genres.map(
													(loaderGenre) => {
														return loaderGenre.id ===
															genreId ? (
															<p
																key={
																	loaderGenre.id
																}
																className="movie-show-genres">
																{
																	loaderGenre.name
																}
															</p>
														) : null;
													}
												);
											})}
										</div>

										{item.overview.length > 0 ? (
											<p className="hero-overview">
												{item.overview}
											</p>
										) : (
											<p className="hero-overview">
												Overview not available.
											</p>
										)}

										<Link
											to={`/${
												props.mediaType
											}/${item.id.toString()}`}>
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
