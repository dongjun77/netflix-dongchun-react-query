import React from "react";
import { Alert } from "react-bootstrap";
import "./UpComingMovieSlide.style.css";
import { useUpComingMoviesQuery } from "../../../../hooks/useUpComingMovies";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const UpComingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpComingMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <MovieSlider
        title="UpComing Movies"
        movies={data.data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default UpComingMovieSlide;
