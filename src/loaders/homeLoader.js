import { fetchPopularMovies, fetchNowPlaying } from "../api/movieApi";
import { fetchPopularShows } from "../api/showApi";
import {
	fetchTrending,
	fetchMovieGenre,
	fetchShowGenre,
} from "../api/trendingApi";

export const homeLoader = async () => {
	const [
		trending,
		movieGenre,
		showGenre,
		popularMovies,
		popularShows,
		nowPlayingMovies,
	] = await Promise.all([
		fetchTrending(),
		fetchMovieGenre(),
		fetchShowGenre(),
		fetchPopularMovies(),
		fetchPopularShows(),
		fetchNowPlaying(),
	]);

	return [
		trending,
		movieGenre,
		showGenre,
		popularMovies,
		popularShows,
		nowPlayingMovies,
	];
};
