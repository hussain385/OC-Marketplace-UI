import React, { useCallback } from 'react';
import MainLayout from '@/common/layout/main.layout.tsx';
import { Box, ButtonBase, Typography } from '@mui/material';
import { Color } from '@/theme.ts';
import { SubmitHandler, useForm } from 'react-hook-form';
import DatePickerYearForm from '@/common/components/forms/date-picker.form.tsx';
import InputForm from '@/common/components/forms/input.form.tsx';
import { PrimaryButton } from '@/common/styles';
import { useUpdateProfileMutation } from '@/modules/servi-profile/service/profile.api.ts';
import { useAppSelector } from '@/redux/hooks.tsx';
import TextAreaForm from '@/common/components/forms/text-area.form.tsx';
import { InferType, mixed, number, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Achievements from '@/common/components/profile/edit/achievements.tsx';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface.ts';
import MyProfilePage from '@/pages/(protected)/account/my-profile';
import { showToast, ToastTypes } from '@/common/utils';
import AvatarForm from '@/common/components/forms/avatar.form';

const schema = object({
  logo: mixed(),
  detail: object({
    operationYear: string().notRequired(),
    numberEmployees: number().notRequired().default(0),
    about: string().notRequired(),
  }),
});

type SchemaType = InferType<typeof schema>;

function SellerProfile() {
  const [UpdateProfile, { isLoading }] = useUpdateProfileMutation();
  const selectedProfile = useAppSelector((state) => state.mainState.useInfo.selectedEntity?.profile);
  const { handleSubmit, control } = useForm<SchemaType>({
    resolver: yupResolver(schema),
    defaultValues: { ...(selectedProfile as any), logo: selectedProfile?.detail.logo },
  });

  /**
   * On Update Profile Api
   */
  const onSubmit: SubmitHandler<SchemaType> = useCallback(
    (data) => {
      const profile = { ...data };

      delete profile?.logo;
      delete (profile.detail as any)?.logo;

      const logo = data?.logo;

      const formData = new FormData();

      if (logo && logo instanceof File) {
        formData.append('logo', logo);
      }

      formData.append('data', JSON.stringify({ profile }));

      UpdateProfile({ body: formData })
        .unwrap()
        .then(() => showToast('Profile updated successfully.', ToastTypes.SUCCESS));
    },
    [UpdateProfile],
  );

  if (selectedProfile?.type === companyProfiles.freelancer) {
    return <MyProfilePage />;
  }

  return (
    <MainLayout pageTitle='Company profile' breadcrumb={[{ label: 'Dashboard', path: '/account' }, { label: 'Company profile' }]}>
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
          Company profile
          <br />
          <span
            style={{
              fontSize: '14px',
              fontWeight: 'normal',
              color: Color.textHint,
            }}
          >
            Attract clients with a complete and well-presented profile.
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
            renderLabel={<Typography className='subHeading'>Company logo</Typography>}
          />

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: '24px', md: '16px' } }}>
            <DatePickerYearForm
              name={'detail.operationYear'}
              control={control}
              renderLabel={<Typography className='subHeading'>Start of operations (Optional)</Typography>}
            />
            <InputForm
              control={control}
              name={'detail.numberEmployees'}
              renderLabel={<Typography className='subHeading'>Number of employees (Including you)</Typography>}
              inputProps={{ inputMode: 'numeric' }}
            />
          </Box>

          <TextAreaForm
            control={control}
            name={'detail.about'}
            inputProps={{
              minRows: 3,
            }}
            isCounting
            maxCount={600}
            renderLabel={<Typography className='subHeading'>About the company</Typography>}
          />

          <Box sx={{ ml: 'auto' }}>
            <ButtonBase sx={{ mr: '40px', fontWeight: 700, color: Color.textHint }}>Cancel</ButtonBase>
            <PrimaryButton type={'submit'} disabled={isLoading}>
              Save changes
            </PrimaryButton>
          </Box>
        </Box>

        <Achievements />
      </Box>
    </MainLayout>
  );
}

export default SellerProfile;
