import React from 'react'

export default function page() {
  return (
    <div className='w-full flex flex-col items-center gap-2 py-16'>
        <p className='text-muted text-xl'>No transactions yet</p>
        <p className='text-muted text-sm'>Your transaction history will appear here</p>
    </div>
  )
}