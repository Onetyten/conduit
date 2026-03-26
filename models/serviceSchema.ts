import mongoose from "mongoose";
const serviceSchema = new mongoose.Schema({
    title:{type:String},
    serviceProvider: {type:mongoose.Schema.Types.ObjectId, ref: "Profile", required: true},
    viewedId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile", default: [] }],
    likedId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile", default: [] }],
    galleryImages: [{type: String}],
    description:{type:String},
    status: {type:String,enums:['draft','published','archived'],default:'draft'},
    amountEarned :{type:Number},
    price :{amount:Number,currency:String},
    availableOn :[{type:String}],
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


serviceSchema.pre('findOneAndDelete', async function(next){
    const serviceId = this.getQuery()._id
    const Review = mongoose.model("Reviews")
    const reviews = await Review.find({service:serviceId})
    for (const review of reviews ){
        await Review.findByIdAndDelete(review._id)
    }
    next()
})


const Service = mongoose.models.Services || mongoose.model("Services",serviceSchema)
export default Service