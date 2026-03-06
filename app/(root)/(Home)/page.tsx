'use client'
import SectionCarousel from "@/components/home/sectionCarousel";
import IntroSection from "@/components/home/introSection";
import Posts from "@/components/home/posts/posts";
// import ServiceSlider from "@/components/serviceSlider";
import SearchMessage from "@/components/home/searchMessage";


export default function Home() {
    
  return (
    <div className="flex flex-col relative raleway-text w-[90%] sm:w-xl md:w-2xl lg:w-4xl  xl:w-5xl 2xl:w-7xl justify-center items-center">
      
      <IntroSection />
      
      <SectionCarousel />
      <div className="w-full">  
          <SearchMessage/>
          <Posts/>
      </div>
      
    </div>
  );
} 