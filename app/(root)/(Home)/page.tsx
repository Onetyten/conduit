"use client"
import SectionCarousel from "@/components/sectionCarousel";
import IntroSection from "@/components/introSection";
import SearchForm from "@/components/searchForm"
import Posts from "@/components/posts";
import ServiceSlider from "@/components/serviceSlider";
import CreateAccount from "@/components/createAccount";
import { ToastContainer } from "react-toastify"

export default function Home() {

  return (
    <div className="flex flex-col relative font-raleway w-[90%] sm:w-xl md:w-2xl lg:w-4xl  xl:w-5xl 2xl:w-7xl justify-center items-center">
      
      <IntroSection />
      <SearchForm />
      <SectionCarousel />
      <div className="w-full">  
         <p className=" text-xs sm:text-sm text-gray-400">
            Search result for all services
         </p>
         <Posts/>
      </div>
      <ServiceSlider/>
      <CreateAccount/>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={false}
        />

      
      
    </div>
  );
} 