import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {PayloadAction} from '@reduxjs/toolkit'
import { getMoviesByCategory } from "../../../api/movie-api";
import type { Movie, MovieListResponse } from "../../../types/movie";
import { getTvShowsByCategory } from "../../../api/tv-shows";
import type { TvShow, TvShowListResponse } from "../../../types/tvShows";

interface TvState {
  tvShows: TvShow[];
  category: string;
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: TvState = {
  tvShows: [],
  category: "popular",
  page: 1,
  totalPages: 500,
  loading: false,
  error: null,
};

export const fetchTvShowsByCategory = createAsyncThunk<
  TvShowListResponse,
  { category: string; page: number }
>("movies/fetchTvShowsByCategory", async ({ category, page }) => {
  const data = await getTvShowsByCategory(category, page);
  return data;
});

const tvSlice = createSlice({
  name: "tv-shows",
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
      .addCase(fetchTvShowsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTvShowsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.tvShows = action.payload.results;
        state.totalPages = action.payload.total_pages > 500 ? 500 : action.payload.total_pages;
      })
      .addCase(fetchTvShowsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch tv shows";
      });
  },
});

export const { setCategory, setPage } = tvSlice.actions;
export default tvSlice.reducer;
