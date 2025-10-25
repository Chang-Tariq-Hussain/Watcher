import TextSkeleton from "../TextSkeleton";

export default function HomepageSkeleton() {
  return (
    <div>
      <div className="hero-section">
        <div className="live-tag">
          <TextSkeleton width={"10px"} />
          <TextSkeleton width={"30px"} />
        </div>
        <div>
          <h1 className="heading-1">
            <TextSkeleton width={"80px"} />
          </h1>
          <p className="overview">
            <TextSkeleton width={"600px"} lines={4} />
          </p>
        </div>

        <div className="info">
          <div className="rating">
            <TextSkeleton width={"10px"} />
            <p>
              <TextSkeleton width={"40px"} />
            </p>
          </div>

          <div className="language">
            <TextSkeleton width={"10px"} />
            <p>
              <TextSkeleton width={"40px"} />
            </p>
          </div>
        </div>
        <button className="watch-btn">Watch</button>
      </div>
    </div>
  );
}
