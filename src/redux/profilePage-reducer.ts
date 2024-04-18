import { profileAPI } from 'components/api/profile-api'
import { ProfileType, PhotosType, CommentsType } from 'types/types'
import { BaseThunkType, InferActionsTypes } from './redux-store'

const initialState = {
        comments: [
        {comment: 'comeeee', liked: true, likes: 11, id: 1},
        {comment: 'asdasdsa', liked: false, likes:23, id: 2},
        {comment: 'sldflgldfg', liked: true, likes:42, id: 3},
        ] as Array <CommentsType>,
        profile: null as ProfileType | null,
        status: ''
}

export type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

const profilePageReducer = (state = initialState, action: ActionsTypes): InitialStateType =>{
    switch(action.type){
        case 'ADD_POST':
        return {
            ...state,
            comments: [...state.comments, {comment: action.newPostText, liked: false, likes:11, id: 1},]
        }
        case 'LIKE_PUT':
            return {
                ...state,
                comments: state.comments.map(item => {
                    if(item.id === action.id){
                        return {
                            ...item,
                            liked: true,
                            likes: item.likes +1
                        }
                    }
                    return item
                })
            }
        case 'LIKE_CANCEL':
            return {
                ...state,
                comments: state.comments.map(item => {
                    if(item.id === action.id){
                        return {
                            ...item,
                            liked: false,
                            likes: item.likes -1
                        }
                    }
                    return item
                })
            }
        case 'SET_USERS_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'SAVE_PHOTO_SUCCESS':
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default: return state
    }
}

export const actions = {
    likeOn: (id: number) => ({type: 'LIKE_PUT', id} as const),
    likeOff: (id: number) => ({type: 'LIKE_CANCEL', id} as const),
    addPost: (newPostText: string) => ({type: 'ADD_POST', newPostText} as const),
    setUsersProfile: (profile: ProfileType) => ({type: 'SET_USERS_PROFILE', profile} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SAVE_PHOTO_SUCCESS', photos} as const),
    setStatus: (status: string) => ({type: 'SET_STATUS', status} as const)
}

type ThunkType = BaseThunkType<ActionsTypes>

export const getUsersProfile = (id: number): ThunkType => async (dispatch) =>{
    const data = await profileAPI.getUserProfile(id)
            dispatch(actions.setUsersProfile(data))
}
export const getStatus = (id: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(id)
            dispatch(actions.setStatus(data))
}
export const updateStatus = (status: string): ThunkType => async (dispatch) =>{
    const data = await profileAPI.updateStatus(status)
            if(data.resultCode === 0) {
                dispatch(actions.setStatus(status))
            }
}
export const savePhoto = (file: any): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if(data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export default profilePageReducer