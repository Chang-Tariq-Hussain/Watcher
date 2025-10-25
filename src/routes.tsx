import HomepageSkeleton from "./components/skeletons/homage/HomepageSkeleton";
import Collection from "./pages/collection/Collection";
import Homepage from "./pages/homepage/Homepage";
import MediaDetail from "./pages/media-detail/MediaDetail";
import Movies from "./pages/movies/Movies";
import SearchResults from "./pages/search-results/SearchResults";
import Trending from "./pages/trending/Trending";
import TvShows from "./pages/tv-shows/TvShows";
export const routes = [
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/:type/:id", // ✅ unified route for movie & tv
    element: <MediaDetail />,
  },
  {
    path: "/search",
    element: <SearchResults />,
  },
  {
    path: "/movies",
    element: <Movies />,
  },
  {
    path: "/tv-shows",
    element: <TvShows />,
  },
  {
    path: "/trending",
    element: <Trending />,
  },
  {
    path: "/collections",
    element: <Collection />,
  },
  {
    path: "/test",
    element: <HomepageSkeleton />,
  },
];
