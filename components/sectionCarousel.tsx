import Link from 'next/link';
import React from 'react'

const carouseldata = ['Featured','Up & Coming','Salon','Personal Trainer','Plumber','Cleaner','Electrician','Carpenter','Landscaper','Tutor','Chef','Photographer','Massage Therapist','Mechanic','Painter','Handyman','Event Planner','Graphic Designer','Web Developer','Moving Services'
  ];

const SectionCarousel = () => {
  return (
    <div className='flex w-full overflow-scroll pt-5 pb-3 text-xs sm:text-sm text-gray-400 gap-2 relative flex-nowrap'>
        {carouseldata.map((item,index)=>{
            return(
                <Link key={index} href="/" className={` ${index==0?'pl-0 rounded-l-none':''} p-2 px-5 rounded-full hover:bg-gray-200 hover:text-foreground transition-all`}>
                    <p className='w-full whitespace-nowrap'>{item}</p>
                </Link>
            )
        })}

    </div>
  )
}

export default SectionCarousel