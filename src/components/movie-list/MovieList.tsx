import { useEffect } from "react";
import { Select, Pagination, Spin, Empty } from "antd";
import Card from "../card/Card";
import "./movie-list.scss";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store/store";
import {
  fetchMoviesByCategory,
  setCategory,
  setPage,
} from "../../redux/features/movies/movieSlice";
import type { Movie } from "../../types/movie";
import ThemeBreadcrumb from "../theme-breadcrumb/ThemeBreadcrumb";
import { Link } from "react-router-dom";
import Cards from "../cards/Cards";

const categoryOptions = [
  { value: "popular", label: "Popular" },
  { value: "now_playing", label: "Now Playing" },
  { value: "top_rated", label: "Top Rated" },
  { value: "upcoming", label: "Upcoming" },
];

export default function MovieList() {
  const dispatch = useDispatch<AppDispatch>();

  const { movies, category, page, totalPages, loading } = useSelector(
    (state: RootState) => state.movies
  );

  // Fetch movies whenever category or page changes
  useEffect(() => {
    dispatch(fetchMoviesByCategory({ category, page }));
  }, [category, page, dispatch]);

  // Handle category selection
  const handleCategoryChange = (value: string) => {
    dispatch(setCategory(value));
    dispatch(setPage(1)); // reset page when category changes
  };

  // Handle pagination change
  const handlePageChange = (pageNumber: number) => {
    dispatch(setPage(pageNumber));
  };

  return (
    <div className="movies-list">
      <ThemeBreadcrumb />
      <div className="list-heading">
        <h3 className="heading-3">Browse Movies</h3>
        <Select
          showSearch
          style={{ width: 250, height: 50 }}
          placeholder="Select Category"
          defaultValue={category}
          onChange={handleCategoryChange}
          options={categoryOptions}
          optionFilterProp="label"
          filterSort={(a, b) =>
            (a?.label ?? "")
              .toLowerCase()
              .localeCompare((b?.label ?? "").toLowerCase())
          }
        />
      </div>

      {loading ? (
        <div className="loading-state">
          <Spin size="large" tip="Loading movies..." />
        </div>
      ) : movies.length > 0 ? (
        <Cards data={movies} link="/movies" />
      ) : (
        <Empty description="No movies found" />
      )}

      <div className="pagination">
        <Pagination
          current={page}
          total={totalPages}
          pageSize={1}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
