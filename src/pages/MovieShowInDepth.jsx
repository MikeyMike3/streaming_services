import { useLoaderData, useParams } from "react-router-dom";

export const MovieShowInDepth = () => {
	const { mediaType, id } = useParams();
	const movieShowDetails = useLoaderData();

	// console.log(movieShowDetails);

	return (
		<div>
			{mediaType === "movie" ? (
				<h2>{movieShowDetails[0].title}</h2>
			) : (
				<h2>{movieShowDetails[0].name}</h2>
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

const fetchMovieDetails = async (movieId) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
		options
	);
	return res.json();
};

const fetchShowDetails = async (showId) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/tv/${showId}?language=en-US`,
		options
	);
	return res.json();
};

export const movieShowInDepthLoader = async ({ params }) => {
	const { mediaType, id } = params;

	if (mediaType === "movie") {
		const movieDetails = await fetchMovieDetails(id);
		return [movieDetails];
	} else {
		const showDetails = await fetchShowDetails(id);
		return [showDetails];
	}

	// return [movieDetails, showDetails];
};
