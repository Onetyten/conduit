
import SectionCarousel from "@/components/sectionCarousel";
import IntroSection from "../../components/introSection"; 
import SearchForm from "../../components/searchForm";
 
 export default function Home() {

  return (
   <div className="flex flex-col">
      <IntroSection/>
      <SearchForm/>
      <SectionCarousel/>
   </div>
  );
}
