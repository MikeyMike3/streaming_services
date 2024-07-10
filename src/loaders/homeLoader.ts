import { fetchPopularMovies, fetchNowPlaying } from "../api/movieApi";
import { fetchPopularShows } from "../api/showApi";
import {
	fetchTrending,
	fetchMovieGenre,
	fetchShowGenre,
} from "../api/trendingApi";
import { HomeLoaderTupleDefault } from "../types/homeTypes";

export const homeLoader = async () => {
	const results: HomeLoaderTupleDefault = [
		null,
		null,
		null,
		null,
		null,
		null,
		null,
	]; // Initialize array with null values

	try {
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

		results[0] = trending;
		results[1] = movieGenre;
		results[2] = showGenre;
		results[3] = popularMovies;
		results[4] = popularShows;
		results[5] = nowPlayingMovies;
	} catch (error) {
		results[6] = "An error occurred while fetching data."; // Set error message at the last index
	}

	return results;
};
