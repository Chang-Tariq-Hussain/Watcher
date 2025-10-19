// src/api/axiosInstance.js
import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("import.meta.env.VITE_TMDB_API_KEY", import.meta.env.VITE_TMDB_API_KEY)
tmdb.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params["api_key"] = import.meta.env.VITE_TMDB_API_KEY; 
  config.params["language"] = "en-US";
  return config;
});

export default tmdb;