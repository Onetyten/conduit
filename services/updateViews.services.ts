import Service from "@/models/serviceSchema";

export async function updateViews(service_id:string,user_id:string){
        if(!service_id || !user_id) return
        const post = await Service.findById(service_id)
        if (!post) return
        if (!post.viewedId) post.viewedId = []
        if (post.viewedId.includes(user_id)) return 
        else{
            post.viewedId.push(user_id);
            const newPost = await post.save()
            console.log()
        }
}