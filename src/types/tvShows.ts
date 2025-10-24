// types/tv.ts

export interface TvShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  first_air_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  popularity: number;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
  original_language: string;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  tagline?: string;
  status?: string;
  homepage?: string;
}

export interface TvShowListResponse {
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
}

// Supporting types

export interface Genre {
  id: number;
  name: string;
}

export interface Network {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Season {
  id: number;
  name: string;
  air_date: string | null;
  episode_count: number;
  overview: string;
  poster_path: string | null;
  season_number: number;
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  air_date: string;
  episode_number: number;
  season_number: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
}

// Full TV show detail type

export interface TvShowDetail {
  adult: boolean;
  backdrop_path: string | null;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number | null;
    profile_path: string | null;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string | null;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string | null;
  last_episode_to_air: Episode | null;
  name: string;
  next_episode_to_air: Episode | null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string | null;
  type: string;
  vote_average: number;
  vote_count: number;
}
