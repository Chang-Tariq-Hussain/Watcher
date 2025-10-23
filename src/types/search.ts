// src/types/tmdb/search.ts

export type MediaType = "movie" | "tv" | "person";

// 🎬 Movie Result
export interface SearchMovie {
  media_type: "movie";
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
  genre_ids?: number[];
  adult?: boolean;
  video?: boolean;
  original_language?: string;
}

// 📺 TV Result
export interface SearchTV {
  media_type: "tv";
  id: number;
  name: string;
  original_name: string;
  overview: string;
  first_air_date?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
  genre_ids?: number[];
  origin_country?: string[];
  original_language?: string;
}

// 👤 Person Result
export interface SearchPerson {
  media_type: "person";
  id: number;
  name: string;
  original_name: string;
  profile_path?: string | null;
  popularity?: number;
  known_for?: (SearchMovie | SearchTV)[];
}

// 🔍 Combined Result Type
export type MultiSearchResult = SearchMovie | SearchTV | SearchPerson;

// 📄 Response Type
export interface MultiSearchResponse {
  page: number;
  results: MultiSearchResult[];
  total_pages: number;
  total_results: number;
}
