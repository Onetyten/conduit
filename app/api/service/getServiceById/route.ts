import mongoConnect from "@/lib/utils/connectDB"
import Service from "@/models/serviceSchema"
import { updateViews } from "@/services/updateViews.services"
import { NextResponse } from "next/server"
import mongoose from "mongoose"

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get("id")
    const userId = searchParams.get("userId")

    if (!id || !mongoose.isValidObjectId(id)) return NextResponse.json({message:"The id parameter is missing"},{status:400})
    
    try {
        await mongoConnect()
        const service  = await Service.findById(id).populate("serviceProvider")
        if(!service){
            return NextResponse.json({message:"No service using this ID, somethings wrong" },{status:404})
        }
        const postLiked = service.likedId.includes(userId)
        
        if (userId && mongoose.isValidObjectId(userId)){
            await updateViews(id,userId)
        }
        
        return NextResponse.json({message:"User retrieved successfully",postLiked,service},{status:200})
    }

    catch (error) {
        console.error(error)
        return NextResponse.json({message: error instanceof Error?error.message:"Internal server error"},{status:500})
    }   
}