    interface PostInterface {
    _id: string;
    title: string;
    profileId: string;
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


  interface serviceInterface {
    _id: string
    title: string
    profileId: string
    viewedId: string[]
    likedId: string[]
    galleryImages: string[]
    description: string
    amountEarned: number
    price: number
    avalableOn: string[]
    likes: number
    views: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reviews: any[]
    avalability: boolean
    deliverables: string[]
    tags: string[]
    createdAt: string
    address: string
    deliveryMethod: string[]
    __v: number
  }

  interface profileInterface {
    _id: string
    firstName: string
    lastName: string
    email: string
    profilePicture: string
    bio: string
    isTalent: boolean
    skills: string[]
    serviceCategories: string[]
    hourlyRate: number
    portfolio?: string
    companyName?: string
    companyDescription?: string
    createdAt: string
    updatedAt: string
    totalSpent: number
    __v: number
    location: {
      city: string
      state: string
      country: string

    }
  }
  

  
  export type {PostInterface,serviceInterface,profileInterface}