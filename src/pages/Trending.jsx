import { useLoaderData } from "react-router-dom";
import { MovieShowCard } from "../components/MovieShowCard";

export const Trending = () => {
	const trending = useLoaderData();

	return (
		<div className="movie-show-grid">
			{trending[0].results.map((item) => (
				<MovieShowCard
					key={item.id}
					genreIds={item.genre_ids}
					id={item.id}
					mediaType={item.media_type}
					overview={item.overview}
					posterPath={item.poster_path}
					backdropPath={item.backdrop_path}
					releaseDate={item.release_date}
					voteAverage={item.vote_average}
					title={item.title}
					name={item.name}
					movieGenres={trending[1].genres}
					showGenres={trending[2].genres}
				/>
			))}
		</div>
	);
};

const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDZmMTNhYzg4ZWFkNmM0MTBmYmEzMDM3NWZiYTJhNyIsInN1YiI6IjY2MjJjYjdmOTYwY2RlMDEzMWE2MTJmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NppGm2uYC8Gg7Pe0eUTVPYgwr3M9dw3JWk-8BgO-mtk",
	},
};
const fetchTrending = async () => {
	const res = await fetch(
		"https://api.themoviedb.org/3/trending/all/week?language=en-US",
		options
	);
	return res.json();
};

const fetchMovieGenre = async () => {
	const res = await fetch(
		"https://api.themoviedb.org/3/genre/movie/list?language=en",
		options
	);
	return res.json();
};

const fetchShowGenre = async () => {
	const res = await fetch(
		"https://api.themoviedb.org/3/genre/tv/list?language=en",
		options
	);
	return res.json();
};

export const trendingGenreLoader = async () => {
	const trending = await fetchTrending();
	const movieGenre = await fetchMovieGenre();
	const showGenre = await fetchShowGenre();

	return [trending, movieGenre, showGenre];
};
