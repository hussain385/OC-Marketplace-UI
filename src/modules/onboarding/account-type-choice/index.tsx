// @flow
import React from 'react';
import { Box } from '@mui/material';
import { ChoiceComponent } from './choice.component';
import { CompanyRegisterationWrapper } from '../../../common/layout/company-registeration.wrapper';
import { useAppSelector } from '../../../redux/hooks';

const AccountTypeChoice = () => {
  const {
    payload: { active },
  } = useAppSelector((state) => state.mainState.useInfo);

  return (
    <CompanyRegisterationWrapper>
      <Box component='div' sx={{ margInline: 'auto', margin: '10%' }}>
        <h1 style={{ fontSize: '24px', margin: 0, textAlign: 'center' }}>Who are you representing?</h1>
        <p style={{ width: '100%', maxWidth: '500px', marginInline: 'auto', textAlign: 'center', marginBottom: '2.5em' }}>
          {active === 'seller'
            ? "Clients are more likely to purchase your services when they know who they're transacting with"
            : 'Service providers will be able to assist you better when they know who they’re transacting with'}
        </p>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '1em', alignItems: 'center' }}>
          <ChoiceComponent
            navigationLink={'/setup-organisation'}
            description={'For all types of registered businesses (sole proprietorship, LP, LLP, etc.)'}
            heading={'A business entity'}
            image={require('../../../assets/choice-img/leadership.svg').default}
          />
          <ChoiceComponent
            navigationLink={'/freelance-individual-registration'}
            description={active === 'seller' ? 'For individual sellers' : 'For individual buyers'}
            heading={'Myself'}
            image={require('../../../assets/choice-img/leadership2.svg').default}
          />
        </Box>
      </Box>
    </CompanyRegisterationWrapper>
  );
};

export default AccountTypeChoice;
