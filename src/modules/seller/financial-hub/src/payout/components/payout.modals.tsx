import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { AddBankModal } from './addPaymentMethod.styles';
import { RenderIf } from '../../../../../../common/components';
import WorldFirst from '../../assets/WorldFirst.png';
import Payoneer from '../../assets/payoneer.png';
import { Color } from '../../../../../../theme';
import { PrimaryButton } from '../../../../../../common/styles';
import { BasicModal } from '../../components/modal.component';
import { useAppSelector } from '../../../../../../redux/hooks';
import { ReactComponent as BankIcon } from '../../assets/bank.svg';
import { Link } from 'react-router-dom';
import { BankTileList, BankTileSteps } from './BankTile.component';
import { companyProfiles } from '../../../../../../common/interface/busines-company-profile-interface';

interface IModal {
  isOpen: boolean;
  onClose: () => void;
}

export function SetUpPayoutModal({ isOpen, onClose, onSetUp }: IModal & { onSetUp: () => void }) {
  const { selectedEntity } = useAppSelector((state) => state.mainState.useInfo);

  return (
    <BasicModal
      isOpen={isOpen}
      onClose={onClose}
      heading={'Add a payout method'}
      boxSx={{
        padding: { xs: '24px 16px', sm: '40px 56px' },
        overflowY: 'scroll',
        maxWidth: '960px',
        maxHeight: '90vh',
      }}
      isClose
    >
      <AddBankModal>
        <Typography className={'sub-body'}>Set up an account where you’ll receive your earnings</Typography>

        {/*<RenderIf value={!!selectedEntity?.profile.type.includes(companyProfiles.international)}>*/}
        <Box className={'bank-container'}>
          <Typography className={'subHeading'}>
            Step 1: Open an SGD receiving account via{' '}
            {selectedEntity?.profile.type.includes(companyProfiles.business) && 'WorldFirst or'} Payoneer
          </Typography>
          <RenderIf value={!!selectedEntity?.profile.type.includes(companyProfiles.business)}>
            <Box className={'bank-tile'} sx={{ padding: { xs: '16px', sm: '24px 40px' } }}>
              <img src={WorldFirst} alt={'WorldFirst'} />
              <Box sx={{ flex: 1 }}>
                <Typography className={'subHeading'}>WorldFirst</Typography>

                <BankTileSteps
                  steps={[
                    'Open a Worldfirst account',
                    'Open a receiving account in  SGD',
                    'Use your bank details to set up a payout method',
                  ]}
                />

                <BankTileList bankName={'WorldFirst'}>
                  <Typography component={Link} to={'https://www.worldfirst.com/sg/'} target={'_blank'} rel={'noreferrer'}>
                    Open a local bank on WorldFirst
                  </Typography>{' '}
                  to receive earnings in SGD. View the detailed guide{' '}
                  <Typography
                    component={Link}
                    to={'https://www.worldfirst.com/uk/help-support/local-currency-account/'}
                    target={'_blank'}
                    rel={'noreferrer'}
                  >
                    here
                  </Typography>
                </BankTileList>
              </Box>
            </Box>
          </RenderIf>
          <Box className={'bank-tile'} sx={{ padding: { xs: '16px', sm: '24px 40px' } }}>
            <img src={Payoneer} alt={'Payoneer'} />
            <Box sx={{ flex: 1 }}>
              <Typography className={'subHeading'}>Payoneer</Typography>

              <BankTileSteps
                steps={[
                  'Open a Payoneer account',
                  'Request a receiving account in  SGD',
                  'Use your bank details to set up a payout method',
                ]}
              />

              <BankTileList bankName={'Payoneer'}>
                <Typography component={Link} to={'https://www.payoneer.com/'} target={'_blank'} rel={'noreferrer'}>
                  Open a local bank on Payoneer
                </Typography>{' '}
                to receive earnings in SGD. View the detailed guide{' '}
                <Typography
                  component={Link}
                  to={'https://payoneer.custhelp.com/app/answers/topics/c/3702'}
                  target={'_blank'}
                  rel={'noreferrer'}
                >
                  here
                </Typography>
              </BankTileList>
            </Box>
          </Box>
        </Box>
        {/*</RenderIf>*/}

        <Typography className={'subHeading'}>{'Step 2: Set up your payout method to receive earnings in SGD'}</Typography>
        <Box className={'bank-tile'} sx={{ padding: { xs: '16px', sm: '24px 40px' } }}>
          <BankIcon color={Color.priBlue} width={56} height={56} />
          <Box sx={{ flex: 1 }}>
            <Typography className={'subHeading'}>Benefits of a local account (SGD)</Typography>
            <List sx={{ padding: 0 }}>
              <ListItem disablePadding>
                <ListItemIcon sx={{ minWidth: 'inherit', mr: '8px' }}>
                  <FaCheck size={16} color={Color.priBlue} />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    '& .MuiTypography-root': {
                      fontSize: '12px !important',
                    },
                  }}
                >
                  Receive your earnings directly in SGD
                </ListItemText>
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon sx={{ minWidth: 'inherit', mr: '8px' }}>
                  <FaCheck size={16} color={Color.priBlue} />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    '& .MuiTypography-root': {
                      fontSize: '12px !important',
                    },
                  }}
                >
                  No need for currency conversion fees
                </ListItemText>
              </ListItem>
            </List>
          </Box>

          <PrimaryButton onClick={onSetUp}>Set up</PrimaryButton>
        </Box>
      </AddBankModal>
    </BasicModal>
  );
}
