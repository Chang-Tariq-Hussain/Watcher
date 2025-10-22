import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {PayloadAction} from '@reduxjs/toolkit'
import { getMoviesByCategory } from "../../../api/movie-api";
import type { Movie, MovieListResponse } from "../../../types/movie";

interface MovieState {
  movies: Movie[];
  category: string;
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  category: "popular",
  page: 1,
  totalPages: 500,
  loading: false,
  error: null,
};

export const fetchMoviesByCategory = createAsyncThunk<
  MovieListResponse,
  { category: string; page: number }
>("movies/fetchMoviesByCategory", async ({ category, page }) => {
  const data = await getMoviesByCategory(category, page);
  return data;
});

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.totalPages = action.payload.total_pages > 500 ? 500 : action.payload.total_pages;
      })
      .addCase(fetchMoviesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch movies";
      });
  },
});

export const { setCategory, setPage } = movieSlice.actions;
export default movieSlice.reducer;
