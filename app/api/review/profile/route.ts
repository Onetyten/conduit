import mongoConnect from "@/lib/utils/connectDB"
import Review from "@/models/reviewSchema"
import { NextResponse } from "next/server"
import mongoose from "mongoose"
import Service from "@/models/serviceSchema"



export async function GET(request:Request){
    const {searchParams} = new URL(request.url)
    const page = Math.max(Number(searchParams.get("page"))||1,1)
    const limit = Math.min(Number(searchParams.get("limit"))||10,100)
    const id = searchParams.get("id")
    const skip = (page-1) * limit
    const type  = searchParams.get("type") || "sent"
    await mongoConnect()


    try {
        if (!mongoose.isValidObjectId(id)){
            return NextResponse.json({message:"No id provided, invalid input"},{status:400})
        }

        if (type==="sent"){
            const totalReviews = await Review.countDocuments({userId:id})
            const reviews = await Review.find({userId:id}).limit(limit).skip(skip).sort({createdAt:-1}).populate({path:'service',select:'title galleryImages',populate:{path:'serviceProvider',select:'firstName lastName'}}).exec()
            
            const totalPages = Math.ceil(totalReviews/limit)
            const hasMore = totalPages>page

            return NextResponse.json({message:`page ${page} retrieved`,data:reviews,hasMore,currentPage:page,totalPages},{status:200})
        }

        else{
            const services = await Service.find({serviceProvider:id},{_id:1}) 
            const serviceIds = services.map(s=>s._id)
            const totalReviews = await Review.countDocuments({service:{$in:serviceIds}})

            const reviews =  await Review.aggregate([
                {$match:{ service:{$in:serviceIds} }},
                {$lookup:{
                    from:"services",
                    localField:"service",
                    foreignField:"_id",
                    as:"serviceData"
                }},
                {$unwind:"$serviceData"},
                {$lookup:{
                    from:"profiles",
                    localField:"userId",
                    foreignField:"_id",
                    as:"reviewer"
                }},
                {$unwind:"$reviewer"},
                {$project:{
                    _id:1,
                    review:1,
                    rating:1,
                    createdAt:1,
                    updatedAt:1,
                    reviewer:{
                        _id:"$reviewer._id",
                        firstName:"$reviewer.firstName",
                        lastName:"$reviewer.lastName",
                        profilePicture:"$reviewer.profilePicture",
                    },
                    service:{
                        _id: "$serviceData._id",
                        title: "$serviceData.title",
                        galleryImages: "$serviceData.galleryImages",
                    }
                }}
            ])

            const totalPages = Math.ceil(totalReviews/limit)
            const hasMore = totalPages>page
            return NextResponse.json({message:`page ${page} retrieved`,data:reviews,hasMore,currentPage:page,totalPages},{status:200})
        }

        

        
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({message: error instanceof Error?error.message:"Internal server error"},{status:500})
    }

}