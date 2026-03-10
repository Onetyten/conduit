interface ServiceProvider {
  _id: string;
  firstName: string;
  lastName: string;
}

interface ServiceInfo {
  _id: string;
  title: string;
  serviceProvider?: ServiceProvider;
  galleryImages: string[];
}

interface ReviewerInfo {
  _id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

export interface SentReviewData {
  _id: string;
  userId: string;
  service: ServiceInfo;
  review: string;
  rating: number;
  createdAt: string; 
  updatedAt: string;
  __v: number;
}

export interface receivedReviewData {
  _id: string;
  service: ServiceInfo;
  review: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  reviewer: ReviewerInfo;
}