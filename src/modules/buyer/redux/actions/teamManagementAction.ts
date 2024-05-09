/* eslint-disable @typescript-eslint/no-explicit-any */
import { EMPLOYEE_VALUES, INVITED_USER, TEAMS_ENTITY } from '../../../../redux/types';

export const employeeInformation = (data: any) => {
  return (dispatch: any) => {
    dispatch({
      type: EMPLOYEE_VALUES,
      payload: data,
    });
  };
};

export const invitationToken = (payload: object) => {
  return (dispatch: any) => {
    dispatch({
      type: INVITED_USER,
      payload,
    });
  };
};

export const getTeamsMatchEntity = (payload: object) => {
  return (dispatch: any) => {
    dispatch({
      type: TEAMS_ENTITY,
      payload,
    });
  };
};
