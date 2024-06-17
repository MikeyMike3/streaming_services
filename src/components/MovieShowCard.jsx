/* eslint-disable no-mixed-spaces-and-tabs */
import PropTypes from "prop-types";
import poster from "../imgs/tmdbPoster.jpg";

export const MovieShowCard = (props) => {
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
