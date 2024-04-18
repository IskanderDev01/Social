import { LettersType, UserListType } from 'types/types'
import { InferActionsTypes } from './redux-store'

const initialState = {
    usersList: [
            {name: 'Vladilen', id: 1},
            {name: 'Dimich', id: 2},
            {name: 'Olya', id: 3},
            {name: 'Iskander', id: 4},
            {name: 'Abbos', id: 5},
        ] as Array <UserListType>,
    letters: [
            {letter: "I'm Vladilen", id: 1},
            {letter: "I'm Dimich", id: 2},
            {letter: "I'm Olya", id: 3},
            {letter: "I'm Iskander", id: 4},
            {letter: "I'm Abbos", id: 5},
        ] as Array <LettersType>,
    newMessage: '' as string
}

export type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

const messagePageReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type){
        case 'ADD_MESSAGE':
            return {
                ...state,
                letters: [...state.letters, { letter: action.newMessage,  id: 1 }],
            }
        
        default: return state
    }
}

export const actions = {
    addMessage : (newMessage: string) => ({type: 'ADD_MESSAGE', newMessage} as const)
}

export default messagePageReducer