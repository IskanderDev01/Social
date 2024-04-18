import { createSelector } from 'reselect'
import { AppStateType } from './redux-store'

const getUsers = (state: AppStateType) => {
    return state.usersPage.users
}
export const getUsersSelector = createSelector(getUsers, (users) => {
    return users.filter(u => true)
})
export const getUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter
}
export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}
export const getIsLoading = (state: AppStateType) => {
    return state.usersPage.isLoading
}
export const getDisabledBtn = (state: AppStateType) => {
    return state.usersPage.disabledBtn
}
export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}