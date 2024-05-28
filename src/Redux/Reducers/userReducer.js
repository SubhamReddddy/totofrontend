import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading:true,
    user:null
}

export const userSlice = createSlice({
    name:'userSlice',
    initialState,
    reducers:{
        userExist:(state,action)=>{
            state.loading = false,
            state.user = action.payload
        },
        userNotExist:(state)=>{
            state.loading = false,
            state.user = null
        },
    }
})

export const {userExist,userNotExist} = userSlice.actions;