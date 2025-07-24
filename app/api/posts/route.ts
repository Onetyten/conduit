import mongoConnect from "@/lib/utils/connectDB";
import Service from "@/models/serviceSchema";
import { NextResponse } from "next/server";

const DEFAULT_LIMIT = 10

export async function GET(request:Request) {
    const {searchParams} = new URL(request.url)
    const page = Number(searchParams.get('page')) || 1
    const limit = Number(searchParams.get('limit')) || DEFAULT_LIMIT
    const keyword = searchParams.get('q')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter:any ={}

    if (typeof(keyword) == "string" && keyword.trim().length>0){
        // split all the search terms into words separated by whitespace
        const words = keyword.trim().split(/\s+/)
        // make it case insensitive and set the filter
        filter.$or = words.flatMap((word)=>[
            {title:{$regex:word, $options:"i"}},
            {tags:{$regex:word, $options:"i"}}
        ])

    }

    const skip = (page-1)*limit
    try {
        await mongoConnect()
        const totalPosts = await Service.countDocuments(filter)
        const posts  = await Service.find(filter).skip(skip).limit(limit).sort({createdAt:-1}).exec()
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