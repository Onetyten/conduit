'use client'
import { profileInterface, serviceInterface } from '@/lib/types'
import React, { useEffect, useState } from 'react'
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook,FaInstagram,FaLinkedin,FaLink } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Services from './Services';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { serviceFalse } from '@/state/showServiceSlice/showServiceSlice';


interface propType{
  profile: profileInterface
}

export default function ServiceViewer({profile}:propType) {
  const pages = ['services','reviews']
  const [currentpageIndex,setCurrentpageIndex] = useState(0)

  const [serviceList,setServiceList] = useState<serviceInterface[]>([])
  const [servicepage,setServicePage] = useState(1)
  const serviceLimit = 10
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(serviceFalse())
  },[])
      
  async function fetchServices() {
      try {
        const response = await axios.get(`/api/service/getServicesByProfileId?page=${servicepage}&limit=${serviceLimit}&id=${profile._id}`)
        console.log(response)
        setServiceList(prev=>[...prev,...response.data.data])
      }
      catch (error) {
          console.log(error)
      }
  }
  
  useEffect(()=>{
      fetchServices()
  },[])



  const socialLinks = [
    { name: 'facebook', icon: FaFacebook, url: profile.socialLinks?.facebook},
    {name: 'instagram',icon: FaInstagram,url: profile.socialLinks?.instagram},
    { name: 'twitter_x', icon: FaXTwitter, url: profile.socialLinks?.twitter_x},
    { name: 'linkedin', icon: FaLinkedin, url: profile.socialLinks?.linkedin},
    { name: 'other', icon: FaLink, url: profile.socialLinks?.other }
  ];
  const existingSocialLinks = socialLinks.filter(link => link.url);

  return (
    <div className='w-full flex flex-col'>
      <div className='w-full pb-2 border-b border-muted flex justify-between'>
        <div className='flex text-xl capitalize font-semibold gap-6'>
          {pages.map((page,index)=><div className={`${index===currentpageIndex?"text-conduit":"text-muted"} cursor-pointer`} onClick={()=>setCurrentpageIndex(index)} key={index}>{page}</div>)}
        </div>

        <div className='flex gap-4'>
          <div className='flex text-sm items-center capitalize gap-2'>
            <CiLocationOn className='text-lg'/>
            <p>{profile.location.state}, {profile.location.country}</p>
          </div>

          {existingSocialLinks.length > 0 && (
            <div className='flex items-center gap-4 border-muted'>
              {existingSocialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className={` text-muted hover:opacity-80 transition-opacity`} title={`Visit ${link.name}`} >
                    <Icon className='text-lg' />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className='h-full'>
        {currentpageIndex===0?(
          <Services serviceList={serviceList} setServiceList={setServiceList}/>
        ):(
          <div className='w-full text-3xl font-semibold text-muted h-full flex justify-center items-center min-h-[50dvh]'>
            No Reviews Found
          </div>
        )}

      </div>
    </div>
  )
}
