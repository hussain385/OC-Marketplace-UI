import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    showModal: false,
  },
  reducers: {
    setReviewModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
  },
});

export const { setReviewModal } = reviewSlice.actions;

export default reviewSlice.reducer;
