import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    showService: false
}

const showServiceSlice = createSlice({
    name: "showService",
    initialState,
    reducers :{
        serviceTrue:(state)=>{
            state.showService = true
        },
        serviceFalse:(state)=>{
            state.showService= false
        },
    }

})

export const {serviceTrue,serviceFalse} = showServiceSlice.actions
export default showServiceSlice.reducer