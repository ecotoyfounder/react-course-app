import React from "react"
import Qualities from './qualitie'
import User from './user'

const Users = ({onDelete, onBookMark, users}) => {

    const renderRows = (users) => {
        return users.map((user) => {
            return <User  key={user._id} {...user} onDelete={onDelete} onBookMark={onBookMark}/>
        })
    }

    const tableHead = () => {
        if (users.length !== 0) {
            return <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col">Избранное</th>
                <th scope="col"></th>
            </tr>
        }
    }

    return (
            <table className="table">
                <thead>
                    {tableHead()}
                </thead>
                <tbody>
                    {renderRows(users)}
                </tbody>
            </table>
    )
}

export default Users