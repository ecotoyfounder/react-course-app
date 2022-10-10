import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import QualitiesList from "../../ui/quality/qualitiesList";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
  const history = useHistory();
  const [user, setUser] = useState();
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);
  const handleClick = () => {
    history.push(`/users/${userId}/edit`);
  };
  if (user) {
    return (
      <div>
        <h1> {user.name}</h1>
        <h2>Profession: {user.profession.name}</h2>
        <QualitiesList qualities={user.qualities} />
        <p>completedMeetings: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>
        <button className="btn btn-primary m-2" onClick={handleClick}>
          Change
        </button>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserPage;
