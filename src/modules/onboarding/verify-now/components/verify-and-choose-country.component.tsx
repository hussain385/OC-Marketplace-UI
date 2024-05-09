import React from 'react';
import { Color } from '@/theme';
import { AppThemeBtnComponent } from '@/common/components/app-theme-btn.component';
import { RoundContainer } from '@/common/styles';
import { ICountrySelectInfo } from '@/common/interface/country-interface';
import { Box, Button, Typography } from '@mui/material';
import AutoCompleteCountryDropDown from '@/modules/onboarding/verify-now/components/auto-complete-country-drop-down';
import { SingpassRetrieveInfoButton, SingpassRetrieveInfoBizButton } from '../../singpass/component/retrieve-info-button';
import { IEntity } from '@/common/interface/entity-interface';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface';

type componentPropType = {
  setSelectedCountry: React.Dispatch<React.SetStateAction<ICountrySelectInfo | undefined>>;
  selectedCountry: ICountrySelectInfo | undefined;
  setVerifyFormShow: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEntity: IEntity | undefined;
};

const VerifyAndChooseCountryComponent = ({
  setSelectedCountry,
  selectedCountry,
  setVerifyFormShow,
  selectedEntity,
}: componentPropType) => {
  return (
    <>
      <RoundContainer
        sx={{
          boxShadow: 'none',
          border: `1px solid ${Color.line}`,
          padding: '30px',
          width: { xs: '100%', md: '70%' },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography
              sx={{
                fontSize: '16px !important',
                fontWeight: '600',
                marginBottom: '6px',
              }}
            >
              {selectedCountry?.name === 'Singapore' ? 'Verify via Singpass' : 'Verify via manual form'}
            </Typography>
            <Typography
              sx={{
                fontSize: '14px !important',
              }}
            >
              If you’re not from <span style={{ fontWeight: '600' }}>{selectedCountry?.name}</span>, please re-select your
              location
            </Typography>
          </Box>
          {selectedCountry && selectedCountry.name === 'Singapore' ? (
            selectedEntity?.profile.type.includes(companyProfiles.business) ? (
              <SingpassRetrieveInfoBizButton />
            ) : (
              <SingpassRetrieveInfoButton />
            )
          ) : (
            <AppThemeBtnComponent
              type='button'
              customButtonStyle={{ height: '40px', display: 'block', width: 'fit-content' }}
              color={Color.priWhite}
              backgroundColor={Color.priBlue}
              fontSize={'14px'}
              text={'Fill out form'}
              hover={Color.textHint}
              onClick={() => setVerifyFormShow(true)}
            />
          )}
        </Box>
        <AutoCompleteCountryDropDown setSelectedCountry={setSelectedCountry} selectedCountry={selectedCountry} />
      </RoundContainer>
      {selectedCountry && selectedCountry.name === 'Singapore' && (
        <Box sx={{ width: { xs: '100%', md: '70%', display: 'flex', justifyContent: 'flex-end' } }}>
          <Button
            onClick={() => setVerifyFormShow(true)}
            sx={{ background: 'transparent', color: Color.priBlue, textTransform: 'none', marginTop: '1em' }}
          >
            or manually fill out a form here
          </Button>
        </Box>
      )}
    </>
  );
};

export default VerifyAndChooseCountryComponent;
