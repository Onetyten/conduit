import SectionCarousel from "@/components/sectionCarousel";
import IntroSection from "@/components/introSection";
import SearchForm from "@/components/searchForm"
import Posts from "@/components/posts";
import ServiceSlider from "@/components/serviceSlider";
import CreateAccount from "@/components/createAccount";

export default function Home() {

  return (
    <div className="flex flex-col relative">
      
      <IntroSection />
      <SearchForm />
      <SectionCarousel />
      <div className="sm:px-4 px-1">  
         <p className=" text-xs sm:text-sm text-gray-400">
            Search result for all services
         </p>
         <Posts/>
      </div>
      <ServiceSlider/>
      <CreateAccount/>

      
      
    </div>
  );
} 