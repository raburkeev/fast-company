import React from 'react'
import PropTypes from 'prop-types'
import BookMark from '../common/bookmark'
import QualitiesList from './qualities'
import Table from '../common/table'
import { Link } from 'react-router-dom'

const UsersTable = ({ users, onDelete, onToggleBookMark, onSort, selectedSort }) => {
    const columns = {
        name: {
            path: 'name',
            name: 'Имя',
            component: (user) => (
                <Link to={`/users/${user._id}`}>{ user.name }</Link>
            )
        },
        qualities: {
            name: 'Качества',
            component: (user) => (
                <QualitiesList user={user} />
            )
        },
        professions: { path: 'profession.name', name: 'Профессия' },
        completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
        rate: { path: 'rate', name: 'Оценка' },
        bookmark: {
            path: 'bookmark',
            name: 'Избранное',
            component: (user) => (
                <BookMark
                    onToggleBookMark={onToggleBookMark}
                    userId={user._id}
                    user={user}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    Delete
                </button>
            )
        }
    }

    return (
        <Table data={users} onSort={onSort} selectedSort={selectedSort} columns={columns} />
    )
}

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
}

export default UsersTable
