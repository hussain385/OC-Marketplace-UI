import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '@/modules/servi-order/interface';
import { RootState } from '@/redux/store.tsx';

interface IOrderSlice {
  selectedOrder?: Order;
}

const initialState: IOrderSlice = {
  selectedOrder: undefined,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setSelectedOrder: (state, action: PayloadAction<Order>) => {
      state.selectedOrder = action.payload;
    },
  },
});

export const { setSelectedOrder } = orderSlice.actions;

export default orderSlice.reducer;

/**
 ********************************
 * Below here is custom selector
 ********************************
 */

export const getOppositeOrderEntity = (state: RootState) => {
  if (state.mainState.useInfo.selectedEntity && state.mainState.order.selectedOrder) {
    if (state.mainState.order.selectedOrder.buyer.id === state.mainState.useInfo.selectedEntity.id) {
      return state.mainState.order.selectedOrder.seller;
    } else {
      return state.mainState.order.selectedOrder.buyer;
    }
  }

  return undefined;
};

export const getEntityByRole = createSelector(
  [(state: RootState) => state.mainState.order.selectedOrder, (_: unknown, by: 'BUYER' | 'SELLER') => by],
  (order, by) => {
    if (by === 'SELLER') {
      return order?.seller;
    }

    return order?.buyer;
  },
);

export const getOrderMyRole = (state: RootState) => {
  if (state.mainState.useInfo.selectedEntity && state.mainState.order.selectedOrder) {
    if (state.mainState.order.selectedOrder.buyer.id === state.mainState.useInfo.selectedEntity.id) {
      return 'BUYER';
    } else {
      return 'SELLER';
    }
  }

  return undefined;
};
