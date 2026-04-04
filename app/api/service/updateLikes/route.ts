import getUserFromRequest from "@/lib/getUserFromRequest";
import mongoConnect from "@/lib/utils/connectDB";
import Service from "@/models/serviceSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PATCH(request:Request) {
    const {id} = await request.json()
    await mongoConnect()

    try {
        const userId = getUserFromRequest(request)
        if(!id){
            return NextResponse.json({message:'missing service provider id'},{status:404})
        }
        if(!userId){
            return NextResponse.json({message:'missing user id'},{status:404})
        }

        const post = await Service.findByIdAndUpdate(id,
            [
                {
                    $set:{
                        likedId:{
                            $cond:{
                                if : {$in:[new mongoose.Types.ObjectId(userId),"$likedId"]},
                                then: {$setDifference : ["$likedId",[new mongoose.Types.ObjectId(userId)]]},
                                else: {$concatArrays : ["$likedId",[new mongoose.Types.ObjectId(userId)]] }
                            }
                        }
                    }
                }
            ], {new:true}
        )
        if (!post){
            return NextResponse.json({message:'service not found'},{status:404})
        }

        const postLiked = post.likedId.includes(userId)
        const likeCount = post.likedId.length

        return NextResponse.json({message:`user has ${postLiked?"liked":"unliked"} this post`,likeCount,postLiked,serviceId:id},{status:200})

    }
    
    catch (error) {
        return NextResponse.json({message:`Internal Server error ${error}}`},{status:500})
    }

    
}