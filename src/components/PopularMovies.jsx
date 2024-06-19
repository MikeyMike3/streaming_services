import { useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";

import { options } from "../api/options";
import { Grid } from "./movieShowInDepthComponents/Grid";
import { ViewMoreButton } from "./ViewMoreButton";
import { BarLoader } from "react-spinners";

export const PopularMovies = () => {
	const loaderData = useLoaderData();
	const [popularMovies, setPopularMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [pages, setPages] = useState(1);

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

	const handleClick = () => {
		const nextPage = pages + 1;
		fetch(
			`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${nextPage}`,
			options
		)
			.then((response) => response.json())
			.then((response) => {
				const updatedData = [...popularMovies];
				updatedData[3].results = [
					...updatedData[3].results,
					...response.results,
				];

				setPopularMovies(updatedData);

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
				<h1 className="page-heading">Popular Movies</h1>

				<Grid array={popularMovies[3].results} mediaType={"movie"} />

				<ViewMoreButton
					handleClick={handleClick}
					currentPage={pages}
					totalPages={popularMovies[3].total_pages}
				/>
			</div>
		</>
	);
};
