import React from 'react'
import NavigationButton from './NavigationButton'
import { becomeTalentType, NewUserType } from '@/lib/types'
import { ArrowLeft } from 'lucide-react'

interface propTypes<T extends NewUserType | becomeTalentType>{
    setSlideIndex: React.Dispatch<React.SetStateAction<number>>
    slideIndex:number
    newUser:T
    submit:()=>Promise<void>
}







export default function CreateUser<T extends NewUserType | becomeTalentType>(props:propTypes<T>) {
    const {setSlideIndex,slideIndex,newUser,submit} = props

    const isNewUser = "firstname" in newUser
    function Prev() {
        if (newUser.isTalent){
            setSlideIndex(slideIndex-1)
        }
        else{
            setSlideIndex(slideIndex-3)
        }

    }

    
  return (
    <div className='h-full w-full flex flex-col items-center justify-center relative overflow-hidden '>
 
 
      <div className={`h-full w-full flex flex-col items-center justify-center relative overflow-hidden ${isNewUser?"px-6 sm:px-[15%]":"px-6"}`}>

            <div className={`absolute ${isNewUser?"bottom-6 left-6 w-8 h-8":" bottom-2 left-2 w-4 h-4"} border-b-2 border-l-2 border-conduit/30 rounded-bl-sm`} />
            <div className={`absolute ${isNewUser?"bottom-6 right-6 w-8 h-8":" bottom-2 right-2 w-4 h-4"} border-b-2 border-r-2 border-conduit/30 rounded-br-sm`} />
            <div className={`absolute top-6 right-6 w-8 h-8 ${isNewUser?"flex":"hidden"} border-t-2 border-r-2 border-conduit/30 rounded-tr-sm`} />
        
            {isNewUser && <h2 className='text-2xl lg:text-3xl font-bold text-center leading-snug mb-2' >
                    Just one tap away
            </h2>}
        
            <p className='text-muted text-center max-w-xs leading-relaxed mb-8' >
                Your profile is ready to go live. Hit create and join the network.
            </p>
        
            <button
                onClick={submit}
                className='group relative overflow-hidden h-12 px-12 rounded-xl bg-conduit text-white font-semibold text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-xl hover:scale-[1.03] active:scale-[0.97]'
            >
                <span className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/15 to-transparent' />
                <span className='relative flex items-center gap-2'>
                    Create Profile
                    <ArrowLeft/>
                </span>
            </button>
        
            <div
                className='mt-16 w-9/12'
                style={{
                opacity: 1,
                transition: 'opacity 0.4s ease 0.52s',
                }}
            >
                <NavigationButton direction={0} Click={Prev} />
            </div>
      </div>
 
    </div>
  )
}


