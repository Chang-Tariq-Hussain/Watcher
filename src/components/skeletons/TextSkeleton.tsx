import React from "react";
import { Skeleton } from "antd";
import type { CSSProperties } from "react";

interface TextSkeletonProps {
  lines?: number; // number of text lines
  width?: string | number; // custom width for text lines
  active?: boolean; // shimmer animation
  align?: "left" | "center" | "right"; // text alignment
  style?: CSSProperties; // additional inline styles
  paragraphStyle?: CSSProperties; // for paragraph customization
}

const TextSkeleton: React.FC<TextSkeletonProps> = ({
  lines = 2,
  width = "100%",
  active = true,
  align = "left",
  style = {},
  paragraphStyle = {},
}) => {
  return (
    <div
      style={{
        textAlign: align,
        width: "100%",
        ...style,
      }}
    >
      <Skeleton
        active={active}
        title={false}
        paragraph={{
          rows: lines,
          width: Array(lines).fill(width), // Each line’s width can be the same or an array
        }}
        style={paragraphStyle}
      />
    </div>
  );
};

export default TextSkeleton;
