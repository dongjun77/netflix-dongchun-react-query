import React, { useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { Alert, Container, Row, Col, Tab, Nav, Button } from "react-bootstrap";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useGenreMovieQuery } from "../../hooks/useGenreMovie";
import RenderMovieList from "./components/RenderMovieList/RenderMovieList";
import RenderGenreList from "./components/RenderGenreList/RenderGenreList";
import RenderSortList from "./components/RenderSortList/RenderSortList";
import "./MoviePage.style.css";
import ExceptionHandling from "../../common/ExceptionHandling/ExceptionHandling";

// 경로 2가지
// nav바에서 클릭해서 온 경우 => popularMovie 보여주기
// keyword를 입력해서 온 경우 => keyword와 관련된 영화들을 보여줌

// 페이지네이션 설치
// page state 만들기
// 페이지네이션 클릭할때마다 page 바꿔주기
// page 값이 바뀔때 마다 useSearchMovie에 page까지 넣어서 fetch

// 확인된것.
// discover로 sort나 genres로 영화를 구분가능하다 -> 중복 선택도 가능 하다
// search의 keywords는 discover과 중복구사가 불가능하다

/* 컴포넌트로 기능나누고 */
/* 데이터에 따라 다른 리스트를 보여주자 */
/* pagination도 처리 해줄것. */

// sort 할순 있지만... pagination 까지 처리 되지 않는다
// console.log(
//   "search_movie_list",
//   search_movie_list?.results.sort((a, b) => a.popularity - b.popularity)
// );

const Moviepage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");

  const [selectedTabList, setSelectedTabList] = useState([28]);
  console.log("selectedTabList", selectedTabList);

  const [selectedSortMenu, setSelectedSortMenu] = useState("popularity.desc");
  console.log("selectedSortMenu", selectedSortMenu);

  const [page, setPage] = useState(1);

  const {
    data: search_movie_list,
    isLoading,
    isError,
    error,
  } = useSearchMovieQuery({
    keyword,
    page,
  });
  // console.log("search_movie_list", search_movie_list);

  const { data: genreList } = useMovieGenreQuery();
  const { data: genre_movie_list } = useGenreMovieQuery({
    selectedTabList,
    selectedSortMenu,
    page,
  });
  // console.log("genre_movie_list", genre_movie_list);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <Container>
      <Tab.Container id="left-tabs-example">
        <Row>
          <Col sm={3} className="mt-5">
            <Nav variant="pills" className="flex-column">
              {search_movie_list == undefined ? (
                <div>
                  <RenderSortList
                    classname="sortlist-area"
                    selectedSortMenu={selectedSortMenu}
                    setSelectedSortMenu={setSelectedSortMenu}
                  />
                  <RenderGenreList
                    genreList={genreList}
                    selectedTabList={selectedTabList}
                    setSelectedTabList={setSelectedTabList}
                  />
                </div>
              ) : (
                <Button href="/movies">Do you want filtering?</Button>
              )}
            </Nav>
          </Col>
          <Col sm={9} className="mt-5">
            {search_movie_list == undefined ? (
              <RenderMovieList
                movieList={genre_movie_list}
                page={page}
                setPage={setPage}
              />
            ) : (
              <RenderMovieList
                movieList={search_movie_list}
                page={page}
                setPage={setPage}
              />
            )}
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Moviepage;
