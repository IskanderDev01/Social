import {Action, applyMiddleware, combineReducers, createStore } from 'redux'
import profilePageReducer from './profilePage-reducer'
import messagePageReducer from './messagePage-reducer'
import usersPage_reducer from './usersPage-reducer'
import authReducer from './auth-reducer'
import thunk, { ThunkAction } from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from './app-reducer'
import chatReducer from './chat-reducer'

const rootReducer = combineReducers({
    profilePage: profilePageReducer,
    messagePage: messagePageReducer,
    usersPage: usersPage_reducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends {[keys: string]: (...args: any[]) => infer U} ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

let store = createStore(rootReducer, applyMiddleware(thunk))

export default store