import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { profileInterface } from "@/lib/types";


  

export interface userState {
    user:profileInterface|null,
    token:string|null
}

const initialState:userState ={
    user:null,
    token:null
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action:PayloadAction<userState>)=>{
            state.user = action.payload.user
            state.token = action.payload.token
        },
        clearUser :(state)=>{
            state.user = null
            state.token = null
        }   
    }
})

export const {setUser,clearUser} = userSlice.actions
export default userSlice.reducer