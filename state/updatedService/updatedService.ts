import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { serviceInterface } from "@/lib/types";


interface ServiceState {
  newservice: serviceInterface | null
}

const initialState: ServiceState = {
  newservice: null
}

const serviceSlice = createSlice({
  name: "newservice",
  initialState,
  reducers: {
    updateService: (state, action: PayloadAction<serviceInterface>) => {
      state.newservice = action.payload
    },
    clearNewService: (state) => {
      state.newservice = null
    },

  }
})

export const { updateService, clearNewService} = serviceSlice.actions
export default serviceSlice.reducer
