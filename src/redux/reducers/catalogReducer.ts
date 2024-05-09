import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PackageInfo } from '../../common/interface/catalog-interface';
import { Category } from '@/common/interface/service-interface.ts';

interface employeeInfoProps {
  category: { name: string; id: string };
  allCategories: Category[];
  allSubCategories: Category[];
  packageCheckoutInfo: PackageInfo;
  serviceMetaData?: any;
  serviceDetails?: any;
  catalogSubServiceDetails?: any;
}

const INIT_STATE: employeeInfoProps = {
  category: { name: '', id: '' },
  allCategories: [],
  allSubCategories: [],
  packageCheckoutInfo: {
    merchantId: '',
    planId: '',
    serviceId: '',
    companyId: '',
    serviceName: '',
    companyName: '',
    categoryName: '',
    whatYouGet: '',
    deliveryTime: '',
    requirements: '',
    paymentSchedule: true,
    packageHeading: '',
    price: 0,
    orderId: '',
    vcode: '',
    vkey: '',
    callbackurl: '',
    returnurl: '',
    paymentUrl: '',
  },
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: INIT_STATE,
  reducers: {
    categoryUpdateAction: (state, action: PayloadAction<any>) => {
      state.category = action.payload;
    },
    allCategoriesUpdateAction: (state, action: PayloadAction<any>) => {
      state.allCategories = action.payload;
    },
    allSubCategoriesUpdateAction: (state, action: PayloadAction<any>) => {
      state.allSubCategories = action.payload;
    },
    packageInfoUpdateAction: (state, action: PayloadAction<PackageInfo>) => {
      state.packageCheckoutInfo = action.payload;
    },
    catalogServiceMetaUpdateAction: (state, action: PayloadAction<any>) => {
      state.serviceMetaData = action.payload;
    },
    catalogServiceDetailsUpdateAction: (state, action: PayloadAction<any>) => {
      state.serviceDetails = action.payload;
    },
    catalogSubServiceDetailsUpdateAction: (state, action: PayloadAction<any>) => {
      state.catalogSubServiceDetails = action.payload;
    },
  },
});

export const {
  categoryUpdateAction,
  allCategoriesUpdateAction,
  allSubCategoriesUpdateAction,
  packageInfoUpdateAction,
  catalogServiceMetaUpdateAction,
  catalogServiceDetailsUpdateAction,
  catalogSubServiceDetailsUpdateAction,
} = catalogSlice.actions;

export default catalogSlice.reducer;
