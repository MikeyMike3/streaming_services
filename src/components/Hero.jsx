
import { Link, useLoaderData } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { useEffect, useState } from "react";
import { options } from "../api/options";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const Hero = () => {
	const loaderData = useLoaderData();
	const [nowPlaying, setNowPlaying] = useState([]);
	const [loading, setLoading] = useState(true);
	const [pages, setPages] = useState(1);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await loaderData;
				setNowPlaying(data);
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

	// Ensure nowPlaying[5] and nowPlaying[5].results are defined
	if (
		!nowPlaying ||
		nowPlaying.length < 6 ||
		!nowPlaying[5] ||
		!nowPlaying[5].results
	) {
		return <div>Data not available</div>;
	}

	const handleClick = () => {
		const nextPage = pages + 1;
		fetch(
			`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${nextPage}`,
			options
		)
			.then((response) => response.json())
			.then((response) => {
				// Update only the 5th array's results property
				const updatedData = [...nowPlaying];
				updatedData[5].results = [
					...updatedData[5].results,
					...response.results,
				];

				// Update the state with the modified array
				setNowPlaying(updatedData);

				// Update the page state
				setPages(nextPage);
			})
			.catch((err) => console.error(err));
	};

	return (
		<>
			<div className="heading-flex">
				<h1>Now Playing In Theatres</h1>
				<button className="view-more-btn" onClick={handleClick}>
					View More
				</button>
			</div>
			<div className="movie-show-flex">
				<Swiper
					grabCursor={true}
					spaceBetween={0}
					slidesPerView={"auto"}
					direction="horizontal"
					modules={[FreeMode]}
					freeMode={{
						freeMode: { enabled: true },
					}}>
					{nowPlaying[5].results.map((item) => (
						<SwiperSlide key={item.id}>
							
								 <div
        className="hero-container"
        style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${item.background_path})`,}}>
          <div className='hero-details'>
            <h2>{item.title || item.name}</h2>

						<p className="hero-rating">
			 								<CircularProgressbar
			 									value={percentage}
			 									text={`${percentage}`}
			 									styles={buildStyles({
			 										textSize: "30px",
			 										textColor: "white",
			 										trailColor: "white",
			 										pathColor: "aqua",
			 									})}
			 								/>
			 							</p>

	<Link to={`/movie/${item.id.toString()}`}>
               <button className='hero-btn'>
                More Details
               </button>
             </Link>

			</div> 
			</div>
							
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</>
	);
};


