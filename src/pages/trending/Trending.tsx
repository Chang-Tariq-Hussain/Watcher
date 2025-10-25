import { useEffect, useState } from "react";
import ThemeBreadcrumb from "../../components/theme-breadcrumb/ThemeBreadcrumb";
import { getTrendingAll } from "../../api/trending-api";
import type { TvShow } from "../../types/tvShows";
import type { Movie } from "../../types/movie";
import { Empty, Pagination, Spin } from "antd";
import Cards from "../../components/cards/Cards";

export default function Trending() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(500);
  const [allTrending, setAllTrending] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchTrendingAll = async () => {
      setLoading(true);
      const data = await getTrendingAll("day", page);
      if (!isMounted) return;
      setTotalPages(Math.min(data.total_pages, 500));
      setAllTrending(data.results);
      setLoading(false);
    };
    fetchTrendingAll();
    return () => {
      isMounted = false;
    };
  }, [page]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div className="trending container">
      <ThemeBreadcrumb title="Trending" />

      {loading ? (
        <div className="loading-state">
          <Spin size="large" tip="Loading tv shows..." />
        </div>
      ) : allTrending.length > 0 ? (
        <Cards data={allTrending} />
      ) : (
        <Empty description="No tv shows found" />
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
