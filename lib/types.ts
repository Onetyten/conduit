import { Types } from "mongoose";



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
    serviceProvider: profileInterface
    likeCount:number,
    viewCount:number,
    isLiked:boolean,
    isViewed:boolean,
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
    profilePicture: string
    bio: string
    phoneNumber: {
      code: string;
      num: string;
    };
    socialLinks?:{
      facebook:string,
      instagram:string,
      twitter_x:string,
      linkedin:string,
      other:string
    },
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
    serviceCount?:number
  }

  export interface becomeTalentType{
    location: {
      district: string;
      state: string;
      country: string;
    };
    phoneNumber: {
      code: string;
      num: string;
    };
    socialLinks: {
      facebook: string;
      instagram: string;
      twitter_x: string;
      linkedin: string;
      other: string;
    };
    isTalent: boolean;
    bio: string;
    skills: string[];
  }
  export interface NewUserType {
    email: string
    firstname: string
    lastname: string
    password: string
    passwordCheck: string
    isTalent: boolean
    location:{
        district:string,
        state:string,
        country:string,
    },
    phoneNumber: {
        code: string;
        num: string;
    },
    socialLinks:{
      facebook:string,
      instagram:string,
      twitter_x:string,
      linkedin:string,
      other:string
    },
    skills: string[]
    bio: string
    profileImage: File | null
    profilePicUrl:string
  }

  export interface newServiceType{
    title:string,
    galleryImages: {file:File,reader:FileReader}[],
    description:string,
    status: 'draft'|'published'| 'archived',
    price :{amount:number,currency:string},
    availableOn :string[],
    deliverables: string[],
    tags: string[],
    category:string,
    address: {
        street: string,
        city:string,
        state:string,
        zipcode:string,
        country:string,
        location:{
          long:string
          lat:string
        }
    },
    deliveryMethod: 'online'|'onsite'|'both'
  }