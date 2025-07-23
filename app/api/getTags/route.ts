import mongoConnect from "@/lib/utils/connectDB";
import Service from "@/models/serviceSchema";
import { NextResponse } from "next/server";



export async function GET(){
    await mongoConnect()
    try {
        const tagList = await Service.aggregate([
            {$unwind:"$tags"},
            {$group: {_id:"$tags",count:{$sum:1}}},
            {$sort:{count:-1}},
            {$limit:20},
            {$project:{_id:0,tag:"$_id",count:1}}
        ])

        if (!tagList){
            return NextResponse.json({message:"No tags available",success:false},{status:404})
        }

        return NextResponse.json({message:"tags fetched successfully",data:tagList,success:true},{status:200})
        
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({message:"Error fetching tasks",success:true},{status:500})
    }

}