import { Skeleton } from "antd";
import "./skeletons.scss";
export default function ImageSkeleton() {
  return (
    <div className="skeleton-container">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <Skeleton.Image active style={{ width: "100%" }} />
        </div>
      ))}
    </div>
  );
}
