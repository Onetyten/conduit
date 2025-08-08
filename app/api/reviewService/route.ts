import { ReviewType } from "@/lib/types";
import mongoConnect from "@/lib/utils/connectDB";
import Service from "@/models/serviceSchema";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
    const { id, user_id, reviewText, rating } = await request.json();
    await mongoConnect();

    try {
        if (!id) {
            return NextResponse.json({ message: "Missing service id" }, { status: 404 });
        }
        if (!user_id) {
            return NextResponse.json({ message: "Missing user id" }, { status: 404 });
        }
        if (!reviewText || rating === undefined) {
            return NextResponse.json({ message: "Review text and rating are required" }, { status: 400 });
        }
        const post = await Service.findById(id);
        if (!post) {
            return NextResponse.json({ message: "Service not found" }, { status: 404 });
        }

        // Find existing review index
        const existingIndex = post.reviews.findIndex(
            (r:ReviewType) => r.userId.toString() === user_id
        );

        if (existingIndex !== -1) {
            // Update existing review
            post.reviews[existingIndex].review = reviewText;
            post.reviews[existingIndex].rating = rating;
            post.reviews[existingIndex].createdAt = new Date();
        } else {
            // Add new review
            post.reviews.unshift({
                userId: user_id,
                review: reviewText,
                rating: rating,
            });
        }

        const totalRating = post.reviews.reduce((sum:number, r:{rating:number }) => sum + r.rating, 0);
        post.averageRating = totalRating / post.reviews.length;

        await post.save();

        return NextResponse.json(
            { 
                message: existingIndex !== -1 ? "Review updated" : "Review added",
                post 
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: `Internal Server Error ${error}` },
            { status: 500 }
        );
    }
}
