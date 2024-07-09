import {
	ChangeEvent,
	FormEventHandler,
	useEffect,
	useRef,
	useState,
} from "react";
import { Link, useNavigation } from "react-router-dom";

import { options } from "../api/options";
import { MovieShowCard } from "../components/MovieShowCard";
import { ViewMoreButton } from "../components/ViewMoreButton";
import { Spinner } from "../components/Spinner";

import { SearchRotateLoader } from "../spinners/SearchRotateLoader";
import {
	SearchObject,
	SearchMovieResults,
	SearchShowResults,
} from "../types/SearchTypes";

export const Search = () => {
	const [searchResults, setSearchResults] = useState<
		SearchMovieResults[] | SearchShowResults[] | []
	>([]);
	const [queryState, setQueryState] = useState("");
	const [inputQuery, setInputQuery] = useState("");
	const [pages, setPages] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [searchIsLoading, setSearchIsLoading] = useState(false);
	const [noResults, setNoResults] = useState(false);

	const navigation = useNavigation();

	const [totalPages, setTotalPages] = useState(0);

	const [handleClickError, setHandleClickError] = useState(false);
	const [searchHandleClickError, setSearchHandleClickError] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);

	let query: string;

	const handleClick = async () => {
		let nextPage = pages + 1;
		try {
			let response;
			setIsLoading(true);

			response = await fetch(
				`https://api.themoviedb.org/3/search/multi?query=${queryState}&include_adult=false&language=en-US&page=${nextPage}`,
				options
			);
			if (response.ok) {
				const data = await response.json();
				setSearchResults((prevState) => [
					...prevState,
					...data.results,
				]);
				setPages(nextPage);
				setHandleClickError(false);
			}
		} catch (err) {
			console.error(err);
			setHandleClickError(true);
			nextPage -= 1;
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (inputRef.current) {
			query = inputRef.current.value;
			setInputQuery(query);
		}

		if (query.length === 0) {
			setSearchResults([]);
		} else {
			try {
				setSearchIsLoading(true);
				const response = await fetch(
					`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
					options
				);
				const data: SearchObject = await response.json();
				setSearchResults(data.results);
				setPages(1);
				setTotalPages(data.total_pages);

				if (data.results.length === 0) {
					setNoResults(true);
				} else {
					setNoResults(false);
				}
				setSearchHandleClickError(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setSearchHandleClickError(true);
				setSearchResults([]);
			} finally {
				setSearchIsLoading(false);

				setQueryState(query);
			}
		}
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value;
		setInputQuery(query);
	};

	useEffect(() => {
		if (inputQuery.length === 0) {
			setNoResults(false);
		}
	}, [inputQuery]);

	return (
		<div>
			<Spinner navigation={navigation} />
			<div className="wrapper">
				<form className="search-container" onSubmit={handleSubmit}>
					<input
						autoFocus
						id="search"
						placeholder="Search"
						onChange={onChange}
						ref={inputRef}
					/>
					<button className="search-btn" type="submit">
						Search
					</button>
				</form>

				{searchIsLoading && (
					<div className="search-loader-container">
						<SearchRotateLoader />
					</div>
				)}

				{searchHandleClickError && (
					<p className="no-search-results">
						An error ocurred. Please try again.
					</p>
				)}

				{noResults && (
					<p className="no-search-results">No results were found.</p>
				)}

				{searchResults.length > 0 && (
					<>
						<div className="search-grid">
							{searchResults.map((item) => (
								<>
									{"name" in item ? (
										<Link
											to={`/${
												item.media_type
											}/${item.id.toString()}`}>
											<MovieShowCard
												mediaType={item.media_type}
												posterPath={item.poster_path}
												name={item.name}
											/>
										</Link>
									) : (
										<Link
											to={`/${
												item.media_type
											}/${item.id.toString()}`}>
											<MovieShowCard
												mediaType={item.media_type}
												posterPath={item.poster_path}
												title={item.title}
											/>
										</Link>
									)}
								</>
							))}
						</div>

						<ViewMoreButton
							handleClick={handleClick}
							handleClickError={handleClickError}
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
