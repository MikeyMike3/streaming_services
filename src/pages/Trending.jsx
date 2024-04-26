import { Link, useLoaderData } from "react-router-dom";
import { MovieShowCard } from "../components/MovieShowCard";

export const Trending = () => {
	const trending = useLoaderData();

	return (
		<div className="movie-show-grid">
			{trending[0].results.map((item) => (
				<Link
					to={`${item.media_type}/${item.id.toString()}`}
					key={item.id}>
					<MovieShowCard
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
				</Link>
			))}
		</div>
	);
};
