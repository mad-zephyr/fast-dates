import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { paginate } from '../../../utils/paginate'
import Pagination from '../../common/pagination'
import api from '../../../api'
import GroupList from '../../common/groupList'
import SearchStatus from '../../searchStatus'
import UserTable from '../../ui/usersTable'
import { TextInput } from '../../common/form'

import _ from 'lodash'

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [users, setUsers] = useState()
  const [professions, setProfession] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [search, setSearch] = useState('')
  const [initialData, setInitialData] = useState()

  const pageSize = 8

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data)
      setInitialData(data)
    })
  }, [])

  const handleToggleBookMark = (id) => {
    const newArray = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark }
      }
      return user
    })
    setUsers(newArray)
  }

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const handleProfessionSelect = (item) => {
    handleSearchInput('')
    setSelectedProf(item)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  const handleSort = (item) => {
      setSortBy(item)
  }
  const clearFilter = () => {
    setSelectedProf()
  }

  function handleSearchInput(data) {
    const searchInfo = data
    clearFilter()

    setSearch(prevState => searchInfo)

    const searchRegEx = new RegExp(searchInfo, 'gi')
    const searchUsers = initialData.filter(user => {
      return searchRegEx.test(user.name) && user
    })
    setUsers(searchUsers)
    setCurrentPage(1)
  }

  const handleDelete = (userId) => {
    const updatedUsers = initialData.filter((user) => user._id !== userId)
    setInitialData(prev => updatedUsers)
    setUsers(prev => updatedUsers)
  }

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter(
        (user) =>
          JSON.stringify(user.profession) ===
          JSON.stringify(selectedProf)
      )
      : users

    const count = filteredUsers.length
    const sortedUsers = _.orderBy(
      filteredUsers,
      [sortBy.path],
      [sortBy.order]
    )
    const usersCrop = paginate(sortedUsers, currentPage, pageSize)

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
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
          <SearchStatus length={count} />
          <TextInput
            type={'text'}
            name="search"
            placeholder={'Search...'}
            search = {search}
            handler={handleSearchInput}/>
          {count > 0 && (
            <UserTable
              users={usersCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    )
  }
  return 'loading...'
}
UsersListPage.propTypes = {
    users: PropTypes.array
}

export default UsersListPage
