import Image from 'next/image'
import React from 'react'
import { CiHeart } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const Posts = () => {
    const Posts  = [
        {
        _createdAt:'yesterday',
        name: 'Bimbo Adams',
        views:55,
        likes:10,
        author:{id:1},
        id:1,
        description:'This is a Description',
        image:"https://cdn.pixabay.com/photo/2017/08/25/11/35/concert-2679857_1280.jpg",
        profileImage:"https://cdn.pixabay.com/photo/2023/07/30/09/12/red-hair-girl-8158373_1280.jpg",
        category:'Technician',
        title:'BimboTech'
        },
        {
        _createdAt:'yesterday',
        name: 'Green Nomad',
        views:75,
        likes:15,
        author:{id:1},
        id:1,
        description:'This is a Description',
        image:"https://cdn.pixabay.com/photo/2020/01/20/17/30/look-4780865_1280.jpg",
        profileImage:"https://cdn.pixabay.com/photo/2023/07/30/09/12/red-hair-girl-8158373_1280.jpg",
        category:'Technician',
        title:'BimboTech'
        }
    ]
    
  return (
    <div className='text-xs py-6 flex gap-6 flex-wrap'>
        {Posts.length>0?(
            Posts.map((item,index)=>{
                return(
                    <div key={index} className='flex gap-3 flex-col'>
                        <Image src={item.image} alt='post cover image' className='object-cover aspect-[4/3] rounded-lg' width={250} height={100}/>  
                        <div className='flex items-center justify-between '>
                            <div className='flex gap-2 items-center'>
                                <Image src={item.image} alt='post cover image' className='object-cover aspect-square rounded-3xl' width={25} height={100}/> 
                                <p>
                                    {item.name}
                                </p>
                            </div>
                            <div className='flex gap-3 text-sm items-center'>
                                <div className='flex gap-1 items-center'>
                                    < MdOutlineRemoveRedEye/>
                                    <p className='text-xs'>{item.likes}</p>
                                </div>

                                <div className='flex gap-1 items-center'>
                                    <CiHeart/>
                                    <p className='text-xs'>{item.views}</p>
                                </div>

                            </div>
                        </div>  
                    </div>
                )
            })):
            (
                <p className=' text-sm text-gray-400 mt-4'>No Services available at the moment </p>
            )
        }
    </div>
  )
}

export default Posts