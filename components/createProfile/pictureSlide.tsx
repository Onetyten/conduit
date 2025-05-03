import React from 'react'
import NavigationButton from '../NavigationButton'

interface propTypes{
    setSlideIndex: React.Dispatch<React.SetStateAction<number>>
}




export default function PictureSlide(props:propTypes) {
    const {setSlideIndex} = props

    function Next() {
        setSlideIndex(3)
    }
    function Prev() {
        setSlideIndex(1)
    }
  return (
    <div className='h-full w-full px-[10%]'>
        <div className='flex flex-col justify-center items-center w-full h-full gap-8'>
            <p className='lg:text-2xl text-lg  font-semibold '>Lets put a face to the name</p>
            <div className="w-1/2 h-48 relative">
                <input
                    type="file"
                    id="upload"
                    className="hidden"
                    onChange={(e) => console.log(e.target.files)}
                />
                <label
                    htmlFor="upload"
                    className="cursor-pointer lg:text-xl text-lg  font-semibold w-full h-full flex justify-center items-center bg-blue-100 hover:bg-blue-200 rounded-2xl text-center"
                >
                    Click to upload file
                </label>
            </div>

            <div className='flex gap-6'>
                <NavigationButton direction={0} Click={Prev}/>
                <NavigationButton direction={1} Click={Next}/>
            </div>
            
            
        </div>  
    </div>
  )
}
