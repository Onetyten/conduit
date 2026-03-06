import mongoConnect from "@/lib/utils/connectDB";
import Review from "@/models/reviewSchema";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Profile from "@/models/profileSchema";
import Service from "@/models/serviceSchema";


export async function POST(request:Request){
    await mongoConnect()
    const {userId,serviceId,review,rating} = await request.json()
    try {
     
        if (!userId || !mongoose.isValidObjectId(userId)) {
            return NextResponse.json({ message: "Invalid user id" }, { status: 400 });
        }
        if (!serviceId || !mongoose.isValidObjectId(serviceId)) {
            return NextResponse.json({ message: "Invalid service id" }, { status: 400 });
        }
        if (!review || rating === undefined) {
            return NextResponse.json({ message: "Review text and rating are required" }, { status: 400 });
        }
        if (typeof rating !== "number" || rating < 1 || rating > 5) {
            return NextResponse.json({ message: "Rating must be a number between 1 and 5" }, { status: 400 });
        }
        
        const [reviewer,service] = await Promise.all([
           Profile.findById(userId),Service.findById(serviceId)
        ]) 
        if (!reviewer){
            return NextResponse.json({ message: "This reviewer does no exist" }, { status: 400 });
        }
        if (!service){
            return NextResponse.json({ message: "This service does not exist or have been deleted" }, { status: 400 });
        }
        const ReviewData = {userId,service:serviceId,review,rating}

        let savedReview 
        const existingReview = await Review.findOne({ userId, service:serviceId });
        if (existingReview) {
            savedReview = await Review.findByIdAndUpdate( existingReview._id,{review,rating},{new:true})
        }
        else{
            savedReview = await Review.create(ReviewData)
        }
        return NextResponse.json({message:"service reviewed successfully",data:savedReview},{status:200})
    } 
    catch(error)
    {
        return NextResponse.json({ message: `Internal Server Error ${error instanceof Error?error.message:'unknown error'}` }, { status: 500 }
        );
    }
}
