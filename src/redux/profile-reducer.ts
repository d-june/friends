import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ProfileContactsType, ProfilePhotosType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profile-api";
import {APIResponseType} from "../api/api";
import {RootState} from "./store";


const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        userId: null as number | null,
        fullName: null as string | null,
        lookingForAJob: false as boolean | false,
        lookingForAJobDescription: null as string | null,
        aboutMe: null as string | null,
        contacts: {
            github: null as string | null,
            vk: null as string | null,
            facebook: null as string | null,
            instagram: null as string | null,
            twitter: null as string | null,
            website: null as string | null,
            youtube: null as string | null,
            mainLink: null as string | null,
        } as ProfileContactsType,
        photos: {
            small: null as string | null,
            large: null as string | null | undefined
        } as ProfilePhotosType,
    },
    reducers: {
        setProfileData (state, action) {
            state.userId = action.payload.userId
            state.fullName = action.payload.fullName
            state.lookingForAJob = action.payload.lookingForAJob
            state.lookingForAJobDescription = action.payload.lookingForAJobDescription
            state.aboutMe = action.payload.aboutMe
            state.contacts = action.payload.contacts
            state.photos.small = action.payload.photos.small
            state.photos.large = action.payload.photos.large
        }
    }
})
export const {setProfileData} = profileSlice.actions
export const getProfile = createAsyncThunk<ProfileType, number, { rejectValue: string }>(
    'profile/getProfile',
    async function (userId, {dispatch}) {
        const data = await profileAPI.getProfile(userId)
        dispatch(setProfileData(data))

        return data
    }
)

export const saveProfile = createAsyncThunk<APIResponseType, ProfileType, {rejectValue: string, getState: RootState}>(
    'profile/saveProfile',

    async function (profile, {rejectWithValue, getState, dispatch}) {

        const data = await profileAPI.saveProfile(profile)
        if(data.resultCode === 1) {
            rejectWithValue(data.messages[0])
        }
        const state = getState() as RootState;
        const userId = state.auth.id
        if (userId) {
            dispatch(getProfile(userId))
        } else {
            console.log('userId can not be null')
        }

        return data
    }
)
export default profileSlice.reducer