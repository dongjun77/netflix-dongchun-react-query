import React from "react";
import { Row, Col, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBaby } from "@fortawesome/free-solid-svg-icons";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";

import MovieVideo from "../../components/MovieVideo/MovieVideo";
import { useMovieVideoQuery } from "../../../../hooks/useMovieVideo";
import ExceptionHandling from "../../../../common/ExceptionHandling/ExceptionHandling";

const MovieInfo = ({ id, selected_movie, searchedGenre }) => {
  const {
    data: movieVideoData,
    isLoading,
    isError,
    error,
  } = useMovieVideoQuery({ id });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <Col className="movie-detail-info mt-5">
      <div className="genre-area">
        {searchedGenre(selected_movie.genres).map((genre) => (
          <div>
            <Button variant="danger">{genre}</Button>
            <span>&nbsp;</span>
          </div>
        ))}
      </div>

      <h1 className="mt-4">{selected_movie.title}</h1>
      <h4>{selected_movie.tagline}</h4>

      <div className="d-flex mt-4 card-info">
        <div className="d-flex">
          <FontAwesomeIcon icon={faStar} size="2x" />
          <h2>&nbsp;{selected_movie.vote_average}&emsp;/&emsp;</h2>
        </div>
        <div className="d-flex">
          <FontAwesomeIcon icon={faUsers} size="2x" />
          <h2>&nbsp;{Math.floor(selected_movie.popularity)}&emsp;/&emsp;</h2>
        </div>
        <div>
          {selected_movie.adult == true ? (
            <FontAwesomeIcon icon={faUser} size="2x" />
          ) : (
            <FontAwesomeIcon icon={faBaby} size="2x" />
          )}
        </div>
        <div className="d-flex">
          <h2>&emsp;/&emsp;</h2>
          {movieVideoData?.results.length !== 0 ? (
            <MovieVideo movieVideoData={movieVideoData} />
          ) : (
            <FontAwesomeIcon icon={faVideoSlash} size="2x" />
          )}
        </div>
      </div>

      <div className="mt-5 mb-5">
        <h4>{selected_movie.overview}</h4>
      </div>

      <div className="card-info-additional">
        <Row className="d-flex">
          <Col>budget</Col>
          <Col>${selected_movie.budget}</Col>
        </Row>
        <Row className="d-flex">
          <Col>revenue</Col>
          <Col>${selected_movie.revenue}</Col>
        </Row>
        <Row className="d-flex">
          <Col>release_date</Col>
          <Col>{selected_movie.release_date}</Col>
        </Row>
        <Row className="d-flex">
          <Col>runtime</Col>
          <Col>{selected_movie.runtime}min</Col>
        </Row>
      </div>
    </Col>
  );
};

export default MovieInfo;
