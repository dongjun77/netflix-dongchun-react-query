import React from "react";
import { useMovieReviewQuery } from "../../../../hooks/useMovieReview";

const Review = ({ id }) => {
  const { data, isLoading, isError, error } = useMovieReviewQuery({ id });

  return (
    <div>
      {data?.results.map((review) => (
        <div className="review_item">
          <div>{review.author} :</div>
          <div>{review.content}</div>
        </div>
      ))}
    </div>
  );
};

export default Review;
