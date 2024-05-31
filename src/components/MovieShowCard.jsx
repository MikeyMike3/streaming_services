/* eslint-disable no-mixed-spaces-and-tabs */
import PropTypes from "prop-types";
import poster from "../imgs/tmdbPoster.jpg";

export const MovieShowCard = (props) => {
	// console.log(movieShowId);

	return (
		<div className="movie-show-card">
			{props.posterPath === null ? (
				<img src={poster} alt="placeholder poster" />
			) : (
				<img
					src={`https://image.tmdb.org/t/p/w500/${props.posterPath}.jpg`}
					alt="poster"
				/>
			)}

			<div className="movie-show-info">
				{/* <div className="genre-info">
					{props.mediaType === "movie"
						? props.genreIds.map((genreID) =>
								props.movieGenres.map((movieGenreId) =>
									genreID === movieGenreId.id ? (
										<p key={genreID}>{movieGenreId.name}</p>
									) : null
								)
						  )
						: props.genreIds.map((genreID) =>
								props.showGenres.map((showGenreId) =>
									genreID === showGenreId.id ? (
										<p key={genreID}>{showGenreId.name}</p>
									) : null
								)
						  )}
				</div> */}
				<p>{props.voteAverage}</p>
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
	voteAverage: PropTypes.number,
	genreIds: PropTypes.array,
	movieGenres: PropTypes.array,
	showGenres: PropTypes.array,
};
