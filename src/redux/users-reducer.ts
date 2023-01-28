import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {usersApi} from "../api/users-api";
import {UserType} from "../types/types";
import {APIResponseType, GetItemsResponseType} from "../api/api";


const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [] as Array<UserType>,
        loading: false,
        followingInProgress: false
    },
    reducers: {
        follow(state, action: PayloadAction<number>) {
            state.users.map(user => {
                if (user.id === action.payload) {
                    return user.followed = true
                }
                return user
            })
        },
        unfollow(state, action: PayloadAction<number>) {
            state.users.map(user => {
                if (user.id === action.payload) {
                    return user.followed = false
                }
                return user
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload.items
                state.loading= false
            })
            .addCase(followSuccess.pending, (state) => {
                state.followingInProgress = true
            })
            .addCase(followSuccess.fulfilled, (state, action) => {
                state.followingInProgress = false
            })
    }
})

export const {follow, unfollow} = usersSlice.actions;

export const getUsers = createAsyncThunk<GetItemsResponseType, undefined, {rejectValue: string}>(
    'users/getUsers',
    async function(_, {rejectWithValue}) {
            const data = await usersApi.getUsers();

            if(data.error) {
                return rejectWithValue(data.error);
            }
        return data;

    }
)

export const followSuccess = createAsyncThunk<APIResponseType, number, {rejectValue: string}> (
    'users/followSuccess',
    async function(userId, {rejectWithValue}) {
        const data = await usersApi.follow(userId);
        if(data.resultCode === 0) {
            return rejectWithValue(data.messages[0]);
        }
        follow(userId)
        return data;
    }
)

export default usersSlice.reducer;