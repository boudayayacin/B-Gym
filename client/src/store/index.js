import { configureStore } from "@reduxjs/toolkit";
import  articleSlice  from "./ArticlesSlice";
import userReducer from "./userSlice"
import OrderSlice from "./OrderSlice";

export const store = configureStore({
    reducer: {
        users: userReducer ,
        articles: articleSlice,
        order: OrderSlice
    }
})