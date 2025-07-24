'use client'
import { setkeyWord } from '@/state/keywordSlice/keywordSlice';
import { RootState } from '@/store';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

// const carouseldata = ['Featured','Up & Coming','Salon','Personal Trainer','Plumber','Cleaner','Electrician','Carpenter','Landscaper','Tutor','Chef','Photographer','Massage Therapist','Mechanic','Painter','Handyman','Event Planner','Graphic Designer','Web Developer','Moving Services'
//   ];




interface tagtype{
  count:number
  tag:string

}


const SectionCarousel = () => {

  const dispatch = useDispatch()
  const keywordRedux = useSelector((state:RootState)=>state.keyword.keyword)
  const [tagList,setTagList] = useState([{count:0,tag:'All services'}])


  async function fetchTags() {
    try {
      const response = await axios.get('/api/getTags')
      const tagData = response.data;
      if (!tagData.success) {
        console.log(tagData.message);
        return [];
      }
      setTagList(prevList=>[...prevList,...tagData.data]);
    }
    catch (error) {
      console.error("Error fetching tags:", error);
      return [];
    }
  }

  useEffect(()=>{
    fetchTags()
  },[])

  function setTag(item:string) {
    console.log(item)
    dispatch(setkeyWord(item))
  }

  return (
    
    <div className='flex w-full overflow-x-scroll pt-5 pb-3 text-xs sm:text-sm text-gray-400 gap-2 relative flex-nowrap'>
        {tagList.map((item:tagtype,index:number)=>{
            return(
                <div key={index} onClick={()=>{setTag(item.tag)}} className={` ${index==0?'pl-0 rounded-l-none':''} ${item.tag == keywordRedux?"bg-gray-200":""} p-2 px-5 rounded-full cursor-pointer hover:bg-gray-200 hover:text-foreground transition-all`}>
                    <p className='w-full whitespace-nowrap'>{item.tag}</p>
                </div>
            )
        })}

    </div>
  )
}

export default SectionCarousel