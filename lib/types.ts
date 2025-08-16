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
  _id:string
  userId: string | Types.ObjectId;
  serviceId: string | Types.ObjectId;
  review: string;
  rating: number;
  userProfile?:{
    firstName:string,
    lastName:string,
    profilePicture:string
  }


}
  export interface PriceType{
  amount: number;
  currency: string;
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
    price: PriceType
    availableOn: string[]
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
    password?:string
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
  
