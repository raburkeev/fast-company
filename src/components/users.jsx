import React, { useState, useEffect } from 'react'
import api from '../api/index'
import User from './userComponent'
import PropTypes from 'prop-types'
import { paginate } from '../utils/paginate'
import Pagination from './pagination'
import GroupList from './groupList'

const Users = ({ users, onDelete, onToggleBookMark }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const pageSize = 2

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [currentPage])

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const usersCrop = paginate(users, currentPage, pageSize)

    const handleProfessionSelect = (params) => {
        console.log(params)
    }

    return (
        <>
            {professions && (
                <GroupList
                    items={professions}
                    onItemSelect={handleProfessionSelect}
                />
            )}
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
                    {usersCrop.map((user) => {
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
            <Pagination
                itemsCount={users.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    )
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
}

export default Users
