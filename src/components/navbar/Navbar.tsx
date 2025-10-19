import "./navbar.scss";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store/store";

export default function Navbar() {
  const { isSidebarOpen } = useSelector((state: RootState) => state.ui);

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
          <li>
            <a href="#">
              <button>
                <i className="fa-solid fa-compass fa-lg"></i>
                {!isSidebarOpen && <span>Browse</span>}
              </button>
            </a>
          </li>
          <li>
            <a href="#">
              <button>
                <i className="fa-solid fa-arrow-trend-up fa-lg"></i>
                {!isSidebarOpen && <span>Trending</span>}
              </button>
            </a>
          </li>
          <li>
            <a href="#">
              <button>
                <i className="fa-regular fa-user fa-lg"></i>
                {!isSidebarOpen && <span>Following</span>}
              </button>
            </a>
          </li>
          <li>
            <a href="#">
              <button>
                <i className="fa-solid fa-video fa-lg"></i>
                {!isSidebarOpen && <span>Your Videos</span>}
              </button>
            </a>
          </li>
          <li>
            <a href="#">
              <button>
                <i className="fa-solid fa-table-list fa-lg"></i>
                {!isSidebarOpen && <span>Playlist</span>}
              </button>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
