import { useEffect, useState } from "react";
import { options } from "../api/options";

export const Search = () => {
	const [searchResults, setSearchResults] = useState([]);

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
			<input
				id="search"
				onChange={changeHandler}
				placeholder="Search"></input>
			{/* {searchResults.map((item) => (
				<p key={item.id}>{item.name}</p>
			))} */}
			{searchResults.length > 0 ? (
				<div>
					<h1>Search Results</h1>
					<ul>
						{searchResults[0].results.map((item) => (
							<>
								<li key={item.id}>{item.title}</li>
								{/* <li key={item.name}>{item.name}</li> */}
							</>
						))}
					</ul>
				</div>
			) : (
				<h1>No Results Found</h1>
			)}
		</div>
	);
};
