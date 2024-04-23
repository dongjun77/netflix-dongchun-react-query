import "./MovieDetailPage.style.css";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";

import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useMovieVideoQuery } from "../../hooks/useMovieVideo";

import { Alert, Container, Row, Col, Button, Tabs, Tab } from "react-bootstrap";

import Review from "./components/Review/Review";
import RecommandMovie from "./components/RecommandMovie/RecommandMovie";
import MovieInfo from "./components/MovieInfo/MovieInfo";

const MovieDetailPage = () => {
  const { id } = useParams();
  console.log("detail", id);
  const [key, setKey] = useState("Review");

  const {
    data: selected_movie,
    isLoading,
    isError,
    error,
  } = useMovieDetailQuery({ id });

  const { data: genreData } = useMovieGenreQuery();
  console.log("selected_movie", selected_movie);
  console.log("genre_list", genreData);

  const searchedGenre = (genreList) => {
    if (!genreData) return [];
    const genreNameList = genreList.map((selectedGenre) => {
      const genreObj = genreData.find((genre) => genre.id === selectedGenre.id);
      return genreObj.name;
    });
    return genreNameList;
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <Container>
      <Row className="movie-detail-page">
        <Col
          style={{
            backgroundImage:
              "url(" +
              `https://image.tmdb.org/t/p/original${selected_movie.poster_path}` +
              ")",
          }}
          className="movie-detail"
          md={12}
          xs={12}
        ></Col>
        <MovieInfo
          id={id}
          selected_movie={selected_movie}
          searchedGenre={searchedGenre}
        />
        {/* <Col className="movie-detail-info mt-5">
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
              <h2>
                &nbsp;{Math.floor(selected_movie.popularity)}&emsp;/&emsp;
              </h2>
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
                <FontAwesomeIcon
                  icon={faVideoSlash}
                  size="2x"
                  // className="video-icon"
                />
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
        </Col> */}
      </Row>

      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="Review" title="Review">
          <Review id={id} />
        </Tab>
        <Tab eventKey="Other Movies" title="Other Movies">
          <RecommandMovie id={id} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default MovieDetailPage;
