import React from 'react';
import { Box, Divider, Grid } from '@mui/material';
import { ActionButtonPrimary, ActionButtonSecondry, FormLabel } from '@/common/styles';
import InputForm from '@/common/components/forms/input.form.tsx';
import { Controller, DefaultValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { nonSingaporeSchema, nonSingaporeSchemaType } from '@/modules/onboarding/organisation/non-singapore/schema';
import SelectForm from '@/common/components/forms/select.form.tsx';
import useCountries from '@/common/utils/hooks/useCountries.tsx';
import { isEmpty, isNil } from 'lodash';
import CertPicker from '@/modules/onboarding/organisation/non-singapore/components/certPicker.tsx';
import { Color } from '@/theme.ts';
import RatioForm from '@/common/components/forms/ratio.form.tsx';
import { SkipAlertComponent } from '@/modules/onboarding/components/skip-alert.component.tsx';
import UploadForm from '@/common/components/forms/upload.form.tsx';
import { RenderIf } from '@/common/components';
import OfficerChoice from '@/modules/onboarding/organisation/non-singapore/components/officerChoice.tsx';
import { FrontInfoModal, SelfieInfoModal } from '@/modules/onboarding/organisation/non-singapore/components/photo.modals.tsx';

interface INonSingaporeForm {
  defaultValues?: DefaultValues<nonSingaporeSchemaType>;
  onPrevious: () => void;
  onSubmit: SubmitHandler<nonSingaporeSchemaType>;
}

const entity_type = [
  {
    label: 'Company',
    value: 'Company',
  },
  {
    label: 'Limited liability partnership',
    value: 'Limited liability partnership',
  },
  {
    label: 'Partnership',
    value: 'Partnership',
  },
  {
    label: 'Business/Sole proprietorship',
    value: 'Business/Sole proprietorship',
  },
  {
    label: 'Trust',
    value: 'Trust',
  },
  {
    label: 'Non-profit',
    value: 'Non-profit',
  },
  {
    label: 'Others',
    value: 'Others',
  },
];

const identity_types = [
  { label: 'National ID', value: 'NATIONAL' },
  { label: 'Passport', value: 'PASSPORT' },
];

export const role_list = [
  {
    label: 'Owner',
    value: 'Owner',
  },
  {
    label: 'Director',
    value: 'Director',
  },
  {
    label: 'Partner',
    value: 'Partner',
  },
  {
    label: 'Authorised Representative',
    value: 'Authorised Representative',
  },
  {
    label: 'Others',
    value: 'Others',
  },
];

function NonSingaporeForm({ defaultValues, onPrevious, onSubmit }: INonSingaporeForm) {
  const {
    selectedCountry,
    selectedState,
    countries,
    states,
    cities,
    setState: setCountryState,
  } = useCountries({
    city: defaultValues?.data?.profile?.detail?.location?.city ?? undefined,
    state: defaultValues?.data?.profile?.detail?.location?.state ?? undefined,
    country: defaultValues?.data?.profile?.detail?.location?.country ?? 'Singapore',
  });

  const { setValue, control, handleSubmit } = useForm<nonSingaporeSchemaType>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    resolver: yupResolver(nonSingaporeSchema),
    defaultValues,
  });

  return (
    <Box component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <FormLabel sx={{ marginBottom: '0.7em' }}>Organisation info</FormLabel>
      <Grid container columnSpacing={'16px'} rowSpacing={'8px'}>
        <Grid item xs={12}>
          <InputForm
            label={'Entity name'}
            name={'data.profile.detail.name'}
            control={control}
            isDisabled
            sx={{
              '.MuiOutlinedInput-notchedOutline': {
                border: '1px solid #EAEAEA',
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <SelectForm
            label={'Entity type'}
            name={'data.profile.detail.type'}
            control={control}
            items={entity_type}
            placeholder={'Select'}
            boxSx={{
              '.MuiOutlinedInput-notchedOutline': {
                border: '1px solid #EAEAEA',
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <InputForm
            label={'Company registration number(CRN)'}
            name={'data.profile.detail.registrationId'}
            control={control}
            sx={{
              '.MuiOutlinedInput-notchedOutline': {
                border: '1px solid #EAEAEA',
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <InputForm
            label={'Operating address 1'}
            name={'data.profile.detail.firstAddress'}
            control={control}
            inputProps={{ placeholder: 'Address line 1' }}
            sx={{
              '.MuiOutlinedInput-notchedOutline': {
                border: '1px solid #EAEAEA',
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <InputForm
            label={'Operating address 2'}
            name={'data.profile.detail.secondAddress'}
            control={control}
            inputProps={{ placeholder: 'Address line 2' }}
            sx={{
              '.MuiOutlinedInput-notchedOutline': {
                border: '1px solid #EAEAEA',
              },
            }}
          />
        </Grid>

        {/* Locations */}
        <Grid item xs={12} md={6}>
          <SelectForm
            isDisabled={isNil(countries)}
            items={countries?.map((e) => ({ label: e.name, value: e.name, option: e })) ?? []}
            label={'Country'}
            defaultValue={'Singapore'}
            name={'data.profile.detail.location.country'}
            control={control}
            placeholder={'Select country'}
            onChange={(value, option) => {
              setCountryState({ selectedCountry: option, selectedState: null, selectedCity: null });
              setValue('data.profile.detail.location.country', option?.name ?? '');
              setValue('data.profile.detail.location.state', undefined);
              setValue('data.profile.detail.location.city', undefined);
            }}
            boxSx={{
              '.MuiOutlinedInput-notchedOutline': {
                border: '1px solid #EAEAEA',
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectForm
            isDisabled={isNil(states) || !selectedCountry || isEmpty(states)}
            label={'State/Province'}
            name={'data.profile.detail.location.state'}
            control={control}
            items={
              states && !!selectedCountry
                ? states.map((e) => ({
                    label: e.name,
                    value: e.state_code,
                    option: e,
                  }))
                : []
            }
            placeholder={'Select state or province'}
            onChange={(value, option) => {
              setCountryState({ selectedState: option, selectedCity: null });
              setValue('data.profile.detail.location.state', option?.state_code ?? '');
              setValue('data.profile.detail.location.city', undefined);
            }}
            boxSx={{
              '.MuiOutlinedInput-notchedOutline': {
                border: '1px solid #EAEAEA',
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectForm
            isDisabled={isNil(cities) || !selectedState || isEmpty(cities) || isEmpty(states)}
            label={'City'}
            name={'data.profile.detail.location.city'}
            control={control}
            items={cities && !!selectedState ? cities.map((e) => ({ label: e.name, value: e.name, option: e })) : []}
            placeholder={'Select city'}
            onChange={(value, option) => {
              setCountryState({ selectedCity: option });
              setValue('data.profile.detail.location.city', option?.name ?? '');
            }}
            boxSx={{
              '.MuiOutlinedInput-notchedOutline': {
                border: '1px solid #EAEAEA',
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputForm
            label={'Postal code'}
            name={'data.profile.detail.location.postalCode'}
            control={control}
            sx={{
              '.MuiOutlinedInput-notchedOutline': {
                border: '1px solid #EAEAEA',
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name={'certMedia'}
            control={control}
            render={({ field, fieldState }) => <CertPicker field={field} fieldState={fieldState} />}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider style={{ width: '100%', backgroundColor: '#EAEAEA', height: '1px', marginBlock: '1em' }} />
        </Grid>

        <Grid item xs={12}>
          <OfficerChoice control={{ control, name: 'data.identity.type', defaultValue: 'NATIONAL' }} />
        </Grid>

        <Controller
          control={control}
          name={'data.identity.type'}
          render={({ field: { value } }) =>
            value === 'NONE' ? (
              <>
                <Grid item xs={12} md={6}>
                  <InputForm
                    label={'Authorised officer’s name'}
                    name={'data.identity.detail.officerName'}
                    control={control}
                    sx={{
                      '.MuiOutlinedInput-notchedOutline': {
                        border: '1px solid #EAEAEA',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputForm
                    label={'Authorised officer’s email address'}
                    name={'data.identity.detail.officerEmail'}
                    control={control}
                    inputProps={{ type: 'email' }}
                    sx={{
                      '.MuiOutlinedInput-notchedOutline': {
                        border: '1px solid #EAEAEA',
                      },
                    }}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <Box>
                    <FormLabel sx={{ marginBottom: '0.7em', fontSize: '14px !important' }}>
                      2. Upload your national ID or your passport to confirm your identity
                    </FormLabel>
                    <RatioForm
                      label={'Document type:'}
                      control={control}
                      name={'data.identity.type'}
                      labelSx={{ color: `${Color.bgGreyDark} !important`, m: 0 }}
                      items={identity_types}
                      radioGroupProps={{ row: true }}
                      defaultValue={'NATIONAL'}
                      sx={{ display: { xs: 'block', sm: 'flex' }, flexDirection: 'row', alignItems: 'center', gap: '25px' }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <InputForm
                    label={value === 'NATIONAL' ? 'Full name as per National ID' : 'Full name as per Passport'}
                    name={'data.identity.detail.fullname'}
                    control={control}
                    sx={{
                      '.MuiOutlinedInput-notchedOutline': {
                        border: '1px solid #EAEAEA',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputForm
                    label={value === 'NATIONAL' ? 'Identification number' : 'Passport number'}
                    name={'data.identity.detail.code'}
                    control={control}
                    sx={{
                      '.MuiOutlinedInput-notchedOutline': {
                        border: '1px solid #EAEAEA',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SelectForm
                    label={'Nationality'}
                    isDisabled={isNil(countries)}
                    items={countries?.map((e) => ({ label: e.name, value: e.name, option: e })) ?? []}
                    name={'data.identity.detail.nationality'}
                    control={control}
                    defaultValue={'Singapore'}
                    boxSx={{
                      '.MuiOutlinedInput-notchedOutline': {
                        border: '1px solid #EAEAEA',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <SelectForm
                    label={'Business role'}
                    items={role_list}
                    name={'data.identity.detail.businessRole'}
                    control={control}
                    placeholder={'Select'}
                    boxSx={{
                      '.MuiOutlinedInput-notchedOutline': {
                        border: '1px solid #EAEAEA',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FrontInfoModal heading={value === 'NATIONAL' ? 'National ID photo' : 'Passport photo'} />
                  <UploadForm label={'Front page'} control={{ control, name: 'mainMedia' }} />
                </Grid>

                <RenderIf value={value === 'NATIONAL'}>
                  <Grid item xs={12} sm={6} sx={{ placeSelf: 'end' }}>
                    <UploadForm label={'Back page'} control={{ control, name: 'backMedia' }} />
                  </Grid>
                </RenderIf>

                <Grid item xs={12} sm={6}>
                  <SelfieInfoModal heading={'Selfie photo with passport'} />
                  <UploadForm label={'Your full-face photo while holding your id'} control={{ control, name: 'selfieMedia' }} />
                </Grid>
              </>
            )
          }
        />
      </Grid>

      {/* Buttons */}
      <Box
        sx={{
          display: 'flex',
          visibility: { xs: 'hidden', sm: 'visible' },
          flexDirection: 'row',
          pt: 2,
          pb: 6,
          justifyContent: 'space-between',
        }}
      >
        <SkipAlertComponent />
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: '1em' }}>
          <ActionButtonSecondry sx={{ mr: 1, fontSize: { xs: '12px', md: '14px' } }} color='inherit' onClick={onPrevious}>
            Previous
          </ActionButtonSecondry>
          <ActionButtonPrimary sx={{ fontSize: { xs: '12px', md: '14px' } }} type={'submit'}>
            Next
          </ActionButtonPrimary>
        </Box>
      </Box>

      <Box sx={{ display: { xs: 'block', sm: 'none' }, position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <Box sx={{ display: 'flex' }}>
          <ActionButtonSecondry
            sx={{
              fontSize: { xs: '12px', md: '14px' },
              height: '50px',
              border: 0,
              flex: 1,
              borderTop: '1px solid #EAEAEA',
              borderBottom: '1px solid #EAEAEA',
              borderRadius: 0,
            }}
            color='inherit'
            onClick={onPrevious}
          >
            Previous
          </ActionButtonSecondry>
          <ActionButtonPrimary
            sx={{ fontSize: { xs: '12px', md: '14px' }, height: '50px', border: 0, flex: 1, borderRadius: 0 }}
            type={'submit'}
          >
            Next
          </ActionButtonPrimary>
        </Box>
        <SkipAlertComponent buttonSx={{ width: '100%', height: '50px', border: 0 }} />
      </Box>
    </Box>
  );
}

export default NonSingaporeForm;
