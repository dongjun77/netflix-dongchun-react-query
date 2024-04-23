import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Alert from "react-bootstrap/Alert";

const ExceptionHandling = ({ isLoading, isError, error }) => {
  if (isLoading) {
    return (
      <div className="spinner-area">
        <ClipLoader
          color="#ffff"
          loading={isLoading}
          size={500}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return <div></div>;
};

export default ExceptionHandling;
