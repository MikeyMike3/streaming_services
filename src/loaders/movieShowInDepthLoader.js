import {
	fetchMovieCredits,
	fetchMovieDetails,
	fetchMovieProviders,
	fetchMovieTrailer,
	fetchSimilarMovies,
} from "../api/movieApi";

import {
	fetchShowCredits,
	fetchShowDetails,
	fetchShowTrailer,
	fetchShowProviders,
	fetchSimilarShows,
} from "../api/showApi";

export const movieShowInDepthLoader = async ({ params }) => {
	const { mediaType, id } = params;

	if (mediaType === "movie") {
		const [
			movieDetails,
			movieProviders,
			movieCredits,
			movieTrailer,
			similarMovies,
		] = await Promise.all([
			fetchMovieDetails(id),
			fetchMovieProviders(id),
			fetchMovieCredits(id),
			fetchMovieTrailer(id),
			fetchSimilarMovies(id),
		]);

		return [
			movieDetails,
			movieProviders,
			movieCredits,
			movieTrailer,
			similarMovies,
		];
	} else {
		const [
			showDetails,
			showProviders,
			showCredits,
			showTrailer,
			similarShows,
		] = await Promise.all([
			fetchShowDetails(id),
			fetchShowProviders(id),
			fetchShowCredits(id),
			fetchShowTrailer(id),
			fetchSimilarShows(id),
		]);

		return [
			showDetails,
			showProviders,
			showCredits,
			showTrailer,
			similarShows,
		];
	}
};
