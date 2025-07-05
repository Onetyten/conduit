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
      <div className="px-4">  
         <p className=" text-sm text-gray-400">
            Search result for :All services
         </p>
         <Posts/>
      </div>
      <ServiceSlider/>
      <CreateAccount/>

      
      
    </div>
  );
} 