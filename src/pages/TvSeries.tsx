import { useLoaderData } from "react-router-dom";

import { PopularShows } from "../components/PopularShows";
import { Hero } from "../components/Hero";
import { GeneralApiErrorMessage } from "../components/GeneralApiErrorMessage";
import { HomeLoaderTuple } from "../types/homeTypes";

export const TvSeries = () => {
	const loaderData = useLoaderData() as HomeLoaderTuple;

	if (loaderData[6] !== null) {
		return <GeneralApiErrorMessage />;
	}
	return (
		<>
			<Hero
				loaderData={loaderData}
				loaderIndex={4}
				genreIndex={2}
				mediaType={"tv"}
			/>
			<PopularShows />
		</>
	);
};
