import { options } from "./options";

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
