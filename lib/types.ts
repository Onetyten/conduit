import { Types } from "mongoose";

export interface PostInterface {
    _id: string;
    title: string;
    serviceProviderId: string;
    galleryImages: string[];
    description: string;
    amountEarned: number;
    price: number;
    avalableOn: string[];
    likes: number;
    views: number;
    reviews: string[]; 
    avalability: boolean;
    deliverables: string[];
    tags: string[];
    createdAt: string;
    address: string;
    deliveryMethod: string[];

  }

  export interface ReviewType{
  userId: string | Types.ObjectId;
  review: string;
  rating: number;
}

  export interface LocationType{
    street: string
    city:string
    state:string
    zipcode:string
    country:string
    location:{
      type:string
      coordinates:number
    }
}

  export interface serviceInterface {
    _id: string
    title: string
    serviceProviderId: string
    viewedId: string[]
    likedId: string[]
    galleryImages: string[]
    description: string
    status:string
    amountEarned: number
    price: number
    availableOn: string[]
    reviews: ReviewType[]
    averageRating:number
    availability: boolean
    deliverables: string[]
    tags: string[]
    category:string
    createdAt: string
    address: LocationType
    deliveryMethod: string[]
    __v: number
  }

  export interface profileInterface {
    _id: string
    firstName: string
    lastName: string
    email: string
    profilePicture: string
    bio: string
    isTalent: boolean
    skills: string[]
    createdAt: string
    updatedAt: string
    totalSpent: number
    __v: number
    location: {
      district: string
      state: string
      country: string

    }
  }
  
