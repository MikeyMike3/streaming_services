import { fetchTopRatedMovies } from "../api/movieApi";
import { fetchTopRatedShows } from "../api/showApi";
import {
	fetchTrending,
	fetchMovieGenre,
	fetchShowGenre,
} from "../api/trendingApi";

export const homeLoader = async () => {
	const [trending, movieGenre, showGenre, topRatedMovies, topRatedShows] =
		await Promise.all([
			fetchTrending(),
			fetchMovieGenre(),
			fetchShowGenre(),
			fetchTopRatedMovies(),
			fetchTopRatedShows(),
		]);

	return [trending, movieGenre, showGenre, topRatedMovies, topRatedShows];
};
