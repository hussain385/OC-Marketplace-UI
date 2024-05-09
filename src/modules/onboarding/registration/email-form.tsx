/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import * as yup from 'yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import useTeamInvitation from '@/common/utils/hooks/useTeamInvitationPayload';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailSchema } from '@/common/utils/schema/validation-schemas';
import InputForm from '@/common/components/forms/input.form';
import { Box, Button, Typography } from '@mui/material';
import { useGetUserEmailExistMutation } from '@/redux/apis/authApi';
import { ToastTypes, showToast } from '@/common/utils';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';

type EmailSchemaType = yup.InferType<typeof emailSchema>;
interface Props {
  onSubmit?: (data: string) => void;
}

const EmailForm = ({ onSubmit }: Props) => {
  const { userInviteEmail } = useTeamInvitation();
  const [getUserEmailExist] = useGetUserEmailExistMutation();
  const [isFormSubmitting, setFormSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<EmailSchemaType>({
    resolver: yupResolver(emailSchema),
    defaultValues: {
      email: !isEmpty(userInviteEmail) ? userInviteEmail : '',
    },
  });

  const { handleSubmit, control } = form;

  const onSubmitHandler: SubmitHandler<EmailSchemaType> = (formData) => {
    setFormSubmitting(true);
    getUserEmailExist({ email: formData.email })
      .then((res) => {
        if ('data' in res) {
          const { data: count } = res;
          if (count > 0) {
            //showToast('Email already exists, try another one.', ToastTypes.ERROR);
            // redirect to login page
            setFormSubmitting(false);
            navigate('/login', { state: { email: formData.email } });
          } else {
            onSubmit && onSubmit(formData.email);
          }
        }
      })
      .catch(() => {
        setFormSubmitting(false);
      });
  };

  return (
    <FormProvider {...form}>
      <Box noValidate component={'form'} onSubmit={handleSubmit(onSubmitHandler)}>
        <InputForm
          name='email'
          label='Email address'
          control={control}
          inputProps={{ placeholder: 'Email address', disabled: !isEmpty(userInviteEmail) }}
        />
        <Button
          disabled={isFormSubmitting}
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
            {isFormSubmitting ? 'Please wait' : 'Continue'}
          </Typography>
        </Button>
      </Box>
    </FormProvider>
  );
};
export default EmailForm;
