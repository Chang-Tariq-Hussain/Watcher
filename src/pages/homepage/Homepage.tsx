import Header from "../../components/header/Header";
import Hero from "../../components/hero/Hero";
import MovieList from "../../components/movie-list/MovieList";

export default function Homepage() {
  return (
    <>
      {/* <!-- Header --> */}
      <Header />

      {/* <!-- Hero Section --> */}
      <Hero />

      {/* <!-- Movies List  --> */}
      <MovieList />
    </>
  );
}
