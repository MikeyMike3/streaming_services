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

export const MovieShowInDepth = () => {
	const { id, mediaType } = useParams();
	const movieShowDetails = useLoaderData();
	const navigation = useNavigation();

	const [movieShowId, setMovieShowId] = useState(0);
	const [movieShowMediaType, setMovieShowMediaType] = useState("");

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
			const trailer = movieShowDetails[3].results.find(
				(vid) => vid.name === "Official Trailer"
			);
			const key = trailer
				? trailer.key
				: movieShowDetails[3].results[0].key;

			return (
				<YouTube
					videoId={key}
					containerClassName={"youtube-container"}
				/>
			);
		}
	};

	useEffect(() => {
		if (typeof movieShowDetails[2].cast !== "undefined") {
			const filteredCast = movieShowDetails[2].cast.filter(
				(actor) => actor.known_for_department === "Acting"
			);
			setCredits(filteredCast);
		}
	}, [movieShowDetails]);

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

	useEffect(() => {
		setMovieShowMediaType(mediaType);
	}, [mediaType]);

	const resetState = () => {
		setBackToTop(true);
		setPages(1);
		setMovieShowMediaType("");
		setMovieShowId(0);
	};

	const handleClick = () => {
		const nextPage = pages + 1;
		setBackToTop(false);
		if (movieShowMediaType === "movie") {
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
		} else {
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

	return (
		<div>
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
					<h2>{movieShowDetails[0].title}</h2>
					<p>{mediaType}</p>
					{movieShowDetails[0].poster_path === null ? (
						<img src={poster} alt="movie poster placeholder" />
					) : (
						<img
							src={`https://image.tmdb.org/t/p/w500/${movieShowDetails[0].poster_path}.jpg`}
							alt="movie poster"
						/>
					)}
					{movieShowDetails[0].backdrop_path === null ? (
						<img src={poster} alt="movie backdrop place holder" />
					) : (
						<img
							src={`https://image.tmdb.org/t/p/w500/${movieShowDetails[0].backdrop_path}.jpg`}
							alt="movie backdrop"
						/>
					)}

					<p>{movieShowDetails[0].vote_average}</p>
					<p>{movieShowDetails[0].overview}</p>
					<ul>
						{movieShowDetails[0].genres.map((item) => (
							<li key={item.id}>{item.name}</li>
						))}
					</ul>
					<h3>Stream On:</h3>
					{flatRateStreamingServices.map((item) => (
						<img
							className="provider-imgs"
							key={item.provider_id}
							src={`https://image.tmdb.org/t/p/w500/${item.logo_path}.jpg`}
							alt="movie poster"
							title={item.provider_name}
						/>
					))}
					<h3>Buy On:</h3>
					{buyStreamingServices.map((item) => (
						<img
							className="provider-imgs"
							key={item.provider_id}
							src={`https://image.tmdb.org/t/p/w500/${item.logo_path}.jpg`}
							alt="movie poster"
							title={item.provider_name}
						/>
					))}
					<h3>Rent On:</h3>
					{rentStreamingServices.map((item) => (
						<img
							className="provider-imgs"
							key={item.provider_id}
							src={`https://image.tmdb.org/t/p/w500/${item.logo_path}.jpg`}
							alt="movie poster"
							title={item.provider_name}
						/>
					))}
					<h3>Trailer (Hopefully):</h3>
					{renderTrailer()}

					<h3>Cast:</h3>
					{credits.map((item) => (
						<div key={item.cast_id} className="cast-card">
							<p>{item.character}</p>
							<p>{item.name}</p>
							{item.profile_path === null ? (
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
						</div>
					))}

					<h3>Similar Movies:</h3>
					{similar.map((item) => (
						<Link
							onClick={resetState}
							key={item.id}
							to={`/movie/${item.id.toString()}/similar`}>
							<div className="similar-movie-show-container">
								{item.poster_path === null ? (
									<img src={poster} alt="movie poster" />
								) : (
									<img
										src={`https://image.tmdb.org/t/p/w500/${item.poster_path}.jpg`}
										alt="movie poster"
									/>
								)}
								<p>{item.title}</p>
							</div>
						</Link>
					))}
					<button onClick={handleClick}>See More</button>
				</>
			)}
			{mediaType === "tv" && (
				<>
					<h2>{movieShowDetails[0].name}</h2>
					<p>{mediaType}</p>
					{movieShowDetails[0].poster_path === null ? (
						<img src={poster} alt="show poster placeholder" />
					) : (
						<img
							src={`https://image.tmdb.org/t/p/w500/${movieShowDetails[0].poster_path}.jpg`}
							alt="show poster"
						/>
					)}
					{movieShowDetails[0].backdrop_path === null ? (
						<img src={poster} alt="show poster placeholder" />
					) : (
						<img
							src={`https://image.tmdb.org/t/p/w500/${movieShowDetails[0].backdrop_path}.jpg`}
							alt="show poster"
						/>
					)}

					<p>{movieShowDetails[0].vote_average}</p>
					<p>{movieShowDetails[0].overview}</p>
					<ul>
						{movieShowDetails[0].genres.map((item) => (
							<li key={item.id}>{item.name}</li>
						))}
					</ul>

					<h3>Stream On:</h3>
					{flatRateStreamingServices.map((item) => (
						<img
							className="provider-imgs"
							key={item.provider_id}
							src={`https://image.tmdb.org/t/p/w500/${item.logo_path}.jpg`}
							alt="provider img"
							title={item.provider_name}
						/>
					))}
					<h3>Buy On:</h3>
					{buyStreamingServices.map((item) => (
						<img
							className="provider-imgs"
							key={item.provider_id}
							src={`https://image.tmdb.org/t/p/w500/${item.logo_path}.jpg`}
							alt="provider img"
							title={item.provider_name}
						/>
					))}
					<h3>Rent On:</h3>
					{rentStreamingServices.map((item) => (
						<img
							className="provider-imgs"
							key={item.provider_id}
							src={`https://image.tmdb.org/t/p/w500/${item.logo_path}.jpg`}
							alt="provider img"
							title={item.provider_name}
						/>
					))}

					<h3>Trailer (Hopefully):</h3>

					{renderTrailer()}

					<h3>Cast:</h3>
					{credits.map((item) => (
						<div key={item.id} className="cast-card">
							<p>{item.character}</p>
							<p>{item.name}</p>
							{item.profile_path === null ? (
								<img
									className="cast-card-img"
									src={poster}
									alt="cast headshot placeholder"
								/>
							) : (
								<img
									className="cast-card-img"
									src={`https://image.tmdb.org/t/p/w500/${item.profile_path}.jpg`}
									alt="cast headshot"
								/>
							)}
						</div>
					))}

					<h3>Similar Shows:</h3>
					{similar.map((item) => (
						<Link
							onClick={resetState}
							key={item.id}
							to={`/tv/${item.id.toString()}/similar`}>
							<div className="similar-movie-show-container">
								{item.poster_path === null ? (
									<img
										src={poster}
										alt="show poster placeholder"
									/>
								) : (
									<img
										src={`https://image.tmdb.org/t/p/w500/${item.poster_path}.jpg`}
										alt="show poster"
									/>
								)}
								<p>{item.name}</p>
							</div>
						</Link>
					))}

					<button onClick={handleClick}>See More</button>
				</>
			)}
			{mediaType === "person" && (
				<>
					<p>hey</p>
				</>
			)}
		</div>
	);
};
