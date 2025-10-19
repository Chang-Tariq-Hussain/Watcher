import { useEffect, useState } from "react";
import "./hero.scss";
import { getNowPlayingMovies } from "../../api/movie-api";
import type { Movie } from "../../types/movie";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/swiper.css";

export default function Hero() {
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      const data = await getNowPlayingMovies();
      const movies = data?.results || [];

      // Preload images to prevent flickering
      movies.forEach((movie: Movie) => {
        const img = new Image();
        img.src = `${IMAGE_BASE}/${movie.backdrop_path}`;
      });

      setNowPlayingMovies(movies);
    };

    fetchNowPlayingMovies();
  }, []);

  return (
    <Swiper
      direction="vertical"
      className="hero-swiper"
      modules={[Autoplay, Pagination]} // Enable Autoplay module
      autoplay={{
        delay: 2000, // 5 seconds delay between slides
        disableOnInteraction: false, // Continue autoplay after user interaction
      }}
      pagination={{
        clickable: true,
        bulletClass: "swiper-pagination-bullet custom-bullet",
        bulletActiveClass:
          "swiper-pagination-bullet-active custom-bullet-active",
      }}
      speed={1000} // Smooth transition duration
    >
      {nowPlayingMovies.length > 0 ? (
        nowPlayingMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              className="hero-section"
              style={{
                backgroundImage: `url('${IMAGE_BASE}/${movie.backdrop_path}')`,
                backgroundSize: "cover",
                backgroundPosition: "top center",
                transition: "background-image 0.5s ease-in-out", // Smooth transition
              }}
            >
              <div className="live-tag">
                <i className="ri-wifi-line"></i>
                <p>Live</p>
              </div>
              <div>
                <h1 className="heading-1">{movie.title}</h1>
                <p className="overview">{movie.overview}</p>
              </div>

              <div className="info">
                <div className="rating">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1200px-IMDB_Logo_2016.svg.png"
                    alt="imdb image"
                  />
                  <p>{movie.vote_average?.toFixed(1)}</p>
                </div>

                <div className="language">
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/002/399/741/small_2x/american-flag-icon-vector.jpg"
                    alt="language image"
                  />
                  <p>English</p>
                </div>
              </div>
              <button className="watch-btn">Watch</button>
            </div>
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide>
          <div className="hero-section" style={{ background: "#000" }}>
            <p>Loading...</p> {/* Fallback UI while movies load */}
          </div>
        </SwiperSlide>
      )}
    </Swiper>
  );
}
