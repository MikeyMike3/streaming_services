import { Link } from "react-router-dom";

import { MovieShowCard } from "../MovieShowCard";
import { SimilarResults, PersonCast } from "../../types/movieShowInDepthTypes";
import { HomeLoaderMovieResults } from "../../types/homeTypes";

type GridProps = {
	array: SimilarResults[] | PersonCast[] | HomeLoaderMovieResults[];
	mediaType: string;
	resetState?: () => null;
};

export const Grid = (props: GridProps) => {
	return (
		<div className="search-grid">
			{props.array.map((item) => {
				if (props.mediaType === "tv" || props.mediaType === "movie") {
					return (
						<Link
							onClick={props.resetState}
							key={item.id + props.mediaType}
							to={`/${props.mediaType}/${item.id.toString()}`}>
							<MovieShowCard
								mediaType={item.media_type}
								posterPath={item.poster_path}
								profilePath={item.profile_path}
								title={item.title}
								name={item.name}
							/>
						</Link>
					);
				} else if (props.mediaType === "person") {
					return (
						<Link
							onClick={props.resetState}
							key={item.id + item.media_type}
							to={`/${item.media_type}/${item.id.toString()}`}>
							<MovieShowCard
								mediaType={item.media_type}
								posterPath={item.poster_path}
								profilePath={item.profile_path}
								title={item.title}
								name={item.name}
							/>
						</Link>
					);
				} else {
					return null;
				}
			})}
		</div>
	);
};
