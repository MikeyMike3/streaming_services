import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { Credits } from "./Credits";
import poster from "../../imgs/tmdbPoster.jpg";

import {
	MovieShowDetailsMovie0,
	MovieShowDetailsShow0,
	ShowCast,
	MovieCast,
} from "../../types/movieShowInDepthTypes";

type MovieShowDetailsProps = {
	movieShowDetails: MovieShowDetailsMovie0 | MovieShowDetailsShow0;
	credits: ShowCast[] | MovieCast[];
};

function isMovie(
	details: MovieShowDetailsMovie0 | MovieShowDetailsShow0
): details is MovieShowDetailsMovie0 {
	return (details as MovieShowDetailsMovie0).release_date !== undefined;
}

function isShow(
	details: MovieShowDetailsMovie0 | MovieShowDetailsShow0
): details is MovieShowDetailsShow0 {
	return (details as MovieShowDetailsShow0).number_of_seasons !== undefined;
}

export const MovieShowDetails = (props: MovieShowDetailsProps) => {
	const formatRating = (rating: number): number => {
		const roundedRating = Math.round(rating);

		return roundedRating;
	};

	const percentage = formatRating(props.movieShowDetails.vote_average * 10);

	return (
		<div className="movie-show-details-container">
			<div className="movie-show-poster-container">
				{props.movieShowDetails.poster_path === null ? (
					<div
						className="movie-show-details-poster"
						style={{ backgroundImage: `url(${poster})` }}
					/>
				) : (
					<div
						className="movie-show-details-poster"
						style={{
							backgroundImage: `url(https://image.tmdb.org/t/p/original/${props.movieShowDetails.poster_path})`,
						}}
					/>
				)}
			</div>

			<div className="movie-show-details">
				<h2 className="movie-show-title">
					{isMovie(props.movieShowDetails) &&
						props.movieShowDetails.title}
					{isShow(props.movieShowDetails) &&
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

				{props.movieShowDetails.overview.length > 0 ? (
					<p className="movie-show-overview">
						{props.movieShowDetails.overview}
					</p>
				) : (
					<p className="movie-show-overview">
						No overview available.
					</p>
				)}

				<Credits credits={props.credits as ShowCast[] | MovieCast[]} />
			</div>
		</div>
	);
};
