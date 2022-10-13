import React from 'react'
import PropTypes from 'prop-types'
import BookMark from '../common/bookmark'
import Qualities from './qualities'
import Table from '../common/table'
import {Link} from 'react-router-dom'
import Profession from './profession'

const UsersTable = ({users, onToggleBookMark, onSort, selectedSort}) => {
    const columns = {
        name: {
            path: 'name',
            name: 'Имя',
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: 'Качества',
            component: (user) => (
                <Qualities qualities={user.qualities}/>
            )
        },
        professions: {
            name: 'Профессия',
            component: (user) => <Profession id={user.profession}/>
        },
        completedMeetings: {path: 'completedMeetings', name: 'Встретился, раз'},
        rate: {path: 'rate', name: 'Оценка'},
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
        }
    }

    return (
        <Table data={users} onSort={onSort} selectedSort={selectedSort} columns={columns}/>
    )
}

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
}

export default UsersTable
