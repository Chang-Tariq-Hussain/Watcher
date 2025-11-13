import { Pagination, Select } from "antd";
import { useEffect } from "react";
import "./movie-list.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchMoviesByCategory,
  setCategory,
  setPage,
} from "../../redux/features/movies/movieSlice";
import type { AppDispatch, RootState } from "../../redux/store/store";
import Cards from "../cards/Cards";
import ImageSkeleton from "../skeletons/ImageSkeleton";
import ThemeBreadcrumb from "../theme-breadcrumb/ThemeBreadcrumb";

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

  console.log("movies", movies);

  return (
    <div className="movies-list" id="movies-list">
      <ThemeBreadcrumb />
      <div className="list-heading">
        <h2 className="heading-2 border-bottom">Browse Movies</h2>
        <Select
          showSearch
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
        <ImageSkeleton />
      ) : (
        <Cards data={movies} link="/movies" description="No movies found" />
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
