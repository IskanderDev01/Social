import { PhotosType, ProfileType } from 'types/types'
import { ResponseType, instance } from './api'

type SavePhotoResponseType = {
    photos: PhotosType
}

export const profileAPI = {
    async getUserProfile(userId: number) {
        const res = await instance.get<ProfileType>(`/profile/${userId}`)
        return res.data
    },
    async getStatus(id: number) {
        const res = await instance.get<string>(`/profile/status/${id}`)
        return res.data
    },
    async updateStatus(status: string) {
        const res = await instance.put<ResponseType>(`/profile/status`, { status })
        return res.data
    },
    async savePhoto(photoFile: any){
        const formData = new FormData()
        formData.append("image", photoFile)
        const res = await instance.put<ResponseType<SavePhotoResponseType>>(`/profile/photo`, formData, {
            headers: { 
                'Content-type': 'multipart/form-data'
            }
        })
        return res.data
    },
}