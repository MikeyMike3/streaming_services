import React from 'react'

import { Link } from 'react-router-dom'
import { MovieShowCard } from '../MovieShowCard'

export const Grid = (props) => {
  return (
    <div className="search-grid">
							{props.array.map((item) => (
								<Link
									onClick={props.resetState}
									key={item.id}
									to={`/${props.mediaType}/${item.id.toString()}`}>
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
							))}
						</div>
  )
}
