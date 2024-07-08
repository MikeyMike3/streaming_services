import { useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";

import { options } from "../api/options";
import { Grid } from "./movieShowInDepthComponents/Grid";
import { ViewMoreButton } from "./ViewMoreButton";
import { Spinner } from "./Spinner";

import { HomeLoader } from "../types/homeTypes";

// function isHomeLoader3(loader: HomeLoader): loader is HomeLoader3 {
// 	return (loader as HomeLoader3).total_pages !== undefined;
// }

export const PopularMovies = () => {
	const loaderData = useLoaderData() as HomeLoader[];
	const [popularMovies, setPopularMovies] = useState<HomeLoader>();

	const [pages, setPages] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [handleClickError, setHandleClickError] = useState<boolean>(false);

	const navigation = useNavigation();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await loaderData;
				let newData = data[3];
				setPopularMovies(newData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [loaderData]);

	// Ensure popularMovies[5] and popularMovies[5].results are defined
	if (!popularMovies || !popularMovies.results) {
		return null;
	}

	const handleClick = async () => {
		setIsLoading(true);
		let nextPage = pages + 1;
		try {
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${nextPage}`,
				options
			);
			if (response.ok) {
				const data = await response.json();
				const updatedData = popularMovies;
				updatedData.results = [...updatedData.results, ...data.results];
				setPopularMovies(updatedData);
				setPages(nextPage);
			}
			setHandleClickError(false);
		} catch (err) {
			console.error(err);
			setHandleClickError(true);
			nextPage -= 1;
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Spinner navigation={navigation} />

			<div className="wrapper">
				<h1 className="page-heading">Popular Movies</h1>

				<Grid array={popularMovies.results} mediaType={"movie"} />

				<ViewMoreButton
					handleClick={handleClick}
					handleClickError={handleClickError}
					currentPage={pages}
					totalPages={popularMovies.total_pages}
					isLoading={isLoading}
				/>
			</div>
		</>
	);
};
