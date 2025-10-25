import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ThemeBreadcrumb from "../../components/theme-breadcrumb/ThemeBreadcrumb";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper.css";
import "./media-detail.scss";

import { IMAGE_BASE } from "../../utils/contant";
import { formatRuntime } from "../../utils/helperFunctions";

import type { Movie, MovieDetail } from "../../types/movie";
import type { TvShow, TvShowDetail } from "../../types/tvShows";

import {
  getMovieById,
  getMovieDetails,
  getMovieVideosById,
  getSimilarMovies,
} from "../../api/movie-api";
import {
  getTvShowById,
  getTvShowDetails,
  getTvShowVideosById,
  getSimilarTvShows,
} from "../../api/tv-shows"; // <-- create this file similar to movie-api

export default function MediaDetail() {
  const { id, type } = useParams<{ id: string; type: "movies" | "tv" }>();
  const [data, setData] = useState<Movie | TvShow>();
  const [detail, setDetail] = useState<MovieDetail | TvShowDetail>();
  const [related, setRelated] = useState<(Movie | TvShow)[]>();
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id || !type) return;
      if (type === "movies") {
        const [movieData, movieDetail, similar, videos] = await Promise.all([
          getMovieById(Number(id)),
          getMovieDetails(Number(id)),
          getSimilarMovies(Number(id)),
          getMovieVideosById(Number(id)),
        ]);
        setData(movieData);
        setDetail(movieDetail);
        setRelated(similar.results);
        const trailer = videos.results.find(
          (v: any) => v.type === "Trailer" && v.site === "YouTube"
        );
        setTrailerKey(trailer?.key || null);
      } else {
        const [tvData, tvDetail, similar, videos] = await Promise.all([
          getTvShowById(Number(id)),
          getTvShowDetails(Number(id)),
          getSimilarTvShows(Number(id)),
          getTvShowVideosById(Number(id)),
        ]);
        setData(tvData);
        setDetail(tvDetail);
        setRelated(similar.results);
        const trailer = videos.results.find(
          (v: any) => v.type === "Trailer" && v.site === "YouTube"
        );
        setTrailerKey(trailer?.key || null);
      }
    };

    fetchData();
  }, [id, type]);

  // Use correct title and release date keys
  const title =
    data && "title" in data
      ? (data as Movie).title
      : data && "name" in data
      ? (data as TvShow).name
      : "Unknown Title";

  const release =
    data && "release_date" in data
      ? (data as Movie).release_date
      : data && "first_air_date" in data
      ? (data as TvShow).first_air_date
      : "N/A";

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "OVERVIEW",
      children: (
        <div className="overview">
          <p className="small">{data?.overview}</p>

          <div className="info small">
            <span>Genres</span>
            {detail?.genres?.map((genre) => (
              <p className="small" key={genre.id}>
                {genre.name}
              </p>
            ))}
          </div>

          <div className="related">
            <div className="flex-between">
              <p>Related {type === "movies" ? "Movies" : "Shows"}</p>
              <Link to={`/${type}`} style={{ marginRight: "10px" }}>
                See more
              </Link>
            </div>
            <Swiper
              slidesPerView={2.3}
              loop
              spaceBetween={20}
              modules={[Navigation]}
              className="mySwiper"
            >
              {related?.slice(0, 4).map((r) => (
                <SwiperSlide key={r.id} style={{ position: "relative" }}>
                  <img
                    src={`${IMAGE_BASE}/${r.poster_path}`}
                    alt={("title" in r ? r.title : r.name) || ""}
                    style={{ height: "100%" }}
                  />
                  <p
                    style={{
                      position: "absolute",
                      left: "10px",
                      bottom: -10,
                      textShadow: "1px 2px 3px #000",
                    }}
                  >
                    {"title" in r ? r.title : r.name}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "TRAILER & MORE",
      children: (
        <div>
          {trailerKey ? (
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title={`${title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <p>No Trailer Found</p>
          )}
        </div>
      ),
    },
    {
      key: "3",
      label: "MORE LIKE THIS",
      children: (
        <div className="grid-related">
          {related?.map((related) => (
            <img src={`${IMAGE_BASE}/${related?.poster_path}`} alt="" />
          ))}{" "}
        </div>
      ),
    },
    {
      key: "4",
      label: "DETAILS",
      children: (
        <div className="media-details-tab">
          <div className="info">
            <span>Original Title</span>
            <p>{title}</p>
          </div>
          <div className="info">
            <span>Languages</span>
            {detail?.spoken_languages?.map((lang) => (
              <p key={lang.iso_639_1} className="small">
                {lang.name}
              </p>
            ))}
          </div>
          {"runtime" in (detail || {}) && (
            <div className="info">
              <span>Duration</span>
              <p className="small">
                {formatRuntime((detail as MovieDetail).runtime)}
              </p>
            </div>
          )}
          <div className="info small">
            <span>Release Date</span>
            <p className="small">{release}</p>
          </div>

          <div className="production-companies" style={{ marginTop: "20px" }}>
            <p>Production Companies</p>{" "}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {detail?.production_companies?.map((company) => (
                <img
                  src={`${IMAGE_BASE}/${company.logo_path}`}
                  alt={company.name}
                  style={{
                    width: "100px",
                    objectFit: "contain",
                    marginTop: "20px",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="media-detail">
      <ThemeBreadcrumb title={title} />
      <div className="media-detail-wrapper">
        <div className="media-detail-left">
          <img src={`${IMAGE_BASE}/${data?.poster_path}`} alt={title} />
        </div>
        <div className="media-detail-right">
          <div className="justify-between">
            <h2 className="heading-2">{title}</h2>
            <div className="vote-average">
              <h3 className="heading-3">{data?.vote_average.toFixed(1)}</h3>
              <i className="ri-star-fill ri-lg"></i>
            </div>
          </div>
          <div className="subheading">
            <p className="small">{release?.split("-")[0]}</p>
            {"runtime" in (data || {}) && (
              <p className="small">{formatRuntime((data as Movie).runtime)}</p>
            )}
            <p className="small">
              {(data as Movie)?.status || (detail as TvShowDetail)?.status}
            </p>
          </div>

          <div className="tabs">
            <Tabs defaultActiveKey="1" size="large" items={items} />
          </div>
        </div>
      </div>
    </div>
  );
}
