import React from "react";
import UserPage from "./userPage";
import Users from "../layouts/users";
import { useParams } from "react-router-dom";

const UsersList = () => {
  const { userId } = useParams();

  return <>{userId ? <UserPage /> : <Users />}</>;
};

export default UsersList;
