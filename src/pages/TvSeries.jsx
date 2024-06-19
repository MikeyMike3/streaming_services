import { useLoaderData } from "react-router-dom";

import { PopularShows } from "../components/PopularShows";
import { Hero } from "../components/Hero";

export const TvSeries = () => {
	const loaderData = useLoaderData();
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
