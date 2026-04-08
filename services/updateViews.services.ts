import Service from "@/models/serviceSchema";


export async function updateViews(service_id:string,user_id:string):Promise<number | null>{
        if(!service_id || !user_id) return null

        try {
          const viewedPost = await Service.findByIdAndUpdate(service_id,{$addToSet:{viewedId:user_id}},{new:true})
            if (!viewedPost) return null
            return viewedPost.viewedId.length  
        } catch {
            return null
        }  
}