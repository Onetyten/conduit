import mongoose from "mongoose";
const serviceSchema = new mongoose.Schema({
    title:{type:String},
    serviceProviderId: {type:mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    viewedId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    likedId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    galleryImages: [{type: String}],
    description:{type:String},
    status: {type:String,enums:['draft','published','archived'],default:'draft'},
    amountEarned :{type:Number},
    price :{amount:Number,currency:String},
    availableOn :[{type:String}],
    reviews: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        review: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        rating:{type:Number, min:1,max:5},
        default:[]
    }],
    averageRating: { type: Number, min: 1, max: 5, default: 0 },
    availability: {type:Boolean},
    deliverables: [{type: String}],
    tags: [{type: String}],
    category:{type:mongoose.Schema.Types.ObjectId,ref:'Category'},
    createdAt: {type: Date, default: Date.now},
    address: {
        street: String,
        city:String,
        state:String,
        zipcode:String,
        country:String,
        location:{
            type:{type:String,enum:['Point'],default:'Point'},
            coordinates:{type:[Number], index:'2dsphere'}
        }
    },
    deliveryMethod: [{type: String, enum: ['online', 'onsite', 'both']}]
    
})



const Service = mongoose.models.Services || mongoose.model("Services",serviceSchema)
export default Service