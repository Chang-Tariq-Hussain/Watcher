import React from "react";
import { Link } from "react-router-dom";
import Card from "../card/Card";
import type { Movie } from "../../types/movie";
import type { TvShow } from "../../types/tvShows";

export interface CardsProps<T extends Movie | TvShow> {
  data: T[];
  link: string;
  //   type: "movie" | "tv";
}

export default function Cards<T extends Movie | TvShow>({
  data,
  link,
}: CardsProps<T>) {
  return (
    <div className="movie-cards">
      {data.map((item) => {
        // Determine title safely
        const title = "title" in item ? item.title : item.name;

        return (
          <Link to={`${link}/${item.id}`} key={item.id}>
            <Card
              title={title}
              overview={item.overview}
              poster={item.poster_path}
            />
          </Link>
        );
      })}
    </div>
  );
}
