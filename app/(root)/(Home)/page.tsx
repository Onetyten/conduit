import SectionCarousel from "@/components/sectionCarousel";
import IntroSection from "@/components/introSection";
import SearchForm from "@/components/searchForm"
import Posts from "@/components/posts";

export default function Home({searchParams}:{searchParams:{query:string}}) {
  const query  = searchParams?.query
  
  return (
    <div className="flex flex-col">
      <IntroSection />
      <SearchForm query = {query} />
      <SectionCarousel />
      <div className="px-4">  
         <p className=" text-sm text-gray-400">
            {query? `Search result for ${query}`:'All services' }
         </p>
         <Posts/>
      </div>
      
    </div>
  );
} 