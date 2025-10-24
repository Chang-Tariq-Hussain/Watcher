import { configureStore } from "@reduxjs/toolkit";
import movieReducer from '../features/movies/movieSlice';
import searchReducer from '../features/search/searchSlice';
import uiReducer from '../features/ui/uiSlice';
import tvReducer from '../features/tv/tvSlice';

export const store = configureStore({
    reducer: {
        movies: movieReducer,
        search: searchReducer,
        ui: uiReducer,
        tv: tvReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;