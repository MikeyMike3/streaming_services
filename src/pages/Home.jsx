import { useNavigation } from "react-router-dom";
import { Trending } from "../components/Trending";
import { BarLoader } from "react-spinners";
import { PopularMovies } from "../components/PopularMovies";
import { PopularShows } from "../components/PopularShows";
import { NowPlaying } from "../components/NowPlaying";
import { Hero } from "../components/Hero";

export const Home = () => {
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

			<Hero />

			<div className="wrapper">
				<div className="home-container">
					<Trending />

					<PopularMovies />

					<PopularShows />
				</div>
			</div>
		</>
	);
};
