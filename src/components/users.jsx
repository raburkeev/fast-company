import React, {useState} from "react"
import api from '../api'

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter((user) => user !== userId))
    }

    const renderPhrase = () => {

    }

    const getBadgeClasses = (q) => {
        let color = `badge m-1 bg-${q.color}`
        return color
    }

    const renderTableRows = () => {

        return users.map(user => {
            return (
                <tr key={user.name}>
                    <td>
                        {user.name}
                    </td>
                    <td>
                        {user.qualities.map((q) => {
                        return <span className={getBadgeClasses(q)}>{`${q.name} `}</span>
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

    return (
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
    )
}

export default Users