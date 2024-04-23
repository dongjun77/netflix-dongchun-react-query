import React from "react";
import Badge from "react-bootstrap/Badge";
import "./MovieCard.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBaby } from "@fortawesome/free-solid-svg-icons";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();
  const navigate = useNavigate();

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });
    return genreNameList;
  };
  const goToMovieDetail = (id) => {
    console.log(id);
    navigate(`/movies/${id}`);
  };

  // console.log("ggg", genreData);
  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://image.tmdb.org/t/p/original/${movie.poster_path}` +
          ")",
      }}
      className="movie-card"
      onClick={() => goToMovieDetail(movie.id)}
    >
      <div className="overlay">
        <h3>{movie.title}</h3>
        <div className="overlay-bottom"></div>
        <br></br>
        <div>
          {showGenre(movie.genre_ids).map((id) => (
            <Badge bg="danger">{id}</Badge>
          ))}
        </div>
        <br />
        <div className="d-flex">
          <div className="d-flex">
            <FontAwesomeIcon icon={faStar} />
            <div>&nbsp;{movie.vote_average} /&nbsp;</div>
          </div>
          <div className="d-flex">
            <FontAwesomeIcon icon={faUser} />
            <div>&nbsp;{Math.floor(movie.popularity)} /&nbsp;</div>
          </div>
          <div>
            &nbsp;
            {movie.adult == true ? (
              <FontAwesomeIcon icon={faUser} />
            ) : (
              <FontAwesomeIcon icon={faBaby} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
