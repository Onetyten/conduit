import getUserFromRequest from "@/lib/getUserFromRequest";
import mongoConnect from "@/lib/utils/connectDB";
import Service from "@/models/serviceSchema";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const DEFAULT_LIMIT = 10

export async function GET(request:Request) {
    const {searchParams} = new URL(request.url)
    const page = Number(searchParams.get('page')) || 1
    const limit = Number(searchParams.get('limit')) || DEFAULT_LIMIT
    const keyword = searchParams.get('q')
    const userId = getUserFromRequest(request)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter:any ={}

    if (typeof keyword === "string" && keyword.trim.length>0 ){
        const words  = keyword.trim().split(/\s+/)
        filter.$or = words.flatMap((word)=>[
            { title:{$regex:word, $options:'i'}},
            { tags: {$regex:word, $options:'i'}}
        ])
    }

    const skip = (page-1)*limit
    try {
        await mongoConnect()
        const totalPosts = await Service.countDocuments(filter)
        const posts = await Service.aggregate([
            { $match: filter },
            { $addFields: {
                likeCount:{$size:'$likedId'},
                viewCount:{$size:'$viewedId'},
                isLiked:userId?{$in:[new mongoose.Types.ObjectId(userId),'$viewedId']}:false,
                isViewed:userId?{$in:[new mongoose.Types.ObjectId(userId),'$likedId']}:false
            }},
            {$lookup:{
                from:"profiles",
                localField:"serviceProvider",
                foreignField:"_id",
                as:"serviceProvider"
            }},
            {$unwind:{
                path:"$serviceProvider"
            }},
            {$project:{
                viewedId:0,
                likedId:0
            }},
            {$skip:skip},
            {$limit:limit}
        ])
        const totalPages = Math.ceil(totalPosts/limit)
        console.log(posts[0])
        const hasMore = totalPages>page
        return NextResponse.json({ message:"Posts retrieved Successfully",posts,currentPage:page,totalPages,hasMore},{status:200})


    }
    catch (error) {
        console.error(error)
        let errorMessage = "An unknown error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({error: errorMessage},{status:500})
    }   
}