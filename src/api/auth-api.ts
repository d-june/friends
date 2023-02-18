import {instance, ResultCodesEnum} from "./api";

export type AuthMeDataType = {
    id: number | null
    email: string | null
    login: string | null
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
    },
    login (email: string, password: string, rememberMe: boolean, captcha: string | null = null) {
        return instance.post<AuthMeType>('auth/login', {email, password, rememberMe, captcha}).then(response => response.data)
    },
    logout () {
        return instance.delete<AuthMeType>('auth/login').then(response => response.data)
    }
}