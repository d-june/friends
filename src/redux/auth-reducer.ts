import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, AuthMeDataType, AuthMeType} from "../api/auth-api";
import {LoginType} from "../types/types";


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
        setAuthUserData(state, action) {
            state.id = action.payload.data.id
            state.login = action.payload.data.login
            state.email = action.payload.data.email
            state.isAuth = action.payload.data.isAuth
        }
    },
    extraReducers: (builder) => {
       // builder
       //     .addCase(getAuth.fulfilled, (state, action) => {
       //         state.id = action.payload.data.id
       //         state.login = action.payload.data.login
       //         state.email = action.payload.data.email
       //         state.isAuth = true
       //  })
    }
    }
)

export const {setAuthUserData} = authSlice.actions


export const getAuth = createAsyncThunk<AuthMeType, undefined, {rejectValue: string}> (
    'auth/getAuth',
    async function (_, {rejectWithValue, dispatch}) {
        const data = await authAPI.me();

        if(data.resultCode === 1) {
            return rejectWithValue(data.messages[0]);
        }

        data.data.isAuth = true

        dispatch(setAuthUserData(data))
        return data
    }
)

export const login = createAsyncThunk<AuthMeType, LoginType, {rejectValue: string}> (
    'auth/login',
    async function ({email, password, rememberMe, captcha}, {rejectWithValue, dispatch}){
        const data = await authAPI.login(email, password, rememberMe, captcha)
        if(data.resultCode === 1) {
            return rejectWithValue(data.messages[0])
        }
        dispatch(getAuth())
        return data
    }
)

export const logout = createAsyncThunk<AuthMeType, undefined, {rejectValue: string}> (
    'auth/logout',
    async function (_, {rejectWithValue, dispatch
    }){
        const data = await authAPI.logout()

        if(data.resultCode === 1) {
            return rejectWithValue(data.messages[0])
        }
        data.data.id = null
        data.data.login = null
        data.data.email = null
        data.data.isAuth = false

        dispatch(setAuthUserData(data))
        return data
    }
)


export default authSlice.reducer;

