import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfessionsById,
  getProfessionsLoadingStatus,
  loadProfessionsList,
} from "../../store/professions";

const Profession = ({ id }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getProfessionsLoadingStatus());
  useEffect(() => {
    dispatch(loadProfessionsList());
  }, []);

  if (!isLoading) {
    const professionsList = useSelector(getProfessionsById(id));
    console.log(professionsList);

    return <p>{professionsList.name}</p>;
  } else return "Loading...";
};
Profession.propTypes = {
  id: PropTypes.string,
};
export default Profession;
