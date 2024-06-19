import { useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";

import { options } from "../api/options";
import { Grid } from "./movieShowInDepthComponents/Grid";
import { BarLoader } from "react-spinners";

export const PopularShows = () => {
	const loaderData = useLoaderData();
	const [popularShows, setPopularShows] = useState([]);
	const [loading, setLoading] = useState(true);
	const [pages, setPages] = useState(1);

	const navigation = useNavigation();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await loaderData;
				setPopularShows(data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, [loaderData]);

	if (loading) {
		return <div className="display-none">Loading...</div>;
	}

	if (
		!popularShows ||
		popularShows.length < 6 ||
		!popularShows[4] ||
		!popularShows[4].results
	) {
		return <div>Data not available</div>;
	}

	const handleClick = () => {
		const nextPage = pages + 1;
		fetch(
			`https://api.themoviedb.org/3/tv/popular?language=en-US&page=${nextPage}`,
			options
		)
			.then((response) => response.json())
			.then((response) => {
				// Update only the 5th array's results property
				const updatedData = [...popularShows];
				updatedData[4].results = [
					...updatedData[4].results,
					...response.results,
				];

				// Update the state with the modified array
				setPopularShows(updatedData);

				// Update the page state
				setPages(nextPage);
			})
			.catch((err) => console.error(err));
	};
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

			<div className="wrapper">
				<h1 className="page-heading">Popular Shows</h1>

				<Grid array={popularShows[4].results} mediaType={"tv"} />

				<div className="view-more-btn-container">
					<button
						className="view-more-btn view-more-btn-in-depth-search"
						onClick={handleClick}>
						View More
					</button>
				</div>
			</div>
		</>
	);
};
