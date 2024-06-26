import { useEffect, useState } from "react";
import { useLoaderData, useParams, useNavigation } from "react-router-dom";
import { Spinner } from "../components/Spinner";

import { options } from "../api/options";
import poster from "../imgs/tmdbPoster.jpg";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "react-circular-progressbar/dist/styles.css";

import { AdditionalMovieShowInfo } from "../components/movieShowInDepthComponents/AdditionalMovieShowInfo";

import { VideoSwiper } from "../components/movieShowInDepthComponents/VideoSwiper";
import { BackdropSwiper } from "../components/movieShowInDepthComponents/BackdropSwiper";
import { MovieShowDetails } from "../components/movieShowInDepthComponents/MovieShowDetails";
import { Grid } from "../components/movieShowInDepthComponents/Grid";
import { PlatformSwiper } from "../components/movieShowInDepthComponents/PlatformSwiper";
import { ViewMoreButton } from "../components/ViewMoreButton";
import { Backdrop } from "../components/movieShowInDepthComponents/Backdrop";
import { PosterSwiper } from "../components/movieShowInDepthComponents/PosterSwiper";
import { GeneralApiErrorMessage } from "../components/GeneralApiErrorMessage";

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

	const [isLoading, setIsLoading] = useState(false);

	let formatPersonBirthday = [];
	let formatPersonDeathday = [];

	const isEmpty = (obj) => {
		return Object.keys(obj).length === 0;
	};

	if (backToTop) {
		window.scrollTo(0, 0);
	}

	useEffect(() => {
		if (movieShowDetails[movieShowDetails.length - 1] === null) {
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
		}
	}, [movieShowDetails, mediaType]);

	useEffect(() => {
		if (movieShowDetails[movieShowDetails.length - 1] === null) {
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
		}
	}, [movieShowDetails, mediaType]);

	useEffect(() => {
		if (movieShowDetails[movieShowDetails.length - 1] === null) {
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
		}
	}, [movieShowDetails, mediaType]);

	useEffect(() => {
		if (movieShowDetails[movieShowDetails.length - 1] === null) {
			if (mediaType !== "person") {
				if (typeof movieShowDetails[2].cast !== "undefined") {
					const filteredCast = movieShowDetails[2].cast.filter(
						(actor) => actor.known_for_department === "Acting"
					);
					setCredits(filteredCast);
				}
			}
		}
	}, [movieShowDetails, mediaType]);

	useEffect(() => {
		if (movieShowDetails[movieShowDetails.length - 1] === null) {
			if (mediaType !== "person") {
				if (!isEmpty(movieShowDetails[4].results)) {
					setSimilar(movieShowDetails[4].results);
				}
			}
		}
	}, [movieShowDetails, mediaType]);

	useEffect(() => {
		if (movieShowDetails[movieShowDetails.length - 1] === null) {
			setMovieShowId(id);
		}
	}, [id, movieShowDetails]);

	const resetState = () => {
		setBackToTop(true);
		setPages(1);
		setMovieShowId(0);
		setFlatRateStreamingServices([]);
		setBuyStreamingServices([]);
		setRentStreamingServices([]);
	};

	const handleClick = async () => {
		const nextPage = pages + 1;
		setBackToTop(false);

		try {
			let response;
			setIsLoading(true);
			if (mediaType === "movie") {
				response = await fetch(
					`https://api.themoviedb.org/3/movie/${movieShowId}/recommendations?language=en-US&page=${nextPage}`,
					options
				);
			} else if (mediaType === "tv") {
				response = await fetch(
					`https://api.themoviedb.org/3/tv/${movieShowId}/recommendations?language=en-US&page=${nextPage}`,
					options
				);
			}

			if (response.ok) {
				const data = await response.json();
				setSimilar((prevState) => [...prevState, ...data.results]);
				setPages(nextPage);
			} else {
				console.error("Error fetching data:", response.statusText);
			}
		} catch (err) {
			console.error("Error fetching data:", err);
		} finally {
			setIsLoading(false);
		}
	};

	if (movieShowDetails[movieShowDetails.length - 1] === null) {
		if (mediaType === "person") {
			if (
				movieShowDetails[0].birthday !== undefined &&
				movieShowDetails[0].birthday !== null
			) {
				formatPersonBirthday = movieShowDetails[0].birthday.split("-");
			}
		}
	}

	if (movieShowDetails[movieShowDetails.length - 1] === null) {
		if (mediaType === "person") {
			if (
				movieShowDetails[0].deathday !== undefined &&
				movieShowDetails[0].deathday !== null
			) {
				formatPersonDeathday = movieShowDetails[0].deathday.split("-");
			}
		}
	}

	if (movieShowDetails[movieShowDetails.length - 1] !== null) {
		return <GeneralApiErrorMessage />;
	}

	return (
		<>
			<Spinner navigation={navigation} />
			{mediaType === "movie" && (
				<>
					<Backdrop movieShowDetails={movieShowDetails} />

					<div className="wrapper">
						<MovieShowDetails
							movieShowDetails={movieShowDetails[0]}
							credits={credits}
						/>

						<AdditionalMovieShowInfo
							movieShowDetails={movieShowDetails[0]}
							mediaType={mediaType}
						/>

						<PlatformSwiper
							flatRateStreamingServices={
								flatRateStreamingServices
							}
							rentStreamingServices={rentStreamingServices}
							buyStreamingServices={buyStreamingServices}
						/>
						<h1 className="heading">Videos</h1>
						<div className="heading-underline"></div>

						<VideoSwiper array={movieShowDetails[3].results} />

						<h1 className="heading">Backdrops</h1>
						<div className="heading-underline"></div>
						<BackdropSwiper array={movieShowDetails[5]} />

						<h1 className="heading">Posters</h1>
						<div className="heading-underline"></div>
						<PosterSwiper array={movieShowDetails[5]} />

						<h1 className="similar-movies-heading">
							Similar Movies
						</h1>
						<div className="heading-underline"></div>

						{similar.length > 0 ? (
							<>
								<Grid
									array={similar}
									mediaType={mediaType}
									resetState={resetState}
								/>
								<ViewMoreButton
									handleClick={handleClick}
									currentPage={pages}
									totalPages={movieShowDetails[4].total_pages}
									isLoading={isLoading}
								/>
							</>
						) : (
							<p className="no-similar-movies-shows">
								No similar movies available.
							</p>
						)}
					</div>
				</>
			)}
			{mediaType === "tv" && (
				<>
					<Backdrop movieShowDetails={movieShowDetails} />

					<div className="wrapper">
						<MovieShowDetails
							movieShowDetails={movieShowDetails[0]}
							credits={credits}
						/>

						<AdditionalMovieShowInfo
							movieShowDetails={movieShowDetails[0]}
							mediaType={mediaType}
						/>

						<PlatformSwiper
							flatRateStreamingServices={
								flatRateStreamingServices
							}
							rentStreamingServices={rentStreamingServices}
							buyStreamingServices={buyStreamingServices}
						/>
						<h1 className="heading">Videos</h1>
						<div className="heading-underline"></div>

						<VideoSwiper array={movieShowDetails[3].results} />

						<h1 className="heading">Backdrops</h1>
						<div className="heading-underline"></div>
						<BackdropSwiper array={movieShowDetails[5]} />

						<h1 className="heading">Posters</h1>
						<div className="heading-underline"></div>
						<PosterSwiper array={movieShowDetails[5]} />

						<h1 className="similar-movies-heading">
							Similar Shows
						</h1>
						<div className="heading-underline"></div>

						{similar.length > 0 ? (
							<>
								<Grid
									array={similar}
									mediaType={mediaType}
									resetState={resetState}
								/>
								<ViewMoreButton
									handleClick={handleClick}
									currentPage={pages}
									totalPages={movieShowDetails[4].total_pages}
									isLoading={isLoading}
								/>
							</>
						) : (
							<p className="no-similar-movies-shows">
								No similar movies available.
							</p>
						)}
					</div>
				</>
			)}
			{mediaType === "person" && (
				<>
					<div
						className="movie-show-details-backdrop movie-show-details-backdrop-overlay"
						style={{ backgroundImage: `url(${poster})` }}></div>

					<div className="wrapper">
						<div className="movie-show-details-container">
							{movieShowDetails[0].profile_path === null ? (
								<div
									className="movie-show-details-poster"
									style={{
										backgroundImage: `url(${poster})`,
									}}
								/>
							) : (
								<div
									className="movie-show-details-poster"
									style={{
										backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieShowDetails[0].profile_path})`,
									}}
								/>
							)}
							<div className="person-overview">
								<h1 className="movie-show-title">
									{movieShowDetails[0].name}
								</h1>

								{console.log(movieShowDetails[0])}
								{movieShowDetails[0].biography !== "" ? (
									<p className="movie-show-overview">
										{movieShowDetails[0].biography}
									</p>
								) : (
									<p className="movie-show-overview">
										No biography available.
									</p>
								)}

								<p className="person-place-of-birth movie-show-overview">
									{`${movieShowDetails[0].place_of_birth}`}
								</p>
								{formatPersonBirthday[0] !== undefined && (
									<p className="person-date-of-birth movie-show-overview">
										{`${formatPersonBirthday[1]}-${formatPersonBirthday[2]}-${formatPersonBirthday[0]}`}
									</p>
								)}

								{formatPersonDeathday[0] !== undefined && (
									<p className="person-date-of-birth movie-show-overview">
										{`${formatPersonDeathday[1]}-${formatPersonDeathday[2]}-${formatPersonDeathday[0]}`}
									</p>
								)}

								<h3>Known Department:</h3>
								{movieShowDetails[0].known_for_department}
							</div>
						</div>

						<h1 className="heading">Known Movies/Shows</h1>
						<Grid
							array={movieShowDetails[1].cast}
							mediaType={mediaType}
							resetState={resetState}
						/>
					</div>
				</>
			)}
		</>
	);
};
