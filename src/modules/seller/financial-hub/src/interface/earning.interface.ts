export interface IEarningResponse {
  id: string;
  status: string;
  purchasedAt: string;
  completedAt: string;
  releasedAt?: string;
  currency: string;
  grossAmount: number;
  serviceFee: number;
  serviceFeeRate: number;
  paymentFeeRate: number;
  paymentFee: number;
  netAmount: number;
  order: IOrder;
  items: Partial<IItems[]>;
  invoice?: IInvoice;
}

export interface IItems {
  id: string;
  no: number;
  serviceId: string;
  price: number;
  quantity: number;
  amount: number;
}

export interface IOrder {
  id: string;
  name: string;
  deliveryAt: string;
  completionAt: string;
  createdAt: string;
  buyerEntityName: string;
  sellerEntityName: string;
  metadata: IMetadata;
  mainCategory: string;
}

export interface IMetadata {
  plan: IPlan;
  service: IService;
  categories: ICategory[];
}

export interface ICategory {
  uid: string;
  name: string;
}

export interface IPlan {
  uid: string;
  price: number;
  title: string;
  currency: string;
  duration_max: number;
  duration_min: number;
}

export interface IService {
  uid: string;
  name: string;
  __medias: IMedia[];
  description: string;
}

export interface IMedia {
  uid: string;
  size: number;
  domain: string;
  fileType: string;
  protocol: string;
  container: string;
  extension: string;
  originalName: string;
}

export interface IInvoice {
  id: string;
  type: string;
  createdAt: string;
  fromName: string;
  fromAddress: string;
  fromMobile: string;
  fromEmail: string;
  toName: string;
  toAddress: string;
  toEmail: string;
  toMobile: string;
  subTotalAmount: number;
  discountAmount: number;
  totalAmount: number;
  currency: string;
}
