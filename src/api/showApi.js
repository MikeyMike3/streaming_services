import { options } from "./options";

export const fetchShowDetails = async (showId) => {
	try {
		const res = await fetch(
			`https://api.themoviedb.org/3/tv/${showId}?language=en-US`,
			options
		);
		return await res.json();
	} catch (error) {
		console.error("Error fetching show details:", error);
		throw error;
	}
};

export const fetchShowProviders = async (showId) => {
	try {
		const res = await fetch(
			`https://api.themoviedb.org/3/tv/${showId}/watch/providers`,
			options
		);
		return await res.json();
	} catch (error) {
		console.error("Error fetching show providers:", error);
		throw error;
	}
};

export const fetchShowCredits = async (showId) => {
	try {
		const res = await fetch(
			`https://api.themoviedb.org/3/tv/${showId}/credits?language=en-US`,
			options
		);
		return await res.json();
	} catch (error) {
		console.error("Error fetching show credits:", error);
		throw error;
	}
};

export const fetchShowTrailer = async (showId) => {
	try {
		const res = await fetch(
			`https://api.themoviedb.org/3/tv/${showId}/videos?language=en-US`,
			options
		);
		return await res.json();
	} catch (error) {
		console.error("Error fetching show trailer:", error);
		throw error;
	}
};

export const fetchSimilarShows = async (showId) => {
	try {
		const res = await fetch(
			`https://api.themoviedb.org/3/tv/${showId}/recommendations?language=en-US&page=1`,
			options
		);
		return await res.json();
	} catch (error) {
		console.error("Error fetching similar shows:", error);
		throw error;
	}
};

export const fetchPopularShows = async () => {
	try {
		const res = await fetch(
			"https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
			options
		);
		return await res.json();
	} catch (error) {
		console.error("Error fetching popular shows:", error);
		throw error;
	}
};
