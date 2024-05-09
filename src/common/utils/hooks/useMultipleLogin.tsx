/* eslint-disable no-unused-vars */
import React from 'react';

import { isEmpty, isUndefined } from 'lodash';

import { SubmitHandler } from 'react-hook-form';

import { useNavigate, useSearchParams } from 'react-router-dom';

import ApiUserEndpoint from '../../mock-data/api';

import { useValidated } from '../global_state.util';

import { LoginSchemaType } from '../schema/login-schema';

import useCountryValue from './useCountryValue';

import usePayload from './usePayload';

import { AlertMessageBox, loginUserConditions, passwordEncrypt } from '..';

import { ILoginRes } from '../../interface/login-interface';

import { useGetUserEmailExistMutation, useLoginUserMutation, userAuthApi } from '../../../redux/apis/authApi';

import { useAcceptInvitationMutation } from '../../../redux/apis/teamManagementApi';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

import { useLazyGetEntityInfoQuery } from '../../../redux/apis/marketplace';

import useTeamInvitation from './useTeamInvitationPayload';

import { useMediaBreakpoint } from '../../components';

import { invitationToken } from '../../../modules/buyer/redux/actions/teamManagementAction';

import { getCookie, setCookie } from '../cookie';

import usePayloadUseInfo from './usePayloadUseInfo';

import useLogoutEventHandler from './useLogout';
import {
  selectedEntityUpdated,
  userFromStateUpdated,
  userInfoUpdated,
  userRoleUpdated,
  userValidUpdated,
} from '../../../redux/reducers/authReducers';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface.ts';
import { Role } from '@/common/interface/User.ts';

