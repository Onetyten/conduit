
import Link from 'next/link';
import React from 'react'

// const carouseldata = ['Featured','Up & Coming','Salon','Personal Trainer','Plumber','Cleaner','Electrician','Carpenter','Landscaper','Tutor','Chef','Photographer','Massage Therapist','Mechanic','Painter','Handyman','Event Planner','Graphic Designer','Web Developer','Moving Services'
//   ];

async function fetchTags() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/getTags`, {
      cache: 'no-store' 
    });

    const tagData = await res.json();

    if (!tagData.success) {
      console.log(tagData.message);
      return [];
    }

    return tagData.data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}


interface tagtype{
  count:number
  tag:string

}


const SectionCarousel = async () => {
  const tagList = await fetchTags()

  if (!tagList){
      return(
        <p>Tags</p>
      )
    }
  return (
    
    <div className='flex w-full overflow-x-scroll pt-5 pb-3 text-xs sm:text-sm text-gray-400 gap-2 relative hide-scrollbar flex-nowrap'>
        {tagList.map((item:tagtype,index:number)=>{
            return(
                <Link key={index} href="/" className={` ${index==0?'pl-0 rounded-l-none':''} p-2 px-5 rounded-full hover:bg-gray-200 hover:text-foreground transition-all`}>
                    <p className='w-full whitespace-nowrap'>{item.tag}</p>
                </Link>
            )
        })}

    </div>
  )
}

export default SectionCarousel