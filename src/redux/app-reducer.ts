import { ThunkAction } from 'redux-thunk'
import { getAuthUserData } from './auth-reducer'
import { AppStateType, InferActionsTypes } from './redux-store'

const initialState = {
    initialized : false
}

type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType =>{
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default: 
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    initializedSuccess: () => ({type: 'INITIALIZED_SUCCESS'} as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const initializeApp = (): ThunkType => async (dispatch) =>{
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(()=>{
            dispatch(actions.initializedSuccess())
        })
}

export default appReducer