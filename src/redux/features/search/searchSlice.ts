import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { searchMulti } from "../../../api/search-api";
import type { MultiSearchResult } from "../../../types/search";

interface SearchState {
  query: string;
  results: MultiSearchResult[];
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: "",
  results: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 500
};

export const fetchSearchResults = createAsyncThunk<any,  { query: string; page: number }>(
  "search/fetchResults",
  async ({query, page}) => {
    const data = await searchMulti(query, page);
    return data;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
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
        state.results = action.payload.results;
        state.totalPages = action.payload.total_pages > 500 ? 500 : action.payload.total_pages;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Search failed.";
      });
  },
});

export const { setQuery, clearResults, setPage } = searchSlice.actions;
export default searchSlice.reducer;
