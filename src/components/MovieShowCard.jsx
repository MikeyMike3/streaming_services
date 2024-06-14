/* eslint-disable no-mixed-spaces-and-tabs */
import PropTypes from "prop-types";
import poster from "../imgs/tmdbPoster.jpg";

export const MovieShowCard = (props) => {
	return (
		<div className="movie-show-card">
			{typeof props.mediaType === "undefined" &&
				(props.posterPath === null ? (
					<img src={poster} alt="placeholder poster" />
				) : (
					<img
						src={`https://image.tmdb.org/t/p/w500/${props.posterPath}.jpg`}
						alt="poster"
					/>
				))}
			{(props.mediaType === "tv" || props.mediaType === "movie") &&
				(props.posterPath === null ? (
					<img src={poster} alt="placeholder poster" />
				) : (
					<img
						src={`https://image.tmdb.org/t/p/w500/${props.posterPath}`}
						alt="poster"
					/>
				))}
			{props.mediaType === "person" &&
				(props.profilePath === null ? (
					<img src={poster} alt="placeholder poster" />
				) : (
					<img
						src={`https://image.tmdb.org/t/p/w500/${props.profilePath}.jpg`}
						alt="poster"
					/>
				))}

			<div className="movie-show-info">
				{props.mediaType === "tv" && <p>{props.name}</p>}

				{props.mediaType === "movie" && <p>{props.title}</p>}

				{props.mediaType === "person" && <p>{props.name}</p>}

				{typeof props.mediaType === "undefined" &&
					typeof props.title === "undefined" && <p>{props.name}</p>}
				{typeof props.mediaType === "undefined" &&
					typeof props.name === "undefined" && <p>{props.title}</p>}
			</div>
		</div>
	);
};

MovieShowCard.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	mediaType: PropTypes.string,
	name: PropTypes.string,
	posterPath: PropTypes.string,
	profilePath: PropTypes.string,
	voteAverage: PropTypes.number,
	genreIds: PropTypes.array,
	movieGenres: PropTypes.array,
	showGenres: PropTypes.array,
};
