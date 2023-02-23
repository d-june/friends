import {APIResponseType, instance, ResultCodesEnum} from "./api";
import {PhotosType, ProfileType} from "../types/types";

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(response => response.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>(`profile`, profile).then(response => response.data)
    },
    editAvatar(image: File) {
        let formData = new FormData();
        formData.append("image", image);
        return instance.put<APIResponseType<PhotosType>>(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(response => response.data)
    },
    getStatus (userId: number | undefined) {
        return instance.get<string>(`profile/status/` + userId).then(response => response.data)
    },
    setStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, { status: status }).then(response => response.data)
    }
}