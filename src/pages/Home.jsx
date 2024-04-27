import { useNavigation } from "react-router-dom";
import { Trending } from "./Trending";
import { BarLoader } from "react-spinners";

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
			</div>
		</>
	);
};
