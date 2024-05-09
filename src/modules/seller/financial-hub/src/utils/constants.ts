export const EARNING_STATUS: { [key: string]: string } = {
  3000: 'Pending',
  3001: 'Released',
  3002: 'Disputed',
  3003: 'Voided',
};

export const WITHDRAWAL_STATUS: { [key: string]: string } = {
  3200: 'Requested',
  3201: 'Processing',
  3202: 'Withdrawn',
  3203: 'Failed',
};

export const WITHDRAWAL_METHOD: { [key: string]: string } = {
  BANK_TRANSFER: 'Bank transfer',
};

export const EARNING_INVOICE_TYPE: { [key: string]: string } = {
  3100: 'Transaction fee',
  3101: 'Withdrawal fee',
};
