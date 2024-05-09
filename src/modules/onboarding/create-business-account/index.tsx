import React from 'react';
import { CompanyRegisterationWrapper } from '@/common/layout/company-registeration.wrapper';
import { Color } from '@/theme';
import { Box, Typography } from '@mui/material';
import { Heading24, TextButton } from '@/common/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AccountTypeControllerComponent from '@/modules/onboarding/create-business-account/components/account-type-controller.component';
import { useForm } from 'react-hook-form';
import { AppThemeBtnComponent } from '@/common/components/app-theme-btn.component';
import InputForm from '@/common/components/forms/input.form';
import ImageLabelWithTooltipComponent from '@/common/components/image-label-with-tooltip.component';
import UploadForm from '@/common/components/forms/upload.form';
import { useNavigate } from '@/router';
import { useCreateEntityMutation } from '@/redux/apis/marketplace';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, mixed } from 'yup';
import { isEmpty } from 'lodash';

export const createEntityScehme = object({
  name: string().required('The field should not be empty.'),
  description: string(),
  accountPic: mixed(),
});

const CreateBusinessAccount = () => {
  const navigate = useNavigate();
  const [CreateEntity, { isLoading }] = useCreateEntityMutation();

  const { control, handleSubmit } = useForm<any>({
    resolver: yupResolver(createEntityScehme),
    defaultValues: {
      accountType: 'BUSINESS',
      description: '',
      name: '',
    },
  });

  const onSubmitHandle = async (data: any) => {
    const formData = new FormData();
    const profile = {
      type: data.accountType,
      'detail.name': data.name,
      'detail.about': isEmpty(data.description) ? undefined : data.description,
    };

    formData.append('data', JSON.stringify({ profile }));
    formData.append('logoMedia', data.accountPic);
    await CreateEntity(formData)
      .unwrap()
      .then(() => navigate('/setup-organisation/success'));
  };

  return (
    <CompanyRegisterationWrapper wrapperStyle={{ background: 'white' }}>
      <form onSubmit={handleSubmit(onSubmitHandle)}>
        <Box sx={{ maxWidth: { xs: '100%', sm: '100%', md: '748px', margin: '0 auto', width: '100%' } }}>
          <Box>
            <TextButton onClick={() => navigate('/account/entities')} sx={{ color: Color.textBlack, marginLeft: '-0.8em' }}>
              <ArrowBackIosIcon fontSize='small' />
              <span style={{ fontSize: '14px' }}>Back</span>
            </TextButton>
            <Heading24 sx={{ marginTop: '1em' }}>Create business account</Heading24>
          </Box>
          <Typography sx={{ color: Color.textHint, marginTop: '1.5em' }}>
            You can only have <span style={{ fontWeight: '700' }}>one non-registered</span> business account. There is{' '}
            <span style={{ fontWeight: '700' }}>no limit for registered businesses.</span>
          </Typography>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '3em',
              marginBottom: '2.5em',
              marginTop: '1em',
              paddingBottom: '1.5em',
              borderBottom: `1px solid ${Color.bgLine}`,
            }}
          >
            <Typography
              sx={{
                fontSize: '14px !important',
                fontWeight: '600',
                marginTop: '5px',
              }}
            >
              Account type:
            </Typography>
            <AccountTypeControllerComponent control={control} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.2em' }}>
            <InputForm
              label={'Business name'}
              name={'name'}
              control={control}
              inputProps={{ placeholder: 'Business name' }}
              sx={{
                '.MuiOutlinedInput-notchedOutline': {
                  border: '1px solid #EAEAEA',
                },
              }}
            />
            <InputForm
              label={'Business description (optional)'}
              name={'description'}
              control={control}
              inputProps={{
                placeholder: 'Describe your business',
                sx: {
                  height: '7rem',
                  alignItems: 'start',
                  padding: '2px 0px',
                  border: '1px solid #EAEAEA',
                  '&:hover': { outline: '1px solid black' },
                  overflow: 'auto',
                },
                multiline: true,
              }}
              sx={{
                '.MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: 'none !important',
                },
              }}
            />
            <ImageLabelWithTooltipComponent
              tooltipText={'Must be JPEG, PNG format\n' + 'Maximum 5MB'}
              labelText={'Business profile photo (optional)'}
            />
            <UploadForm isDisabled={isLoading} control={{ control, name: 'accountPic' }} />
          </Box>
          <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: '3em' }}>
            <AppThemeBtnComponent
              type='submit'
              disabled={isLoading}
              customButtonStyle={{ height: '40px', display: 'block', width: { xs: '100%', sm: '90%' } }}
              color={isLoading ? Color.textBlack : Color.priWhite}
              backgroundColor={isLoading ? Color.bgGreyLight : Color.priBlue}
              width={'40%'}
              fontSize={'14px'}
              text={isLoading ? 'Please wait...' : 'Create business account'}
              hover={Color.textHint}
            />
          </Box>
        </Box>
      </form>
    </CompanyRegisterationWrapper>
  );
};

export default CreateBusinessAccount;
