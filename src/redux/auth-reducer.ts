import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, AuthMeDataType, AuthMeType} from "../api/auth-api";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        id: null as number | null,
        login: null as string | null,
        email: null as string | null,
        isAuth: false,
        captchaUrl: null as string | null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
       builder
           .addCase(getAuth.fulfilled, (state, action) => {
               state.id = action.payload.data.id
               state.login = action.payload.data.login
               state.email = action.payload.data.email
               state.isAuth = true
        })
    }
    }
)

export const {} = authSlice.actions

export const getAuth = createAsyncThunk<AuthMeType, undefined, {rejectValue: string}> (
    'auth/getAuth',
    async function (_, {rejectWithValue}) {
        const data = await authAPI.me();

        if(data.resultCode === 1) {
            return rejectWithValue(data.messages[0]);
        }

        return data
    }
)

export default authSlice.reducer;