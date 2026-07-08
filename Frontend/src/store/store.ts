import { configureStore } from "@reduxjs/toolkit";
import statsReducer from "./statsSlice"; 


const store=configureStore({
    reducer:{
        stats:statsReducer
    }
})

export default store
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch