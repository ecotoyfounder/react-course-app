import React from "react";
import Qualities from "./qualitie";
import BookMark from "./bookmark";
import Proptypes from "prop-types";

const User = (props) => {
  const {
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onDelete,
    onBookMark,
    bookmark,
  } = props;

  return (
    <tr>
      <td>{name}</td>
      <td>
        <Qualities qualities={qualities} />
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} /5</td>
      <td>
        <BookMark bookmark={bookmark} onBookMark={onBookMark} id={_id} />
      </td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(_id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

User.propTypes = {
  _id: Proptypes.number.isRequired,
  name: Proptypes.array.isRequired,
  qualities: Proptypes.array.isRequired,
  profession: Proptypes.array.isRequired,
  completedMeetings: Proptypes.array.isRequired,
  rate: Proptypes.array.isRequired,
  onDelete: Proptypes.func.isRequired,
  onBookMark: Proptypes.func.isRequired,
  bookmark: Proptypes.array.isRequired,
};
export default User