const useUniversalLogin = () => {
  const [search] = useSearchParams();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [loginUser, { error: loginError }] = useLoginUserMutation();

  const [validated, setValidated] = useValidated();

  const [getUserEmail] = useGetUserEmailExistMutation();

  const { userInviteEmail } = useAppSelector((state) => state.mainState.useInfo);

  const [acceptInvitation, { error: acceptError, isSuccess: acceptSuccess }] = useAcceptInvitationMutation();

  const { invitationToken: getInvitationToken } = useTeamInvitation();

  const { xs } = useMediaBreakpoint();

  const [formSubmitted, isformSubmitted] = React.useState(false);

  const { active } = usePayload();

  const { payload } = usePayloadUseInfo();

  const { country, setCountry, countryName, setCountryName } = useCountryValue();

  const [getSingleEntity] = useLazyGetEntityInfoQuery();

  const { clearAll } = useLogoutEventHandler();

  const onSubmitHandler: SubmitHandler<LoginSchemaType> = (values) => {
    // 👇 Executing the loginUser Mutations

    const emailPhone = country.concat(values.email as string);
    const emailRequest = values.email as string;
    const passwordRequest = values.password as string;

    dispatch(userValidUpdated({ isValid: true, active: active }));

    if (isUndefined(passwordRequest)) {
      if (emailRequest?.match(/[0-9]/) && !emailRequest?.match(/[a-zA-Z]/)) {
        const getUserMobileData: any = dispatch(
          userAuthApi.endpoints.getUserMobile.initiate({ phone: emailPhone.replace('+', '') }),
        );

        getUserMobileData.then((res: { data: number }) => {
          if (res.data === 1) {
            dispatchAction({
              mobile: emailRequest,
              countryCode: country,
              countryName: countryName,
              active: getCookie('x-client-type'),
            });

            setValidated(true);
          } else {
            dispatch(
              userFromStateUpdated({
                mobile: emailRequest,
                countryCode: country,
                countryName: countryName,
                active: getCookie('x-client-type'),
              }),
            );

            navigate('/create');
          }
        });
      } else {
        // const getUserEmailData: any = dispatch(
        //   userAuthApi.endpoints.getUserEmail.initiate(emailRequest, {
        //     forceRefetch: true,
        //   }),
        // );
        const getUserEmailData = getUserEmail({ email: emailRequest as string });

        getUserEmailData.then((res: any) => {
          if ((res.data as number) === 1) {
            dispatchAction({ email: emailRequest, active: getCookie('x-client-type') });
            setValidated(true);
          } else {
            dispatch(userFromStateUpdated({ email: emailRequest }));

            dispatchAction({ email: emailRequest, active: getCookie('x-client-type') });
            navigate('/create');
          }
        });
      }
    } else {
      setValidated(true);
      if (
        emailRequest?.match(/^(?=.*\d).{0,}$/) &&
        !isEmpty(passwordRequest) &&
        !emailRequest.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
      ) {
        sendRequest(emailPhone, passwordRequest);
      } else {
        if (!isEmpty(passwordRequest)) {
          sendRequest(emailRequest, passwordRequest);
        }
      }
    }
  };

  function dispatchAction<T extends object>(payload: T) {
    dispatch(userFromStateUpdated(payload));
  }

  async function sendRequest(request: string, password: string) {
    //remove isLoggedIn cookie
    setCookie('isLoggedIn', 'false', 0);
    const token = ApiUserEndpoint.tokenBuffer(request, password);
    await loginUser({
      emailPhone: request,
      password: password,
      role: active,
      token: token,
    })
      .then(async (response: unknown) => {
        const request = (response as ILoginRes).data;
        const { user, jwt, refresh_token } = request;
        // setCookie('token', jwt, 99);
        // setCookie('x-client-type', user.metadata.categories[0].toLowerCase(), 99);
        if (
          (user.metadata && !isEmpty(user.metadata.categories) && !isUndefined(getInvitationToken)) ||
          !isEmpty(getInvitationToken)
        ) {
          // dispatch(userInfo({ data: user, token: jwt, refresh_token: refresh_token }));
          // dispatch(userRole(user.metadata.categories[0].toLowerCase()));
          await acceptInvitation({ invitationToken: getInvitationToken, isAccept: true })
            .then(async (res) => {
              if ('data' in res) {
                isformSubmitted(true);

                dispatch(invitationToken({}));
                // clearAll();
                // dispatch(userInfo({ data: user, token: jwt, refresh_token: refresh_token }));
                // dispatch(userRole(user.metadata.categories[0].toLowerCase()));
                await conditionAction(user.metadata.categories[0].toLowerCase(), user, true);
                AlertMessageBox(xs, 'Invitation accepted successfully.');
              }
            })
            .catch(() => AlertMessageBox(xs, '', 'Send invitation again'));
        }

        if (
          user.metadata &&
          !isEmpty(user.metadata.categories) &&
          isUndefined(getInvitationToken) &&
          isEmpty(getInvitationToken)
        ) {
          //clearAll();
          // dispatch(userRole(user.metadata.categories[0].toLowerCase()));
          dispatch(
            userFromStateUpdated({
              ...payload,
              active: user.metadata.categories[0].toLowerCase(),
            }),
          );

          isformSubmitted(true);

          loginUserConditions(request, user.metadata.categories[0], active, password, (active, request, password) => {
            return redirect(active, request, password);
          });
        }
      })
      .catch(() => {
        isformSubmitted(false);
      });
  }

  const conditionAction = async (type: string, user: any, invitation?: boolean) => {
    const { roles } = user;
    const redirectUri = search.get('redirect');

    /**
     * removed this code after OE-679 change and redirect seller / buyer directly on dashboard
     * jira ticket: https://leadingtech.atlassian.net/browse/OE-679
     */

    /*
    if (!isEmpty(roles)) {
      await getSingleEntity({ entityId: roles[0].entityId, queryObject: {} })
        .unwrap()
        .then((data) => {
          if (data) {
            const {
              data: { entity },
            } = data;

            dispatch(selectedEntityUpdated(entity));
            if (redirectUri) {
              navigate(redirectUri);
            } else if (
              invitation &&
              roles[0].role === 'Owner' &&
              (entity.status === CompanyStatus.PENDING || entity.status === CompanyStatus.DRAFT)
            ) {
              dispatch(getCompanyStep(2));
              navigate('/verify-company');
            } else if (!isEmpty(serviceIdJump)) {
              setCookie('x-client-type', 'buyer', 15);
              navigate(`/service-detail/${serviceIdJump}`, { state: { id: serviceIdJump } });
            } else if (entity.currentStep === 1) {
              dispatch(getCompanyStep(0));
              navigate('/profile-choice');
            } else if (entity.currentStep < 6 && type === 'seller') {
              dispatch(getCompanyStep(entity.currentStep - 1));
              navigate('/account/profile');
            } else {
              dispatch(getCompanyStep(entity.currentStep - 1));
              navigate('/account');
            }
          } else {
            navigate('/profile-choice');
          }
        });
    } else {
      if (!isEmpty(serviceIdJump)) {
        dispatch(getCompanyStep(0));
        setCookie('x-client-type', 'buyer', 15);
        navigate(`/service-detail/${serviceIdJump}`, { state: { id: serviceIdJump } });
      } else {
        navigate('/profile-choice');
      }
    }
    */
    try {
      const entityId = roles.find((r: Role) => r.entityType?.includes(companyProfiles.individual))?.entityId ?? roles[0].entityId;
      await getSingleEntity({ entityId, queryObject: {} })
        .unwrap()
        .then((data) => {
          if (data) {
            const { data: entity } = data;

            dispatch(selectedEntityUpdated(entity));
            if (redirectUri) {
              navigate(redirectUri);
            } else {
              navigate('/account');
            }
          }
        });
    } catch {
      throw 'No entity found';
    }
  };

  const redirect = async (type: string, res: any, password?: string) => {
    const { jwt, user, refresh_token } = res;
    await dispatch(userInfoUpdated({ user, token: jwt, refresh_token: refresh_token }));
    if (password) {
      passwordEncrypt(res, password, dispatch);
    }
    dispatch(userRoleUpdated(type));
    await conditionAction(type, user);
  };

  return {
    onSubmitHandler,
    redirect,
    sendRequest,
    formSubmitted,
    loginError,
    acceptError,
    acceptSuccess,
    userInviteEmail,
    setValidated,
    validated,
    country,
    setCountry,
    countryName,
    setCountryName,
    conditionAction,
  };
};

export default useUniversalLogin;
