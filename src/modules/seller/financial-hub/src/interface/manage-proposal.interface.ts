export interface Proposal {
  id: number;
  requestTitle: string;
  requestStatus: 'Pending' | 'In Progress' | 'Completed' | 'Active' | 'Draft' | 'Archived';
  offerAmount: string; // or number, if you prefer to handle the amount numerically
  deliveryTime: string;
  message: string;
}
