import { useNavigation, useLoaderData } from "react-router-dom";

import { Trending } from "../components/Trending";
import { BarLoader } from "react-spinners";
import { PopularMoviesSlider } from "../components/PopularMoviesSlider";
import { Hero } from "../components/Hero";
import { PopularShowsSlider } from "../components/PopularShowsSlider";

export const Home = () => {
	const loaderData = useLoaderData();
	const navigation = useNavigation();

	return (
		<>
			{navigation.state === "loading" ? (
				<div className="loader-container">
					<div className="bar-loader">
						<BarLoader
							color={"aqua"}
							width={"100%"}
							height={8}
							speedMultiplier={1}
						/>
					</div>
					<div className="site-logo">
						<h1>
							<span className="retro">Retro</span>Flix
						</h1>
					</div>
				</div>
			) : null}

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
