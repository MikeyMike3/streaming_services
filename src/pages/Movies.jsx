import { useLoaderData } from "react-router-dom";

import { PopularMovies } from "../components/PopularMovies";
import { Hero } from "../components/Hero";
import { GeneralApiErrorMessage } from "../components/GeneralApiErrorMessage";

export const Movies = () => {
	const loaderData = useLoaderData();

	if (loaderData[6] !== null) {
		return <GeneralApiErrorMessage />;
	}

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
