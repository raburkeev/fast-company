import React, {useEffect, useState} from 'react'
import api from '../../../api'
import _ from 'lodash'
import {paginate} from '../../../utils/paginate'
import Loader from '../../common/loader'
import GroupList from '../../common/groupList'
import SearchStatus from '../../ui/searchStatus'
import UsersTable from '../../ui/usersTable'
import Pagination from '../../common/pagination'

const UsersListPage = () => {
    const [users, setUsers] = useState([])
    const [isUsersLoading, setIsUsersLoading] = useState(true)
    const [professions, setProfessions] = useState([])
    const [isGroupListLoading, setIsGroupListLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedProf, setSelectedProf] = useState(null)
    const [sortBy, setSortBy] = useState({iter: 'name', order: 'asc'})
    const pageSize = 8
    const [search, setSearch] = useState('')
    const [searchUsers, setSearchUsers] = useState([])

    useEffect(() => {
        const regExp = new RegExp(search, 'gi')
        if (!isUsersLoading) {
            const initialUsers = [...users]
            setSearchUsers(initialUsers.filter((user) => regExp.test(user.name)))
        }
    }, [search, users])

    const handleSearchChange = (event) => {
        const {value} = event.target
        setSearch(value)
        setSelectedProf(null)
    }

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setIsUsersLoading(false)
            setUsers(data)
        })
    }, [])

    useEffect(() => {
        api.professions.fetchAll().then(data => {
            setIsGroupListLoading(false)
            setProfessions(data)
        })
    }, [])

    const handleDelete = (userId) => {
        setUsers(users.filter(user => user._id !== userId))
    }

    const handleToggleBookMark = (userId) => {
        const updatedState = [...users]
        const userFoundById = updatedState.find((user) => user._id === userId)
        userFoundById.bookmark = !userFoundById.bookmark
        setUsers(updatedState)
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const handleSort = (item) => {
        setSortBy(item)
    }

    if (!isUsersLoading) {
        const filteredUsers = selectedProf
            ? searchUsers.filter(user => user.profession._id === selectedProf._id)
            : searchUsers
        const usersCount = filteredUsers.length
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
        const usersCrop = paginate(sortedUsers, currentPage, pageSize)

        const handleProfessionSelect = (item) => {
            setSearch('')
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
                    <input type="text" placeholder="search..." name="search" onChange={handleSearchChange}
                        value={search}/>
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
    return <Loader loadingTarget={'users'} margin={5}/>
}

export default UsersListPage
