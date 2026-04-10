import mongoConnect from "@/lib/utils/connectDB";
import Review from "@/models/reviewSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET(request:Request) {
    await mongoConnect()
    const {searchParams} = new URL (request.url)
    const page = Math.max(Number(searchParams.get("page")) || 1,1)
    const limit = Math.min(Number(searchParams.get("limit")) || 10,100)
    const serviceId = searchParams.get("id")
    const skip = (page-1) * limit

    try {
        if (!serviceId|| !mongoose.isValidObjectId(serviceId)){
            return NextResponse.json({message:"No service id provided, invalid input"},{status:400})
        }
        // const review = await Review.find({})
        const result = await Review.aggregate([
            {$match:{service:new mongoose.Types.ObjectId(serviceId)}},
            {$lookup:{from:"profiles",foreignField:"_id",localField:"userId",as:"userProfile"}},
            {$match:{userProfile:{$ne:[]}}},
            {$facet:{
                    metadata:[
                        {$group:{_id:null, averageRating:{$avg:"$rating"},total:{$sum:1}}},
                    ],
                    data:[
                        {$unwind:{path:"$userProfile",preserveNullAndEmptyArrays:false}},
                        {$sort: { createdAt: -1, _id: 1 }},
                        {$skip:skip},
                        {$limit:limit},
                        {$project:{
                            _id:1,
                            userId:1,
                            serviceId:1,
                            review:1,
                            rating:1,
                            createdAt:1,
                            "userProfile.firstName":1,
                            "userProfile.lastName":1,
                            "userProfile.profilePicture":1,
                        }}
                    ]
                }}

        ])

        const {metadata,data} = result[0]

        const total = metadata[0]?.total || 0
        
        return NextResponse.json({message:"reviews fetched successfully",data,averageRating:metadata[0]?.averageRating||0,pagination:{total ,totalpage:Math.ceil(total/limit)}},{status:200})
    }
        
    catch (error) {
        return NextResponse.json({message:`Error fetching reviews ${error instanceof Error?error.message:': error unknown'}`},{status:500})
    }  
}
