import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  theme: "light" | "dark";
  isSidebarOpen: boolean;
}

const initialState: UIState = {
  theme: "dark",
  isSidebarOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { toggleTheme, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
