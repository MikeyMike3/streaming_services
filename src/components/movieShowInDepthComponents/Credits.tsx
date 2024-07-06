import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import poster from "../../imgs/tmdbPoster.jpg";

import { ShowCast } from "../../pages/MovieShowInDepth";
import { MovieCast } from "../../pages/MovieShowInDepth";

type CreditsProps = {
	credits: ShowCast[] | MovieCast[];
};

export const Credits = (props: CreditsProps) => {
	const creditsSwiperRef: any = useRef(null);

	useEffect(() => {
		if (creditsSwiperRef.current && creditsSwiperRef.current.swiper) {
			creditsSwiperRef.current.swiper.slideTo(0);
		}
	}, [props.credits]);
	return (
		<>
			<h1 className="heading">Cast</h1>
			<div className="heading-underline"></div>
			<div className="cast-card-container">
				{props.credits.length > 0 ? (
					<Swiper
						ref={creditsSwiperRef}
						grabCursor={true}
						spaceBetween={0}
						slidesPerView={"auto"}
						modules={[FreeMode]}
						freeMode={true}>
						{props.credits.map((item) => (
							<SwiperSlide key={item.id}>
								<Link to={`/person/${item.id.toString()}`}>
									<div key={item.id} className="cast-card">
										{item.profile_path === null ? (
											<img
												className="cast-card-img"
												src={poster}
												alt="movie poster"
											/>
										) : (
											<img
												className="cast-card-img"
												src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
												alt="movie poster"
											/>
										)}
										<div className="cast-info">
											<p>{item.name}</p>
										</div>
									</div>
								</Link>
							</SwiperSlide>
						))}
					</Swiper>
				) : (
					<p>No cast information available.</p>
				)}
			</div>
		</>
	);
};
