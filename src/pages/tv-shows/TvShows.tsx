import { Pagination, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/cards/Cards";
import HeroTv from "../../components/hero-tv/HeroTv";
import ThemeBreadcrumb from "../../components/theme-breadcrumb/ThemeBreadcrumb";
import { type AppDispatch, type RootState } from "../../redux/store/store";
import "./tv-shows.scss";

import { useEffect } from "react";
import ImageSkeleton from "../../components/skeletons/ImageSkeleton";
import {
  fetchTvShowsByCategory,
  setCategory,
  setPage,
} from "../../redux/features/tv/tvSlice";

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
      <div className="tv-shows-list  container" id="tv-shows">
        <ThemeBreadcrumb title="Tv Shows" />
        <div className="list-heading">
          <h2 className="heading-2 border-bottom">Tv Shows</h2>
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
          <ImageSkeleton />
        ) : (
          <Cards
            data={tvShows}
            link="/tv-shows"
            description="No tv shows found"
          />
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
    </div>
  );
}
