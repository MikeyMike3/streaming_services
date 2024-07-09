// MovieShowDetails index 0
export interface SpokenLanguages {
	english_name: string | null;
	iso_639_1: string | null;
	name: string | null;
}

export interface ProductionCompanies {
	id: number | null;
	logo_path: string | null;
	name: string | null;
	origin_country: string | null;
}

export interface Genres {
	id: number | null;
	name: string | null;
}

// MovieShowDetails index 1
export interface CountryResult {
	link?: string | null;
	flatrate?: Provider[] | null;
	rent?: Provider[] | null;
	buy?: Provider[] | null;
}

export interface Provider {
	logo_path: string | null;
	provider_id: number | null;
	provider_name: string | undefined;
	display_priority: number | null;
}

// MovieShowDetails index 2
export interface MovieCast {
	adult: boolean | null;
	gender: number | null;
	id: number;
	known_for_department: string | null;
	name: string | null;
	original_name: string | null;
	popularity: number | null;
	profile_path: string | null;
	cast_id: number | null;
	character: string | null;
	credit_id: string | null;
	order: number | null;
}

export interface ShowCast {
	adult: boolean | null;
	gender: number | null;
	id: number;
	known_for_department: string | null;
	name: string | null;
	original_name: string | null;
	popularity: number | null;
	profile_path: string | null;
	character: string | null;
	credit_id: string | null;
	order: number | null;
}

export interface PersonCast {
	movieShow: string;
	adult: boolean | null;
	backdrop_path: string | null;
	genre_ids: number[];
	id: number;
	original_language: string | null;
	original_title: string | null;
	overview: string | null;
	popularity: number | null;
	poster_path: string | null;
	release_date: string | null;
	title: string | null;
	video: boolean | null;
	vote_average: number | null;
	vote_count: number | null;
	character: string | null;
	credit_id: string | null;
	order: number | null;
	media_type: string;
	profile_path: string | null;
	name: string | null;
}

// MovieShowDetails index 3

export interface VideoResults {
	iso_639_1: string | null;
	iso_3166_1: string | null;
	name: string | null;
	key: string | null;
	site: string | null;
	size: number | null;
	type: string | null;
	official: boolean | null;
	id: string | null;
}

// MovieShowDetails index 4

export interface SimilarResults {
	movieShow: string;
	adult: boolean | null;
	genre_ids: number[] | null;
	id: number;
	original_language: string | null;
	original_title: string | null;
	overview: string | null;
	popularity: number | null;
	poster_path: string | null;
	release_date: string | null;
	title: string | null;
	video: boolean | null;
	vote_average: number | null;
	vote_count: number | null;
	profile_path: string | null;
	backdrop_path: string | null;
	name: string | null;
}

// MovieShowDetails index 5

export interface Images {
	aspect_ratio: number | null;
	height: number | null;
	iso_639_1: string | null;
	file_path: string | null;
	vote_average: number | null;
	vote_count: number | null;
	width: number | null;
}

// movies

export interface MovieShowDetailsMovie0 {
	adult: boolean | null;
	backdrop_path: string | null;
	belongs_to_collection: string | null;
	budget: number | null;
	genres: Genres[];
	homepage: string | null;
	id: number | null;
	imdb_id: string | null;
	origin_country: string[] | null;
	original_language: string | undefined;
	original_title: string | null;
	overview: string;
	popularity: number | null;
	poster_path: string | null;
	production_companies: ProductionCompanies[] | null;
	release_date: string | undefined;
	revenue: number | null;
	runtime: number | null;
	spoken_languages: SpokenLanguages[] | null;
	status: string | null;
	tagline: string | null;
	title: string | null;
	video: boolean | null;
	vote_average: number;
	vote_count: number | null;
}

export interface MovieShowDetailsMovie1 {
	id: number;
	results: {
		[countryCode: string]: CountryResult;
	};
}

export interface MovieShowDetailsMovie2 {
	cast: MovieCast[];
}

export interface MovieShowDetailsMovie3 {
	id: number | null;
	results: VideoResults[];
}

export interface MovieShowDetailsMovie4 {
	page: number | null;
	results: SimilarResults[];
	total_pages: number | null;
	total_results: number | null;
}

export interface MovieShowDetailsMovie5 {
	backdrops: Images[] | null;
	id: number | null;
	logos: Images[] | null;
	posters: Images[] | null;
}

//  shows

export interface MovieShowDetailsShow0 {
	name: string;
	backdrop_path: string | null;
	poster_path: string | null;
	episode_run_time: number[];
	number_of_episodes: number | undefined;
	number_of_seasons: number | undefined;
	original_language: string | undefined;
	first_air_date: string;
	vote_average: number;
	genres: Genres[];
	overview: string;
}

interface MovieShowDetailsShow1 {}

export interface MovieShowDetailsShow2 {
	cast: ShowCast[];
}

interface MovieShowDetailsShow3 {}

interface MovieShowDetailsShow4 {}

interface MovieShowDetailsShow5 {}

//   person

export interface Person0 {
	adult: boolean | null;
	also_known_as: string[];
	biography: string | null;
	birthday: string | null;
	deathday: string | null;
	gender: number | null;
	homepage: string | null;
	id: number | null;
	imdb_id: string | null;
	known_for_department: string | null;
	name: string | null;
	place_of_birth: string | null;
	popularity: number | null;
	profile_path: string | null;
}

export interface Person1 {
	cast: PersonCast[];
}
