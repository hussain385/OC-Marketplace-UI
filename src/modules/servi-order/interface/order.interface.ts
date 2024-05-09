import { BaseInterface, ObjectValues } from '@/common/interface';
import { IEntity } from '@/common/interface/entity-interface';
import { IService, Package, PaymentTypes } from '@/common/interface/service-interface';
import { Activity } from './activities';
import { ProjectRequirements, ProjectStatus } from './project.interface';
import { Review } from '@/modules/reviews/src/utils/interface-validation.ts';

export interface Order extends BaseInterface {
  buyer: IEntity;
  seller: IEntity;
  status: OrderStatuses;
  paymentType: PaymentTypes;
  payType: PayTypes;
  paymentCount: number;
  isFinite: boolean;
  paidAmount: number;
  totalAmount: number;
  currency: string;
  pkg: Package;
  service: IService;
  metadata?: undefined;
  subOrders: SubOrder[];
  currentSubOrder: SubOrder;
  activities: Activity[];
  statuses: ProjectStatus[];
  requirements?: ProjectRequirements[];
  reviews?: Review[]; // Join relation
}

export interface SubOrder extends BaseInterface {
  description: string;
  status: string;
  amount: number;
  sequence: number;
  isEscrow: boolean;
  isPaid: boolean;
  isDeliveryLate: boolean;
  deliveryDays?: number | null;
  startedAt: string;
  deliveredAt: string | null;
  finishedAt: string | null;
}

export const orderStatus = {
  onHold: 'ON_HOLD',
  inProgress: 'IN_PROGRESS',
  completed: 'COMPLETED',
  requestCancellation: 'REQUEST_CANCELLATION',
  cancelled: 'CANCELLED',
  review: 'REVIEW',
} as const;

export type OrderStatuses = ObjectValues<typeof orderStatus>;

export const subOrderStatus = {
  waitingRequirement: 'WAITING_REQUIREMENTS',
  waitingPayment: 'WAITING_PAYMENT',
  inProgress: 'IN_PROGRESS',
  reviewDelivery: 'REVIEW_DELIVERY',
  requestRevision: 'REQUEST_REVISION',
  finished: 'FINISHED',
} as const;

export type SubOrderStatuses = ObjectValues<typeof subOrderStatus>;

export const payType = {
  UPFRONT: 'UPFRONT',
  LATER: 'LATER',
  MONTHLY: 'MONTHLY',
  QUARTERLY: 'QUARTERLY',
  HALF_YEARLY: 'HALF_YEARLY',
  ANNUALLY: 'ANNUALLY',
} as const;

export type PayTypes = ObjectValues<typeof payType>;
