'use client'
import React from 'react'
import {Provider} from 'react-redux'
import { store,persistor } from '@/store'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'

export default function layout({children}:{children:React.ReactNode})
{
      
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <main className='raleway-text '>
            {children}
            <ToastContainer 
              position="top-right"
              autoClose={2000}
              hideProgressBar={true}
              newestOnTop={true}
              closeOnClick={false}
              rtl={false}
              />

        </main>
      </PersistGate>

    </Provider>
  )
}
