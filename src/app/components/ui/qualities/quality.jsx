import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Quality = ({ id }) => {
  const { isLoading, getQualitiesById } = useQualities();

  if (!isLoading) {
    const { color, name } = getQualitiesById(id);
    return <span className={"badge m-1 bg-" + color}>{name}</span>;
  } else return "Loading...";
};
Quality.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Quality;
