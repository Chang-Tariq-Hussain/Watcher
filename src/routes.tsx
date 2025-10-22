import Homepage from "./pages/homepage/Homepage";
import MovieDetail from "./pages/movie-detail/MovieDetail";
export const routes = [
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/movies/:id",
    element: <MovieDetail />,
  },
];
