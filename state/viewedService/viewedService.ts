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
        } ,
        addViewService:(state)=>{
            if (state.service && typeof state.service.views == 'number'){
                state.service.views += 1;
            }
        }
         
    }
})

export const {setService,clearService,addViewService} = serviceSlice.actions
export default serviceSlice.reducer