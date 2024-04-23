import React from "react";
import { Alert } from "react-bootstrap";
import "./TopRatedMovieSlide.style.css";
import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovies";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const TopRatedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <MovieSlider
        title="TopRated Movies"
        movies={data.data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default TopRatedMovieSlide;
