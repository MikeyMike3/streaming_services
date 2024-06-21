import PropTypes from "prop-types";

import poster from "../../imgs/tmdbPoster.jpg";

export const Backdrop = (props) => {
	return (
		<>
			{props.movieShowDetails[0].backdrop_path === null ? (
				<div
					className="movie-show-details-backdrop movie-show-details-backdrop-overlay"
					style={{ backgroundImage: `url(${poster})` }}></div>
			) : (
				<div
					className="movie-show-details-backdrop movie-show-details-backdrop-overlay"
					style={{
						backgroundImage: `url(${`https://image.tmdb.org/t/p/original/${props.movieShowDetails[0].backdrop_path}.jpg`})`,
					}}></div>
			)}
		</>
	);
};

Backdrop.propTypes = {
	movieShowDetails: PropTypes.string,
};
