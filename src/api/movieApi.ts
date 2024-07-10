import { options } from "./options";

export const fetchMovieDetails = async (movieId: number) => {
	try {
		const res = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
			options
		);
		return await res.json();
	} catch (error) {
		console.error("Error fetching movie details:", error);
		throw error;
	}
};

export const fetchMovieProviders = async (movieId: number) => {
	try {
		const res = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}/watch/providers`,
			options
		);
		return await res.json();
	} catch (error) {
		console.error("Error fetching movie providers:", error);
		throw error;
	}
};

export const fetchMovieCredits = async (movieId: number) => {
	try {
		const res = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
			options
		);
		return await res.json();
	} catch (error) {
		console.error("Error fetching movie credits:", error);
		throw error;
	}
};

export const fetchMovieTrailer = async (movieId: number) => {
	try {
		const res = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
			options
		);
		return await res.json();
	} catch (error) {
		console.error("Error fetching movie trailer:", error);
		throw error;
	}
};

export const fetchSimilarMovies = async (movieId: number) => {
	try {
		const res = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`,
			options
		);
		return await res.json();
	} catch (error) {
		console.error("Error fetching similar movies:", error);
		throw error;
	}
};

export const fetchPopularMovies = async () => {
	try {
		const res = await fetch(
			"https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
			options
		);
		return await res.json();
	} catch (error) {
		console.error("Error fetching popular movies:", error);
		throw error;
	}
};

export const fetchNowPlaying = async () => {
	try {
		const res = await fetch(
			"https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=US",
			options
		);
		return await res.json();
	} catch (error) {
		console.error("Error fetching now playing movies:", error);
		throw error;
	}
};

export const fetchMovieImages = async (movieId: number) => {
	try {
		const res = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}/images?include_image_language=null`,
			options
		);
		return await res.json();
	} catch (error) {
		console.error("Error fetching images:", error);
		throw error;
	}
};
