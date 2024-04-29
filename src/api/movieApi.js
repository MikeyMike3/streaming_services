import { options } from "./options";

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

export const fetchSimilarMovies = async (movieId) => {
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`,
		options
	);
	return res.json();
};

export const fetchPopularMovies = async () => {
	const res = await fetch(
		"https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
		options
	);
	return res.json();
};

export const fetchNowPlaying = async () => {
	const res = await fetch(
		"https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=US",
		options
	);
	return res.json();
};
