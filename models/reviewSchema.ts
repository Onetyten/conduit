import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Profile", required: true },
    serviceId: {type: mongoose.Schema.Types.ObjectId, ref: "Services", required: true},
    review: { type: String, required: true },
    rating:{type:Number, min:1,max:5}
},{timestamps:true})


const Review = mongoose.models.Reviews || mongoose.model("Reviews",reviewSchema)
export default Review