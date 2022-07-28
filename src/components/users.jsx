import React, { useState, useEffect } from 'react'
import api from '../api/index'
import User from './userComponent'
import PropTypes from 'prop-types'
import { paginate } from '../utils/paginate'
import Pagination from './pagination'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import Loader from './loader'

const Users = ({ users, onDelete, onToggleBookMark }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState([])
    const [selectedProf, setSelectedProf] = useState(null)
    const pageSize = 4

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [currentPage])

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const filteredUsers = selectedProf
        ? users.filter(user => user.profession._id === selectedProf._id)
        : users
    const usersCount = filteredUsers.length
    const usersCrop = paginate(filteredUsers, currentPage, pageSize)

    const handleProfessionSelect = (item) => {
        setSelectedProf(item)
        setCurrentPage(1)
    }

    const clearFilter = () => {
        setSelectedProf(null)
        setCurrentPage(1)
    }

    if (usersCount === 0) {
        return (
            <span className="badge bg-danger p-2 m-2 fs-5">
                Никто с тобой не тусанет :(
            </span>
        )
    }

    return (
        <div className="d-flex">
            {professions.length === 0
                ? <Loader loadingTarget={'filter'} margin={1}/>
                : (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            items={professions}
                            selectedItem={selectedProf}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
            <div className="d-flex flex-column">
                <SearchStatus length={usersCount} />
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
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={usersCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    )
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
}

export default Users
