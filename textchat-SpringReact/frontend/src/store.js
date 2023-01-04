import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice'
import chat from './store/chatSlice'
import points from "./store/pointSlice";

export default configureStore({
    reducer: {
        user: user.reducer,
        chat: chat.reducer,
        points: points.reducer
    }
})
