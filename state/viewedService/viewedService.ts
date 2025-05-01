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
    },
    addViewService: (state) => {
      if (state.service && typeof state.service.views === 'number') {
        state.service.views += 1
      }
    },
    addLikeService: (state) => {
      if (state.service && typeof state.service.likes === 'number') {
        state.service.views += 1
      }
    },
    subLikeService: (state) => {
      if (state.service && typeof state.service.likes === 'number') {
        state.service.views -= 1
      }
    },
  }
})

export const { setService, clearService, addViewService,addLikeService,subLikeService } = serviceSlice.actions
export default serviceSlice.reducer
