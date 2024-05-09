import { EMPLOYEE_VALUES, INVITED_USER, TEAMS_ENTITY } from '../../../../redux/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface employeeInfoProps {
  employeeInfo: object[];
  invitation?: any;
  validEntity?: any;
}

const INIT_STATE: employeeInfoProps = {
  employeeInfo: [],
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case EMPLOYEE_VALUES:
      return { ...state, employeeInfo: action.payload };
    case INVITED_USER:
      return {
        ...state,
        invitation: {
          ...action.payload,
        },
      };
    case TEAMS_ENTITY:
      return {
        ...state,
        validEntity: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

const teamManagementSlice = createSlice({
  name: 'teamManagementSlice',
  initialState: INIT_STATE,
  reducers: {
    employeeValuesUpdated: (state, action: PayloadAction<any>) => {
      state.employeeInfo = action.payload;
    },
    invitedUserUpdated: (state, action: PayloadAction<any>) => {
      state.invitation = action.payload;
    },
    teamsEntityUpdated: (state, action: PayloadAction<any>) => {
      state.validEntity = action.payload;
    },
  },
});

export const { employeeValuesUpdated } = teamManagementSlice.actions;
