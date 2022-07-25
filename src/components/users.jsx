import React from 'react'
import User from './userComponent'
import PropTypes from 'prop-types'

const Users = ({ users, onDelete, onToggleBookMark }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col">Избранное</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {users.map((user) => {
                    return (
                        <User
                            key={user._id}
                            user={user}
                            onDelete={onDelete}
                            onToggleBookMark={onToggleBookMark}
                        />
                    )
                })}
            </tbody>
        </table>
    )
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
}

export default Users
