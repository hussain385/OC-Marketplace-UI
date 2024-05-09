/* eslint-disable no-unused-vars */

export enum StatusOrder {
  All = 'All',
  Paid = 'Paid',
  Failed = 'Failed',
  Cancelled = 'Cancelled',
  Processing = 'Processing',
  Refund = 'Refund',
  Refunded = 'Refunded',
}

export type OrderItems = {
  id: string;
};

export interface Orders {
  currency: string;
  dueAmount: number;
  id: string;
  order: string;
  paymentDate: string;
  paymentStatus: string;
  serviceName: string;
  serviceTitle: string;
  serviceProvider: string;
  serviceId?: string;
}

export interface BillingOrder {
  currency: string;
  id: string;
  name: string;
  serviceId: string;
  sellerEntityName: string;
  orderItems: [{ dueAmount: number; paymentDate: string; paymentStatus: string }];
  transactions: [{ id: string }];
}

export interface ServiceResponse {
  data: {
    id: any;
    attributes: { name: string };
    data: {
      id: number;
      attributes: {
        name: string;
      };
    };
  };
}

export interface CompanyResponse {
  data: {
    id: any;
    attributes: { name: string };
    data: {
      id: number;
      attributes: {
        name: string;
      };
    };
  };
}

interface Data {
  data: ServiceResponse[] | CompanyResponse[];
}

export interface ResponsePromise {
  data: Data;
}

export interface ServiceProvider {
  provider?: string;
  id?: string;
}

export type BillingStatusOrder = {
  list: string;
  code: string;
};

// export interface OrderInterface {
//   id: number;
//   date: string;
//   orderId: string;
//   paymentId: string;
//   serviceName: string;
//   serviceTitle: string;
//   serviceProvider: string;
//   status: StatusOrder | string;
//   amountDue: string;
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

/**
 * Invoice Interfaces
 */

export interface IInvoiceServiceMedia {
  uid: string;
  size: number;
  domain: string;
  fileType: string;
  container: string;
  extension: string;
  originalName: string;
}

export interface IInvoiceItemMetadata {
  plan: {
    uid: string;
    price: number;
    title: string;
    currency: string;
    duration_max: number;
    duration_min: number;
  };
  service: {
    uid: string;
    name: string;
    __medias: IInvoiceServiceMedia[];
  };
  categories: {
    uid: string;
    name: string;
  }[];
}

export interface IInvoiceOrderItems {
  id: string;
  name: string;
  orderStatus: string;
  state: [];
  totalAmount: number;
  transactionType: string;
  subscriptionPlan: string;
  subscriptionDay: number;
  stamp: string;
  revisionCount: number;
  deliveryCount: number;
  activedAt: string;
  deliveryAt: string;
  completionAt: string;
  createdAt: string;
  updatedAt: string;
  durationMin: number;
  durationMax: number;
  expiredAt: string;
  createdBy: string;
  buyerEntityId: string;
  buyerEntityName: string;
  buyerEntityStatus: string;
  sellerEntityId: string;
  sellerEntityName: string;
  serviceId: string;
  categories: string[];
  planId: string;
  metadata: IInvoiceItemMetadata;
}

export interface IInvoiceResponse {
  id: string;
  status: string;
  currency: number;
  discountAmount: number;
  totalAmount: number;
  feeAmount: number;
  createdAt: string;
  order: IInvoiceOrderItems;
  items: IInvoiceItems[];
}

export interface IInvoiceItems {
  id: string;
  status: string;
  amount: number;
  quantity: number;
  createdAt: number;
  transaction: {
    id: string;
    paymentMethod: string;
    transactionStatus: string;
    transactionAmount: number;
    precision: number;
    currency: number;
    transactionResponse: {
      nbcb: string;
      skey: string;
      amount: string;
      domain: string;
      extraP: string;
      status: string;
      tranID: string;
      appcode: string;
      channel: string;
      orderid: string;
      paydate: string;
      currency: string;
      error_code: string;
      error_desc: string;
    };
    signature: string;
    timestamp: string;
    ccbrand: string;
    cclast4: string;
    cctype: string;
    refundMetadata: any | null;
    paymentId: string;
    refundId: string | null;
  };
}

export const INVOICE_STATUS: any = {
  2290: 'paid',
  2291: 'pending',
  2292: 'refunded',
  2293: 'refunding',
  2294: 'failed',
};
