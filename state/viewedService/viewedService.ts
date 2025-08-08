import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { serviceInterface } from "@/lib/types";


interface ServiceState {
  service: serviceInterface | null
}

const initialState: ServiceState = {
  service: null
}

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setService: (state, action: PayloadAction<serviceInterface>) => {
      state.service = action.payload
    },
    clearService: (state) => {
      state.service = null
    }
  }
})

export const { setService, clearService } = serviceSlice.actions
export default serviceSlice.reducer
