import { instance, GetItemsType, ResponseType } from './api'

export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 8, term: string = '', friend: null | boolean = null){
        const res = await instance.get<GetItemsType>(`/users?page=${currentPage}&count=${pageSize}&term=${term}` + 
        (friend === null ? '' : `&friend=${friend}`))
        return res.data
    },
    async subsUser(id: number) {
        const res = await instance.post<ResponseType>(`/follow/${id}`)
        return res.data
    },
    subsNotUser(id: number){
        return instance.delete(`/follow/${id}`).then(res => res.data) as Promise<ResponseType>
    }
}
