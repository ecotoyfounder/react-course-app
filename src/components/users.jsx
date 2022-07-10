import React, {useState} from "react"
import api from "../api"


const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter((user) => user !== userId))
    }
    const renderPhrase = (number, text) => {
        if (number >= 5 || number === 1) {
            text = "тусанет с тобой сегодня"
        } else if (number < 5 && number > 1) {
            text = "тусанут с тобой сегодня"
        } else {
            text = "Никто с тобой не тусанёт"
        }

        return `${number}` > 0 ? `${number} ${text}` : `${text}`
    }

    // const qualityColors = () => {
    //     return item.color
    // }

    const renderRows = (users) => {
        return users.map((user) => (
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.qualities.map((item) => (
                    <span key={item._id} className={`badge bg-${item.color} m-2`}
                    >
                        {item.name}
                    <
                    /span>))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <td>
                    <button className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(user)}
                    >
                        Delete
                    <
                    /button>
                </td>
            </tr>
        ))
    }

    const getBageClasses = () => {
        let classes = "badge btn-sm m-2 "
        classes += users.length === 0 ? "bg-danger" : "bg-primary"
        return classes
    }


    return (
        <>
            <span className={getBageClasses()}
            >
                {renderPhrase(users.length)}
            <
            /span>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                    {renderRows(users)}
                </tbody>
            </table>
        </>
    )
}

export default Users