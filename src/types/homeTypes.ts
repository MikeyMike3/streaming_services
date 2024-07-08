export interface HomeLoaderMovieResults {
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

interface Genres {
	id: number;
	name: string;
}

export interface HomeLoader {
	page: number;
	results: HomeLoaderMovieResults[] | HomeLoaderShowResults[];
	total_pages: number;
	genres?: Genres[];
}

export interface HomeLoader0 {
	page: number;
	results: HomeLoaderMovieResults[];
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
}

export interface HomeLoader5 {
	page: number;
	results: HomeLoaderMovieResults[];
}
