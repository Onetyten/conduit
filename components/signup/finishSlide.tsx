import React from 'react'
import {signUpFalse} from '@/state/showSignUp/showSignUp'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { NewUserType } from '@/lib/types';

interface propTypes{
    newUser : NewUserType
    isUser:boolean
}




export default function FinishSlide(props:propTypes) {
    const router = useRouter()
    const dispatch = useDispatch()
    const {newUser,isUser} = props



    async function Continue(){
        dispatch(signUpFalse())
        router.push('/signin')

         
        
    } 
  return (
    <div className='h-full w-full px-[10%]'>
        <div className='flex flex-col justify-center items-center w-full h-full gap-8'>
            <p className='lg:text-2xl text-lg  font-semibold '> {isUser?"Congratulations":"All done"} </p>
            <p>{isUser?"You are now a service provider on conduit":"You have successfully created a conduit profile"}</p>

            {!isUser&&
                <p>Welcome {newUser.firstname}</p>
            }

            <div className='flex gap-6'>
                {!isUser&&
                    <button  onClick={Continue}  className='rounded-lg bg-foreground text-background hover:bg-conduit p-2 px-8'>
                        Sign in
                    </button>
                }

            </div>
            
            
        </div>  
    </div>
  )
}
