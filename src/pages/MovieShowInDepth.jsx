import { useEffect, useState } from "react";
import { useLoaderData, useParams, useNavigation } from "react-router-dom";
import { BarLoader } from "react-spinners";
import YouTube from "react-youtube";

export const MovieShowInDepth = () => {
	const { mediaType } = useParams();
	const movieShowDetails = useLoaderData();
	const navigation = useNavigation();

	const [flatRateStreamingServices, setFlatRateStreamingServices] = useState(
		[]
	);
	const [buyStreamingServices, setBuyStreamingServices] = useState([]);
	const [rentStreamingServices, setRentStreamingServices] = useState([]);

	const [credits, setCredits] = useState([]);

	const isEmpty = (obj) => {
		return Object.keys(obj).length === 0;
	};

	useEffect(() => {
		if (!isEmpty(movieShowDetails[1].results)) {
			if (
				typeof movieShowDetails[1].results.US.flatrate !== "undefined"
			) {
				setFlatRateStreamingServices(
					movieShowDetails[1].results.US.flatrate
				);
			}
		}
	}, [movieShowDetails]);

	useEffect(() => {
		if (!isEmpty(movieShowDetails[1].results)) {
			if (typeof movieShowDetails[1].results.US.buy !== "undefined") {
				setBuyStreamingServices(movieShowDetails[1].results.US.buy);
			}
		}
	}, [movieShowDetails]);

	useEffect(() => {
		if (!isEmpty(movieShowDetails[1].results)) {
			if (typeof movieShowDetails[1].results.US.rent !== "undefined") {
				setRentStreamingServices(movieShowDetails[1].results.US.rent);
			}
		}
	}, [movieShowDetails]);

	// useEffect(() => {
	// 	console.log(buyStreamingServices);
	// }, [buyStreamingServices]);

	useEffect(() => {
		if (typeof movieShowDetails[2].cast !== "undefined") {
			const filteredCast = movieShowDetails[2].cast.filter(
				(actor) => actor.known_for_department === "Acting"
			);
			setCredits(filteredCast);
		}
	}, [movieShowDetails]);

	// useEffect(() => {
	// 	console.log(credits);
	// }, [credits]);

	console.log(movieShowDetails);

	let movieTrailerLink = movieShowDetails[3].results.find(
		(vid) => vid.name === "Official Trailer"
	);
	console.log(movieTrailerLink);

	const renderTrailer = () => {
		const trailer = movieShowDetails[3].results.find(
			(vid) => vid.name === "Official Trailer"
		);
		const key = trailer ? trailer.key : movieShowDetails[3].results[0].key;

		return (
			<YouTube videoId={key} containerClassName={"youtube-container"} />
		);
	};

	return (
		<div>
			{navigation.state === "loading" ? (
				<div className="loader-container">
					<div className="bar-loader">
						<BarLoader
							color={"aqua"}
							width={"100%"}
							height={8}
							speedMultiplier={0.5}
						/>
					</div>
					<div className="site-logo">
						<h1>
							<span className="retro">Retro</span>Flix
						</h1>
					</div>
				</div>
			) : null}

			{mediaType === "movie" ? (
				<>
					<h2>{movieShowDetails[0].title}</h2>
					<p>{mediaType}</p>
					<img
						src={`https://image.tmdb.org/t/p/w500/${movieShowDetails[0].poster_path}.jpg`}
						alt="movie poster"
					/>
					<img
						src={`https://image.tmdb.org/t/p/w500/${movieShowDetails[0].backdrop_path}.jpg`}
						alt="movie poster"
					/>
					<p>{movieShowDetails[0].vote_average}</p>
					<p>{movieShowDetails[0].overview}</p>
					<ul>
						{movieShowDetails[0].genres.map((item) => (
							<li key={item.id}>{item.name}</li>
						))}
					</ul>
					<h3>Stream On:</h3>
					{flatRateStreamingServices.map((item) => (
						<img
							className="provider-imgs"
							key={item.provider_id}
							src={`https://image.tmdb.org/t/p/w500/${item.logo_path}.jpg`}
							alt="movie poster"
						/>
					))}
					<h3>Buy On:</h3>
					{buyStreamingServices.map((item) => (
						<img
							className="provider-imgs"
							key={item.provider_id}
							src={`https://image.tmdb.org/t/p/w500/${item.logo_path}.jpg`}
							alt="movie poster"
						/>
					))}
					<h3>Rent On:</h3>
					{rentStreamingServices.map((item) => (
						<img
							className="provider-imgs"
							key={item.provider_id}
							src={`https://image.tmdb.org/t/p/w500/${item.logo_path}.jpg`}
							alt="movie poster"
						/>
					))}
					<h3>Trailer:</h3>
					{renderTrailer()}

					<h3>Cast:</h3>
					{credits.map((item) => (
						<div key={item.cast_id} className="cast-card">
							<p>{item.character}</p>
							<p>{item.name}</p>
							{item.profile_path !== null ? (
								<img
									className="cast-card-img"
									src={`https://image.tmdb.org/t/p/w500/${item.profile_path}.jpg`}></img>
							) : null}
						</div>
					))}
				</>
			) : (
				<>
					<h2>{movieShowDetails[0].name}</h2>
					<p>{mediaType}</p>
					<img
						src={`https://image.tmdb.org/t/p/w500/${movieShowDetails[0].poster_path}.jpg`}
						alt="movie poster"
					/>
					<img
						src={`https://image.tmdb.org/t/p/w500/${movieShowDetails[0].backdrop_path}.jpg`}
						alt="movie poster"
					/>
					<p>{movieShowDetails[0].vote_average}</p>
					<p>{movieShowDetails[0].overview}</p>
					<ul>
						{movieShowDetails[0].genres.map((item) => (
							<li key={item.id}>{item.name}</li>
						))}
					</ul>

					<h3>Stream On:</h3>
					{flatRateStreamingServices.map((item) => (
						<img
							className="provider-imgs"
							key={item.provider_id}
							src={`https://image.tmdb.org/t/p/w500/${item.logo_path}.jpg`}
							alt="movie poster"
						/>
					))}
					<h3>Buy On:</h3>
					{buyStreamingServices.map((item) => (
						<img
							className="provider-imgs"
							key={item.provider_id}
							src={`https://image.tmdb.org/t/p/w500/${item.logo_path}.jpg`}
							alt="movie poster"
						/>
					))}
					<h3>Rent On:</h3>
					{rentStreamingServices.map((item) => (
						<img
							className="provider-imgs"
							key={item.provider_id}
							src={`https://image.tmdb.org/t/p/w500/${item.logo_path}.jpg`}
							alt="movie poster"
						/>
					))}

					<h3>Trailer:</h3>

					{renderTrailer()}

					<h3>Cast:</h3>
					{credits.map((item) => (
						<div key={item.id} className="cast-card">
							<p>{item.character}</p>
							<p>{item.name}</p>
							{item.profile_path !== null ? (
								<img
									className="cast-card-img"
									src={`https://image.tmdb.org/t/p/w500/${item.profile_path}.jpg`}></img>
							) : null}
						</div>
					))}
				</>
			)}
		</div>
	);
};
