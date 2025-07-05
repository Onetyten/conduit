import mongoConnect from "@/lib/utils/connectDB";
import Service from "@/models/serviceSchema";
import { NextResponse } from "next/server";

const DEFAULT_LIMIT = 10

export async function GET(request:Request) {
    const {searchParams} = new URL(request.url)
    const page = Number(searchParams.get('page')) || 1
    const limit = Number(searchParams.get('limit')) || DEFAULT_LIMIT
    const skip = (page-1)*limit
    try {
        await mongoConnect()
        const totalPosts = await Service.countDocuments()
        const posts  = await Service.find({}).skip(skip).limit(limit).sort({createdAt:-1}).exec()
        const totalPages = Math.ceil(totalPosts/limit)
        const hasMore = totalPages>page
        return NextResponse.json({ message:"Posts retrieved Successfully",posts,currentPage:page,totalPages,hasMore},{status:200})


    } catch (error) {
        console.error(error)
        let errorMessage = "An unknown error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({error: errorMessage},{status:500})
    }
    
}