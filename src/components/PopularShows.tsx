import { useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";

import { options } from "../api/options";
import { Grid } from "./movieShowInDepthComponents/Grid";
import { Spinner } from "./Spinner";
import { ViewMoreButton } from "./ViewMoreButton";

import { HomeLoaderTuple } from "../types/homeTypes";

export const PopularShows = () => {
	const loaderData = useLoaderData() as HomeLoaderTuple;
	const [popularShows, setPopularShows] = useState<HomeLoaderTuple>();

	const [pages, setPages] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [handleClickError, setHandleClickError] = useState(false);

	const navigation = useNavigation();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await loaderData;
				setPopularShows(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [loaderData]);

	if (
		!popularShows ||
		popularShows.length < 6 ||
		!popularShows[4] ||
		!popularShows[4].results
	) {
		return null;
	}

	const handleClick = async () => {
		setIsLoading(true);
		let nextPage = pages + 1;
		try {
			const response = await fetch(
				`https://api.themoviedb.org/3/tv/popular?language=en-US&page=${nextPage}`,
				options
			);
			if (response.ok) {
				const data = await response.json();
				const updatedData: HomeLoaderTuple = [...popularShows];

				updatedData[4].results = [
					...updatedData[4].results,
					...data.results,
				];

				setPopularShows(updatedData);
				setPages(nextPage);
			}
			setHandleClickError(false);
		} catch (err) {
			console.error(err);
			setHandleClickError(true);
			nextPage = -1;
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
					handleClickError={handleClickError}
					currentPage={pages}
					totalPages={popularShows[4].total_pages}
					isLoading={isLoading}
				/>
			</div>
		</>
	);
};
