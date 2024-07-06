import poster from "../../imgs/tmdbPoster.jpg";
import { MovieShowDetailsMovie0 } from "../../types/movieShowInDepthTypes";

type BackdropProps = {
	movieShowDetails: MovieShowDetailsMovie0;
};

export const Backdrop = (props: BackdropProps) => {
	return (
		<>
			{props.movieShowDetails.backdrop_path === null ? (
				<div
					className="movie-show-details-backdrop movie-show-details-backdrop-overlay"
					style={{ backgroundImage: `url(${poster})` }}></div>
			) : (
				<div
					className="movie-show-details-backdrop movie-show-details-backdrop-overlay"
					style={{
						backgroundImage: `url(${`https://image.tmdb.org/t/p/original/${props.movieShowDetails.backdrop_path}.jpg`})`,
					}}></div>
			)}
		</>
	);
};
