import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPayout } from '../interface/payout.interface';

interface IPayoutSlice {
  selectedCard?: IPayout;
  isReview: boolean;
}

const initialState: IPayoutSlice = {
  isReview: false,
};

const payoutSlice = createSlice({
  name: 'payoutHub',
  initialState,
  reducers: {
    setSelectedCard: (state, action: PayloadAction<IPayout>) => {
      state.selectedCard = action.payload;

      state.isReview = !!(action.payload.latestRequest && action.payload.latestRequest.status === 'PENDING');
    },
  },
});

export const { setSelectedCard } = payoutSlice.actions;
export default payoutSlice.reducer;
