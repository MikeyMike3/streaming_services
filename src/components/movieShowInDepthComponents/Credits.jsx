import { useRef } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import poster from "../../imgs/tmdbPoster.jpg";

export const Credits = (props) => {
	const swiperRef = useRef(null);

	if (swiperRef.current && swiperRef.current.swiper) {
		swiperRef.current.swiper.slideTo(0);
	}
	return (
		<>
			<h1 className="heading">Cast</h1>
			<div className="heading-underline"></div>
			<div className="cast-card-container">
				{props.credits.length > 0 ? (
					<Swiper
						ref={swiperRef}
						grabCursor={true}
						spaceBetween={0}
						slidesPerView={"auto"}
						modules={[FreeMode]}
						freeMode={{
							freeMode: true,
						}}>
						{props.credits.map((item) => (
							<SwiperSlide key={item.id}>
								<Link to={`/person/${item.id.toString()}`}>
									<div
										key={item.cast_id}
										className="cast-card">
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
Credits.propTypes = {
	credits: PropTypes.array,
};
