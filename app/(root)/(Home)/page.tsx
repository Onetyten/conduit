
import SectionCarousel from "@/components/sectionCarousel";
import IntroSection from "@/components/introSection";
import SearchForm from "@/components/searchForm"
import Posts from "@/components/posts";
import ServiceSlider from "@/components/serviceSlider";
import CreateAccount from "@/components/createAccount";
import SearchMessage from "@/components/searchMessage";


export default function Home() {
    
  return (
    <div className="flex flex-col relative raleway-text w-[90%] sm:w-xl md:w-2xl lg:w-4xl  xl:w-5xl 2xl:w-7xl justify-center items-center">
      
      <IntroSection />
      <SearchForm />
      <SectionCarousel />
      <div className="w-full">  
          <SearchMessage/>
          <Posts/>
      </div>
      <ServiceSlider/>
      <CreateAccount/>
      
      
    </div>
  );
} 