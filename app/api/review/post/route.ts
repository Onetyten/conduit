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
        //make a bunch of data valid checks
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
        //check if reviewer or service actually exist
        const [reviewer,service] = await Promise.all([
           Profile.findById(userId),Service.findById(serviceId)
        ]) 
        if (!reviewer){
            return NextResponse.json({ message: "This reviewer does no exist" }, { status: 400 });
        }
        if (!service){
            return NextResponse.json({ message: "This service does not exist or have been deleted" }, { status: 400 });
        }
        const ReviewData = {userId,serviceId,review,rating}


        //if review alrady exists patch it
        let savedReview 
        const existingReview = await Review.findOne({ userId, serviceId });
        if (existingReview) {
            savedReview = await Review.findByIdAndUpdate( existingReview._id,{review,rating},{new:true})
        }
        else{
            //create new review
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