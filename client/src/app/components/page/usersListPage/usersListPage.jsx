import React, {useState} from 'react'
import _ from 'lodash'
import {paginate} from '../../../utils/paginate'
import Loader from '../../common/loader'
import GroupList from '../../common/groupList'
import SearchStatus from '../../ui/searchStatus'
import UsersTable from '../../ui/usersTable'
import Pagination from '../../common/pagination'
import {useSelector} from 'react-redux'
import {getProfessionsList, getProfessionsLoadingStatus} from '../../../store/professions'
import {getUsersList, getDataStatus, getCurrentUserId} from '../../../store/users'

const UsersListPage = () => {
    const currentUserId = useSelector(getCurrentUserId())
    const users = useSelector(getUsersList())
    const usersLoading = useSelector(getDataStatus())
    const professions = useSelector(getProfessionsList())
    const professionsLoading = useSelector(getProfessionsLoadingStatus())
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedProf, setSelectedProf] = useState(null)
    const [sortBy, setSortBy] = useState({iter: 'name', order: 'asc'})
    const pageSize = 8
    const [search, setSearch] = useState('')

    const handleSearchChange = (event) => {
        const {value} = event.target
        setSearch(value)
        setSelectedProf(null)
    }

    const handleDelete = (userId) => {
        // setUsers(users.filter(user => user._id !== userId))
        console.log(userId)
    }

    const handleToggleBookMark = (userId) => {
        const updatedState = [...users]
        const userFoundById = updatedState.find((user) => user._id === userId)
        userFoundById.bookmark = !userFoundById.bookmark
        // setUsers(updatedState)
        console.log(updatedState)
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const handleSort = (item) => {
        setSortBy(item)
    }

    if (usersLoading) {
        function filterUsers(data) {
            const filteredUsers = search
                ? data.filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
                : selectedProf
                    ? data.filter(user => {
                        return user.profession === selectedProf._id
                    })
                    : data
            return filteredUsers.filter(user => user._id !== currentUserId)
        }
        const filteredUsers = filterUsers(users)
        const usersCount = filteredUsers.length
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
        const usersCrop = paginate(sortedUsers, currentPage, pageSize)

        const handleProfessionSelect = (item) => {
            if (search !== '') setSearch('')
            setSelectedProf(item)
            setCurrentPage(1)
        }

        const clearFilter = () => {
            setSelectedProf(null)
            setCurrentPage(1)
        }

        return (
            <div className="d-flex">
                {professions && !professionsLoading
                    ? (
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
                    )
                    : <Loader loadingTarget={'filter'} margin={1}/>}
                <div className="d-flex flex-column">
                    {usersCount === 0
                        ? <span className="badge bg-danger p-2 m-2 fs-5">Никто с тобой не тусанет</span>
                        : (
                            <>
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
                            </>
                        )
                    }

                </div>
            </div>
        )
    }
    return <Loader loadingTarget={'users'} margin={5}/>
}

export default UsersListPage
