import ThemeBreadcrumb from "../../components/theme-breadcrumb/ThemeBreadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../redux/store/store";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import type { MultiSearchResult } from "../../types/search";
import { Empty, Pagination, Spin } from "antd";
import "./search-results.scss";
import { useEffect } from "react";
import { setPage } from "../../redux/features/search/searchSlice";
import ImageSkeleton from "../../components/skeletons/ImageSkeleton";

export default function SearchResults() {
  const { results, loading, query, page, totalPages } = useSelector(
    (state: RootState) => state.search
  );

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!query) {
      navigate("/");
    }
  }, [query]);

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPage(pageNumber));
  };

  const filteredResults = results.filter(
    (it) =>
      it.media_type !== "person" &&
      it.poster_path !== null &&
      it.backdrop_path !== null
  );

  return (
    <div className="search-results">
      <ThemeBreadcrumb title={`Search results for ${query}`} />
      <div className="movie-cards">
        {filteredResults.map((result: MultiSearchResult) => {
          console.log("result", result);

          const overview =
            result.media_type === "movie" || result.media_type === "tv"
              ? result.overview ?? ""
              : "";

          const poster =
            result.media_type === "person"
              ? result.profile_path ?? null
              : result.poster_path ?? null;

          const link =
            result.media_type === "tv"
              ? `/tv/${result.id}`
              : `/movies/${result.id}`;

          if (loading) {
            return (
              <>
                {Array.from({ length: 20 }).map((_, index) => (
                  <ImageSkeleton />
                ))}
              </>
            );
          } else if (filteredResults.length > 0) {
            return (
              <Link to={link}>
                <Card
                  key={result.id}
                  // title={title}
                  overview={overview}
                  poster={poster}
                />
              </Link>
            );
          }
        })}
      </div>
      {filteredResults.length === 0 && <Empty description="No movies found" />}
      {filteredResults.length > 0 && (
        <div className="pagination">
          <Pagination
            current={page}
            total={totalPages}
            pageSize={20}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
}
