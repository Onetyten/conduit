import mongoose from "mongoose";
const profileSchema  = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    password:{type:String},
    email:{type:String},
    profilePicture:{type:String},
    bio:{type:String},
    isTalent:{type:Boolean},
    location:{type:String},
    skills:[{type:String}],
    serviceCategories: [{ type: String }],
    hourlyRate:{type:Number},
    portfolio:{type:String},
    companyName: { type: String },
    companyDescription: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

})
const Profile = mongoose.models.Profile || mongoose.model('Profile',profileSchema)
export default Profile