import {
	fetchMovieCredits,
	fetchMovieDetails,
	fetchMovieProviders,
	fetchMovieTrailer,
	fetchSimilarMovies,
	fetchMovieImages,
} from "../api/movieApi";

import {
	fetchShowCredits,
	fetchShowDetails,
	fetchShowTrailer,
	fetchShowProviders,
	fetchSimilarShows,
} from "../api/showApi";

import { fetchPersonDetails, fetchPersonCredits } from "../api/personApi";

export const movieShowInDepthLoader = async ({ params }) => {
	const { mediaType, id } = params;

	if (mediaType === "movie") {
		const [
			movieDetails,
			movieProviders,
			movieCredits,
			movieTrailer,
			similarMovies,
			fetchImages,
		] = await Promise.all([
			fetchMovieDetails(id),
			fetchMovieProviders(id),
			fetchMovieCredits(id),
			fetchMovieTrailer(id),
			fetchSimilarMovies(id),
			fetchMovieImages(id),
		]);

		return [
			movieDetails,
			movieProviders,
			movieCredits,
			movieTrailer,
			similarMovies,
			fetchImages,
		];
	} else if (mediaType === "tv") {
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
	} else if (mediaType === "person") {
		const [personDetails, personCredits] = await Promise.all([
			fetchPersonDetails(id),
			fetchPersonCredits(id),
		]);
		return [personDetails, personCredits];
	}
};
