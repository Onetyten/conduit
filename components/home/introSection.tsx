"use client"
import React, { useState } from 'react'
import HeaderSlide from './headerSlide'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import {motion,AnimatePresence} from 'framer-motion'
import { signUpTrue } from '@/state/showSignUp'
import { setkeyWord } from '@/state/keywordSlice'
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation'

const IntroSection = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [searchQuery,setSearchQuery]= useState("")

    function Search(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      if (searchQuery && searchQuery.trim().length>0){
        dispatch(setkeyWord(searchQuery))
      }
      else{
        setSearchQuery("");
        dispatch(setkeyWord("All services")); 
      }
    }

    const [userHiring,setUserHiring] = useState(true)

    const userReduxData = useSelector((state:RootState)=>state.user.user)
  return (
    <div className='flex w-full primary sm:w-4xl max-x-full flex-col gap-2 justify-center items-center py-10 px-2'>

        <div className='bg-softblue text-xs flex items-center  gap-2 font-bold uppercase p-1.5 rounded-md '>
            <span onClick={()=>setUserHiring(true)} className={`p-3.5 rounded-md ${userHiring?"bg-white":""} select-none cursor-pointer`}>Hire</span>
            <span onClick={()=>setUserHiring(false)} className={` p-3.5 ${userHiring?"":"bg-white"} rounded-md select-none cursor-pointer`}>Get Hired</span>
        </div>

    
        <div className='w-full mb-4 flex sm:flex-row flex-col justify-center gap-3 items-center '>
            <div className=' flex-1 max-w-xl py-10 gap-6 flex flex-col w-full'>
                <h1 className='text-4xl font-orbitron font-semibold'>Skills on Demand</h1>
                <p className='text-lg font-medium text-gray-500'>Conduit is revolutionizing service hiring by creating a seamless marketplace for connecting clients with skilled professionals.  </p>
            </div>

            <HeaderSlide/>
        </div>

        <div className='h-13 w-full flex justify-center items-center'>
            <AnimatePresence mode='wait'>
                {userHiring?(
                    <form onSubmit={Search} className='h-full w-full '>
                        <motion.div key="search" layoutId='hire-switch' className='relative w-full text-base'>
                            <input name='query' autoComplete='off' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} placeholder='Discover skilled professionals...' className='w-full border-2  border-gray-400 rounded-full h-13 px-12'/>

                            <button type='submit' className='absolute left-4 top-1/2 -translate-y-1/2'>
                                <IoSearchOutline className='font-light text-xl '/>
                            </button>
                            
                            {searchQuery&&(
                                <motion.button initial={{opacity:0,width:0}} animate={{opacity:1,width:128}} type='submit' className='bg-conduit absolute cursor-pointer shadow-conduit/40 hover:shadow-conduit/30 rounded-full shadow-lg hover:shadow-xl  right-0 top-1/2 -translate-y-1/2 font-semibold text-white flex justify-center items-center h-full'>
                                    Search
                                </motion.button>
                            )}
                        </motion.div>
                    </form>
                    
                ):(

                    <motion.div 
                        key="button"
                        layoutId='hire-switch'
                        initial={{width:"100%"}}
                        animate={{width:"auto"}}
                        exit={{width:"100%",opacity:0}}
                        transition={{ease:"linear",duration:0.25 }}
                        onClick={()=>{
                            if (!userReduxData) dispatch(signUpTrue())
                            else {console.log("id: ",userReduxData._id);router.push(`/profile/${userReduxData._id}`)}
                        }}
                        className='bg-conduit cursor-pointer shadow-conduit/40 hover:shadow-conduit/30 px-8 rounded-full shadow-lg text-base hover:shadow-xl  font-semibold text-white w-fit text-nowrap flex justify-center items-center h-full'
                    >
                        { userReduxData?"My services":"Join the system"} 
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    

    </div>
  )
}

export default IntroSection