import ImageSkeleton from "../skeletons/ImageSkeleton";
import "./card.scss";

export interface CardProps {
  title?: string;
  overview: string;
  poster: string | null;
}

export default function Card({ overview, poster, title }: CardProps) {
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="movie-card">
      {poster ? (
        <img src={`${IMAGE_BASE}/${poster}`} alt={title} />
      ) : (
        <p
          style={{
            color: "lightblue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          {title}
        </p>
      )}

      {/* <div className="card-info">
        <p className="movie-title">{title}</p>
        <p className="small">{showContent}</p>

        <div className="author-avatar">
          <img
            src={`${IMAGE_BASE}/${poster}`}
            alt="avatar image"
            className="avatar-img"
          />
          <div className="avatar-info">
            <p className="author-name">John.Smith</p>
            <p className="small">Author</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
