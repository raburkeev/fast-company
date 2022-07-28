import React, { useState, useEffect } from 'react'
import api from '../api/index'
import User from './userComponent'
import PropTypes from 'prop-types'
import { paginate } from '../utils/paginate'
import Pagination from './pagination'
import GroupList from './groupList'
import SearchStatus from './searchStatus'

const Users = ({ users, onDelete, onToggleBookMark }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState() // старайся всегда задавать начальное значение, тут отлично подойдет []
    const [selectedProf, setSelectedProf] = useState() // тут null 
    const pageSize = 4

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [currentPage])

    useEffect(() => { // вот этот вариант не очень хороший, если что могу голосом объясниить
        setCurrentPage(1) // это лучше вынести в функцию handleProfessionSelect
    }, [selectedProf])

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const filteredUsers = selectedProf
        ? users.filter(
              (user) =>
                  user.profession.name === selectedProf.name && // тут просто user.pridession._id === selectedProf._id
                  user.profession._id === selectedProf._id // в эталоне вообще будет JSON.strigydy - но тут этого точно не надо 
          )
        : users
    const usersCount = filteredUsers.length
    const usersCrop = paginate(filteredUsers, currentPage, pageSize)

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setCurrentPage(1);
    }

    const clearFilter = () => {
        setSelectedProf(null);
        setCurrentPage(1); // Что с линтером, почему без ';' ?
    }

    return (
        <div className="d-flex">
            {professions && (
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
