import React, { useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import Proptypes from "prop-types";

const Users = ({ onDelete, onBookMark, users }) => {
  const count = users.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const renderRows = () => {
    return userCrop.map((user) => {
      return (
        <User
          key={user._id}
          {...user}
          onDelete={onDelete}
          onBookMark={onBookMark}
        />
      );
    });
  };

  const userCrop = paginate(users, currentPage, pageSize);
  const tableHead = () => {
    if (count !== 0) {
      return (
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th scope="col">Профессия</th>
          <th scope="col">Встретился, раз</th>
          <th scope="col">Оценка</th>
          <th scope="col">Избранное</th>
          <th scope="col"></th>
        </tr>
      );
    }
  };

  return (
    <>
      <table className="table">
        <thead>{tableHead()}</thead>
        <tbody>{renderRows(users)}</tbody>
      </table>
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

Users.propTypes = {
  onDelete: Proptypes.func.isRequired,
  onBookMark: Proptypes.func.isRequired,
  users: Proptypes.array.isRequired,
};
export default Users;
