import { ILogo, ObjectValues } from '@/common/interface';
import { PaymentTypes } from '@/common/interface/service-interface.ts';

export type Activity =
  | ActivityOrderPlaced
  | ActivityNoData
  | ActivityConversation
  | ActivityDelivery
  | ActivityActionCancellation
  | ActivityRequestRevision
  | ActivityApproveDelivery
  | ActivityReview
  | ActivityRequestCancellation;

interface BaseActivity {
  id: string;
  createdAt: Date;
}

export interface ActivityOrderPlaced extends BaseActivity {
  type: 'ORDER_PLACED';
  data: {
    by: 'BUYER' | 'SELLER';
    name: string;
  };
}

/**
 * Those who have no data
 *
 * - Submit Requirement
 * - Completed
 * - Cancelled
 * - Submitted Requirement
 * - Order Started
 */
export interface ActivityNoData extends BaseActivity {
  type: 'SUBMIT_REQUIREMENT' | 'ORDER_STARTED' | 'COMPLETED' | 'CANCELLED' | 'SUBMITTED_REQUIREMENT';
}

export interface ActivityConversation extends BaseActivity {
  type: 'CONVERSATION';
  data: {
    by: 'BUYER' | 'SELLER';
    attachs: ILogo[];
    message: string;
  };
}

export interface ActivityDelivery extends BaseActivity {
  type: 'DELIVERY';
  data: {
    type: PaymentTypes;
    attachs: ILogo[];
    message: string;
    sequence: number;
    isRevision: boolean;
    subSequence: number;
    deliveryStatus: 'DELIVERED' | 'APPROVED' | 'REJECTED';
  };
}

/**
 * - Approve
 * - Withdraw
 * - Reject
 */
export interface ActivityActionCancellation extends BaseActivity {
  type: 'APPROVE_CANCELLATION' | 'REJECT_CANCELLATION' | 'WITHDRAW_CANCELLATION';
  data: {
    by: 'BUYER' | 'SELLER';
    name: string;
  };
}

export interface ActivityRequestCancellation extends BaseActivity {
  type: 'REQUEST_CANCELLATION';
  data: {
    by: 'BUYER' | 'SELLER';
    reason: string;
    message?: string;
  };
}

export interface ActivityRequestRevision extends BaseActivity {
  type: 'REQUEST_REVISION';
  data: {
    attachs: ILogo[];
    message: string;
    sequence: number;
    subSequence: number;
  };
}

export interface ActivityApproveDelivery extends BaseActivity {
  type: 'APPROVE_DELIVERY';
  data: {
    sequence: number;
    subSequence: number;
  };
}

export interface ActivityReview extends BaseActivity {
  type: 'REVIEW';
  data: {
    by: 'BUYER' | 'SELLER';
  };
}

export const activityType = {
  conversation: 'CONVERSATION',
  orderPlaced: 'ORDER_PLACED',
  submitRequirement: 'SUBMIT_REQUIREMENT',
  orderStarted: 'ORDER_STARTED',
  completed: 'COMPLETED',
  cancelled: 'CANCELLED',
  submittedRequirement: 'SUBMITTED_REQUIREMENT',
  delivery: 'DELIVERY',
  requestCancellation: 'REQUEST_CANCELLATION',
  approveCancellation: 'APPROVE_CANCELLATION',
  rejectCancellation: 'REJECT_CANCELLATION',
  withdrawCancellation: 'WITHDRAW_CANCELLATION',
  requestRevision: 'REQUEST_REVISION',
  approveDelivery: 'APPROVE_DELIVERY',
  review: 'REVIEW',
} as const;

export type ActivityTypes = ObjectValues<typeof activityType>;
