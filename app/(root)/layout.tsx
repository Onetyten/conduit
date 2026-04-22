'use client'
import React from 'react'
import {Provider} from 'react-redux'
import { store,persistor } from '@/store'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'
import CreateAccount from '@/components/signup/createAccount'
import "react-activity/dist/library.css";

export default function Layout({children}:{children:React.ReactNode}){

    
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <main className='raleway-text  relative'>
            {children}
            <ToastContainer  position="top-right" autoClose={2000} hideProgressBar={true} newestOnTop={true} closeOnClick={true} rtl={false} />
            <CreateAccount/>

        </main>
      </PersistGate>

    </Provider>
  )
}
