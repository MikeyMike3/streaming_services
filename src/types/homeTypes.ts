export interface HomeLoaderMovieResults {
	id: number;
	title: string | null;
	poster_path: string | null;
	overview: string;
	genre_ids: number[];
	release_date: string;
	vote_average: number;
	backdrop_path: string;
	profile_path: string;
}

export interface HomeLoaderShowResults {
	id: number;
	name: string | null;
	poster_path: string | null;
	overview: string;
	genre_ids: number[];
	release_date: string;
	vote_average: number;
	backdrop_path: string;
	profile_path: string;
}

export interface HomeLoaderTrendingShowResults {
	id: number;
	name: string | null;
	poster_path: string | null;
	media_type: string;
	overview: string;
	genre_ids: number[];
	release_date: string;
	vote_average: number;
	backdrop_path: string;
	profile_path: string;
}

export interface HomeLoaderTrendingMovieResults {
	id: number;
	title: string | null;
	poster_path: string | null;
	media_type: string;
	overview: string;
	genre_ids: number[];
	release_date: string;
	vote_average: number;
	backdrop_path: string;
	profile_path: string;
}
interface Genres {
	id: number;
	name: string;
}

export type HomeLoaderTuple = [
	HomeLoader0,
	HomeLoader1,
	HomeLoader2,
	HomeLoader3,
	HomeLoader4,
	HomeLoader5,
	string | null,
];

export type HomeLoaderTupleDefault = [
	HomeLoader0 | null,
	HomeLoader1 | null,
	HomeLoader2 | null,
	HomeLoader3 | null,
	HomeLoader4 | null,
	HomeLoader5 | null,
	string | null,
];

export interface HomeLoader0 {
	page: number;
	results: HomeLoaderTrendingMovieResults[] | HomeLoaderTrendingShowResults[];
	total_pages: number;
}

export interface HomeLoader1 {
	genres: Genres[];
}

export interface HomeLoader2 {
	genres: Genres[];
}

export interface HomeLoader3 {
	page: number;
	results: HomeLoaderMovieResults[];
	total_pages: number;
}

export interface HomeLoader4 {
	page: number;
	results: HomeLoaderShowResults[];
	total_pages: number;
}

export interface HomeLoader5 {
	page: number;
	results: HomeLoaderMovieResults[];
	total_pages: number;
}
