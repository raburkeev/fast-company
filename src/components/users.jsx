import React, {useState} from "react"
import api from '../api'

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter((user) => user !== userId))
    }

    const getFormatOfWordPeople = (number) => {
        return [2, 3, 4].includes(number) ? 'человека' : 'человек'
    }

    const renderPhrase = () => {
        return (
            <span className="badge bg-primary p-2 m-2 fs-5">
                {`${users.length} ${getFormatOfWordPeople(users.length)} тусанет с тобой сегодня`}
            </span>
        )
    }

    const getBadgeClasses = (quality) => { // можно вынести из компонента
        return `badge m-1 bg-${quality.color}`
    }

    const renderTableRows = () => {
        return users.map(user => {
            return (
                <tr key={user._id}>
                    <td>
                        {user.name}
                    </td>
                    <td>
                        {user.qualities.map((quality) => {
                            return <span key={quality._id} className={getBadgeClasses(quality)}>{`${quality.name}`}</span>
                        })}
                    </td>
                    <td>
                        {user.profession.name}
                    </td>
                    <td>
                        {user.completedMeetings}
                    </td>
                    <td>
                        {user.rate}
                    </td>
                    <td>
                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(user)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    if(users.length === 0) {
        return (
            <span className="badge bg-danger p-2 m-2 fs-5">Никто с тобой не тусанет</span>
        )
    }

    return (
        <>
            {renderPhrase()}
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
                    {renderTableRows()}
                </tbody>
            </table>
        </>
    )
}

export default Users
