import { isEmpty, isNil, isUndefined } from 'lodash';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import BackgroundBoxWrapper from '../../../common/components/background-box.wrapper';
import CircularLoading from '../../../common/components/circular-loading';
import { IndividualStyles } from '@/common/styles/freelancer-verify-identity.styles';
import { setCache } from '@/common/utils/helpers/cache';
import usePayloadUseInfo from '../../../common/utils/hooks/usePayloadUseInfo';
import useSafeRender from '../../../common/utils/hooks/useSafeRender';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { invitationToken } from '../../buyer/redux/actions/teamManagementAction';
import { useGetUserEmailExistMutation } from '@/redux/apis/authApi';
import { useAcceptInvitationMutation, useLazyValidateInvitationQuery } from '@/redux/apis/teamManagementApi';
import { selectedEntityUpdated } from '@/redux/reducers/authReducers';
import { showToast, ToastTypes } from '@/common/utils';
import { useNavigate } from '@/router.ts';

const UserInvitation = () => {
  const [query] = useSearchParams();
  const [getUserEmail] = useGetUserEmailExistMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = usePayloadUseInfo();
  const [validateInvitation] = useLazyValidateInvitationQuery();
  const [acceptInvitation] = useAcceptInvitationMutation();
  const { user } = useAppSelector((state) => state.mainState.useInfo);

  const invitationAction = () => {
    getUserEmail({ email: query.get('email') }).then((res) => {
      if (((res as any).data as number) === 1) {
        if (!isUndefined(token) && !isEmpty(token)) {
          setCache('verify', true);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          acceptInvitation({ invitationToken: query.get('invitationToken') as string, isAccept: true }).then((res: any) => {
            if ('error' in res) {
              if (res?.error?.data?.statusCode === 401) {
                // clearAll();
                dispatch(
                  invitationToken({
                    invitationToken: query.get('invitationToken'),
                    userInviteEmail: query.get('email'),
                  }),
                );
                dispatch(selectedEntityUpdated({ uid: query.get('entityId') }));
                navigate('/login');
              }
            } else {
              if ('data' in res) {
                if (res?.data.succes === true) {
                  // clearAll();
                  dispatch(
                    invitationToken({
                      invitationToken: query.get('invitationToken'),
                      userInviteEmail: query.get('email'),
                    }),
                  );
                  dispatch(selectedEntityUpdated({ uid: query.get('entityId') }));
                  navigate('/login');
                }
              }
            }
          });
        } else {
          // clearAll();
          dispatch(
            invitationToken({
              invitationToken: query.get('invitationToken'),
              userInviteEmail: query.get('email'),
              userRoleType: query.get('clientType'),
            }),
          );
          dispatch(selectedEntityUpdated({ uid: query.get('entityId') }));

          navigate('/login');
          setCache('verify', true);
        }
      } else {
        // clearAll();
        dispatch(
          invitationToken({
            invitationToken: query.get('invitationToken'),
            userInviteEmail: query.get('email'),
            userRoleType: query.get('clientType'),
          }),
        );
        dispatch(selectedEntityUpdated({ uid: query.get('entityId') }));

        navigate('/create');
        setCache('verify', true);
      }
    });
  };

  useSafeRender(() => {
    const token = query.get('invitationToken');
    if (!isNil(token)) {
      validateInvitation({ invitationToken: token }).then((res) => {
        if (res.data.success && res.data.status === 'Pending') {
          /// If there is user just accept the invitation and go to redirect instead of create
          if (user) {
            acceptInvitation({ invitationToken: token, isAccept: true })
              .unwrap()
              .then((e) => {
                showToast(e.message ?? '', ToastTypes.SUCCESS);
                navigate('/account');
              });
          } else if (!isUndefined(query.get('email'))) {
            invitationAction();
          }
        } else if (res.data.success) {
          showToast(res.data.message, ToastTypes.INFO);
          navigate('/');
        } else {
          showToast('Invalid invitation token.', ToastTypes.ERROR);
          navigate('/');
        }
      });
    }
  });

  return (
    <BackgroundBoxWrapper onCustomStyles={IndividualStyles.backgroundWrapperImage}>
      <CircularLoading />
    </BackgroundBoxWrapper>
  );
};

export default UserInvitation;
