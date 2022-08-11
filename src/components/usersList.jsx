import React, { useState } from 'react'
import _ from 'lodash'
import { paginate } from '../utils/paginate'
import Loader from './loader'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import UsersTable from './usersTable'
import Pagination from './pagination'
import PropTypes from 'prop-types'

const UsersList = ({ users, professions, handleDelete, handleToggleBookMark, isUsersLoading, isGroupListLoading }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedProf, setSelectedProf] = useState(null)
    const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' })
    const pageSize = 8

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const handleSort = (item) => {
        setSortBy(item)
    }

    if (!isUsersLoading) {
        const filteredUsers = selectedProf
            ? users.filter(user => user.profession._id === selectedProf._id)
            : users
        const usersCount = filteredUsers.length
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
        const usersCrop = paginate(sortedUsers, currentPage, pageSize)

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
                {isGroupListLoading
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
                    <SearchStatus length={usersCount}/>
                    <UsersTable
                        users={usersCrop}
                        onDelete={handleDelete}
                        onToggleBookMark={handleToggleBookMark}
                        onSort={handleSort}
                        selectedSort={sortBy}
                    />
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
    return <Loader loadingTarget={'users'} margin={5} />
}

UsersList.propTypes = {
    users: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleToggleBookMark: PropTypes.func.isRequired,
    isUsersLoading: PropTypes.bool.isRequired,
    professions: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    isGroupListLoading: PropTypes.bool.isRequired
}

export default UsersList
