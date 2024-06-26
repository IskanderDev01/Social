export type CommentsType = {
    comment: string
    liked: boolean
    likes: number
    id: number
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    aboutMe: string
    contacts: ContactsType
    photos: PhotosType
}
export type UserType = {
    id: number 
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}
export type UserListType = {
    name: string
    id: number
}
export type LettersType = {
    letter: string
    id: number
}