import React from "react";

const BookMark = ({onBookMark, bookmark, id}) => {

    const classes = bookmark ? "bi bi-bookmark-fill" : "bi bi-bookmark"

    return <button onClick={()=>onBookMark(id)}>
            <i className={classes}></i>
            </button>
}

export default BookMark