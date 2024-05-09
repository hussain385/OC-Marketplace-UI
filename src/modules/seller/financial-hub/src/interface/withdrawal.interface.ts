export interface IWithdrawalResponse {
  id: string;
  status: string;
  createdAt: string;
  withdrawnAt: null;
  withdrawMethod: string;
  createdBy: string;
  grossAmount: number;
  feeAmount: number;
  netAmount: number;
  currency: string;
  paymentId: null;
  invoice: null;
  transactions: ITransaction[];
  bankAccount: IBankAccount;
}

export interface IBankAccount {
  id: string;
  priority: number;
  currency: string;
  bankName: string;
  bankCode: string;
  accountName: string;
  accountNumber: string;
  accountEmail: string;
  accountMobile: string;
  accountMobileCountryCode: string;
  companyName: string;
  companyRegistrationNumber: string;
  type: string;
  status: string;
  isVerified: boolean;
  entityId: string;
  payeeId: number;
  createdAt: string;
}

export interface ITransaction {
  id: string;
  status: string;
  createdAt: string;
  createdBy: string;
  amount: number;
  currency: string;
  paymentId: null;
}
