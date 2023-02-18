import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./users-reducer";
import authSlice from "./auth-reducer";
import profileSlice from "./profile-reducer";
import postsReducer from "./posts-reducer";


const store = configureStore({
    reducer: {
        users: usersSlice,
        auth: authSlice,
        profile: profileSlice,
        posts: postsReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;