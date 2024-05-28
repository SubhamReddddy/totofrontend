import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./Api/UserApi";
import { userSlice } from "./Reducers/userReducer";
import { taskApi } from "./Api/TaskApi";


export const store = configureStore({
    reducer:{
        userApi:userApi.reducer,
        taskApi:taskApi.reducer,
        userSlice:userSlice.reducer,
    },
    middleware: (mid) => [...mid(), userApi.middleware,taskApi.middleware],
})