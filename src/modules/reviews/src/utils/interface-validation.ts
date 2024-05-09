import * as yup from 'yup';
import { object } from 'yup';

import { ILogo, IQueryGlobal, IQueryOptionGlobal, Status } from '@/common/interface';

export const reviewSchema = yup.object({
  ratings: yup
    .array(
      object({
        point: yup.number().required(),
        code: yup.string().required(),
      }),
    )
    .required(),
  message: yup.string().required(),
});

export type ReviewSchema = yup.InferType<typeof reviewSchema>;

export interface ISort {
  [key: string]: 'asc' | 'desc' | 'ascending' | 'descending';
}

type TQueryOption = IQueryOptionGlobal & {
  sort?: ISort;
};

export interface IQueryObject extends IQueryGlobal {
  entityId: string;
  options?: TQueryOption;
}

export interface PurchasingEntity {
  profile: Profile;
  _id: string;
  status: Status;
  uid: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  __logo?: ILogo;
  id: string;
}

export interface Profile {
  type: string;
  detail: ProfileDetail;
}

export interface ProfileDetail {
  name: string;
  operationYear: number;
}

export interface ReactionOfTargetingEntity {
  _id: string;
  type: 'HELPFUL' | 'NOT_HELPFUL';
  status: Status;
  uid: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

export interface SellerRatingPoint {
  overview: number;
}

export interface BuyerRatingPoint {
  communicationLevel: number;
  serviceAsDescribed: number;
  taskResponsibility: number;
  recommendToFriends: number;
}

export interface ICounts {
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
}

// export type Review = IReviewBuyer | IReviewSeller;

interface IHelpfulData {
  entityId: string;
  type: 'HELPFUL' | 'NOT_HELPFUL';
}
export interface ICreateHelpfulReview {
  orderReviewId: string;
  data: IHelpfulData;
}

export interface Metadata {
  plan: Plan;
  service: Service;
  categories: Category[];
}

export interface Category {
  uid: string;
  name: string;
}

export interface Plan {
  uid: string;
  price: number;
  title: string;
  currency: string;
  duration_max: number;
  duration_min: number;
}

export interface Service {
  uid: string;
  name: string;
  __medias: Media[];
}

export interface Media {
  uid: string;
  size: number;
  domain: string;
  fileType: string;
  container: string;
  extension: string;
  originalName: string;
}

export interface Rating {
  id: string;
  code: string;
  title: string;
  description: string;
  point: number;
}

export interface ReviewQuestion extends Rating {
  no: number;
  target: 'SELLER' | 'BUYER';
}

export interface Review {
  id: string;
  target: 'BUYER' | 'SELLER';
  from: string;
  to: string;
  message: string;
  averageRating: number;
  serviceId: string;
  createdAt: Date;
  updatedAt: Date;
  ratings: Rating[];
  helpfulCount: number;
  unhelpfulCount: number;
  helpfuls: any[];
}
