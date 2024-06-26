import { useState, useEffect } from "react";
import { homeLoader } from "../loaders/homeLoader";
import { BarLoader } from "react-spinners";

export const HomeLoaderIcon = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadData = async () => {
			setIsLoading(true);
			await homeLoader();

			setIsLoading(false);
		};

		loadData();
	}, []);

	if (isLoading) {
		return (
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
		);
	}
	return null;
};
