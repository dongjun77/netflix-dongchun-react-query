import React from "react";
import { Col, Row } from "react-bootstrap";
import MovieCard from "../../../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";

const RenderMovieList = ({ movieList, page, setPage }) => {
  console.log("RenderMovieList", movieList);
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  return (
    <div>
      <Row>
        {movieList?.results.map((movie, index) => (
          <Col key={index} lg={4} sm={6} xs={12}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
      <br></br>
      <br></br>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={movieList?.total_pages} // 전체페이지
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={page - 1}
      />
    </div>
  );
};

export default RenderMovieList;
