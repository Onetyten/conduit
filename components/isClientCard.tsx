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




export default function IsClientCard(props:propTypes) {
    const {newUser,setNewUser,setIndexCount} = props

  return (
    <div onClick={()=>{
            setNewUser(prev=>({...prev, isTalent:false,bio:'',skills:[] as string[], socialLinks:{ facebook: "", instagram: "", twitter_x: "", linkedin: "", other: ""
            },  }))
            setIndexCount(3)

        }}
        className={`overflow-hidden hover:scale-105 duration-200 rounded-md w-72 h-56 flex-col bg-background  ${!newUser.isTalent?'shadow-sm shadow-softblue border-4':'border-[1px]'} shadow-softblue flex`}>
        {/* background */}
        <div className='w-full relative bg-gradient-to-tl overflow-hidden z-10 bg-softblue/10 h-full flex justify-center items-center'>
                {/* floating blobs */}
                <div className='absolute w-full h-full'>
                    <motion.div   animate={{ x: [0, 300, 0],  y: [0, 80, 0]}}transition = {{duration:10,repeat:Infinity, repeatType:"loop", ease:'easeInOut' }} className='bg-green-100/70 -z-20 w-40 h-40 absolute top-0 -left-10 rounded-full'>

                    </motion.div>
                    <motion.div animate={{ x: [0, -300, 0],  y: [0, 30, 0]}}transition = {{duration:5,repeat:Infinity, repeatType:"loop", ease:'easeInOut' }} className='bg-blue-100/50 -z-20 w-40 h-40 absolute top-0 -right-10 rounded-full'>

                    </motion.div>

                    <motion.div animate={{ x: [0, -40, 0],  y: [0, -80, 0]}}transition = {{duration:8,repeat:Infinity, repeatType:"loop", ease:'easeInOut' }} className='bg-lime-100/80 -z-20 w-40 h-40 absolute -bottom-4 right-8 rounded-full'>

                    </motion.div>
                </div>

                {/* overlay backdrop */}
                <div className='absolute -z-10 w-full h-full backdrop-blur-xl'>

                </div>

                <div className='w-[80%] h-[60%] lg:w-36 lg:h-24 p-3 bg-white flex-col justify-start  rounded-md relative gap-1 items-start flex text-center'>
                    <div className='w-full flex gap-2'>

                        <Image src="https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?s=612x612&w=0&k=20&c=8ssXDNTp1XAPan8Bg6mJRwG7EXHshFO5o0v9SIj96nY=" width={25} height={15} className='object-cover rounded-full' alt=''/>

        
                        <div className='flex flex-col justify-center items-start gap-1'>
                            <div className='w-[80%] lg:w-16 bg-conduit/10 h-1.5 rounded-full'>

                            </div>
                            <p className='hidden sm:block'>
                                Services
                            </p>
                        </div>

                    </div>

                    <div className='w-full flex'>
                        <div className='w-6 h-6 bg-gray-100 rounded-full border-2 border-background '/>
                        <div className='w-6 h-6 -translate-x-2 bg-gray-100 rounded-full border-2 border-background '/>
                        <div className='w-6 h-6 -translate-x-4 bg-gray-100 rounded-full border-2 border-background '/>

                    </div>



                    <div className='-bottom-4 -right-7 absolute bg-background border-[1px] rounded-full px-4 text-xs p-2 hidden lg:block'>
                        <p>
                            Find services
                        </p>
                    </div>
                </div>


        </div>

        <div className='p-0.5  w-full h-20 flex flex-col justify-center items-center gap-0.5 text-center'>
            <p className='text-xs lg:text-base'>
                I&apos;m hiring
            </p>
            <p className='hidden sm:block text-xs text-gray-500'>
                Find the right person for the job
            </p>
        </div>

    </div>
    
  )
}
