const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDZmMTNhYzg4ZWFkNmM0MTBmYmEzMDM3NWZiYTJhNyIsInN1YiI6IjY2MjJjYjdmOTYwY2RlMDEzMWE2MTJmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NppGm2uYC8Gg7Pe0eUTVPYgwr3M9dw3JWk-8BgO-mtk",
	},
};

export const fetchTrending = async () => {
	const res = await fetch(
		"https://api.themoviedb.org/3/trending/all/week?language=en-US",
		options
	);
	return res.json();
};

export const fetchMovieGenre = async () => {
	const res = await fetch(
		"https://api.themoviedb.org/3/genre/movie/list?language=en",
		options
	);
	return res.json();
};

export const fetchShowGenre = async () => {
	const res = await fetch(
		"https://api.themoviedb.org/3/genre/tv/list?language=en",
		options
	);
	return res.json();
};
