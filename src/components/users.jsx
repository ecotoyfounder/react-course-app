import React, {useState} from "react"
import api from "../api"


const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter((user) => user !== userId))
    }

    let text = ""

    const renderPhrase = (number, text) => {
        if (number >= 5 || number % 10 === 1) {
            text = "тусанет с тобой сегодня"
        } else if (number % 10 === 2 || number % 10 === 3 || number % 10 === 4 && number > 1) {
            text = "тусанут с тобой сегодня"
        } else {
            text = "Никто с тобой не тусанёт"
        }

        return `${number}` > 0 ? `${number} ${text}` : `${text}`
    }

    const userQualities = (qualities) => {
        return qualities.map((item) => (
            <span key={item._id}
                  className={`badge bg-${item.color} m-2`}
            >
                {item.name}
            </span>
        ))
    }

    const renderRows = (users) => {
        return users.map((user) => (
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>{userQualities(user.qualities)}</td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate} /5</td>
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

    const tableHead = () => {
        if (users.length !== 0) {
            return <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col"></th>
            </tr>
        }
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
                    {tableHead()}
                </thead>
                <tbody>
                    {renderRows(users)}
                </tbody>
            </table>
        </>
    )
}

export default Users