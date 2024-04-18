import axios from 'axios';
import { UserType } from 'types/types'

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        "API-KEY": '55e5658d-1f6b-4fdc-93cc-415908130d10'
    }
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

