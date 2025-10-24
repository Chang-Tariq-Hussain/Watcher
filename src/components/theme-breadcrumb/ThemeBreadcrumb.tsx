import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

export default function ThemeBreadcrumb({
  title,
}: {
  title?: string | undefined;
}) {
  const location = useLocation();

  // Split path and remove empty segments
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  // Build breadcrumb items
  const breadcrumbItems = [
    {
      title: <Link to="/">Home</Link>, // Always include Home
    },
    ...pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      const name = pathSnippets[index]
        .replace(/-/g, " ") // Replace dashes with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize words
      console.log("pathSnippets", pathSnippets.length);
      console.log("title", title);
      return {
        title:
          index === pathSnippets.length - 1 ? (
            <span>{title}</span> // Last one not clickable
          ) : (
            <Link to={url}>{name}</Link> // Middle ones clickable
          ),
      };
    }),
  ];

  return (
    <div style={{ marginBottom: "1rem" }}>
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
}
