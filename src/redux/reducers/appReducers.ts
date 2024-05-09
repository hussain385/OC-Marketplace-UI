import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { clearAllStateAction } from '../actions';
import { userAuthApi } from '../apis/authApi';

type InitStateProps = {
  redirectUrl: string | undefined;
  hasSessionTimeout: boolean;
};
const initialState: InitStateProps = {
  redirectUrl: undefined,
  hasSessionTimeout: false,
};

const appReducerSlice = createSlice({
  name: 'appReducers',
  initialState: initialState,
  reducers: {
    updateAppConfig: (state, action: PayloadAction<InitStateProps>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateSessionTimeoutAction: (state, action: PayloadAction<boolean>) => {
      state.hasSessionTimeout = action.payload;
    },
    updateRedirectUrlAction: (state, action: PayloadAction<string>) => {
      state.redirectUrl = action.payload;
    },
    resetAppConfigAction: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(clearAllStateAction, (state) => {
      state.hasSessionTimeout = false;
    });
    builder.addMatcher(
      isAnyOf(userAuthApi.endpoints.loginUser.matchFulfilled, userAuthApi.endpoints.loginwithSingPass.matchFulfilled),
      (state) => {
        state.redirectUrl = undefined;
        state.hasSessionTimeout = false;
      },
    );
  },
});

export const { updateAppConfig, updateSessionTimeoutAction, updateRedirectUrlAction, resetAppConfigAction } =
  appReducerSlice.actions;

export default appReducerSlice.reducer;
