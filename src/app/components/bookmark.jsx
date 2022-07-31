import React from "react";
import Proptypes from "prop-types";

const BookMark = ({ onBookMark, bookmark, id }) => {
  const classes = bookmark ? "bi bi-bookmark-fill" : "bi bi-bookmark";

  return (
    <button onClick={() => onBookMark(id)}>
      <i className={classes}></i>
    </button>
  );
};

BookMark.propTypes = {
  onBookMark: Proptypes.func.isRequired,
  bookmark: Proptypes.element.isRequired,
  id: Proptypes.number.isRequired,
};
export default BookMark;