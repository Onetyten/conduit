import { createSlice } from "@reduxjs/toolkit";




const initialState ={
    serviceProfile:null
}

const serviceProfileSlice = createSlice({
    name:"serviceProfile",
    initialState,
    reducers:{
        setServiceProfile:(state,action)=>{
            state.serviceProfile = action.payload
        },
        clearServiceProfile :(state)=>{
            state.serviceProfile = null
        }   
    }
})

export const {setServiceProfile,clearServiceProfile} = serviceProfileSlice.actions
export default serviceProfileSlice.reducer