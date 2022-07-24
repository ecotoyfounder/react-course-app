import React from "react";
import Qualities from "./qualitie";
import BookMark from "./bookmark";

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
        bookmark
    } = props

    return (
        <tr>
            <td>{name}</td>
            <td><Qualities qualities={qualities}/></td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate} /5</td>
            <td><BookMark bookmark={bookmark} onBookMark={onBookMark} id={_id}/></td>
            <td>
                <button className="btn btn-danger btn-sm"
                        onClick={() => onDelete(_id)}
                >
                    Delete
                <
                        /button>
            </td>
        </tr>
    )
}

export default User