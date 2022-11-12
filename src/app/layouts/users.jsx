import React from "react";
import { Redirect, useParams } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserProvider from "../hooks/useUsers";
import { getUserId } from "../services/localStorageService";

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  const currentUserId = getUserId();
  return (
    <>
      <UserProvider>
        {userId ? (
          edit ? (
            currentUserId === userId ? (
              <EditUserPage />
            ) : (
              <Redirect to={`/users/${currentUserId}/edit`} />
            )
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UserProvider>
    </>
  );
};

export default Users;
