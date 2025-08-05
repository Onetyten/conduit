import mongoConnect from "@/lib/utils/connectDB";
import Categories from "@/models/categorySchema";
import fs from 'fs'
import { NextResponse } from "next/server";


export async function POST() {
    try {
        await mongoConnect()
        await Categories.deleteMany()
        const categories = await JSON.parse(fs.readFileSync('jsons/categories.json','utf-8'))
        const newCategories = await Categories.insertMany(categories)
        return NextResponse.json({mesage:"Categories seeded Successfully",newCategories},{status:201})
    } 
    catch (error) {
         console.error("error seeding profiles",error)
        let errorMessage = "An unknown error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({message:errorMessage},{status:500})
    }
    
}