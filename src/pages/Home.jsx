import { useNavigation, useLoaderData } from "react-router-dom";

import { Trending } from "../components/Trending";
import { Spinner } from "../components/Spinner";
import { PopularMoviesSlider } from "../components/PopularMoviesSlider";
import { Hero } from "../components/Hero";
import { PopularShowsSlider } from "../components/PopularShowsSlider";
import { HomeLoaderIcon } from "../components/HomeLoaderIcon";
import { GeneralApiErrorMessage } from "../components/GeneralApiErrorMessage";

export const Home = () => {
	const loaderData = useLoaderData();
	const navigation = useNavigation();

	if (loaderData[6] !== null) {
		return <GeneralApiErrorMessage />;
	}

	return (
		<>
			<HomeLoaderIcon />

			<Spinner navigation={navigation} />

			<Hero
				loaderData={loaderData}
				loaderIndex={5}
				genreIndex={1}
				mediaType={"movie"}
			/>

			<div className="wrapper">
				<div className="home-container">
					<Trending />

					<PopularMoviesSlider />

					<PopularShowsSlider />
				</div>
			</div>
		</>
	);
};
