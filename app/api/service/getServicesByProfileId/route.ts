import mongoConnect from "@/lib/utils/connectDB";
import Service from "@/models/serviceSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request:Request){
    await mongoConnect()
    const {searchParams} = new URL(request.url)
    const page = Math.max(Number(searchParams.get("page"))|| 1,1)
    const limit = Math.min(Number(searchParams.get("limit")) || 10,100)
    const profileId = searchParams.get("id")

    const skip = (page-1)*limit
    
    try {
        if (!profileId || !mongoose.isValidObjectId(profileId)){
            return NextResponse.json({message:"No id provided, invalid input"},{status:400})
        }
        const totalServices = await Service.countDocuments({serviceProvider:profileId})
        const services = await Service.find({serviceProvider:profileId}).populate("serviceProvider").skip(skip).limit(limit).sort({createdAt:-1}).exec()
        const totalPages = Math.ceil(totalServices/limit)
        const hasMore = totalPages>page

        return NextResponse.json({message:"Services retrieved successfully",hasMore,currentPage:page,totalPages,data:services},{status:200})

    }
    catch (error) {
        console.error(error)
        return NextResponse.json({message: error instanceof Error?error.message:"Internal server error"},{status:500})
        
    }

}