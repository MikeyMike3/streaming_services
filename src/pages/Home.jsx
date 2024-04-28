import { useNavigation } from "react-router-dom";
import { Trending } from "../components/Trending";
import { BarLoader } from "react-spinners";
import { TopRatedMovies } from "../components/TopRatedMovies";
import { TopRatedShows } from "../components/TopRatedShows";
import { NowPlaying } from "../components/NowPlaying";

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

			<div>
				<h1>Trending Now</h1>
				<Trending />

				<h1>Now Playing In Theatres:</h1>
				<NowPlaying />

				<h1>Top Rated Movies:</h1>
				<TopRatedMovies />

				<h1>Top Rated Shows:</h1>
				<TopRatedShows />
			</div>
		</>
	);
};
