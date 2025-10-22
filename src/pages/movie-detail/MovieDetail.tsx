import { useParams } from "react-router-dom";
import ThemeBreadcrumb from "../../components/theme-breadcrumb/ThemeBreadcrumb";
import { useEffect, useState } from "react";
import type { Movie } from "../../types/movie";
import { getMovieById } from "../../api/movie-api";
import { IMAGE_BASE } from "../../utils/contant";
import "./movie-detail.scss";

import { Tabs } from "antd";
import type { TabsProps } from "antd";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "OVERVIEW",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "TRAILER & MORE",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "MORE LIKE THIS",
    children: "Content of Tab Pane 3",
  },
  {
    key: "4",
    label: "DETAILS",
    children: "Content of Tab Pane 4",
  },
];

export default function MovieDetail() {
  const params = useParams();
  const [movieData, setMovieData] = useState<Movie>();

  useEffect(() => {
    const fetchMovieById = async () => {
      const data = await getMovieById(Number(params.id));
      setMovieData(data);
    };

    fetchMovieById();
  }, []);
  return (
    <div className="movie-detail">
      <ThemeBreadcrumb title={movieData?.title} />
      <div className="movie-detail-wrapper">
        <div className="movie-detail-left">
          <img src={`${IMAGE_BASE}/${movieData?.poster_path}`} alt="" />
        </div>
        <div className="movie-detail-right">
          <div className="vote-average">
            <h3 className="heading-3">{movieData?.vote_average.toFixed(1)}</h3>
            <i className="ri-star-fill ri-lg"></i>
          </div>
          <h2 className="heading-2">{movieData?.title}</h2>
          <div className="subheading">
            <p className="small">{movieData?.release_date.split("-")[0]}</p>
            <p className="small">{movieData?.runtime}</p>
            <p className="small">{movieData?.status}</p>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <Tabs
              defaultActiveKey="1"
              size={"large"}
              items={items}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
