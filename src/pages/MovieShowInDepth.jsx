import { useLoaderData, useParams } from "react-router-dom";

export const MovieShowInDepth = () => {
	const { mediaType, id } = useParams();
	const movieShowDetails = useLoaderData();

	// console.log(movieShowDetails);

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

const fetchMovieGenre = async () => {
	const res = await fetch(
		`https://api.themoviedb.org/3/genre/movie/list?language=en`
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

const fetchShowGenre = async () => {
	const res = await fetch(
		"https://api.themoviedb.org/3/genre/tv/list?language=en"
	);
	return res.json();
};

export const movieShowInDepthLoader = async ({ params }) => {
	const { mediaType, id } = params;

	if (mediaType === "movie") {
		const movieDetails = await fetchMovieDetails(id);
		const movieProviders = await fetchMovieProviders(id);
		const movieGenre = await fetchMovieGenre();

		return [movieDetails, movieProviders, movieGenre];
	} else {
		const showDetails = await fetchShowDetails(id);
		const showProviders = await fetchShowProviders(id);
		const showGenre = await fetchShowGenre();

		return [showDetails, showProviders, showGenre];
	}

	// return [movieDetails, showDetails];
};
