import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toggleSidebar } from "../../redux/features/ui/uiSlice";
import type { AppDispatch, RootState } from "../../redux/store/store";
import "./navbar.scss";

export const mainMenuItems = [
  { icon: "fa-compass", label: "Browse", link: "/", isActive: true },
  {
    icon: "fa-arrow-trend-up",
    label: "Trending",
    link: "/trending",
    isActive: false,
  },
  { icon: "ri-movie-line", label: "Movies", link: "/movies", isActive: false },
  { icon: "ri-tv-line", label: "TV Shows", link: "/tv-shows", isActive: false },
  {
    icon: "fa-grip",
    label: "Collection",
    link: "/collections",
    isActive: false,
  },
];

export default function Navbar() {
  const { isSidebarOpen } = useSelector((state: RootState) => state.ui);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={`navbar ${isSidebarOpen ? "collapsed" : ""}`}>
      <div className="logo-container items-center">
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
        <button
          className={`close-btn`}
          onClick={() => dispatch(toggleSidebar())}
        >
          <i className="ri-close-large-line"></i>
        </button>
      </div>

      <div className="main-menu">
        <p className="small">{isSidebarOpen ? "" : "News Feed"}</p>

        <ul>
          {mainMenuItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.link}
                className={location.pathname === item.link ? "active" : ""}
              >
                <button>
                  <i className={`fa-solid ${item.icon} fa-lg`}></i>
                  {!isSidebarOpen && <span>{item.label}</span>}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* <div className="top-rated">
        <p className="small">Top Rated</p>
        <div className="top-rated-list">
          {topRatedMovies.slice(0, 3)?.map((topRatedMovie) => (
            <div className="movie">
              <img src={`${IMAGE_BASE}/${topRatedMovie.poster_path}`} alt="" />
              <p className="small">{topRatedMovie.title}</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
