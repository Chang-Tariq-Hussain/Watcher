import { Pagination, Spin } from "antd";
import { useEffect, useState } from "react";
import { getTrendingAll } from "../../api/trending-api";
import Cards from "../../components/cards/Cards";
import ThemeBreadcrumb from "../../components/theme-breadcrumb/ThemeBreadcrumb";
import "./trending.scss";

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
      <h2 className="heading-2 border-bottom" style={{ margin: "2rem 0" }}>
        Trending
      </h2>

      {loading ? (
        <div className="loading-state">
          <Spin size="large" tip="Loading tv shows..." />
        </div>
      ) : (
        <Cards data={allTrending} description="No tv shows found" />
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
