import { createSlice } from "@reduxjs/toolkit";




const initialState ={
    service:null
}

const serviceSlice = createSlice({
    name:"service",
    initialState,
    reducers:{
        setService:(state,action)=>{
            state.service = action.payload
        },
        clearService :(state)=>{
            state.service = null
        }   
    }
})

export const {setService,clearService} = serviceSlice.actions
export default serviceSlice.reducer