import { useEffect, useState } from "react";
import "./header.scss";
import { searchMovies, searchMulti } from "../../api/search-api";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store/store";
import { toggleSidebar, toggleTheme } from "../../redux/features/ui/uiSlice";
import { useNavigate } from "react-router-dom";
import {
  fetchSearchResults,
  setQuery,
} from "../../redux/features/search/searchSlice";

export default function Header() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { isSidebarOpen, theme } = useSelector((state: RootState) => state.ui);
  const { page } = useSelector((state: RootState) => state.search);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(fetchSearchResults({ query: searchKeyword, page }));
    dispatch(setQuery(searchKeyword));
    navigate("/search");
  };

  const handleSidebarOpen = () => {
    dispatch(toggleSidebar());
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    dispatch(fetchSearchResults({ query: searchKeyword, page }));
  }, [page]);

  return (
    <div className="header">
      <button className="close-sidebar" onClick={handleSidebarOpen}>
        <i
          className={`${
            isSidebarOpen
              ? "ri-arrow-right-double-line"
              : "ri-arrow-left-double-line"
          } ri-lg`}
        ></i>
      </button>

      <div className="header-right">
        <form onSubmit={handleSubmit}>
          <i className="ri-search-line ri-md"></i>
          <input
            type="search"
            placeholder="Search here..."
            name="search"
            id="search"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </form>
        <div className="items-center">
          <i className="ri-notification-4-line ri-lg"></i>
          <button className="theme-btn" onClick={handleToggleTheme}>
            <i
              className={`${
                theme === "light" ? "ri-moon-line" : "ri-sun-line"
              } ri-lg`}
            ></i>
          </button>
          <div className="avatar">
            <img
              src="https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg"
              alt="avatar"
              className="avatar-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
