const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDZmMTNhYzg4ZWFkNmM0MTBmYmEzMDM3NWZiYTJhNyIsInN1YiI6IjY2MjJjYjdmOTYwY2RlMDEzMWE2MTJmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NppGm2uYC8Gg7Pe0eUTVPYgwr3M9dw3JWk-8BgO-mtk",
	},
};

export const fetchShowDetails = async (showId) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/tv/${showId}?language=en-US`,
		options
	);
	return res.json();
};

export const fetchShowProviders = async (showId) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/tv/${showId}/watch/providers`,
		options
	);
	return res.json();
};

export const fetchShowCredits = async (showId) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/tv/${showId}/credits?language=en-US`,
		options
	);
	return res.json();
};

export const fetchShowTrailer = async (showId) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/tv/${showId}/videos?language=en-US`,
		options
	);
	return res.json();
};

export const fetchSimilarShows = async (showId) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/tv/${showId}/similar?language=en-US&page=1`,
		options
	);
	return res.json();
};
