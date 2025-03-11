import React from 'react'
import Navbar from '../components/navbar'

export default function layout({children}:Readonly<{children:React.ReactNode}>) {
  return (
    <main>
        <Navbar/>
        {children}
    </main>
  )
}
