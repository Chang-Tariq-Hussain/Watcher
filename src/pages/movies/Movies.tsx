import React from "react";
import ThemeBreadcrumb from "../../components/theme-breadcrumb/ThemeBreadcrumb";

export default function Movies() {
  return (
    <div className="movies container">
      <ThemeBreadcrumb title="Movies" />
      <h2 className="heading-2 border-bottom" style={{ margin: "2rem 0" }}>
        Movies
      </h2>
    </div>
  );
}
