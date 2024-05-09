/* eslint-disable no-unused-vars */
import { Box, Dialog, DialogContent, Divider, Typography } from '@mui/material';

import { isEmpty, isUndefined } from 'lodash';

import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { BorderdBoxContainer, ErrorLabel, MuiPlainInputField, PrimaryButton, SecondryButton } from '../../../common/styles/index';

import { AlertMessageBox, ToastTypes } from '../../../common/utils/index';

import { RenderIf, useMediaBreakpoint } from '../../../common/components';

import { showAlertMessageMobile } from '../../../common/components/mobile-alert-box/alert.component';

import { IIError, IMenuItems, USER_GROUP_LOWERCASE } from '../../../common/interface';

import { useAppSelector } from '../../../redux/hooks';

import { useSendInvitationMutation } from '../../../redux/apis/teamManagementApi';

import { EMAILREGEX } from '../../../common/constants';

import { DropDownMenuComponent } from '../../../common/components/dropdown-menu-component/dropdown-menu.component';

import usePayloadUseInfo from '../../../common/utils/hooks/usePayloadUseInfo';

import useLogoutEventHandler from '../../../common/utils/hooks/useLogout';
import { getCookie } from '../../../common/utils/cookie';

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  closeBtnLabel?: string;
  onUpdateInfo?: () => void;
};

const roles: IMenuItems[] = [
  {
    name: 'Owner',
    value: 'Owner',
  },
  {
    name: 'Admin',
    value: 'Admin',
  },
  {
    name: 'Member',
    value: 'Member',
  },
];

const adminRoles: IMenuItems[] = [
  {
    name: 'Admin',
    value: 'Admin',
  },
  {
    name: 'Member',
    value: 'Member',
  },
];

