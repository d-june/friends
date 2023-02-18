import {APIResponseType, instance} from "./api";
import {ProfileType} from "../types/types";

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(response => response.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>(`profile`, profile).then(response => response.data)

    }
}