import { options } from "./options";

export const fetchTrending = async () => {
	try {
		const res = await fetch(
			"https://api.themoviedb.org/3/trending/all/week?language=en-US",
			options
		);
		return await res.json();
	} catch (error) {
		console.error("Error fetching trending content:", error);
		throw error;
	}
};

export const fetchMovieGenre = async () => {
	try {
		const res = await fetch(
			"https://api.themoviedb.org/3/genre/movie/list?language=en",
			options
		);
		return await res.json();
	} catch (error) {
		console.error("Error fetching movie genres:", error);
		throw error;
	}
};

export const fetchShowGenre = async () => {
	try {
		const res = await fetch(
			"https://api.themoviedb.org/3/genre/tv/list?language=en",
			options
		);
		return await res.json();
	} catch (error) {
		console.error("Error fetching show genres:", error);
		throw error;
	}
};
