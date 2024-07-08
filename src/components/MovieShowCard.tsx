/* eslint-disable no-mixed-spaces-and-tabs */
import poster from "../imgs/tmdbPoster.jpg";

type MovieShowCardProps = {
	profilePath?: string | null;
	posterPath?: string | null;
	title?: string | null;
	name?: string | null;
	mediaType: string;
};

export const MovieShowCard = (props: MovieShowCardProps) => {
	return (
		<>
			<div className="movie-show-card-container">
				{props.posterPath === null || props.profilePath === null ? (
					<div
						className="movie-show-card"
						style={{
							backgroundImage: `url(${poster})`,
						}}></div>
				) : props.mediaType === "person" ? (
					<div
						className="movie-show-card"
						style={{
							backgroundImage: `url(https://image.tmdb.org/t/p/w500/${props.profilePath})`,
						}}></div>
				) : (
					<div
						className="movie-show-card"
						style={{
							backgroundImage: `url(https://image.tmdb.org/t/p/w500/${props.posterPath})`,
						}}></div>
				)}

				<p className="movie-title">{props.title || props.name}</p>
			</div>
		</>
	);
};
