import {APIResponseType, GetItemsResponseType, instance} from "./api";
import {FilterType} from "../redux/users-reducer";

export const usersApi = {
    getUsers (currentPage: number, filter: FilterType) {
        return instance.get<GetItemsResponseType>(`users?page=${currentPage}&count=10&term=${filter.term}`).then(response => response.data)
    },
    follow (userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(response => response.data)
    },
    unfollow (userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`).then(response => response.data)
    }
}