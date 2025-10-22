import { Link, useParams } from "react-router-dom";
import ThemeBreadcrumb from "../../components/theme-breadcrumb/ThemeBreadcrumb";
import { useEffect, useState } from "react";
import type { Movie } from "../../types/movie";
import {
  getMovieById,
  getMovieVideosById,
  getSimilarMovies,
} from "../../api/movie-api";
import { IMAGE_BASE } from "../../utils/contant";
import "./movie-detail.scss";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";
import { Navigation } from "swiper/modules";

export default function MovieDetail() {
  const params = useParams();
  const [movieData, setMovieData] = useState<Movie>();
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>();
  const [trailerKey, setTrailerKey] = useState<string | null>();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "OVERVIEW",
      children: (
        <div className="overview">
          <p className="small">{movieData?.overview}</p>

          <div className="info small">
            <span>Genre</span>
            {movieData?.genres?.map((genre) => (
              <p className="small">{genre.name}</p>
            ))}
          </div>

          <div className="related">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p>Related Movies</p>
              <Link to="/movies" style={{ marginRight: "10px" }}>
                See more
              </Link>
            </div>
            <Swiper
              slidesPerView={2.3}
              loop={true}
              spaceBetween={20}
              modules={[Navigation]}
              className="mySwiper"
            >
              {relatedMovies?.map((relatedMovie) => (
                <SwiperSlide style={{ position: "relative" }}>
                  <img
                    src={`${IMAGE_BASE}/${relatedMovie?.poster_path}`}
                    alt=""
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
                    {relatedMovie?.title}
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
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <p>No Trailer Found</p>
          )}
        </div>
      ),
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

  const onChange = (key: string) => {
    console.log(key);
  };
  useEffect(() => {
    const fetchMovieById = async () => {
      const data = await getMovieById(Number(params.id));
      setMovieData(data);
    };

    const fetchSimilarMovies = async () => {
      const data = await getSimilarMovies(Number(params.id));
      setRelatedMovies(data.results);
    };

    const fetchVideos = async () => {
      const data = await getMovieVideosById(Number(params.id));
      const trailer = data.results.find(
        (v: any) => v.type === "Trailer" && v.site === "YouTube"
      );
      console.log("tariler key", trailer.key);
      setTrailerKey(trailer?.key || null);
    };

    fetchMovieById();
    fetchSimilarMovies();
    fetchVideos();
  }, [params.id]);

  const formatRuntime = (runtime: number | undefined) => {
    if (!runtime) return "N/A";
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };
  return (
    <div className="movie-detail">
      <ThemeBreadcrumb title={movieData?.title} />
      <div className="movie-detail-wrapper">
        <div className="movie-detail-left">
          <img src={`${IMAGE_BASE}/${movieData?.poster_path}`} alt="" />
        </div>
        <div className="movie-detail-right">
          <div className="justify-between">
            <h2 className="heading-2">{movieData?.title}</h2>
            <div className="vote-average">
              <h3 className="heading-3">
                {movieData?.vote_average.toFixed(1)}
              </h3>
              <i className="ri-star-fill ri-lg"></i>
            </div>
          </div>
          <div className="subheading">
            <p className="small">{movieData?.release_date.split("-")[0]}</p>
            <p className="small">{formatRuntime(movieData?.runtime)}</p>
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
