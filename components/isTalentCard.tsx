import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { NewUserType } from '@/lib/types'


interface propTypes{
    newUser:NewUserType
    setNewUser:React.Dispatch<React.SetStateAction<NewUserType>>
    setIndexCount: React.Dispatch<React.SetStateAction<number>>
    indexCount:number
}


export default function IsTalentCard(props:propTypes) {
    const {newUser,setNewUser,setIndexCount} = props

  return (
    <div onClick={()=>{
            setNewUser(prev=>({...prev, isTalent:true }))
            setIndexCount(1)

        }} 
        className={`overflow-hidden hover:scale-105 duration-200 rounded-md w-72 h-56 flex-col bg-background  ${newUser.isTalent?'shadow-sm shadow-softblue border-4':'border-[1px]'} shadow-softblue flex`}>

        {/* background */}
        <div className='w-full relative bg-gradient-to-tl overflow-hidden z-10 bg-softblue/10 h-full flex justify-center items-center'>
                {/* floating blobs */}
                <div className='absolute w-full h-full'>
                    <motion.div  animate={{ x: [0, 300, 0],  y: [0, 80, 0]}}transition = {{duration:10,repeat:Infinity, repeatType:"loop", ease:'easeInOut' }} className='bg-blue-100/70 -z-20 w-32 h-32 absolute top-0 -left-10 rounded-full'>

                    </motion.div>

                    <motion.div animate={{ x: [0, -300, 0],  y: [0, 30, 0]}}transition = {{duration:15,repeat:Infinity, repeatType:"loop", ease:'easeInOut' }} className='bg-teal-100/50 -z-20 w-40 h-32 absolute top-0 -right-10 rounded-full'>

                    </motion.div>

                    <motion.div animate={{ x: [0, -40, 0],  y: [0, -80, 0]}}transition = {{duration:4,repeat:Infinity, repeatType:"loop", ease:'easeInOut' }} className='bg-pink-100/80 -z-20 w-40 h-32 absolute -bottom-4 right-8 rounded-full'>

                    </motion.div>
                </div>

                {/* overlay backdrop */}
                <div className='absolute -z-10 w-full h-full backdrop-blur-xl'>

                </div>

                <div className='w-[80%] h-[60%] lg:w-36 lg:h-24 p-3 bg-white rounded-md relative justify-center items-center flex text-center'>
                    <Image src="/icons/star.png" width={20} alt='' height={20} className='absolute top-2 left-2 opacity-30 cover' />
                    <div className='w-10 h-10 relative overflow-hidden bg-green-200 rounded-full'>
                        <Image src="https://www.shutterstock.com/image-photo/face-serious-black-man-creative-600nw-2313569245.jpg" fill alt='profile' className='object-cover' />
                    </div> 
                    <div className='-bottom-4 -right-7 absolute bg-background border-[1px] rounded-full px-4 text-xs p-2 hidden lg:block'>
                        <p>
                            Work with me
                        </p>
                    </div>
                </div>


        </div>

        <div className='p-0.5  w-full h-20 flex flex-col justify-center items-center gap-0.5 text-center'>
            <p className=' text-xs  lg:text-base'>
                I&apos;m a service provider
            </p>
            <p className='text-xs hidden sm:block text-gray-500'>
                Find work and manage your business
            </p>
        </div>

    </div>
    
  )
}
