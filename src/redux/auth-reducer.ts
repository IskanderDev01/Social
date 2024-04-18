import { FormAction, stopSubmit } from 'redux-form'
import { authAPI } from 'components/api/auth-api'
import { ResultCodesEnum } from 'components/api/api'
import { BaseThunkType, InferActionsTypes } from './redux-store'

type InitialStateType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}
const initialState: InitialStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType =>{
    switch(action.type) {
        case 'SET_AUTH_DATA': 
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    setAuthData : (id: number | null, login: string | null, email: string | null, isAuth: boolean) => {
        return {
            type: 'SET_AUTH_DATA',
            data: {
                id,
                login,
                email,
                isAuth
            }
        } as const
    } 
}

type ThunkType = BaseThunkType<ActionsTypes | FormAction>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const data = await authAPI.me()
        if(data.resultCode === ResultCodesEnum.Success){
            let {id, login, email} = data.data
            dispatch(actions.setAuthData(id, login, email, true))
        }
} 

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe)
            if(data.resultCode === ResultCodesEnum.Success){
                dispatch(getAuthUserData())
            }
            else {
                let message = data.messages.length > 0 ? data.messages[0] : "Some Error"
                dispatch(stopSubmit("login", {_error: message}))
            }
}

export const logout = (): ThunkType => async (dispatch) => {
    const res = await authAPI.logout()
            if(res.data.resultCode === ResultCodesEnum.Success) {
                dispatch(actions.setAuthData(null, null, null, false))
            }
}

export default authReducer