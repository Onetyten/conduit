'use client'
import React, { useState } from 'react'
import BackButton from '@/components/BackButton'
import Field from '@/components/Profile/account/Field'
import {AnimatePresence, motion} from 'framer-motion' 
import PreviewImage from '@/components/service/create-service/previewImage'
import { newServiceType } from '@/lib/types'
import { toast } from 'react-toastify'



export default function Page() {

  const [newService, setNewService] = useState<newServiceType>({
    title:'',
    galleryImages: [],
    description:'',
    status: 'draft',
    price :{amount:0,currency:'NGN'},
    availableOn :[],
    deliverables: [],
    tags: [],
    category:'',
    address: {
        street: '',
        city:'',
        state:'',
        zipcode:'',
        country:'',
        location:{
          long:'',
          lat:''
        }
    },
    deliveryMethod: 'onsite'
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function change(path:string,value:any){
    setNewService((prev)=> {
      if (!path.includes('.')){
        return {...prev, [path]:value}
      }
      const [parent,child] = path.split('.');
      
      return{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...prev, [parent]:{...(prev[parent as keyof newServiceType] as any), [child]:value}
      }
    })
  }

  function readFileAsURL(file:File){
    return new Promise<FileReader> ((resolve,reject) => {
      const reader = new FileReader()
      reader.onload = ()=>resolve(reader)
      reader.onerror = ()=>reject(new Error("error while reading file"))
      reader.readAsDataURL(file)
    })
  }

  async function uploadImage(e:React.ChangeEvent<HTMLInputElement>){
      if (!e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];

      if (!file) return;
      const validFileTypes = ['image/jpeg', 'image/png', 'image/webp']

      if (!validFileTypes.includes(file.type))  return toast.warn("invalid file type")
      if (file.size > 5 * 1024 * 1024)   return toast.warn("Image should be less than 5MB")
      
      if (newService.galleryImages.length>=5) return toast.warn("A maximum of 5 images is allowed")
      
      try {
        const reader = await readFileAsURL(file)
        setNewService(prev => ({ ...prev, galleryImages: [...prev.galleryImages, { file, reader }] }));
        console.log(newService.galleryImages)
      }
      catch {
          toast.warn("Error reading image")
      }
      
    }
    
    async function publish(){
      console.log("service",newService)
    }
      
  
  


  return (
    <div className='w-full bg-white min-h-screen flex flex-col'>
      <div className='w-full border-b px-6 justify-between items-center border-soft flex min-h-16'>
        <div className='relative'>
          <BackButton relative/>
        </div>
        
        <div className='flex font-semibold text-sm items-center gap-4'>
          <button className='p-2 px-6 rounded-full hover:bg-softblue/50 border transition-all duration-300 cursor-pointer border-conduit ' >
            Save as draft
          </button>
          <button onClick={publish} className='p-2 px-6 bg-conduit text-white rounded-full transition-all duration-300 hover:bg-black cursor-pointer border border-conduit '>
            Publish
          </button>

        </div>
      </div>

      <div className='w-full flex h-full flex-1'>
        <div className='flex-1 overflow-scroll shadow-md flex flex-col px-[10%]'>
          <p className='py-8 font-semibold text-lg'>Create service</p>
          <div className='w-full flex flex-col gap-4'>

            <Field placeholder='Add a service name' label='Service name' value={newService.title} onChange={(e)=>{change('title',e)}} />

            <div className={`flex flex-col gap-1.5 w-full`}>
              <label className="text-base font-semibold text-conduit">Cover image</label>
              <div className='flex flex-col justify-center items-center w-full h-full gap-2'>
                <div className="w-full h-36 relative select-none">
                    <input type="file" id="upload" className="hidden"
                        onChange={(e)=>{uploadImage(e)}}
                    />
                    <label htmlFor="upload" className="cursor-pointer relative overflow-hidden lg:text-xl text-lg  font-semibold w-full h-full flex justify-center items-center  rounded-2xl text-center">
                      <div className='absolute inset-0 z-10 '>
                          <motion.div  animate={{ x: [0, 300, 0],  y: [0, 80, 0]}} transition = {{duration:5,repeat:Infinity, repeatType:"loop", ease:'easeInOut' }} className='bg-blue-100/70 -z-20 w-32 h-32 absolute top-0 -left-10 rounded-full'>
      
                          </motion.div>
      
                          <motion.div animate={{ x: [0, -300, 0],  y: [0, 30, 0]}}transition = {{duration:7,repeat:Infinity, repeatType:"loop", ease:'easeInOut' }} className='bg-teal-100/50 -z-20 w-40 h-32 absolute top-0 -right-10 rounded-full'>
      
                          </motion.div>
      
                          <motion.div animate={{ x: [0, -40, 0],  y: [0, -80, 0]}}transition = {{duration:3,repeat:Infinity, repeatType:"loop", ease:'easeInOut' }} className='bg-pink-100/80 -z-20 w-40 h-32 absolute -bottom-4 right-8 rounded-full'>
      
                          </motion.div>
                      </div>
      
                      <div className='absolute z-10 text-base font-medium text-muted flex justify-center items-center w-full h-full bg-softblue/40 hover:bg-softblue/70 backdrop-blur-xl'>
                          Click to upload image 
                      </div>
                      <div className='absolute -z-10 w-full h-full backdrop-blur-xl'>
      
                      </div>
                      <p className='select-none'>
                          Click to upload image 
                      </p>
                        
                    </label>
                </div>   
                <div className='bg-softblue/20 min-h-20 rounded-sm flex gap-2 w-full'>
                  <AnimatePresence mode='popLayout'>
                    {newService.galleryImages.map((item,i)=> <PreviewImage newService={newService} image={item.reader} setNewService={setNewService} index={i} key={i}/> )}
                  </AnimatePresence> 
                </div>       
              </div>
        </div>
          

        </div>

        </div>


        <div className='flex-1 bg-softblue flex flex-col px-[10%]'>
          <p className='py-8 font-semibold text-lg'>Preview</p>
          <div className='w-full h-[70%] bg-white'>

          </div>

        </div>
      </div>
    </div>
  )
}
