import { options } from "./options";

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
		`https://api.themoviedb.org/3/tv/${showId}/recommendations?language=en-US&page=1`,
		options
	);
	return res.json();
};

export const fetchPopularShows = async () => {
	const res = await fetch(
		"https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
		options
	);
	return res.json();
};
