import React, { useEffect, useState } from "react";
import api from "../api";
import { useHistory, useParams } from "react-router-dom";
import Qualities from "./qualitie";

const UserPage = () => {
  const [user, setUser] = useState();
  const { userId } = useParams();

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);

  const history = useHistory();

  const handleAllUsers = () => {
    history.replace("/users");
  };

  return user ? (
    <>
      <h1>Имя: {user.name}</h1>
      <h2>Профессия: {user.profession.name}</h2>
      <h3>
        {user.qualities.map((qual) => (
          <Qualities key={qual._id} color={qual.color} name={qual.name} />
        ))}
      </h3>
      <h2>Встретился, раз: {user.completedMeetings}</h2>
      <h2>Оценка: {user.rate}</h2>
      <button
        className="btn btn-primary m-2"
        onClick={() => {
          handleAllUsers();
        }}
      >
        Все пользователи
      </button>
    </>
  ) : (
    <h1>Loading...</h1>
  );
};

export default UserPage;
