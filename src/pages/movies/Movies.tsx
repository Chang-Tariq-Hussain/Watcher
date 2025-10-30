import { useEffect, useState } from "react";
import ThemeBreadcrumb from "../../components/theme-breadcrumb/ThemeBreadcrumb";
import type { Movie } from "../../types/movie";
import { getPopularMovies } from "../../api/movie-api";
import ImageSkeleton from "../../components/skeletons/ImageSkeleton";
import Cards from "../../components/cards/Cards";
import { Empty, Pagination } from "antd";
import "./movies.scss";

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(500);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      const data = await getPopularMovies(page);
      setTotalPages(Math.min(data.total_pages, 500));
      setMovies(data.results);
      setLoading(false);
    };
    fetchPopularMovies();
  }, [page]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };
  return (
    <div className="movies container">
      <ThemeBreadcrumb title="Movies" />
      <h2 className="heading-2 border-bottom" style={{ margin: "2rem 0" }}>
        Movies
      </h2>

      {loading ? (
        <ImageSkeleton />
      ) : movies.length > 0 ? (
        <Cards data={movies} />
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
