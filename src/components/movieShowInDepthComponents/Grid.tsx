import { Link } from "react-router-dom";

import { MovieShowCard } from "../MovieShowCard";
import { SimilarResults, PersonCast } from "../../types/movieShowInDepthTypes";
import {
	HomeLoaderMovieResults,
	HomeLoaderShowResults,
	HomeLoaderTrendingMovieResults,
	HomeLoaderTrendingShowResults,
} from "../../types/homeTypes";

type GridProps = {
	array:
		| SimilarResults[]
		| PersonCast[]
		| HomeLoaderMovieResults[]
		| HomeLoaderShowResults[]
		| HomeLoaderTrendingMovieResults[]
		| HomeLoaderTrendingShowResults[];
	mediaType: string;
	resetState?: () => null;
};

export const Grid = (props: GridProps) => {
	return (
		<div className="search-grid">
			{props.array.map((item) => {
				if (props.mediaType === "tv" || props.mediaType === "movie") {
					if ("media_type" in item && "title" in item) {
						return (
							<Link
								onClick={props.resetState}
								key={item.id + props.mediaType}
								to={`/${item.media_type}/${item.id.toString()}`}>
								<MovieShowCard
									mediaType={item.media_type}
									posterPath={item.poster_path}
									profilePath={item.profile_path}
									title={item.title}
								/>
							</Link>
						);
					} else if ("media_type" in item && "name" in item) {
						return (
							<Link
								onClick={props.resetState}
								key={item.id + props.mediaType}
								to={`/${item.media_type}/${item.id.toString()}`}>
								<MovieShowCard
									mediaType={item.media_type}
									posterPath={item.poster_path}
									profilePath={item.profile_path}
									name={item.name}
								/>
							</Link>
						);
					} else if ("name" in item) {
						return (
							<Link
								onClick={props.resetState}
								key={item.id + props.mediaType}
								to={`/${props.mediaType}/${item.id.toString()}`}>
								<div>
									<MovieShowCard
										mediaType={props.mediaType}
										posterPath={item.poster_path}
										profilePath={item.profile_path}
										name={item.name}
									/>
								</div>
							</Link>
						);
					} else if ("title" in item) {
						return (
							<Link
								onClick={props.resetState}
								key={item.id + props.mediaType}
								to={`/${props.mediaType}/${item.id.toString()}`}>
								<div>
									<MovieShowCard
										mediaType={props.mediaType}
										posterPath={item.poster_path}
										profilePath={item.profile_path}
										title={item.title}
									/>
								</div>
							</Link>
						);
					}
				} else if (props.mediaType === "person") {
					if ("media_type" in item && "name" in item) {
						return (
							<Link
								onClick={props.resetState}
								key={item.id + item.media_type}
								to={`/${item.media_type}/${item.id.toString()}`}>
								<MovieShowCard
									mediaType={item.media_type}
									posterPath={item.poster_path}
									profilePath={item.profile_path}
									name={item.name}
								/>
							</Link>
						);
					} else if ("media_type" in item && "title" in item) {
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
								/>
							</Link>
						);
					}
				} else {
					return null;
				}
			})}
		</div>
	);
};
