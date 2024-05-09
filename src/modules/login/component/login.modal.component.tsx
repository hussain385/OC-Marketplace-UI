import React from 'react';
import { Box, Button, Typography } from '@mui/material';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import { ForgotPasswordSchema, forgotPasswordSchema } from '../../../common/utils/schema/forgot_password_schema';
import { Color } from '../../../theme';
import usePayload from '../../../common/utils/hooks/usePayload';
import { InputForm } from '../../../common/components/forms';
import { useGetUserEmailExistMutation, useForgotPasswordMutation } from '../../../redux/apis/authApi';

type ModalProps = {
  isModal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginModal = ({ isModal, setModal }: ModalProps) => {
  const method = useForm<ForgotPasswordSchema>({ resolver: yupResolver(forgotPasswordSchema) });

  const { handleSubmit } = method;

  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const { email, active } = usePayload();

  const [getUserEmailExist] = useGetUserEmailExistMutation();

  const [forgotPassword] = useForgotPasswordMutation();

  const submitRequest: SubmitHandler<ForgotPasswordSchema> = async (formData) => {
    const { email } = formData as { email: string };
    const emailExist = await getUserEmailExist({ email: email });

    if ('data' in emailExist) {
      const { data } = emailExist;
      if (data === 1) {
        const res = await forgotPassword(email);

        if ('data' in res) {
          if (active === 'seller') {
            navigate('/verify-email?reset=true');
          } else {
            navigate('/verify-email?reset=true');
          }
          setModal(false);
          return res;
        }
      }
    }
  };
  return (
    <div
      style={{
        display: isModal ? 'flex' : 'none',
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        zIndex: 9999999999,
      }}
    >
      <Box
        sx={{
          width: '100%',
          minHeight: '114vh',
          borderRadius: '8px',
          background: 'rgba(0,0,0,.5)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '96%',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: { xs: 'flex-end', sm: 'center', md: 'center' },
            height: { xs: '75%', sm: '60%', md: '60%' },
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: '504px',
              minHeight: '329px',
              borderRadius: '8px',
              background: Color.priWhite,
              padding: '36px',
            }}
          >
            <Typography
              sx={{
                fontSize: '24px',
                fontWeight: 'bold',
                lineHeight: 1.2,
                letterSpacing: '-0.48px',
                color: Color.lightBlack,
              }}
            >
              Forgot your password
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '14px',
                lineHeight: '19px',
                letterSpacing: '-0.5px',
                color: Color.lightBlack,
                mt: '16px',
                mb: '16px',
              }}
            >
              No worries! Please enter the email address you used when signing up and we&#39;ll send you a link to reset your
              password.
            </Typography>
            <FormProvider {...method}>
              <form onSubmit={handleSubmit(submitRequest)}>
                <InputForm label='Email address' name='email' getValuebyInput={email ?? ''} setEmail={() => ''} />

                <Box sx={{ display: 'flex', gap: '16px' }}>
                  <Button
                    onClick={() => {
                      setModal(false);
                    }}
                    type='button'
                    variant='contained'
                    sx={{
                      width: '50%',
                      borderRadius: '2px',
                      height: '44px',
                      fontSize: '1.25rem',
                      marginTop: '8px',
                      background: Color.bgGreyLight,
                      color: Color.priBlue,
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
                        textTransform: 'capitalize',
                      }}
                    >
                      {/* {formSubmitted ? 'Please Wait...' : 'Continue'} */}
                      Cancel
                    </Typography>
                  </Button>
                  <Button
                    type='submit'
                    variant='contained'
                    color='secondary'
                    sx={{
                      width: '50%',
                      borderRadius: '2px',
                      height: '44px',
                      fontSize: '1.25rem',
                      marginTop: '8px',
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
                        textTransform: 'capitalize',
                      }}
                    >
                      {/* {formSubmitted ? 'Please Wait...' : 'Continue'} */}
                      Submit
                    </Typography>
                  </Button>
                </Box>
              </form>
            </FormProvider>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default React.memo(LoginModal);
