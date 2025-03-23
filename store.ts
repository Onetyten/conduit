import {configureStore} from '@reduxjs/toolkit'
import userReducer from '@/state/userInfo/userSlice'
import storage from 'redux-persist/lib/storage'
import {persistReducer,persistStore} from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'

const persistConfig = {
    key:'root',
    version:1,
    storage
}

const reducer = combineReducers({
    user:userReducer
})

const persistedReducer = persistReducer(persistConfig,reducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleWare)=> getDefaultMiddleWare({
        serializableCheck:false
    })
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 