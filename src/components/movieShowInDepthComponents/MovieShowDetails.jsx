import PropTypes from "prop-types";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { Credits } from "./Credits";
import poster from "../../imgs/tmdbPoster.jpg";

export const MovieShowDetails = (props) => {
	const formatRating = (rating) => {
		const parsedRating = parseFloat(rating);

		const roundedRating = Math.round(parsedRating);

		return roundedRating.toString();
	};

	const percentage = formatRating(props.movieShowDetails.vote_average * 10);
	return (
		<div className="movie-show-details-container">
			<div className="movie-show-details-poster">
				{props.movieShowDetails.poster_path === null ? (
					<img src={poster} alt="movie poster placeholder" />
				) : (
					<img
						src={`https://image.tmdb.org/t/p/w500/${props.movieShowDetails.poster_path}.jpg`}
						alt="movie poster"
					/>
				)}
			</div>
			<div className="movie-show-details">
				<h2 className="movie-show-title">
					{props.movieShowDetails.title ||
						props.movieShowDetails.name}
				</h2>
				{typeof props.movieShowDetails.genres !== "undefined" && (
					<div className="movie-show-genres-container">
						<div className="movie-show-rating">
							<CircularProgressbar
								value={percentage}
								text={`${percentage}`}
								styles={buildStyles({
									textSize: "30px",
									textColor: "white",
									trailColor: "white",
									pathColor: "aqua",
								})}
							/>
						</div>
						{props.movieShowDetails.genres.map((item) => (
							<p className="movie-show-genres" key={item.id}>
								{item.name}
							</p>
						))}
					</div>
				)}

				<p className="movie-show-overview">
					{props.movieShowDetails.overview}
				</p>

				<Credits credits={props.credits} />
			</div>
		</div>
	);
};

MovieShowDetails.propTypes = {
	movieShowDetails: PropTypes.array,
	credits: PropTypes.array,
};
