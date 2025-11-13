import { Empty } from "antd";
import { Link } from "react-router-dom";
import type { Movie } from "../../types/movie";
import type { TvShow } from "../../types/tvShows";
import Card from "../card/Card";

export interface CardsProps<T extends Movie | TvShow> {
  data: T[];
  link?: string;
  description?: string;

  //   type: "movie" | "tv";
}

export default function Cards<T extends Movie | TvShow>({
  data,
  link,
  description,
}: CardsProps<T>) {
  return (
    <div className="movie-cards">
      {data && data.length > 0 ? (
        data.map((item) => {
          // Determine title safely
          const title = "title" in item ? item.title : item.name;
          const itemLink =
            link || (item.media_type === "movie" ? `/movies` : `/tv-shows`);

          return (
            <Link to={`${itemLink}/${item.id}`} key={item.id}>
              <Card
                title={title}
                overview={item.overview}
                poster={item.poster_path}
              />
            </Link>
          );
        })
      ) : (
        <Empty description={description} />
      )}
    </div>
  );
}
