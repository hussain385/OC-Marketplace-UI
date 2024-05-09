import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { userAuthApi } from '../apis/authApi';
import { setCookie } from '@/common/utils/cookie';
import { Role, User } from '@/common/interface/User';
import { buyerAccountApi } from '../apis/accountApi';
import { IEntity } from '@/common/interface/entity-interface';
import { UserGroupLowerType } from '@/common/interface';
import { PURGE } from 'redux-persist';
import { find, isUndefined } from 'lodash';
import { RootState } from '@/redux/store.tsx';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface.ts';

interface userInfoProps {
  active?: string;
  companyDetails: object | null;
  companyName: string;
  companyServices: Record<any, any>;
  companyUEN: string;
  inviteCategory: string;
  inviteToken: string;
  numberofTries?: number;
  oldNumber?: string;
  payload?: any;
  refresh_token?: string;
  reset?: boolean;
  selectedEntity?: IEntity;
  selectedRole?: Role;
  skipOption: boolean;
  tempData: object | null;
  token?: string;
  user?: User;
  userInviteEmail: string;
  userProfile: object | undefined;
  userRole: string;
  userValue?: any;
  verifying_status?: any;
  step?: number;
  invitationToken?: string;
  roles?: any;
  clientType: UserGroupLowerType;
  sessionIdForSingpass?: string;
  selectManageEntity?: IEntity;
}

const INIT_STATE: userInfoProps = {
  companyDetails: {},
  companyName: '',
  companyServices: {},
  companyUEN: '',
  inviteCategory: '',
  inviteToken: '',
  refresh_token: '',
  skipOption: false,
  tempData: {},
  token: '',
  userInviteEmail: '',
  userProfile: {},
  userRole: '',
  clientType: 'buyer',
  user: undefined,
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: INIT_STATE,
  reducers: {
    userInfoUpdated: (
      state,
      action: PayloadAction<{
        user?: any;
        token?: string;
        refresh_token?: string;
        sessionIdForSingpass?: string;
      }>,
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    refreshTokenUpdated: (state, action: PayloadAction<{ token: string; refresh_token: string }>) => {
      const { token, refresh_token } = action.payload;
      state.token = token;
      state.refresh_token = refresh_token;
    },
    selectedEntityUpdated: (state, action: PayloadAction<any>) => {
      state.selectedEntity = action.payload;

      setCookie('x-client-entityId', action.payload?.uid ?? '', 99);

      state.selectedRole = find(state.user?.roles, (e) => e.entityId === state.selectedEntity?.uid);
    },
    selectEntityFromManage: (state, action: PayloadAction<IEntity>) => {
      state.selectManageEntity = action.payload;
    },
    userLogout: () => INIT_STATE,
    userRoleUpdated: (state, action: PayloadAction<string>) => {
      state.userRole = action.payload;
    },
    countExceedUpdated: (state, action: PayloadAction<{ numberofTries: number; oldMobileNumber: string }>) => {
      state.numberofTries = action.payload.numberofTries;
      state.oldNumber = action.payload.oldMobileNumber;
    },
    userFromStateUpdated: (state, action: PayloadAction<any>) => {
      state.payload = action.payload;
    },
    userValidUpdated: (state, action: PayloadAction<any>) => {
      state.userValue = action.payload;
    },
    companyByAccountUpdated: (state, action: PayloadAction<any>) => {
      state.companyDetails = action.payload;
    },
    companyServicesUpdated: (state, action: PayloadAction<any>) => {
      state.companyServices = action.payload;
    },
    updateUserInfo: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
    updateTempData: (state, action: PayloadAction<any>) => {
      state.tempData = { ...action.payload };
    },
    identityUserInfoTempDataUpdated: (state, action: PayloadAction<any>) => {
      state.verifying_status = { ...action.payload };
    },
    invitationValuesUpdated: (state, action: PayloadAction<any>) => {
      const { inviteToken, inviteCategory, companyName, companyUEN, userInviteEmail } = action.payload;
      state.inviteToken = inviteToken;
      state.inviteCategory = inviteCategory;
      state.companyName = companyName;
      state.companyUEN = companyUEN;
      state.userInviteEmail = userInviteEmail;
    },
    skipOnboardingUpdated: (state, action: PayloadAction<boolean>) => {
      state.skipOption = action.payload;
    },
    setClientType: (state, action: PayloadAction<UserGroupLowerType>) => {
      state.clientType = action.payload;
    },
  },
  extraReducers: (builder) => {
    /**
     * Reset State
     */
    builder.addCase(PURGE, () => INIT_STATE);

    /**
     * User Me Profile
     */
    builder.addMatcher(buyerAccountApi.endpoints.getUserME.matchFulfilled, (state, action) => {
      const user = action.payload;
      state.user = user;
      const role = find(user.roles, (e) => e.entityId === state.selectedEntity?.uid);
      if (role) {
        setCookie('x-client-entityId', role.entityId, 99);
        state.selectedRole = role;
      } else if (user.roles.length > 0) {
        setCookie('x-client-entityId', user.roles[0].entityId, 99);
        state.selectedRole = user.roles[0];
      }
    });

    /**
     * Refresh Token Matcher
     */
    builder.addMatcher(userAuthApi.endpoints.refreshUserToken.matchFulfilled, (state, { payload }) => {
      state.token = payload.access_token;
      state.refresh_token = payload.refresh_token;
    });

    /**
     * Register & Login user Matcher
     */
    builder.addMatcher(
      isAnyOf(userAuthApi.endpoints.loginUser.matchFulfilled, userAuthApi.endpoints.registerUser.matchFulfilled),
      (state, { payload, meta }) => {
        const { user } = payload;
        setCookie('token', payload.jwt, 99);
        updateUserStates(user, state);
        state.token = payload.jwt;
        state.refresh_token = payload.refresh_token;
      },
    );

    /**
     * Singpass Login Matcher
     */
    builder.addMatcher(userAuthApi.endpoints.loginwithSingPass.matchFulfilled, (state, { payload }) => {
      if (!isUndefined(payload.isRegistered) && payload.isRegistered === true) {
        updateUserStates(payload.user, state);
      }
    });
  },
});

