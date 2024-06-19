import { useLoaderData } from "react-router-dom";

import { PopularMovies } from "../components/PopularMovies";
import { Hero } from "../components/Hero";

export const Movies = () => {
	const loaderData = useLoaderData();

	return (
		<>
			<Hero
				loaderData={loaderData}
				loaderIndex={3}
				genreIndex={1}
				mediaType={"movie"}
			/>
			<PopularMovies />
		</>
	);
};
