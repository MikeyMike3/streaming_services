import { useEffect, useState } from "react";
import { options } from "../api/options";
import { MovieShowCard } from "../components/MovieShowCard";
import { Link, useNavigation } from "react-router-dom";
import { BarLoader } from "react-spinners";

export const Search = () => {
	const [searchResults, setSearchResults] = useState([]);
	const navigation = useNavigation();

	const changeHandler = (e) => {
		const query = e.target.value;

		if (query.length === 0) {
			setSearchResults([]);
		} else {
			fetch(
				`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
				options
			)
				.then((response) => response.json())
				.then((data) => setSearchResults([data]))
				.catch((error) => console.error("Error fetching data:", error));
		}
	};

	useEffect(() => {
		console.log(searchResults);
	});

	return (
		<div>
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

			<div className="search-container">
				<input
					id="search"
					onChange={changeHandler}
					placeholder="Search"></input>
				<button className="search-btn">Search</button>
			</div>

			{searchResults.length > 0 ? (
				<div>
					<h1>Search Results</h1>
					<div className="search-grid">
						{searchResults[0].results.map((item) => (
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
				</div>
			) : (
				<h1>No Results Found</h1>
			)}
		</div>
	);
};
