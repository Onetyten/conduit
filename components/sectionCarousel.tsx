'use client'
import { setkeyWord } from '@/state/keywordSlice/keywordSlice';
import { RootState } from '@/store';
import axios from 'axios';
import React, { useEffect, useState,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
interface tagtype{
  count:number
  tag:string

}

const SectionCarousel = () => {
  const dispatch = useDispatch()
  const keywordRedux = useSelector((state:RootState)=>state.keyword.keyword)
  const [tagList,setTagList] = useState([{count:0,tag:'All services'}])

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging,setIsDragging] = useState(false)
  const [mouseXPos,setMouseXpos] = useState(0)
  const [scrollPos,setScrollPos] = useState(0)


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

  function HandleCanDrag(e:React.MouseEvent){
    setIsDragging(true)
    if (scrollContainerRef.current){
      setMouseXpos(e.pageX-scrollContainerRef.current.offsetLeft)
      setScrollPos(scrollContainerRef.current.scrollLeft)
    }
  }

  function HandleStopDrag(){
    setIsDragging(false)
  }
    function HandleMouseMove(e:React.MouseEvent){
      if (!isDragging) return
      e.preventDefault()
      if (scrollContainerRef.current){
        const x = e.pageX - scrollContainerRef.current.offsetLeft
        const walk = (x-mouseXPos) * 1.5
        scrollContainerRef.current.scrollLeft = scrollPos-walk
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
    
    <div ref={scrollContainerRef} onMouseDown={HandleCanDrag} onMouseUp={HandleStopDrag} onMouseLeave={HandleStopDrag} onMouseMove={HandleMouseMove}
    className='flex w-full overflow-x-scroll cursor-grab hide-scrollbar pt-5 pb-3 mb-2 text-xs sm:text-sm text-gray-400 gap-2 relative flex-nowrap'>
        {tagList.map((item:tagtype,index:number)=>{
            return(
                <div key={index} onClick={()=>{setTag(item.tag)}} className={`${item.tag == keywordRedux?"bg-gray-200":""} p-2 px-5 rounded-full cursor-pointer hover:bg-gray-200 hover:text-foreground transition-all`}>
                    <p className='w-full whitespace-nowrap'>{item.tag}</p>
                </div>
            )
        })}

    </div>
  )
}

export default SectionCarousel