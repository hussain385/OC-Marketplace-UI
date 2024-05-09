import React, { useCallback, useEffect, useMemo } from 'react';
import MainLayout from '@/common/layout/main.layout.tsx';
import { Box, ButtonBase, Typography } from '@mui/material';
import { Color } from '@/theme.ts';
import Achievements from '@/common/components/profile/edit/achievements.tsx';
import { PrimaryButton } from '@/common/styles';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextAreaForm from '@/common/components/forms/text-area.form.tsx';
import DatePickerForm from '@/common/components/forms/date-picker.form.tsx';
import InputForm from '@/common/components/forms/input.form.tsx';
import { useAppSelector } from '@/redux/hooks.tsx';
import { useUpdateProfileMutation } from '@/modules/servi-profile/service/profile.api.ts';
import { InferType, mixed, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IProfileDetail } from '@/common/interface/entity-interface.ts';
import { useGetEntityInfoQuery } from '@/redux/apis/marketplace.ts';
import { getIndividualRole } from '@/redux/reducers/authReducers.ts';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface.ts';
import { showToast, ToastTypes } from '@/common/utils';
import AvatarForm from '@/common/components/forms/avatar.form';

const schema = object({
  logo: mixed(),
  detail: object({
    name: string(),
    about: string().notRequired(),
    professionalStartYear: string(),
  }),
});

type SchemaType = InferType<typeof schema>;

function MyProfile() {
  const [UpdateProfile, { isLoading }] = useUpdateProfileMutation();
  const selectedEntity = useAppSelector((state) => state.mainState.useInfo.selectedEntity);
  const individualRole = useAppSelector(getIndividualRole);
  const selectEntity = useMemo(() => {
    if (selectedEntity?.profile.type === companyProfiles.freelancer) {
      return selectedEntity?.uid;
    } else {
      return individualRole?.entityId;
    }
  }, [individualRole?.entityId, selectedEntity?.profile.type, selectedEntity?.uid]);
  const { data, isLoading: isEntityLoading } = useGetEntityInfoQuery({ entityId: selectEntity ?? '' }, { skip: !selectEntity });

  const { handleSubmit, control, reset } = useForm<SchemaType>({
    resolver: yupResolver(schema),
    defaultValues: { ...data?.data?.profile, logo: data?.data?.profile?.detail.logo },
  });

  /**
   * Set form state since it can't be set in defaultValues because of Promise
   */
  useEffect(() => {
    if (!isEntityLoading) {
      reset({ ...data?.data?.profile, logo: data?.data?.profile?.detail.logo });
    }
  }, [data?.data?.profile, isEntityLoading, reset]);

  /**
   * On Update Profile Api
   */
  const onSubmit: SubmitHandler<SchemaType> = useCallback(
    (data) => {
      const profile = { ...data };

      delete profile?.logo;
      delete (profile.detail as IProfileDetail)?.logo;

      const logo = data?.logo;

      const formData = new FormData();

      if (logo && logo instanceof File) {
        formData.append('logo', logo);
      }

      formData.append('data', JSON.stringify({ profile }));

      UpdateProfile({ body: formData, entityId: selectEntity })
        .unwrap()
        .then(() => showToast('Profile updated successfully.', ToastTypes.SUCCESS));
    },
    [UpdateProfile, selectEntity],
  );

  return (
    <MainLayout pageTitle='My profile' breadcrumb={[{ label: 'Dashboard', path: '/account' }, { label: 'My profile' }]}>
      <Box
        sx={{
          mx: 'auto',
          maxWidth: '768px',
          width: '100%',
          mt: { xs: '10px', md: '40px' },
          paddingX: '16px',
        }}
      >
        <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
          Public profile information
          <br />
          <span
            style={{
              fontSize: '14px',
              fontWeight: 'normal',
              color: Color.textHint,
            }}
          >
            Update your information here.
          </span>
        </Typography>

        <Box
          component={'form'}
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            border: `1px ${Color.line} solid`,
            padding: { xs: '32px 16px', md: '40px 56px' },
            display: 'flex',
            gap: '24px',
            flexDirection: 'column',
            mb: '40px',
            mt: '24px',
          }}
        >
          <AvatarForm
            control={control}
            name={'logo'}
            renderLabel={<Typography className='subHeading'>Your avatar/logo</Typography>}
          />

          <InputForm
            control={control}
            name={'detail.name'}
            renderLabel={
              <>
                <Typography className='subHeading'>Display name</Typography>
                <Typography
                  sx={{
                    fontWeight: '400',
                    fontSize: '12px',
                    color: Color.bgGreyDark,
                    marginTop: '4px',
                  }}
                >
                  This name represents you and is what potential buyers see.
                </Typography>
              </>
            }
          />

          <DatePickerForm
            control={control}
            name={'detail.professionalStartYear'}
            sx={{ maxWidth: '320px' }}
            renderLabel={
              <>
                <Typography className='subHeading'>Start of professional experience (optional)</Typography>
              </>
            }
          />

          <TextAreaForm
            control={control}
            name={'detail.about'}
            inputProps={{ minRows: 3, placeholder: 'Write your brief introduction here' }}
            isCounting
            maxCount={600}
            renderLabel={
              <>
                <Typography className='subHeading'>About me (optional)</Typography>
                <Typography
                  sx={{
                    fontWeight: '400',
                    fontSize: '12px',
                    color: Color.bgGreyDark,
                    marginTop: '4px',
                  }}
                >
                  Brief introduction of your experience and expertise.
                </Typography>
              </>
            }
          />

          <Box sx={{ ml: 'auto' }}>
            <ButtonBase sx={{ mr: '40px', fontWeight: 700, color: Color.textHint }}>Cancel</ButtonBase>
            <PrimaryButton type={'submit'} disabled={isLoading}>
              Save changes
            </PrimaryButton>
          </Box>
        </Box>

        <Achievements entityId={data?.data.uid} isPastEmp />
      </Box>
    </MainLayout>
  );
}

export default MyProfile;
