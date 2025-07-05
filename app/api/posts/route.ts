import mongoConnect from "@/lib/utils/connectDB";
import Service from "@/models/serviceSchema";
import { NextResponse } from "next/server";

const DEFAULT_LIMIT = 10

export async function GET(request:Request) {
    const {searchParams} = new URL(request.url)
    const page = parseInt(searchParams.get('page')) || 1
    const limit = parseInt(searchParams.get('limit')) || DEFAULT_LIMIT
    const skip = (page-1)*limit
    try {
        await mongoConnect()
        const totalPosts = await Service.countDocuments()
        const Post  = await Service.find({}).skip(skip).limit(limit).sort({createdAt:-1}).exec()
        const totalPages = Math.ceil(totalPosts/limit)
        const hasMore = totalPages>page
        return NextResponse.json({ message:"Posts retrieved Successfully",posts:Post,currentPage:page,totalPages,hasMore},{status:200})


    } catch (error) {
        console.error(error)
        return NextResponse.json({error:error.message},{status:500})
    }
    
}