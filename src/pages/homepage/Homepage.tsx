import Hero from "../../components/hero/Hero";
import MovieList from "../../components/movie-list/MovieList";

export default function Homepage() {
  return (
    <>
      {/* <!-- Hero Section --> */}
      <Hero />

      {/* <!-- Movies List  --> */}
      <MovieList />
    </>
  );
}
