import mongoConnect from "@/lib/utils/connectDB"
import Review from "@/models/reviewSchema"
import { NextResponse } from "next/server"
import mongoose from "mongoose"



export async function GET(request:Request){
    const {searchParams} = new URL(request.url)
    const page = Math.max(Number(searchParams.get("page"))||1,1)
    const limit = Math.min(Number(searchParams.get("limit"))||10,100)
    const id = searchParams.get("id")
    const skip = (page-1) * limit
    // const source  = searchParams.get("source")

    // let filter = {}

    await mongoConnect()
    try {
        if (!mongoose.isValidObjectId(id)){
            return NextResponse.json({message:"No id provided, invalid input"},{status:400})
        }
        const totalReviews = await Review.countDocuments({userId:id})
        // if (source==="in"){
        const reviews = await Review.find({userId:id}).limit(limit).skip(skip).sort({createdAt:-1}).populate({path:'service',select:'title galleryImages',populate:{path:'serviceProvider',select:'firstName lastName'}}).exec()
        
        const totalPages = Math.ceil(totalReviews/limit)
        const hasMore = totalPages>page
        // }
        // else{

        // }
        return NextResponse.json({message:`page ${page} retrieved`,data:reviews,hasMore,currentPage:page,totalPages},{status:200})

        
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({message: error instanceof Error?error.message:"Internal server error"},{status:500})
    }

}