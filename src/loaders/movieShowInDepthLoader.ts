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
	fetchShowImages,
} from "../api/showApi";

import { fetchPersonDetails, fetchPersonCredits } from "../api/personApi";

export const movieShowInDepthLoader = async ({ params }) => {
	const { mediaType, id } = params;

	let results = [];

	if (mediaType === "movie" || mediaType === "tv") {
		results = [null, null, null, null, null, null, null];
	} else if (mediaType === "person") {
		results = [null, null, null];
	}

	try {
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

			results[0] = movieDetails;
			results[1] = movieProviders;
			results[2] = movieCredits;
			results[3] = movieTrailer;
			results[4] = similarMovies;
			results[5] = fetchImages;
		} else if (mediaType === "tv") {
			const [
				showDetails,
				showProviders,
				showCredits,
				showTrailer,
				similarShows,
				showImages,
			] = await Promise.all([
				fetchShowDetails(id),
				fetchShowProviders(id),
				fetchShowCredits(id),
				fetchShowTrailer(id),
				fetchSimilarShows(id),
				fetchShowImages(id),
			]);

			results[0] = showDetails;
			results[1] = showProviders;
			results[2] = showCredits;
			results[3] = showTrailer;
			results[4] = similarShows;
			results[5] = showImages;
		} else if (mediaType === "person") {
			const [personDetails, personCredits] = await Promise.all([
				fetchPersonDetails(id),
				fetchPersonCredits(id),
			]);

			results[0] = personDetails;
			results[1] = personCredits;
		}
	} catch (error) {
		results[results.length - 1] =
			error.message || "An error occurred while fetching data."; // Set error message at the last index
	}
	return results;
};
