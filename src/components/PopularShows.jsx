import { useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";

import { options } from "../api/options";
import { Grid } from "./movieShowInDepthComponents/Grid";
import { Spinner } from "./Spinner";
import { ViewMoreButton } from "./ViewMoreButton";

export const PopularShows = () => {
	const loaderData = useLoaderData();
	const [popularShows, setPopularShows] = useState([]);
	const [loading, setLoading] = useState(true);
	const [pages, setPages] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

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

	const handleClick = async () => {
		setIsLoading(true);
		const nextPage = pages + 1;
		try {
			const response = await fetch(
				`https://api.themoviedb.org/3/tv/popular?language=en-US&page=${nextPage}`,
				options
			);
			const data = await response.json();
			const updatedData = [...popularShows];
			updatedData[4].results = [
				...updatedData[4].results,
				...data.results,
			];

			setPopularShows(updatedData);
			setPages(nextPage);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<>
			<Spinner navigation={navigation} />

			<div className="wrapper">
				<h1 className="page-heading">Popular Shows</h1>

				<Grid array={popularShows[4].results} mediaType={"tv"} />

				<ViewMoreButton
					handleClick={handleClick}
					currentPage={pages}
					totalPages={popularShows[4].total_pages}
					isLoading={isLoading}
				/>
			</div>
		</>
	);
};
