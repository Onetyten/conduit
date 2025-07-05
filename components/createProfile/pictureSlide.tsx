'use client'
import React,{useState} from 'react'
import NavigationButton from '../NavigationButton'
import Image from 'next/image'


interface propTypes{
    setSlideIndex: React.Dispatch<React.SetStateAction<number>>
    slideIndex:number
    profilePicUrl:string
    setProfileImage:React.Dispatch<React.SetStateAction<File | null>> 
}




export default function PictureSlide(props:propTypes) {
    const {setSlideIndex,slideIndex,profilePicUrl,setProfileImage} = props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [imageSaved,setImageSaved] = useState(false)
    const [PreviewImage,setPreviewImage] = useState<string | null>(null)


    function Next() {
        setSlideIndex(slideIndex+1)
    }
    function Prev() {
        setSlideIndex(slideIndex-1)
    }

    function uploadImage(e:React.ChangeEvent<HTMLInputElement>){

        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];

        if (!file) return;
        const validFileTypes = ['image/jpeg', 'image/png', 'image/webp']

        if (!validFileTypes.includes(file.type))  return alert("invalid file type")
        if (file.size > 5 * 1024 * 1024)   return alert("Image should be less than 5MB")

        setProfileImage(file)
        const reader = new FileReader();

        reader.onload = (e) => {
            const result = e.target?.result as string
            setPreviewImage(result)
            setImageSaved(true)
        }
        reader.onerror = () => alert("Error reading file")
        reader.readAsDataURL(file)

    }



  return (
    <div className='h-full w-full px-[10%]'>
        <div className='flex flex-col justify-center items-center w-full h-full gap-6'>
            <p className='lg:text-2xl text-lg  font-semibold '>Add a profile picture</p>
            <div className='relative w-20 h-20 rounded-full overflow-hidden'>
                <Image src={PreviewImage || profilePicUrl} alt='previewImage' className='object-cover w-full h-full aspect-square' fill/>
            </div>
            
            <div className="w-1/2 h-48 relative">
                <input
                    type="file"
                    id="upload"
                    className="hidden"
                    onChange={(e)=>{uploadImage(e)}}
                />
                <label
                    htmlFor="upload"
                    className="cursor-pointer lg:text-xl text-lg  font-semibold w-full h-36 flex justify-center items-center bg-softblue hover:bg-gray-200 rounded-2xl text-center"
                >
                    Click to upload image
                </label>
            </div>

            <div className='flex gap-6'>
                <NavigationButton direction={0} Click={Prev}/>
                <NavigationButton direction={1} Click={Next}/>
            </div>
            <div>
                <p className='text-gray-500'>
                    (Optional)
                </p>
            </div>
            
        </div>  
    </div>
  )
}
