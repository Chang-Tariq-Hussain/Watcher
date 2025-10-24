import { useDispatch, useSelector } from "react-redux";
import HeroTv from "../../components/hero-tv/HeroTv";
import ThemeBreadcrumb from "../../components/theme-breadcrumb/ThemeBreadcrumb";
import { type AppDispatch, type RootState } from "../../redux/store/store";
import { Empty, Pagination, Select, Spin } from "antd";
import Cards from "../../components/cards/Cards";
import "./tv-shows.scss";

import {
  fetchTvShowsByCategory,
  setCategory,
  setPage,
} from "../../redux/features/tv/tvSlice";
import { useEffect } from "react";

const categoryOptions = [
  { value: "popular", label: "Popular" },
  { value: "on_the_air", label: "On The Air" },
  { value: "top_rated", label: "Top Rated" },
  { value: "airing_today", label: "Airing Today" },
];

export default function TvShows() {
  const { tvShows, loading, page, totalPages, category } = useSelector(
    (state: RootState) => state.tv
  );
  const dispatch = useDispatch<AppDispatch>();

  // Handle pagination change
  const handlePageChange = (pageNumber: number) => {
    dispatch(setPage(pageNumber));
  };

  // Handle category selection
  const handleCategoryChange = (value: string) => {
    dispatch(setCategory(value));
    dispatch(setPage(1)); // reset page when category changes
  };

  useEffect(() => {
    dispatch(fetchTvShowsByCategory({ category, page }));
  }, [category, page, dispatch]);

  return (
    <div className="tv-shows">
      <HeroTv />
      <div className="tv-shows-list  container">
        <ThemeBreadcrumb title="Tv Shows" />
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
            <Spin size="large" tip="Loading tv shows..." />
          </div>
        ) : tvShows.length > 0 ? (
          <Cards data={tvShows} link="/tv-shows" />
        ) : (
          <Empty description="No tv shows found" />
        )}
      </div>

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
