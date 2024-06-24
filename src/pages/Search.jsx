import { useEffect, useState } from "react";
import { Link, useNavigation } from "react-router-dom";

import { options } from "../api/options";
import { MovieShowCard } from "../components/MovieShowCard";
import { ViewMoreButton } from "../components/ViewMoreButton";
import { Spinner } from "../components/Spinner";

import { SearchRotateLoader } from "../spinners/SearchRotateLoader";

export const Search = () => {
	const [searchResults, setSearchResults] = useState([]);
	const [queryState, setQueryState] = useState("");
	const [pages, setPages] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [searchIsLoading, setSearchIsLoading] = useState(false);
	const [noResults, setNoResults] = useState(false);
	const navigation = useNavigation();

	const [totalPages, setTotalPages] = useState(0);

	const handleClick = async () => {
		try {
			setIsLoading(true);
			const nextPage = pages + 1;
			const response = await fetch(
				`https://api.themoviedb.org/3/search/multi?query=${queryState}&include_adult=false&language=en-US&page=${nextPage}`,
				options
			);
			const data = await response.json();
			setSearchResults((prevState) => [...prevState, ...data.results]);
			setPages(nextPage);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	const changeHandler = async (e) => {
		const query = e.target.value;
		setQueryState(query);

		if (query.length === 0) {
			setSearchResults([]);
		} else {
			try {
				setSearchIsLoading(true);
				const response = await fetch(
					`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
					options
				);
				const data = await response.json();
				setSearchResults(data.results);
				setTotalPages(data.total_pages);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setSearchIsLoading(false);
			}
		}
	};

	useEffect(() => {
		if (searchResults.length === 0 && queryState.length > 0) {
			setNoResults(true);
		} else {
			setNoResults(false);
		}
	}, [searchResults, queryState]);

	return (
		<div>
			<Spinner navigation={navigation} />
			<div className="wrapper">
				<div className="search-container">
					<input
						autoFocus
						id="search"
						onChange={changeHandler}
						placeholder="Search"></input>
					<button className="search-btn">Search</button>
				</div>

				{searchIsLoading && (
					<div className="view-more-button-loader-container">
						<SearchRotateLoader />
					</div>
				)}

				{noResults && <p className="white">HEY</p>}

				{searchResults.length > 0 && (
					<>
						<div className="search-grid">
							{searchResults.map((item) => (
								<>
									<Link
										to={`/${
											item.media_type
										}/${item.id.toString()}`}>
										<MovieShowCard
											genreIds={item.genre_ids}
											id={item.id}
											mediaType={item.media_type}
											overview={item.overview}
											posterPath={item.poster_path}
											profilePath={item.profile_path}
											backdropPath={item.backdrop_path}
											releaseDate={item.release_date}
											voteAverage={item.vote_average}
											title={item.title}
											name={item.name}
											movieGenres={item.genre_ids}
											showGenres={item.genre_ids}
										/>
									</Link>
								</>
							))}
						</div>

						<ViewMoreButton
							handleClick={handleClick}
							currentPage={pages}
							totalPages={totalPages}
							isLoading={isLoading}
						/>
					</>
				)}
			</div>
		</div>
	);
};
