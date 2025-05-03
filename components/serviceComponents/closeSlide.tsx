import React from 'react'
import {signUpFalse} from '@/state/showSignUp/showSignUp'
import { MdClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';

export default function CloseSlide() {
    const dispatch = useDispatch()
  return (
    <button onClick={()=>{dispatch(signUpFalse())}} className='text-2xl absolute top-4 left-4 bg-blue-100 hover:bg-blue-200 p-2 text-conduit rounded-full'>
        <MdClose/>
    </button>

  )
}
