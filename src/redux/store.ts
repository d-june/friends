import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./users-reducer";
import authSlice from "./auth-reducer";


const store = configureStore({
    reducer: {
        users: usersSlice,
        auth: authSlice
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;