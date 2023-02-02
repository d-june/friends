import {instance, ResultCodesEnum} from "./api";

export type AuthMeDataType = {
    id: number
    email: string
    login: string
    isAuth: boolean
}

export type AuthMeType = {
    data: AuthMeDataType
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const authAPI = {
    me () {
        return instance.get<AuthMeType>('auth/me').then(response => response.data)
    }
}