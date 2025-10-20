import "./navbar.scss";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";
import { useEffect, useState } from "react";
import { getTopRatedMovies } from "../../api/movie-api";
import type { Movie, MovieListResponse } from "../../types/movie";
import { IMAGE_BASE } from "../../utils/contant";

export const mainMenuItems = [
  { icon: "fa-compass", label: "Browse", link: "#" },
  { icon: "fa-arrow-trend-up", label: "Trending", link: "#" },
  { icon: "fa-user", label: "Following", link: "#" },
  { icon: "fa-video", label: "Your Videos", link: "#" },
  { icon: "fa-table-list", label: "Playlist", link: "#" },
];

export default function Navbar() {
  const { isSidebarOpen } = useSelector((state: RootState) => state.ui);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      const response: MovieListResponse = await getTopRatedMovies();
      console.log("response", response);
      setTopRatedMovies(response.results);
    };

    fetchTopRatedMovies();
  }, []);

  return (
    <div className={`navbar ${isSidebarOpen ? "collapsed" : ""}`}>
      <div className="logo-container">
        <h1 className="logo items-center">
          {isSidebarOpen ? (
            <div className="logo-icon">
              W<div id="dot"></div>
            </div>
          ) : (
            <>
              Watcher
              <div id="dot"></div>
            </>
          )}
        </h1>
      </div>

      <div className="main-menu">
        <p className="small">{isSidebarOpen ? "" : "News Feed"}</p>

        <ul>
          {mainMenuItems.map((item) => (
            <li key={item.label}>
              <a href={item.link}>
                <button>
                  <i className={`fa-solid ${item.icon} fa-lg`}></i>
                  {!isSidebarOpen && <span>{item.label}</span>}
                </button>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="top-rated">
        <p className="small">Top Rated</p>
        <div className="top-rated-list">
          {topRatedMovies.slice(0, 3)?.map((topRatedMovie) => (
            <div className="movie">
              <img src={`${IMAGE_BASE}/${topRatedMovie.poster_path}`} alt="" />
              <p className="small">{topRatedMovie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
