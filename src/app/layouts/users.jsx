import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage/userPage";
import UsersListPage from "../components/page/usersListPage/usersListPage";
import EditUserPage from "../components/page/editUserPage/editUserPage";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;

  let renderUsers;

  if (edit) {
    renderUsers = (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <EditUserPage />
          </div>
        </div>
      </div>
    );
  } else {
    if (userId) {
      renderUsers = <UserPage userId={userId} />;
    } else {
      renderUsers = <UsersListPage />;
    }
  }
  return renderUsers;
};

export default Users;
