import {GetItemsResponseType, instance} from "./api";

export const usersApi = {
    getUsers () {
        return instance.get<GetItemsResponseType>('users').then(response => response.data)
    }
}