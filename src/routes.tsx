import Homepage from "./pages/homepage/Homepage";
import MovieDetail from "./pages/movie-detail/MovieDetail";
import SearchResults from "./pages/search-results/SearchResults";
export const routes = [
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/movies/:id",
    element: <MovieDetail />,
  },
  {
    path: "/search",
    element: <SearchResults />,
  },
];
