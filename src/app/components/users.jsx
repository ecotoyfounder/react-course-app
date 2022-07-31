import React, { useState } from "react";
import Qualities from "./qualitie";
import User from "./user";
import Pagination from "./pagination";

const Users = ({ onDelete, onBookMark, users }) => {
  const count = users.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageIndex) => {
    console.log(pageIndex);
    setCurrentPage(pageIndex);
  };

  const renderRows = (users) => {
    return users.map((user) => {
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

export default Users;
