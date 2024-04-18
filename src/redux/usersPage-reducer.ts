import { updateObjectInArray } from '../components/utils/object-helpers'
import { UserType } from 'types/types'
import { BaseThunkType, InferActionsTypes } from './redux-store'
import { Dispatch } from 'redux'
import { usersAPI } from 'components/api/users-api'
import { ResponseType } from 'components/api/api'


const initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 0,
    pageSize: 7,
    currentPage: 1,
    isLoading: true,
    disabledBtn: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean,
    }
}

export type InitialStateType = typeof initialState

const usersPage_reducer= (state = initialState, action: ActionsTypes): InitialStateType =>{
    switch(action.type){
        case 'FOLLOW_ON':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.id, "id", {followed: true})
            }
        case 'FOLLOW_CANCEL':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.id, "id", {followed: false}) 
            }
        case 'SET_USERS': 
            return {
                ...state,
                users: action.users
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
        }
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload
            }
        case 'SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            };
        case 'TOGGLE_IS_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
        }
        case 'TOGGLE_DISABLED_BUTTON':
            return {
                ...state,
                disabledBtn: action.isFetching
                    ? [...state.disabledBtn, action.id]
                    : state.disabledBtn.filter(id => id!== action.id)
            }
        default: return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>
export type FilterType = typeof initialState.filter

export const actions = {
    followOn: (id: number) => ({type: 'FOLLOW_ON', id} as const),
    followOff: (id: number) => ({type: 'FOLLOW_CANCEL', id} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    setFilter: (filter: FilterType) => ({type: 'SET_FILTER', payload: filter} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
    toggleIsLoading: (isLoading: boolean) => ({type: 'TOGGLE_IS_LOADING', isLoading} as const),
    toggleDisabledBtn: (isFetching: boolean, id: number)=> ({type: 'TOGGLE_DISABLED_BUTTON', isFetching, id,} as const)
}

type ThunkType = BaseThunkType<ActionsTypes>

export const getUsers = (currentPage = 1, pageSize = 8, filter: FilterType): ThunkType => async (dispatch) => {
        dispatch(actions.toggleIsLoading(true))
        dispatch(actions.setCurrentPage(currentPage))
        dispatch(actions.setFilter(filter))
    const data = await usersAPI.getUsers(currentPage,pageSize, filter.term, filter.friend)
        dispatch(actions.setUsers(data.items))
        dispatch(actions.toggleIsLoading(false))
        dispatch(actions.setTotalUsersCount(data.totalCount))
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, 
id: number, 
apiMethod: (id: number) => Promise<ResponseType>, 
actionCreator: (id: number) => ActionsTypes) => {
    dispatch(actions.toggleDisabledBtn(true, id))
        const data = await apiMethod(id)
            if(data.resultCode === 0){
                dispatch(actionCreator(id))
            }
            dispatch(actions.toggleDisabledBtn(false, id))
}

export const follow = (id: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, id, usersAPI.subsUser, actions.followOn)
}
export const unFollow = (id: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, id, usersAPI.subsNotUser, actions.followOff)
}
export default usersPage_reducer
