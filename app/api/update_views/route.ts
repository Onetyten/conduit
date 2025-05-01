import Service from "@/models/serviceSchema";
import mongoConnect from "@/lib/utils/connectDB";
import { NextResponse } from "next/server";


export async function PATCH(request:Request) {
    const {id,user_id} = await request.json()
    await mongoConnect()

    try {
        if(!id){
            return NextResponse.json({message:'missing id'},{status:404})
        }
        if(!user_id){
            return NextResponse.json({message:'missing user id'},{status:404})
        }
        
        const post = await Service.findById(id)
        if (!post) {
            return NextResponse.json({ message: 'Missing post' }, { status: 404 });
          }      
        if(!post.views === undefined || post.views === null ){
            post.views = 1
        }

        else{
            if (!post.viewedId){
                return NextResponse.json({message:'the viewed id field is not on the database'},{status:404})
            }

            else{
                if (post.viewedId.includes(user_id)){
                    return NextResponse.json({message:`{user has viewed this service before`},{status:409})
                }
                else{
                    post.viewedId.push(user_id);
                    post.views =post.views+1
                   
                }
                
            }
            
        }
        await post.save()
        return NextResponse.json({message:`{service views updated successfully ${post.views} \n viewersID: ${post.viewedId}}`,post:post},{status:200})

        
        
    }
    catch (error) {

        return NextResponse.json({error:`{internal server error ${error}}`}, {status:500})
        
    }

    
}