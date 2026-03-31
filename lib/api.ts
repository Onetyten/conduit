import { store } from '@/store';
import axios from 'axios'


const api = axios.create({
    baseURL:''
})

api.interceptors.request.use((config)=>{
  if (typeof window !== 'undefined') {
      const state = store.getState()
      const token = state.user.token
      if (token) {
          config.headers.Authorization = `Bearer ${token}`
      }
  }
  return config
})



export default api