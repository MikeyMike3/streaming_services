import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";

export const MovieShowInDepth = () => {
	const { mediaType, id } = useParams();
	const movieShowDetails = useLoaderData();

	const [flatRateStreamingServices, setFlatRateStreamingServices] = useState(
		[]
	);
	const [buyStreamingServices, setBuyStreamingServices] = useState([]);
	const [rentStreamingServices, setRentStreamingServices] = useState([]);

	const [credits, setCredits] = useState([]);

	const isEmpty = (obj) => {
		return Object.keys(obj).length === 0;
	};

	useEffect(() => {
		if (!isEmpty(movieShowDetails[1].results)) {
			if (
				typeof movieShowDetails[1].results.US.flatrate !== "undefined"
			) {
				setFlatRateStreamingServices(
					movieShowDetails[1].results.US.flatrate
				);
			}
		}
	}, [movieShowDetails]);

	useEffect(() => {
		if (!isEmpty(movieShowDetails[1].results)) {
			if (typeof movieShowDetails[1].results.US.buy !== "undefined") {
				setBuyStreamingServices(movieShowDetails[1].results.US.buy);
			}
		}
	}, [movieShowDetails]);

	useEffect(() => {
		if (!isEmpty(movieShowDetails[1].results)) {
			if (typeof movieShowDetails[1].results.US.rent !== "undefined") {
				setRentStreamingServices(movieShowDetails[1].results.US.rent);
			}
		}
	}, [movieShowDetails]);

	// useEffect(() => {
	// 	console.log(buyStreamingServices);
	// }, [buyStreamingServices]);

	useEffect(() => {
		if (typeof movieShowDetails[2].cast !== "undefined") {
			const filteredCast = movieShowDetails[2].cast.filter(
				(actor) => actor.known_for_department === "Acting"
			);
			setCredits(filteredCast);
		}
	}, [movieShowDetails]);

	// useEffect(() => {
	// 	console.log(credits);
	// }, [credits]);

	console.log(movieShowDetails);

	let movieTrailerLink = movieShowDetails[3].results.find(
		(vid) => vid.name === "Official Trailer"
	);
	console.log(movieTrailerLink);

	return (
		<div>
			{mediaType === "movie" ? (
				<>
					<h2>{movieShowDetails[0].title}</h2>
					<p>{mediaType}</p>
					<img
						src={`https://image.tmdb.org/t/p/w500/${movieShowDetails[0].poster_path}.jpg`}
						alt="movie poster"
					/>
					<img
						src={`https://image.tmdb.org/t/p/w500/${movieShowDetails[0].backdrop_path}.jpg`}
						alt="movie poster"
					/>
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
						/>
					))}
					<h3>Buy On:</h3>
					{buyStreamingServices.map((item) => (
						<img
							className="provider-imgs"
							key={item.provider_id}
							src={`https://image.tmdb.org/t/p/w500/${item.logo_path}.jpg`}
							alt="movie poster"
						/>
					))}
					<h3>Rent On:</h3>
					{rentStreamingServices.map((item) => (
						<img
							className="provider-imgs"
							key={item.provider_id}
							src={`https://image.tmdb.org/t/p/w500/${item.logo_path}.jpg`}
							alt="movie poster"
						/>
					))}
					<h3>Trailer:</h3>
					<p>{`https://www.youtube.com/watch?v=${movieTrailerLink.key}`}</p>

					<h3>Cast:</h3>
					{credits.map((item) => (
						<div key={item.cast_id} className="cast-card">
							<p>{item.character}</p>
							<p>{item.name}</p>
							{item.profile_path !== null ? (
								<img
									className="cast-card-img"
									src={`https://image.tmdb.org/t/p/w500/${item.profile_path}.jpg`}></img>
							) : null}
						</div>
					))}
				</>
			) : (
				<>
					<h2>{movieShowDetails[0].name}</h2>
					<p>{mediaType}</p>
					<img
						src={`https://image.tmdb.org/t/p/w500/${movieShowDetails[0].poster_path}.jpg`}
						alt="movie poster"
					/>
					<img
						src={`https://image.tmdb.org/t/p/w500/${movieShowDetails[0].backdrop_path}.jpg`}
						alt="movie poster"
					/>
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
						/>
					))}
					<h3>Buy On:</h3>
					{buyStreamingServices.map((item) => (
						<img
							className="provider-imgs"
							key={item.provider_id}
							src={`https://image.tmdb.org/t/p/w500/${item.logo_path}.jpg`}
							alt="movie poster"
						/>
					))}
					<h3>Rent On:</h3>
					{rentStreamingServices.map((item) => (
						<img
							className="provider-imgs"
							key={item.provider_id}
							src={`https://image.tmdb.org/t/p/w500/${item.logo_path}.jpg`}
							alt="movie poster"
						/>
					))}

					<h3>Trailer:</h3>
					<p>{`https://www.youtube.com/watch?v=${movieTrailerLink.key}`}</p>

					<h3>Cast:</h3>
					{credits.map((item) => (
						<div key={item.id} className="cast-card">
							<p>{item.character}</p>
							<p>{item.name}</p>
							{item.profile_path !== null ? (
								<img
									className="cast-card-img"
									src={`https://image.tmdb.org/t/p/w500/${item.profile_path}.jpg`}></img>
							) : null}
						</div>
					))}
				</>
			)}
		</div>
	);
};
const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDZmMTNhYzg4ZWFkNmM0MTBmYmEzMDM3NWZiYTJhNyIsInN1YiI6IjY2MjJjYjdmOTYwY2RlMDEzMWE2MTJmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NppGm2uYC8Gg7Pe0eUTVPYgwr3M9dw3JWk-8BgO-mtk",
	},
};

// movies api calls
const fetchMovieDetails = async (movieId) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
		options
	);
	return res.json();
};

const fetchMovieProviders = async (movieId) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}/watch/providers`,
		options
	);
	return res.json();
};

const fetchMovieCredits = async (movieId) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US', options`,
		options
	);
	return res.json();
};

const fetchMovieTrailer = async (movieId) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
		options
	);
	return res.json();
};

// show api calls
const fetchShowDetails = async (showId) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/tv/${showId}?language=en-US`,
		options
	);
	return res.json();
};

const fetchShowProviders = async (showId) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/tv/${showId}/watch/providers`,
		options
	);
	return res.json();
};

const fetchShowCredits = async (showId) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/tv/${showId}/credits?language=en-US`,
		options
	);
	return res.json();
};

const fetchShowTrailer = async (showId) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/tv/${showId}/videos?language=en-US`,
		options
	);
	return res.json();
};

export const movieShowInDepthLoader = async ({ params }) => {
	const { mediaType, id } = params;

	if (mediaType === "movie") {
		const movieDetails = await fetchMovieDetails(id);
		const movieProviders = await fetchMovieProviders(id);
		const movieCredits = await fetchMovieCredits(id);
		const movieTrailer = await fetchMovieTrailer(id);

		return [movieDetails, movieProviders, movieCredits, movieTrailer];
	} else {
		const showDetails = await fetchShowDetails(id);
		const showProviders = await fetchShowProviders(id);
		const showCredits = await fetchShowCredits(id);
		const showTrailer = await fetchShowTrailer(id);

		return [showDetails, showProviders, showCredits, showTrailer];
	}

	// return [movieDetails, showDetails];
};
