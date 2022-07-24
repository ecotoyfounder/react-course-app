import React, {useState} from "react";
import api from "./api";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";

const App = () => {

    const [users, setUsers] = useState(api.users.fetchAll())

    const handleBookMark = (id) => {
        const bookMark = users.map(el => {
            if (el._id === id) {
                el.bookmark = !el.bookmark
            }

            return el
        })
        setUsers(bookMark)
    }

    const handleDelete = (userId) => {

        setUsers(prevState => prevState.filter((user) => user._id !== userId))
    }

    return (
        <>
            <SearchStatus length={users.length}/>
            <Users users={users} onDelete={handleDelete} onBookMark={handleBookMark}/>
        </>
    )
}

export default App