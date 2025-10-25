import ThemeBreadcrumb from "../../components/theme-breadcrumb/ThemeBreadcrumb";
import { useSelector } from "react-redux";
import { type RootState } from "../../redux/store/store";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import type { MultiSearchResult } from "../../types/search";
import { Empty, Spin } from "antd";
import "./search-results.scss";
import { useEffect } from "react";

export default function SearchResults() {
  const { results, loading, query } = useSelector(
    (state: RootState) => state.search
  );

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Resuls", results);
    if (!query) {
      navigate("/");
    }
  }, [query]);

  const filteredResults = results.filter((it) => it.media_type !== "person");

  return (
    <div className="search-results">
      <ThemeBreadcrumb title={`Search results for ${query}`} />

      {filteredResults.map((result: MultiSearchResult) => {
        const title =
          result.media_type === "movie"
            ? result.title
            : result.media_type === "tv"
            ? result.name
            : result.media_type === "person"
            ? result.name
            : "Unknown";

        const overview =
          result.media_type === "movie" || result.media_type === "tv"
            ? result.overview ?? ""
            : "";

        const poster =
          result.media_type === "person"
            ? result.profile_path ?? null
            : result.poster_path ?? null;

        const link =
          result.media_type === "person"
            ? `/person/${result.id}`
            : `/movies/${result.id}`;

        return (
          <div>
            {loading ? (
              <div className="loading-state">
                <Spin size="large" tip="Loading movies..." />
              </div>
            ) : filteredResults.length > 0 ? (
              <div className="movie-cards">
                {filteredResults.map((result: MultiSearchResult) => (
                  <Link to={link}>
                    <Card
                      key={result.id}
                      // title={title}
                      overview={overview}
                      poster={poster}
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <Empty description="No movies found" />
            )}
          </div>
        );
      })}
    </div>
  );
}
