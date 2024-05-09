import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clearAllStateAction } from '@/redux/actions';
import { IServicesData } from '@/common/interface/busines-company-profile-interface';

interface userInfoProps {
  step: number;
  serviceData: IServicesData;
}

const INIT_STATE: userInfoProps = {
  step: 0,
  serviceData: {
    step: 0,
    edit: false,
    uid: '',
    servicePic: [],
    categories: [],
    about: '',
    title: '',
    package1: undefined,
    package2: undefined,
    package3: undefined,
    status: 'DISABLE',
  },
};

const companySetupSlice = createSlice({
  name: 'companySetupSlice',
  initialState: INIT_STATE,
  reducers: {
    companySetupStepUpdated: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    serviceSetupUpdated: (state, action: PayloadAction<any>) => {
      state.serviceData = action.payload;
    },
    resetCompanySetupData: () => INIT_STATE,
  },
  extraReducers: (builder) => {
    builder.addCase(clearAllStateAction, () => INIT_STATE);
  },
});

export const { companySetupStepUpdated, serviceSetupUpdated, resetCompanySetupData } = companySetupSlice.actions;
export default companySetupSlice.reducer;
