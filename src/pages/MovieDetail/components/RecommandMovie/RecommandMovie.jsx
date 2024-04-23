import React from "react";
import { useRecommnadMovieQuery } from "../../../../hooks/useRecommandMovie";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";
import { Alert } from "react-bootstrap";

const RecommandMovie = ({ id }) => {
  const { data, isLoading, isError, error } = useRecommnadMovieQuery({ id });
  console.log("useRecommnadMovieQuery", data);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <MovieSlider
        title="Recommand Other Movies"
        movies={data?.results}
        responsive={responsive}
      />
    </div>
  );
};

export default RecommandMovie;