export default function InviteModal(props: Props) {
  const [emailInput, setEmailInput] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<IMenuItems>({ name: 'Owner', value: 'Owner' });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { user } = useAppSelector((state) => state.mainState.useInfo);
  const [sendInvitation, { error, isSuccess }] = useSendInvitationMutation();
  const { xs } = useMediaBreakpoint();
  const { clearAll } = useLogoutEventHandler();
  const navigate = useNavigate();
  const { selectedEntity } = usePayloadUseInfo();

  useEffect(() => {
    setSelectedValue(
      user?.roles[0].role.includes('Owner') && selectedEntity?.status !== 'VERIFIED'
        ? { name: 'Owner', value: 'Owner' }
        : { name: 'Admin', value: 'Admin' },
    );
  }, [user?.roles, selectedEntity?.status]);

  const onCloseHandle = () => {
    props.onClose && props.onClose();
    setEmailInput('');
  };

  useEffect(() => {
    if (!isUndefined(error)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const resError = error as IIError;
      setIsSubmitting(false);
      if (resError?.data?.message.includes('Unauthorized')) {
        clearAll;
        navigate('/login');
      }
    } else if (isSuccess) {
      setIsSubmitting(false);
      props.onUpdateInfo && props.onUpdateInfo();
      setEmailInput('');
      if (!xs) {
        showAlertMessageMobile('Email was sent successfully', ToastTypes.SUCCESS, 'top-right');
      } else {
        showAlertMessageMobile('Email was sent successfully', ToastTypes.SUCCESS);
      }
    }
  }, [error, isSuccess]);

  const onOkHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEmpty(emailInput)) {
      setErrorMessage('This field should not be empty.');
    } else if (!EMAILREGEX.test(emailInput)) {
      setErrorMessage('Invalid email address');
    } else {
      setIsSubmitting(true);
      const resError = error as IIError;

      await sendInvitation({
        invitation: {
          email: emailInput,
          entityId: selectedEntity?.uid as string,
          clientType:
            getCookie('x-client-type') === USER_GROUP_LOWERCASE.seller ? USER_GROUP_LOWERCASE.seller : USER_GROUP_LOWERCASE.buyer,
          role: selectedValue?.value,
        },
      })
        .then(async (res: unknown) => {
          if (typeof res === 'object' && res !== null) {
            props.onClose && props.onClose();
          } else {
            AlertMessageBox(xs, '', resError?.data?.message);
          }
        })
        .catch((_) => {
          AlertMessageBox(xs, '', resError?.data?.message);
        });
    }
  };

  return (
    <Dialog
      sx={(theme) => ({
        '& .MuiDialog-container': {
          width: '100%',
          margin: '0 auto',
          maxWidth: '45em',
          alignItems: { xs: 'flex-end', sm: 'center', md: 'center' },
          background: { xs: 'rgba(255, 255, 255, 0.85)', sm: 'transparent', md: 'transparent' },
        },
        [theme.breakpoints.down('sm')]: {
          '& .MuiDialog-paper': {
            width: '100%',
            margin: '0',
          },
        },
      })}
      open={props.isOpen}
      onClose={onCloseHandle}
      maxWidth='md'
      fullWidth={true}
    >
      <DialogContent sx={{ padding: { xs: '20px', sm: '24px', md: '24px' } }}>
        <form id='invite-form' onSubmit={onOkHandle}>
          <Box sx={{ padding: '10px' }}>
            <Box>
              <Typography sx={{ fontWeight: '700', fontSize: { xs: '20px', sm: '24px', md: '24px' } }}>
                Invite your member
              </Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: '400', letterSpacing: '-0.5px' }}>
                We&apos;ll send an invitation email to your member to join the organisation.
              </Typography>
              <Typography sx={{ marginTop: '10px', fontWeight: 'bold', fontSize: '14px !important' }}>Email address</Typography>
              <RenderIf value={!xs}>
                <BorderdBoxContainer
                  sx={{
                    display: 'flex',
                    height: '44px',
                    alignItems: 'center',
                    borderRadius: '2px',
                    paddingInline: '0px',
                  }}
                >
                  <MuiPlainInputField
                    type='text'
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput((e.target as HTMLInputElement).value);
                      setErrorMessage('');
                    }}
                    disableUnderline={true}
                  />
                  <Divider orientation='vertical' flexItem />
                  <Box sx={{ width: '46%' }}>
                    <DropDownMenuComponent
                      onMenuItemClick={(item: IMenuItems) => setSelectedValue(item)}
                      label='Permission'
                      menuItems={
                        user?.roles[0].role.includes('Owner') && selectedEntity?.status !== 'VERIFIED' ? roles : adminRoles
                      }
                    />
                  </Box>
                </BorderdBoxContainer>
                {!isEmpty(errorMessage) && <ErrorLabel sx={{ marginTop: 0 }}>{errorMessage}</ErrorLabel>}
              </RenderIf>
              <RenderIf value={xs}>
                <BorderdBoxContainer
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'flex', md: 'flex' },
                    height: '44px',
                    alignItems: 'center',
                    borderRadius: '2px',
                    padding: 0,
                    marginBottom: '95px',
                  }}
                >
                  <MuiPlainInputField
                    type='email'
                    value={emailInput}
                    sx={{ backgroud: 'red' }}
                    onChange={(e) => setEmailInput((e.target as HTMLInputElement).value)}
                    disableUnderline={true}
                    required
                  />
                  <Divider orientation='vertical' flexItem />
                  <Box sx={{ width: '100%', marginTop: '16px' }}>
                    <Typography sx={{ fontWeight: 600, letterSpacing: '-0.5px', fontSize: '0.875rem', lineHeight: '24px' }}>
                      Permission
                    </Typography>
                    <DropDownMenuComponent
                      overideFilterStyle={{ minWidth: '85%' }}
                      onMenuItemClick={(item: IMenuItems) => setSelectedValue(item)}
                      label=''
                      menuItems={
                        user?.roles[0].role.includes('Owner') && selectedEntity?.status !== 'VERIFIED' ? roles : adminRoles
                      }
                    />
                  </Box>
                </BorderdBoxContainer>
              </RenderIf>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: '3%', justifyContent: 'space-between' }}>
            <SecondryButton
              sx={(theme) => ({
                flex: 1,
                marginRight: '5px',
                color: '#6b6b6b',
                [theme.breakpoints.down(321)]: { flex: '1 0 1', height: '44px', fontSize: '14px' },
              })}
              onClick={onCloseHandle}
            >
              Cancel
            </SecondryButton>
            {isSubmitting ? (
              <SecondryButton sx={{ flex: 1, marginRight: '5px' }} disabled>
                Please wait...
              </SecondryButton>
            ) : (
              <PrimaryButton
                sx={(theme) => ({
                  flex: 1,
                  marginLeft: { xs: '0', sm: '5px', md: '5px' },
                  [theme.breakpoints.down(321)]: { flex: '1 0 1', height: '44px', fontSize: '14px' },
                })}
                type='submit'
              >
                Send invite
              </PrimaryButton>
            )}
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}
