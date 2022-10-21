import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";

const QualitiesCard = ({ data }) => {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
          <span>Quality</span>
        </h5>
        <p className="card-text">
          <Quality qualities={data} />
        </p>
      </div>
    </div>
  );
};

QualitiesCard.propTypes = {
  data: PropTypes.array,
};

export default QualitiesCard;
