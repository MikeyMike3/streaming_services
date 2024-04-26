import {
	fetchMovieCredits,
	fetchMovieDetails,
	fetchMovieProviders,
	fetchMovieTrailer,
} from "../api/movieApi";

import {
	fetchShowCredits,
	fetchShowDetails,
	fetchShowTrailer,
	fetchShowProviders,
} from "../api/showApi";

export const movieShowInDepthLoader = async ({ params }) => {
	const { mediaType, id } = params;

	if (mediaType === "movie") {
		const [movieDetails, movieProviders, movieCredits, movieTrailer] =
			await Promise.all([
				fetchMovieDetails(id),
				fetchMovieProviders(id),
				fetchMovieCredits(id),
				fetchMovieTrailer(id),
			]);

		return [movieDetails, movieProviders, movieCredits, movieTrailer];
	} else {
		const [showDetails, showProviders, showCredits, showTrailer] =
			await Promise.all([
				fetchShowDetails(id),
				fetchShowProviders(id),
				fetchShowCredits(id),
				fetchShowTrailer(id),
			]);

		return [showDetails, showProviders, showCredits, showTrailer];
	}
};