const updateUserStates = (user: User, state: any) => {
  setCookie('x-client-type', user.metadata.categories[0].toLowerCase(), 99);
  state.user = user;
  state.userRole = user.metadata.categories[0].toLowerCase();
  state.active = user.metadata.categories[0].toLowerCase();
  state.clientType = user.metadata.categories[0].toLowerCase() as UserGroupLowerType;

  const role = find(user.roles, (e) => e.entityId === state.selectedEntity?.uid);
  if (role) {
    setCookie('x-client-entityId', role.entityId, 99);
    state.selectedRole = role;
  } else if (user.roles.length > 0) {
    setCookie('x-client-entityId', user.roles[0].entityId, 99);
    state.selectedRole = user.roles[0];
  }
};

export const {
  refreshTokenUpdated,
  userValidUpdated,
  userInfoUpdated,
  userLogout,
  userRoleUpdated,
  countExceedUpdated,
  userFromStateUpdated,
  companyByAccountUpdated,
  companyServicesUpdated,
  updateUserInfo,
  updateTempData,
  identityUserInfoTempDataUpdated,
  invitationValuesUpdated,
  skipOnboardingUpdated,
  selectedEntityUpdated,
  setClientType,
  selectEntityFromManage,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;

/**
 ********************************
 * Below here is custom selector
 ********************************
 */

export const getIndividualRole = (state: RootState) =>
  state.mainState.useInfo.user?.roles.find((r) => r.entityType === companyProfiles.individual);

export const getFreelancerRole = (state: RootState) =>
  state.mainState.useInfo.user?.roles.find((r) => r.entityType === companyProfiles.freelancer);
