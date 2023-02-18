import {createSlice} from "@reduxjs/toolkit";
import { postType } from "../types/types";

const initialState = {
    posts: [
        {
            userAvatar: 'https://flomaster.club/uploads/posts/2021-12/1639509697_1-flomaster-club-p-krutie-koti-risunki-dlya-srisovki-krasivie-1.jpg',
            postText: 'Всем привет!',
            likesCount: 5
        },
        {
            userAvatar: 'https://flomaster.club/uploads/posts/2021-12/1639509697_1-flomaster-club-p-krutie-koti-risunki-dlya-srisovki-krasivie-1.jpg',
            postText: 'Всем привет!',
            likesCount: 5
        },
        {
            userAvatar: 'https://flomaster.club/uploads/posts/2021-12/1639509697_1-flomaster-club-p-krutie-koti-risunki-dlya-srisovki-krasivie-1.jpg',
            postText: 'Всем привет!',
            likesCount: 5
        }
    ] as Array<postType>,
}

const postsReducer = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost (state, action) {
            state.posts.push(action.payload)
            debugger
        }
    }
})

export const {addPost} = postsReducer.actions

export default postsReducer.reducer