import { useSelector } from "react-redux";
import Navbar from "../components/navbar/Navbar";
import type { RootState } from "../redux/store/store";
import { useRoutes } from "react-router-dom";
import { routes } from "../routes";
import Header from "../components/header/Header";

export default function AppLayout() {
  const { isSidebarOpen } = useSelector((state: RootState) => state.ui);
  return (
    <div className="app-layout-container">
      <div
        className={`grid-layout ${isSidebarOpen ? "sidebar-collapsed" : ""}`}
      >
        <Navbar />

        <div className="main">
          {/* <!-- Header --> */}
          <Header />
          {useRoutes(routes)}
        </div>
      </div>
    </div>
  );
}
