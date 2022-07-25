import React, { useState } from 'react'
import api from './api'
import Users from './components/users'
import SearchStatus from './components/searchStatus'
import Pagination from './components/pagination'
import { paginate } from './utils/paginate'

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const usersCount = users.length
    const pageSize = 2
    const [currentPage, setCurrentPage] = useState(1)

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const userCrop = paginate(users, currentPage, pageSize)

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user !== userId))
    }

    const handleToggleBookMark = (userId) => {
        const updatedState = [...users]
        const userFoundById = updatedState.find((user) => user._id === userId)
        userFoundById.bookmark = !userFoundById.bookmark
        setUsers(updatedState)
    }

    if (usersCount === 0) {
        return (
            <span className="badge bg-danger p-2 m-2 fs-5">
                Никто с тобой не тусанет :(
            </span>
        )
    }

    return (
        <>
            <SearchStatus length={usersCount} />
            <Users
                users={userCrop}
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
            />
            <Pagination
                itemsCount={usersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    )
}

export default App
