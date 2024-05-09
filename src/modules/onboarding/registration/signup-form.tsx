/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Button, Checkbox, IconButton, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputForm from '@/common/components/forms/input.form';
import { ToastTypes, showToast } from '@/common/utils';
import useTeamInvitation from '@/common/utils/hooks/useTeamInvitationPayload';
import { RegisterSchemaType, registerSchema } from '@/common/utils/schema/register-user.schema';
import { Color } from '@/theme';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Modal from '@/common/components/modal.component';
import TermsConditionsContent from '@/modules/homePage/term-condition/component/terms-conditions/terms-conditions.content';
import { isEmpty } from 'lodash';
import { useSetState } from 'react-use';
import PrivacyPolicyContent from '@/modules/homePage/term-condition/component/privacy-policy/privacy-policy.content';

interface Props {
  email: string;
  onSubmit?: (data: any) => void;
}

const SignupForm = ({ email, onSubmit }: Props) => {
  const [{ showPassword, isPolicyTermChecked, showModal, whichContent }, setState] = useSetState({
    showPassword: false,
    isPolicyTermChecked: false,
    showModal: false,
    whichContent: 'terms',
  });
  const { userInviteEmail } = useTeamInvitation();
  const _registerMethods = useForm<RegisterSchemaType>({
    resolver: yupResolver(registerSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
      email: !isEmpty(userInviteEmail) ? userInviteEmail : !isEmpty(email) ? email : '',
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = _registerMethods;

  const onSubmitHandler = (data: any) => {
    onSubmit && onSubmit(data);
  };

  const onInValid = (error: any) => {
    if ('isTermsCondition' in error) {
      showToast('You must accept the terms and condition', ToastTypes.WARNING);
    }
  };

  const renderTermPolicyContent = () => {
    switch (whichContent) {
      case 'terms':
        return <TermsConditionsContent />;
      case 'policy':
        return <PrivacyPolicyContent />;
      default:
        return <TermsConditionsContent />;
    }
  };

  return (
    <>
      <FormProvider {..._registerMethods}>
        <Box noValidate component={'form'} onSubmit={handleSubmit(onSubmitHandler, onInValid)}>
          <InputForm label='Full name' name='username' control={control} />
          <Box
            sx={{
              flexDirection: { xs: 'column', md: 'row' },
              width: '100%',
            }}
          >
            <InputForm
              control={control}
              name={'password'}
              label={'Create password'}
              endAdornment={
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => setState((prevState) => ({ showPassword: !prevState.showPassword }))}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              }
              inputProps={{
                type: showPassword ? 'text' : 'password',
                placeholder: 'Enter password',
              }}
              sx={{ marginTop: '16px' }}
            />
          </Box>
          <Box sx={{ display: 'flex', width: '100%', marginTop: '16px', alignItems: 'center' }}>
            <Checkbox
              sx={{ padding: '0', paddingRight: '10px' }}
              onChange={(e) => {
                setState({ isPolicyTermChecked: e.target.checked });
              }}
            />
            <Typography sx={{ fontSize: '12px', color: Color.textGray7E, fontWeight: '600' }}>
              By signing up, you agree to OPNCORP&apos;s{' '}
              <a
                onClick={() => setState({ showModal: true, whichContent: 'terms' })}
                style={{ color: Color.priBlue, cursor: 'pointer', marginRight: '5px' }}
              >
                Terms and conditions
              </a>
              and
              <a
                onClick={() => setState({ showModal: true, whichContent: 'policy' })}
                style={{ color: Color.priBlue, cursor: 'pointer', marginLeft: '5px' }}
              >
                Privacy policy.
              </a>
            </Typography>
          </Box>
          <Button
            disabled={isSubmitting || !isPolicyTermChecked}
            type='submit'
            variant='contained'
            color='secondary'
            sx={{
              width: '100%',
              maxWidth: '432px',
              borderRadius: '4px',
              height: '44px',
              fontSize: '1.25rem',
              marginTop: '24px',
            }}
          >
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                fontStretch: 'normal',
                fontStyle: 'normal',
                lineHeight: 1.5,
                letterSpacing: '-0.5px',
                textTransform: 'none',
              }}
            >
              {isSubmitting ? 'Please wait' : 'Sign up'}
            </Typography>
          </Button>
        </Box>
      </FormProvider>
      <Modal
        isOpen={showModal}
        noBtnDisplay={true}
        content={renderTermPolicyContent()}
        maxWidth='md'
        closeVariant='outside'
        onCancel={() => setState({ showModal: false })}
      />
    </>
  );
};

export default SignupForm;
