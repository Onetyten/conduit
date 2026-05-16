import { DEFAULT_PROFILE_IMAGE } from '@/lib/constants'
import { newServiceType } from '@/lib/types';
import Image from 'next/image'
import React, { useState } from 'react'
import {X} from 'lucide-react' 
import { motion } from 'framer-motion'


interface propType{
    image:FileReader,
    index:number,
    setNewService:React.Dispatch<React.SetStateAction<newServiceType>>,
    newService:newServiceType
}

export default function PreviewImage({image,index,setNewService,newService}:propType) {
    const imageSrc = typeof image.result === 'string'  ? image.result : DEFAULT_PROFILE_IMAGE;
    const [showX,setShowX] = useState(false)
    async function removeImage(){
        const filteredGallery = newService.galleryImages.filter((_,i)=> i !== index)
        setNewService(prev => ({ ...prev , galleryImages:filteredGallery }))
    }

  return (
    <motion.div layout initial={{opacity:0,scale:0.8}} transition={{duration:0.2}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.8}} onMouseEnter={()=>setShowX(true)} onMouseLeave={()=>setShowX(false)} className='relative'>
        <X size={20} onClick={removeImage} className={`text-muted ${showX?"opacity-100 p-1 flex":"opacity-0 hidden"} transition-opacity duration-300 absolute right-0.5 top-0.5 rounded-full shadow-md bg-white`}/>
        <motion.div layout>
            <Image alt={`preview ${index}`} src={imageSrc} width={80} className='bg-softblue rounded-sm aspect-square' height={80}/>
        </motion.div>
        
    </motion.div>
  )
}
