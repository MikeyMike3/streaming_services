import { fetchTopRatedMovies, fetchNowPlaying } from "../api/movieApi";
import { fetchTopRatedShows } from "../api/showApi";
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
		topRatedMovies,
		topRatedShows,
		nowPlayingMovies,
	] = await Promise.all([
		fetchTrending(),
		fetchMovieGenre(),
		fetchShowGenre(),
		fetchTopRatedMovies(),
		fetchTopRatedShows(),
		fetchNowPlaying(),
	]);

	return [
		trending,
		movieGenre,
		showGenre,
		topRatedMovies,
		topRatedShows,
		nowPlayingMovies,
	];
};
