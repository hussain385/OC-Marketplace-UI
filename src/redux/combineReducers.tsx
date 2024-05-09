import { combineReducers } from 'redux';
import catalogSlice from './reducers/catalogReducer';
import authSlice from './reducers/authReducers';
import companySetupReducers from './reducers/companySetupReducers';
import teamManagementReducer from '../modules/buyer/redux/reducers/teamManagementReducer';
import reviewSlice from '../modules/reviews/src/service/review.slice';
import payoutSlice from '../modules/seller/financial-hub/src/services/payout.slice';
import appReducers from './reducers/appReducers';
import chatSlice from '@/modules/communication/services/chat.slice.ts';
import orderSlice from '@/modules/servi-order/Service/order.slice.ts';

const reducers = combineReducers({
  buyerCatalog: catalogSlice,
  useInfo: authSlice,
  companySetup: companySetupReducers,
  teamInvitation: teamManagementReducer,
  order: orderSlice,
  review: reviewSlice,
  payoutHub: payoutSlice,
  appConfig: appReducers,
  chat: chatSlice,
});

export default reducers;
