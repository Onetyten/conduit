import Image from "next/image"
import Welcome from "@/app/welcome";

export default function Home() {
  console.log("This is a server component")
  return (
    <div className=" flex flex-col gap-5 items-center justify-center min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <h2 className="text-2xl">
        Hello there
      </h2>
      <Welcome/>

      
     
    </div>
  );
}
