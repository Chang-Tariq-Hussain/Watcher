import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchMovies } from "../../../api/search-api";
import type { Movie } from "../../../types/movie";

interface SearchState {
  query: string;
  results: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: "",
  results: [],
  loading: false,
  error: null,
};

export const fetchSearchResults = createAsyncThunk(
  "search/fetchResults",
  async (query: string) => {
    const data = await searchMovies(query);
    return data.results;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    clearResults: (state) => {
      state.results = [];
      state.query = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Search failed.";
      });
  },
});

export const { setQuery, clearResults } = searchSlice.actions;
export default searchSlice.reducer;
