import { useSelector } from "react-redux";
import Navbar from "../components/navbar/Navbar";
import type { RootState } from "../redux/store/store";
import { Outlet, useRoutes } from "react-router-dom";
import { routes } from "../routes";

export default function AppLayout() {
  const { isSidebarOpen } = useSelector((state: RootState) => state.ui);
  return (
    <div className="container">
      <div
        className={`grid-layout ${isSidebarOpen ? "sidebar-collapsed" : ""}`}
      >
        <Navbar />

        <div className="main">{useRoutes(routes)}</div>
      </div>
    </div>
  );
}
