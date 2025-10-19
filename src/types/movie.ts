export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  popularity: number;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  original_language: string;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  runtime?: number;
  tagline?: string;
  status?: string;
  homepage?: string;
}

export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
