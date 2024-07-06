import {
	MovieShowDetailsMovie0,
	MovieShowDetailsShow0,
} from "../../types/movieShowInDepthTypes";

type AdditionalMovieShowInfoProps = {
	mediaType: string;
	movieShowDetails: MovieShowDetailsMovie0 | MovieShowDetailsShow0;
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

export const AdditionalMovieShowInfo = (
	props: AdditionalMovieShowInfoProps
) => {
	let releaseDateSplitArray: string[] = [];

	if (
		isMovie(props.movieShowDetails) &&
		props.movieShowDetails.release_date !== undefined &&
		props.movieShowDetails.release_date.length !== 0
	) {
		releaseDateSplitArray = props.movieShowDetails.release_date.split("-");
	}

	if (
		isShow(props.movieShowDetails) &&
		props.movieShowDetails.first_air_date !== undefined &&
		props.movieShowDetails.first_air_date.length !== 0
	) {
		releaseDateSplitArray =
			props.movieShowDetails.first_air_date.split("-");
	}

	return (
		<>
			<div className="additional-info">
				{props.mediaType === "movie" &&
					isMovie(props.movieShowDetails) && (
						<>
							<h1 className="heading">Additional Information</h1>
							<div className="heading-underline"></div>
							{props.movieShowDetails.runtime !== undefined ? (
								<p>
									<strong>Runtime: </strong>
									{`${props.movieShowDetails.runtime} minutes`}
								</p>
							) : (
								<p>
									<strong>Runtime: </strong>No Runtime
									information available.
								</p>
							)}
							{releaseDateSplitArray[0] !== undefined ? (
								<p>
									<strong>Released on: </strong>
									{`${releaseDateSplitArray[1]}-${releaseDateSplitArray[2]}-${releaseDateSplitArray[0]}`}
								</p>
							) : (
								<p>
									<strong>Released on: </strong>No release
									date available.
								</p>
							)}
							{props.movieShowDetails.original_language !==
							undefined ? (
								<p>
									<strong>Original Language: </strong>
									{`${props.movieShowDetails.original_language.toUpperCase()}`}
								</p>
							) : (
								<p>
									<strong>Original Language: </strong>No
									original language available.
								</p>
							)}
							{props.movieShowDetails.budget !== undefined &&
							props.movieShowDetails.budget !== 0 ? (
								<p>
									<strong>Budget: </strong>$
									{props.movieShowDetails.budget}
								</p>
							) : (
								<p>
									<strong>Budget: </strong>No budget
									available.
								</p>
							)}
							{props.movieShowDetails.revenue !== undefined &&
							props.movieShowDetails.revenue !== 0 ? (
								<p>
									<strong>Revenue: </strong>$
									{props.movieShowDetails.revenue}
								</p>
							) : (
								<p>
									<strong>Revenue: </strong>No revenue
									available.
								</p>
							)}
						</>
					)}
				{props.mediaType === "tv" && isShow(props.movieShowDetails) && (
					<>
						<h1 className="heading">Additional Information</h1>
						<div className="heading-underline"></div>

						{props.movieShowDetails.episode_run_time !==
							undefined &&
						props.movieShowDetails.episode_run_time.length !== 0 ? (
							<p>
								<strong>Episode Runtime: </strong>
								{`${props.movieShowDetails.episode_run_time[0]} minutes`}
							</p>
						) : (
							<p>
								<strong>Episode Runtime: </strong>No episode
								runtime information available.
							</p>
						)}

						{releaseDateSplitArray[0] !== undefined ? (
							<p>
								<strong>Released on: </strong>
								{`${releaseDateSplitArray[1]}-${releaseDateSplitArray[2]}-${releaseDateSplitArray[0]}`}
							</p>
						) : (
							<p>
								<strong>Released on: </strong>No release date
								available.
							</p>
						)}

						{props.movieShowDetails.original_language !==
						undefined ? (
							<p>
								<strong>Original Language: </strong>
								{`${props.movieShowDetails.original_language.toUpperCase()}`}
							</p>
						) : (
							<p>
								<strong>Original Language: </strong>No original
								language available.
							</p>
						)}
						{props.movieShowDetails.number_of_seasons !==
						undefined ? (
							<p>
								<strong>Total Seasons: </strong>
								{props.movieShowDetails.number_of_seasons}
							</p>
						) : (
							<p>
								<strong>Total Seasons: </strong>No total seasons
								information available.
							</p>
						)}
						{props.movieShowDetails.number_of_episodes !==
						undefined ? (
							<p>
								<strong>Total Episodes: </strong>
								{props.movieShowDetails.number_of_episodes}
							</p>
						) : (
							<p>
								<strong>Total Episodes: </strong>No total
								episode information available.
							</p>
						)}
					</>
				)}
			</div>
		</>
	);
};
