import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {usersApi} from "../api/users-api";
import {UserType} from "../types/types";
import {APIResponseType, GetItemsResponseType} from "../api/api";

const initialState = {
        users: [] as Array<UserType>,
        totalCount: 0,
        loading: false,
        followingInProgress: [] as Array<number>,
        isFetching: false,
        filter: {term: ''},
    }

const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        follow(state, action) {
            state.users.map(user => {
                if (user.id === action.payload) {
                    return user.followed = true
                }
                return user
            })
        },
        unfollow (state, action) {
            state.users.map(user => {
                if (user.id === action.payload) {
                    return user.followed = false
                }
                return user
            })
        },
        toggleFollowingProgress (state, action) {
            state.followingInProgress = action.payload.isFetching ? [...state.followingInProgress, action.payload.userId] : state.followingInProgress.filter(id => id != action.payload.userId)
        },
        setFilter (state, action) {
            state.filter = action.payload

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload.items
                state.totalCount = action.payload.totalCount
                state.loading = false
            })
    }
})

export const {follow, unfollow, toggleFollowingProgress, setFilter} = usersSlice.actions;

export const getUsers = createAsyncThunk<GetItemsResponseType, { currentPage: number, filter: FilterType }, { rejectValue: string }>(
    'users/getUsers',
    async function ({currentPage, filter}, {rejectWithValue, dispatch}) {
        const data = await usersApi.getUsers(currentPage, filter);

        if (data.error) {
            return rejectWithValue(data.error);
        }
        dispatch(setFilter(filter))
        return data;

    }
)

export const followSuccess = createAsyncThunk<APIResponseType, number, { rejectValue: string }>(
    'users/followSuccess',
    async function (userId, {rejectWithValue, dispatch}) {
        dispatch(toggleFollowingProgress({isFetching: true, userId}))
        const data = await usersApi.follow(userId);
        if (data.resultCode === 1) {
            return rejectWithValue(data.messages[0]);
        }
        dispatch(toggleFollowingProgress({isFetching: false, userId}))
        dispatch(follow(userId))
        return data;
    }
)

export const unfollowSuccess = createAsyncThunk<APIResponseType, number, { rejectValue: string }>(
    'users/unfollowSuccess',
    async function (userId, {rejectWithValue, dispatch}) {
        dispatch(toggleFollowingProgress({isFetching: true, userId}))
        const data = await usersApi.unfollow(userId);
        if (data.resultCode === 1) {
            return rejectWithValue(data.messages[0]);
        }
        dispatch(toggleFollowingProgress({isFetching: false, userId}))
        dispatch(unfollow(userId))

        return data;
    }
)

export type FilterType = typeof initialState.filter
export default usersSlice.reducer;