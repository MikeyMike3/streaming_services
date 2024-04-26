import {
	fetchTrending,
	fetchMovieGenre,
	fetchShowGenre,
} from "../api/trendingApi";

export const trendingGenreLoader = async () => {
	const [trending, movieGenre, showGenre] = await Promise.all([
		fetchTrending(),
		fetchMovieGenre(),
		fetchShowGenre(),
	]);

	return [trending, movieGenre, showGenre];
};
