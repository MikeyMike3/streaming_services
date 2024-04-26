const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDZmMTNhYzg4ZWFkNmM0MTBmYmEzMDM3NWZiYTJhNyIsInN1YiI6IjY2MjJjYjdmOTYwY2RlMDEzMWE2MTJmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NppGm2uYC8Gg7Pe0eUTVPYgwr3M9dw3JWk-8BgO-mtk",
	},
};

export const fetchMovieDetails = async (movieId) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
		options
	);
	return res.json();
};

export const fetchMovieProviders = async (movieId) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}/watch/providers`,
		options
	);
	return res.json();
};

export const fetchMovieCredits = async (movieId) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US', options`,
		options
	);
	return res.json();
};

export const fetchMovieTrailer = async (movieId) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
		options
	);
	return res.json();
};
