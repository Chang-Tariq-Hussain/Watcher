import "./App.css";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import MovieList from "./components/movie-list/MovieList";
import Navbar from "./components/navbar/Navbar";

import { useSelector } from "react-redux";
import type { RootState } from "./redux/store/store";

function App() {
  const { isSidebarOpen } = useSelector((state: RootState) => state.ui);

  return (
    <>
      <div className="container">
        <div
          className={`grid-layout ${isSidebarOpen ? "sidebar-collapsed" : ""}`}
        >
          <Navbar />

          <div className="main">
            {/* <!-- Header --> */}
            <Header />

            {/* <!-- Hero Section --> */}
            <Hero />

            {/* <!-- Movies List  --> */}
            <MovieList />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
