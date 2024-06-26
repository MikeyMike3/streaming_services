import { useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";

import { options } from "../api/options";
import { Grid } from "./movieShowInDepthComponents/Grid";
import { ViewMoreButton } from "./ViewMoreButton";
import { Spinner } from "./Spinner";

export const PopularMovies = () => {
	const loaderData = useLoaderData();
	const [popularMovies, setPopularMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [pages, setPages] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [handleClickError, setHandleClickError] = useState(false);

	const navigation = useNavigation();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await loaderData;
				setPopularMovies(data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, [loaderData]);

	useEffect(() => {}, [popularMovies]);

	if (loading) {
		return <div className="display-none">Loading...</div>;
	}

	// Ensure popularMovies[5] and popularMovies[5].results are defined
	if (
		!popularMovies ||
		popularMovies.length < 6 ||
		!popularMovies[3] ||
		!popularMovies[3].results
	) {
		return <div>Data not available</div>;
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
				const updatedData = [...popularMovies];
				updatedData[3].results = [
					...updatedData[3].results,
					...data.results,
				];
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

				<Grid array={popularMovies[3].results} mediaType={"movie"} />

				<ViewMoreButton
					handleClick={handleClick}
					handleClickError={handleClickError}
					currentPage={pages}
					totalPages={popularMovies[3].total_pages}
					isLoading={isLoading}
				/>
			</div>
		</>
	);
};
