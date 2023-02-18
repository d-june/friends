import {APIResponseType, GetItemsResponseType, instance} from "./api";

export const usersApi = {
    getUsers (currentPage: number) {
        return instance.get<GetItemsResponseType>(`users?page=${currentPage}&count=10`).then(response => response.data)
    },
    follow (userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(response => response.data)
    },
    unfollow (userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`).then(response => response.data)
    }
}