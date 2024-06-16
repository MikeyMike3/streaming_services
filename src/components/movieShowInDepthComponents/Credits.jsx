import React from 'react'

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import { Link } from 'react-router-dom';

import poster from "../../imgs/tmdbPoster.jpg"

export const Credits = (props) => {
  return (
    <>
    <h1 className="heading">Cast</h1>
								<div className="heading-underline"></div>
								<div className="cast-card-container">
									<Swiper
										grabCursor={true}
										spaceBetween={0}
										navigation={true}
										slidesPerView={"auto"}
										modules={[FreeMode, Navigation]}
										freeMode={{
											freeMode: true,
										}}>
										{props.credits.map((item) => (
											<SwiperSlide key={item.id}>
												<Link
													to={`/person/${item.id.toString()}`}>
													<div
														key={item.cast_id}
														className="cast-card">
														{item.profile_path ===
														null ? (
															<img
																className="cast-card-img"
																src={poster}
																alt="movie poster"
															/>
														) : (
															<img
																className="cast-card-img"
																src={`https://image.tmdb.org/t/p/w500/${item.profile_path}.jpg`}
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
								</div>
                </>
  )
}
