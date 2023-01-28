import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {usersApi} from "../api/users-api";
import {UserType} from "../types/types";
import {GetItemsResponseType} from "../api/api";



const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [] as Array<UserType>,
        loading: false
    },
    reducers: {

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
    }
})

export const {} = usersSlice.actions;

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

export default usersSlice.reducer;