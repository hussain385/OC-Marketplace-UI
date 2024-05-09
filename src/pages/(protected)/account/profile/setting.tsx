import { Box, ButtonBase, Typography } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { SlLock } from 'react-icons/sl';
import MainLayout from '@/common/layout/main.layout';
import { Color } from '@/theme.ts';
import { useAppSelector } from '@/redux/hooks.tsx';
import InfoIcon from '@mui/icons-material/Info';
import { RenderIf } from '@/common/components';
import { useResendEmailConfirmationMutation } from '@/redux/apis/authApi.ts';
import { showToast, ToastTypes } from '@/common/utils';
import { EntityStatus } from '@/common/interface';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface.ts';
import { useSetState } from 'react-use';
import { FullNameModal, MobileModal, PasswordModal } from '@/modules/setting/components/Update.modal.tsx';
import FormContainer from '@/modules/setting/components/formContainer.tsx';

function SettingPage() {
  const { user } = useAppSelector((state) => state.mainState.useInfo);
  const [ResendEmail, { isLoading, data: resendData }] = useResendEmailConfirmationMutation();
  const [{ isName, isPassword, isMobile }, setState] = useSetState({
    isName: false,
    isEmail: false,
    isPassword: false,
    isMobile: false,
  });
  const defaultRoles = useMemo(() => {
    const index = user?.roles?.findIndex((r) => r.entityType?.includes(companyProfiles.individual));
    if (index !== undefined && index !== -1) {
      return user?.roles[index];
    }
    return undefined;
  }, [user?.roles]);

  useEffect(() => {
    if (resendData?.message) {
      showToast(resendData?.message as string, ToastTypes.SUCCESS);
    }
  }, [resendData?.message]);

  return (
    <MainLayout pageTitle='Account setting' breadcrumb={[{ label: 'Dashboard', path: '/account' }, { label: 'Account setting' }]}>
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          width: '100%',
          justifyContent: 'center',
          mt: { xs: '8px', md: '32px' },
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'start',
          padding: '16px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            maxWidth: '768px',
            padding: { xs: '32px 16px', md: '40px 56px' },
            gap: '24px',
            flexDirection: 'column',
            width: '100%',
            borderRadius: '8px',
            border: '1px solid #EAEAEA',
          }}
        >
          <Typography sx={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.8px' }}>Your account information</Typography>

          {/* When user email is not verified */}
          <RenderIf value={!user?.emailConfirmed}>
            <Box
              sx={{
                padding: '5px 16px',
                display: 'flex',
                gap: '4px',
                borderRadius: '4px',
                background: '#FFE9E8',
                alignItems: 'center',
              }}
            >
              <InfoIcon sx={{ color: '#EC4C60', fontSize: '24px' }} />
              <Typography sx={{ fontSize: '12px', fontWeight: 500, color: 'black', letterSpacing: '-0.5px' }}>
                We’ve noticed that your email is not verified. Please take a moment to verify your account.{' '}
                <ButtonBase
                  disabled={isLoading}
                  disableRipple
                  onClick={() => ResendEmail({ userId: user?.id ?? '' })}
                  component={'span'}
                  sx={{
                    fontSize: '12px',
                    display: 'contents',
                    color: Color.priBlue,
                    fontWeight: 700,
                    letterSpacing: '-0.5px',
                    // cursor: 'pointer',
                  }}
                >
                  Resend verification email
                </ButtonBase>
              </Typography>
            </Box>
          </RenderIf>

          <FormContainer
            label={'Full name'}
            value={user?.name}
            isLock={defaultRoles?.entityStatus === EntityStatus.verified}
            onUpdate={() => setState({ isName: true })}
          />

          <Box sx={{ display: 'flex', gap: { xs: '24px', md: '16px' }, flexDirection: { xs: 'column', lg: 'row' } }}>
            <FormContainer label={'Email address'} value={user?.email} isLock onUpdate={() => setState({ isEmail: true })} />
            <FormContainer label={'Mobile number'} value={user?.mobile} onUpdate={() => setState({ isMobile: true })} />
          </Box>

          <FormContainer
            label={'Password'}
            value={'********'}
            btnLabel={'Change'}
            onUpdate={() => setState({ isPassword: true })}
          />
        </Box>

        {/* Info Container */}
        <Box
          sx={{
            maxWidth: { xs: '100%', md: '320px' },
            width: '100%',
            borderRadius: '8px',
            border: '1px solid #EAEAEA',
            padding: '24px 16px',
          }}
        >
          <Box sx={{ display: 'flex', gap: '8px', mb: '8px' }}>
            <SlLock style={{ color: Color.priRed, fontSize: '24px' }} />
            <Typography sx={{ letterSpacing: '-0.64px', fontSize: '16px', fontWeight: 600 }}>
              Which details can be edited?
            </Typography>
          </Box>
          <Typography sx={{ letterSpacing: '-0.21px' }}>
            Please note that Business details used to verify your identity can’t be changed. Contact info and some personal
            details can be edited.
          </Typography>
        </Box>
      </Box>

      {/* Modals */}
      <FullNameModal isOpen={isName} onClose={() => setState({ isName: false })} value={user?.name} />
      <PasswordModal isOpen={isPassword} onClose={() => setState({ isPassword: false })} />
      <MobileModal
        isOpen={isMobile}
        onClose={() => setState({ isMobile: false })}
        contactMobileCountryCode={user?.mobileCountryCode}
        mobile={user?.mobile}
      />
    </MainLayout>
  );
}

export default SettingPage;
