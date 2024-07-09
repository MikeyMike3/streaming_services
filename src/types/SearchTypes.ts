export interface SearchMovieResults {
	id: number;
	title: string;
	poster_path: string | null;
	media_type: string;
}

export interface SearchShowResults {
	id: number;
	name: string;
	poster_path: string | null;
	media_type: string;
}

export interface SearchObject {
	page: number;
	results: SearchMovieResults[] | SearchShowResults[];
	total_pages: number;
}
