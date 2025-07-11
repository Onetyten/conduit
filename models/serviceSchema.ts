import mongoose from "mongoose";
const serviceSchema = new mongoose.Schema({
    title:{type:String},
    profileId: {type:mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    viewedId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    likedId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    galleryImages: [{type: String}],
    description:{type:String},
    amountEarned :{type:Number},
    price :{type:Number},
    avalableOn :[{type:String}],
    likes: {type:Number},
    views: {type:Number},
    reviews: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        review: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }],
    avalability: {type:Boolean},
    deliverables: [{type: String}],
    tags: [{type: String}],
    createdAt: {type: Date, default: Date.now},
    address: {type: String},
    deliveryMethod: [{type: String, enum: ['online', 'onsite', 'both']}]
    
})



const Service = mongoose.models.Services || mongoose.model("Services",serviceSchema)
export default Service