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
        updateUser:(state,action:PayloadAction<profileInterface>)=>{
            state.user = action.payload
        },
        
        clearUser :(state)=>{
            state.user = null
            state.token = null
        }   
    }
})

export const {setUser,clearUser,updateUser} = userSlice.actions
export default userSlice.reducer