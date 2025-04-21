import mongoConnect from "@/lib/utils/connectDB";
import Service from "@/models/serviceSchema";
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

        if (!post){
            return NextResponse.json({message:'service not found'},{status:404})
        }
        if(!post.likes  === undefined || post.likes === null ){
            post.likes = 1
        }
        else{
            if (!post.likedId){
                return NextResponse.json({message:'the liked id field is not on the database'},{status:404})
            }
            if (post.likedId.includes(user_id)){
                const userIndex = post.likedId.indexOf(user_id)
                post.likedId.splice(userIndex,1)
                post.likes -= 1
                return NextResponse.json({message:`user has unliked this post` ,value:post.likedId},{status:200})
            }
            else{
                post.likes+= 1
                post.likedId.push(user_id)
                return NextResponse.json({message:`user has liked this post` ,value:post.likedId},{status:200})

            }
        }

    }
    
    catch (error) {
        return NextResponse.json({message:`Internal Server error ${error}}`},{status:500})
    }

    
}