import { useEffect, useState } from "react";
import {
	useLoaderData,
	useParams,
	useNavigation,
	Link,
} from "react-router-dom";
import { BarLoader } from "react-spinners";
import YouTube from "react-youtube";
import { options } from "../api/options";
import poster from "../imgs/tmdbPoster.jpg";
import { MovieShowCard } from "../components/MovieShowCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FreeMode, Navigation, Pagination } from "swiper/modules";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const MovieShowInDepth = () => {
	const { id, mediaType } = useParams();
	const movieShowDetails = useLoaderData();
	const navigation = useNavigation();

	const [movieShowId, setMovieShowId] = useState(0);

	const [backToTop, setBackToTop] = useState(true);
	const [pages, setPages] = useState(1);

	const [flatRateStreamingServices, setFlatRateStreamingServices] = useState(
		[]
	);
	const [buyStreamingServices, setBuyStreamingServices] = useState([]);
	const [rentStreamingServices, setRentStreamingServices] = useState([]);

	const [credits, setCredits] = useState([]);
	const [similar, setSimilar] = useState([]);

	const isEmpty = (obj) => {
		return Object.keys(obj).length === 0;
	};

	if (backToTop) {
		window.scrollTo(0, 0);
	}

	useEffect(() => {
		if (mediaType !== "person") {
			if (!isEmpty(movieShowDetails[1].results)) {
				if (typeof movieShowDetails[1].results.US !== "undefined") {
					if (
						typeof movieShowDetails[1].results.US.flatrate !==
						"undefined"
					) {
						setFlatRateStreamingServices(
							movieShowDetails[1].results.US.flatrate
						);
					}
				}
			}
		}
	}, [movieShowDetails, mediaType]);

	useEffect(() => {
		if (mediaType !== "person") {
			if (!isEmpty(movieShowDetails[1].results)) {
				if (typeof movieShowDetails[1].results.US !== "undefined") {
					if (
						typeof movieShowDetails[1].results.US.buy !==
						"undefined"
					) {
						setBuyStreamingServices(
							movieShowDetails[1].results.US.buy
						);
					}
				}
			}
		}
	}, [movieShowDetails, mediaType]);

	useEffect(() => {
		if (mediaType !== "person") {
			if (!isEmpty(movieShowDetails[1].results)) {
				if (typeof movieShowDetails[1].results.US !== "undefined") {
					if (
						typeof movieShowDetails[1].results.US.rent !==
						"undefined"
					) {
						setRentStreamingServices(
							movieShowDetails[1].results.US.rent
						);
					}
				}
			}
		}
	}, [movieShowDetails, mediaType]);

	const renderTrailer = () => {
		if (movieShowDetails[3].results.length > 0) {
			return movieShowDetails[3].results.map((item, index) => {
				const key = item.key
					? item.key
					: movieShowDetails[3].results[0].key;
				return (
					<SwiperSlide key={index}>
						<YouTube videoId={key} className="youtube-trailer" />
					</SwiperSlide>
				);
			});
		} else {
			return <p>No Videos Available.</p>;
		}
	};

	useEffect(() => {
		if (mediaType !== "person") {
			if (typeof movieShowDetails[2].cast !== "undefined") {
				const filteredCast = movieShowDetails[2].cast.filter(
					(actor) => actor.known_for_department === "Acting"
				);
				setCredits(filteredCast);
			}
		}
	}, [movieShowDetails, mediaType]);

	useEffect(() => {
		if (mediaType !== "person") {
			if (!isEmpty(movieShowDetails[4].results)) {
				setSimilar(movieShowDetails[4].results);
			}
		}
	}, [movieShowDetails, mediaType]);

	useEffect(() => {
		setMovieShowId(id);
	}, [id]);

	const resetState = () => {
		setBackToTop(true);
		setPages(1);
		setMovieShowId(0);
	};

	const handleClick = () => {
		const nextPage = pages + 1;
		setBackToTop(false);

		if (mediaType === "movie") {
			fetch(
				`https://api.themoviedb.org/3/movie/${movieShowId}/recommendations?language=en-US&page=${nextPage}`,
				options
			)
				.then((response) => response.json())
				.then((response) => {
					setSimilar((prevState) => [
						...prevState,
						...response.results,
					]);

					setPages(nextPage);
				})
				.catch((err) => console.error(err));
		} else if (mediaType === "tv") {
			fetch(
				`https://api.themoviedb.org/3/tv/${movieShowId}/recommendations?language=en-US&page=${nextPage}`,
				options
			)
				.then((response) => response.json())
				.then((response) => {
					setSimilar((prevState) => [
						...prevState,
						...response.results,
					]);
					setPages(nextPage);
				})
				.catch((err) => console.error(err));
		}
	};

	const backdropImageContainer = {
		backgroundImage: `url(${`https://image.tmdb.org/t/p/original/${movieShowDetails[0].backdrop_path}.jpg`})`,
	};

	const backdropImagePlaceHolderContainer = {
		backgroundImage: `url(${poster})`,
	};

	const formatRating = (rating) => {
		const parsedRating = parseFloat(rating);

		const roundedRating = Math.round(parsedRating);

		return roundedRating.toString();
	};

	const percentage = formatRating(movieShowDetails[0].vote_average * 10);

	return (
		<>
			{navigation.state === "loading" ? (
				<div className="loader-container">
					<div className="bar-loader">
						<BarLoader
							color={"aqua"}
							width={"100%"}
							height={8}
							speedMultiplier={1}
						/>
					</div>
					<div className="site-logo">
						<h1>
							<span className="retro">Retro</span>Flix
						</h1>
					</div>
				</div>
			) : null}
			{mediaType === "movie" && (
				<>
					{movieShowDetails[0].backdrop_path === null ? (
						<div
							className="movie-show-details-backdrop movie-show-details-backdrop-overlay"
							style={backdropImagePlaceHolderContainer}></div>
					) : (
						<div
							className="movie-show-details-backdrop movie-show-details-backdrop-overlay"
							style={backdropImageContainer}></div>
					)}

					<div className="wrapper">
						<div className="movie-show-details-container">
							<div className="movie-show-details-poster">
								{movieShowDetails[0].poster_path === null ? (
									<img
										src={poster}
										alt="movie poster placeholder"
									/>
								) : (
									<img
										src={`https://image.tmdb.org/t/p/w500/${movieShowDetails[0].poster_path}.jpg`}
										alt="movie poster"
									/>
								)}
							</div>
							<div className="movie-show-details">
								<h2 className="movie-show-title">
									{movieShowDetails[0].title}
								</h2>
								{typeof movieShowDetails[0].genres !==
									"undefined" && (
									<div className="movie-show-genres-container">
										<p className="movie-show-rating">
											<CircularProgressbar
												value={percentage}
												text={`${percentage}`}
												styles={buildStyles({
													textSize: "30px",
													textColor: "white",
													trailColor: "white",
													pathColor: "aqua",
												})}
											/>
										</p>
										{movieShowDetails[0].genres.map(
											(item) => (
												<p
													className="movie-show-genres"
													key={item.id}>
													{item.name}
												</p>
											)
										)}
									</div>
								)}

								<p className="movie-show-overview">
									{movieShowDetails[0].overview}
								</p>

								<h1 className="heading">Cast</h1>
								<div className="heading-underline"></div>
								<div className="cast-card-container">
									<Swiper
										grabCursor={true}
										spaceBetween={0}
										slidesPerView={"auto"}
										direction="horizontal"
										modules={[FreeMode]}
										freeMode={{
											freeMode: { enabled: true },
										}}>
										{credits.map((item) => (
											<SwiperSlide key={item.id}>
												<Link
													to={`/person/${item.id.toString()}`}>
													<div
														key={item.cast_id}
														className="cast-card">
														{item.profile_path ===
														null ? (
															<img
																className="cast-card-img"
																src={poster}
																alt="movie poster"
															/>
														) : (
															<img
																className="cast-card-img"
																src={`https://image.tmdb.org/t/p/w500/${item.profile_path}.jpg`}
																alt="movie poster"
															/>
														)}
														<div className="cast-info">
															<p>{item.name}</p>
														</div>
													</div>
												</Link>
											</SwiperSlide>
										))}
									</Swiper>
								</div>
							</div>
						</div>

						<div className="platform-container">
							<h2 className="platform-headings">Stream On</h2>
							<div className="heading-underline"></div>
							<div className="provider-img-container">
								{flatRateStreamingServices.length > 0 ? (
									flatRateStreamingServices.map((item) => (
										<div key={item.provider_id}>
											<div
												className="provider-img provider-img-overlay"
												style={{
													backgroundImage: `url(https://image.tmdb.org/t/p/w500/${item.logo_path})`,
												}}
												title={item.provider_name}
											/>
										</div>
									))
								) : (
									<p>Currently unavailable to stream.</p>
								)}
							</div>

							<h2 className="platform-headings">Buy On</h2>
							<div className="heading-underline"></div>
							<div className="provider-img-container">
								{buyStreamingServices.length > 0 ? (
									buyStreamingServices.map((item) => (
										<div key={item.provider_id}>
											<div
												className="provider-img provider-img-overlay"
												style={{
													backgroundImage: `url(https://image.tmdb.org/t/p/w500/${item.logo_path})`,
												}}
												title={item.provider_name}
											/>
										</div>
									))
								) : (
									<p>Currently unavailable for purchase.</p>
								)}
							</div>
							<h2 className="platform-headings">Rent On</h2>
							<div className="heading-underline"></div>
							<div className="provider-img-container">
								{rentStreamingServices.length > 0 ? (
									rentStreamingServices.map((item) => (
										<div key={item.provider_id}>
											<div
												className="provider-img provider-img-overlay"
												style={{
													backgroundImage: `url(https://image.tmdb.org/t/p/w500/${item.logo_path})`,
												}}
												title={item.provider_name}
											/>
										</div>
									))
								) : (
									<p>Currently unavailable for rent.</p>
								)}
							</div>
						</div>
						<h1 className="heading">Videos</h1>
						<div className="heading-underline"></div>
						<div className="movie-show-video">
							<Swiper
								navigation={true}
								loop={true}
								modules={[Navigation, Pagination]}
								pagination={{
									type: "progressbar",
									clickable: { enabled: true },
								}}
								className="mySwiper">
								{renderTrailer()}
							</Swiper>
						</div>
						<h1 className="similar-movies-heading">
							Similar Movies
						</h1>
						<div className="heading-underline"></div>
						<div className="search-grid">
							{similar.map((item) => (
								<Link
									onClick={resetState}
									key={item.id}
									to={`/movie/${item.id.toString()}`}>
									<MovieShowCard
										genreIds={item.genre_ids}
										id={item.id}
										mediaType={item.media_type}
										overview={item.overview}
										posterPath={item.poster_path}
										profilePath={item.profile_path}
										backdropPath={item.backdrop_path}
										releaseDate={item.release_date}
										voteAverage={item.vote_average}
										title={item.title}
										name={item.name}
										movieGenres={item.genre_ids}
										showGenres={item.genre_ids}
									/>
								</Link>
							))}
						</div>

						<div className="view-more-btn-container">
							<button
								className="view-more-btn view-more-btn-in-depth"
								onClick={handleClick}>
								View More
							</button>
						</div>
					</div>
				</>
			)}
			{mediaType === "tv" && (
				<>
					{movieShowDetails[0].backdrop_path === null ? (
						<div
							className="movie-show-details-backdrop movie-show-details-backdrop-overlay"
							style={backdropImagePlaceHolderContainer}></div>
					) : (
						<div
							className="movie-show-details-backdrop movie-show-details-backdrop-overlay"
							style={backdropImageContainer}></div>
					)}

					<div className="wrapper">
						<div className="movie-show-details-container">
							<div className="movie-show-details-poster">
								{movieShowDetails[0].poster_path === null ? (
									<img
										src={poster}
										alt="movie poster placeholder"
									/>
								) : (
									<img
										src={`https://image.tmdb.org/t/p/w500/${movieShowDetails[0].poster_path}.jpg`}
										alt="movie poster"
									/>
								)}
							</div>
							<div className="movie-show-details">
								<h2 className="movie-show-title">
									{movieShowDetails[0].name}
								</h2>
								{typeof movieShowDetails[0].genres !==
									"undefined" && (
									<div className="movie-show-genres-container">
										<p className="movie-show-rating">
											<CircularProgressbar
												value={percentage}
												text={`${percentage}`}
												styles={buildStyles({
													textSize: "30px",
													textColor: "white",
													trailColor: "white",
													pathColor: "aqua",
												})}
											/>
										</p>
										{movieShowDetails[0].genres.map(
											(item) => (
												<p
													className="movie-show-genres"
													key={item.id}>
													{item.name}
												</p>
											)
										)}
									</div>
								)}

								<p className="movie-show-overview">
									{movieShowDetails[0].overview}
								</p>
								{/* <div className="movie-show-trailer">
									{renderTrailer()}
								</div> */}
								<h1 className="heading">Cast</h1>
								<div className="heading-underline"></div>
								<div className="cast-card-container">
									<Swiper
										grabCursor={true}
										spaceBetween={0}
										slidesPerView={"auto"}
										direction="horizontal"
										modules={[FreeMode]}
										freeMode={{
											freeMode: { enabled: true },
										}}>
										{credits.map((item) => (
											<SwiperSlide key={item.id}>
												<Link
													to={`/person/${item.id.toString()}`}>
													<div
														key={item.cast_id}
														className="cast-card">
														{item.profile_path ===
														null ? (
															<img
																className="cast-card-img"
																src={poster}
																alt="movie poster"
															/>
														) : (
															<img
																className="cast-card-img"
																src={`https://image.tmdb.org/t/p/w500/${item.profile_path}.jpg`}
																alt="movie poster"
															/>
														)}
														<div className="cast-info">
															<p>{item.name}</p>
														</div>
													</div>
												</Link>
											</SwiperSlide>
										))}
									</Swiper>
								</div>
							</div>
						</div>

						<div className="platform-container">
							<h2 className="platform-headings">Stream On</h2>
							<div className="heading-underline"></div>
							<div className="provider-img-container">
								{flatRateStreamingServices.length > 0 ? (
									flatRateStreamingServices.map((item) => (
										<div key={item.provider_id}>
											<div
												className="provider-img provider-img-overlay"
												style={{
													backgroundImage: `url(https://image.tmdb.org/t/p/w500/${item.logo_path})`,
												}}
												title={item.provider_name}
											/>
										</div>
									))
								) : (
									<p>Currently unavailable to stream.</p>
								)}
							</div>

							<h2 className="platform-headings">Buy On</h2>
							<div className="heading-underline"></div>
							<div className="provider-img-container">
								{buyStreamingServices.length > 0 ? (
									buyStreamingServices.map((item) => (
										<div key={item.provider_id}>
											<div
												className="provider-img provider-img-overlay"
												style={{
													backgroundImage: `url(https://image.tmdb.org/t/p/w500/${item.logo_path})`,
												}}
												title={item.provider_name}
											/>
										</div>
									))
								) : (
									<p>Currently unavailable for purchase.</p>
								)}
							</div>
							<h2 className="platform-headings">Rent On</h2>
							<div className="heading-underline"></div>
							<div className="provider-img-container">
								{rentStreamingServices.length > 0 ? (
									rentStreamingServices.map((item) => (
										<div key={item.provider_id}>
											<div
												className="provider-img provider-img-overlay"
												style={{
													backgroundImage: `url(https://image.tmdb.org/t/p/w500/${item.logo_path})`,
												}}
												title={item.provider_name}
											/>
										</div>
									))
								) : (
									<p>Currently unavailable for rent.</p>
								)}
							</div>
						</div>
						<h1 className="heading">Videos</h1>
						<div className="heading-underline"></div>
						<div className="movie-show-video">
							<Swiper
								navigation={true}
								loop={true}
								modules={[Navigation, Pagination]}
								pagination={{
									type: "progressbar",
									clickable: { enabled: true },
								}}
								className="mySwiper">
								{renderTrailer()}
							</Swiper>
						</div>
						<h1 className="similar-movies-heading">
							Similar Shows
						</h1>
						<div className="heading-underline"></div>
						<div className="search-grid">
							{similar.map((item) => (
								<Link
									onClick={resetState}
									key={item.id}
									to={`/tv/${item.id.toString()}`}>
									<MovieShowCard
										genreIds={item.genre_ids}
										id={item.id}
										mediaType={item.media_type}
										overview={item.overview}
										posterPath={item.poster_path}
										profilePath={item.profile_path}
										backdropPath={item.backdrop_path}
										releaseDate={item.release_date}
										voteAverage={item.vote_average}
										title={item.title}
										name={item.name}
										movieGenres={item.genre_ids}
										showGenres={item.genre_ids}
									/>
								</Link>
							))}
						</div>

						<div className="view-more-btn-container">
							<button
								className="view-more-btn view-more-btn-in-depth"
								onClick={handleClick}>
								View More
							</button>
						</div>
					</div>
				</>
			)}
			{mediaType === "person" && (
				<>
					<h1>{movieShowDetails[0].name}</h1>
					<p>{movieShowDetails[0].biography}</p>
					<p>{movieShowDetails[0].place_of_birth}</p>
					<p>{movieShowDetails[0].birthday}</p>
					<p>{movieShowDetails[0].deathday}</p>
					{movieShowDetails[0].profile_path === null ? (
						<img
							src={poster}
							alt={`${movieShowDetails[0].name} placeholder picture`}
						/>
					) : (
						<img
							src={`https://image.tmdb.org/t/p/w500/${movieShowDetails[0].profile_path}.jpg`}
							alt={`${movieShowDetails[0].name} picture`}
						/>
					)}
					<h3>Known Department:</h3>
					{movieShowDetails[0].known_for_department}

					<h3>Known Movies/Shows:</h3>
					<div className="search-grid">
						{movieShowDetails[1].cast.map((item) => (
							<Link
								onClick={resetState}
								key={item.id}
								to={`/${
									item.media_type
								}/${item.id.toString()}`}>
								<MovieShowCard
									genreIds={item.genre_ids}
									id={item.id}
									mediaType={item.media_type}
									overview={item.overview}
									posterPath={item.poster_path}
									profilePath={item.profile_path}
									backdropPath={item.backdrop_path}
									releaseDate={item.release_date}
									voteAverage={item.vote_average}
									title={item.title}
									name={item.name}
									movieGenres={item.genre_ids}
									showGenres={item.genre_ids}
								/>
							</Link>
						))}
					</div>
				</>
			)}
		</>
	);
};
