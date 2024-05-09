import React from 'react';

import { Box, Typography, Button } from '@mui/material';
import { Color } from '../../../../../theme';
import { loginBtnStyles } from '@/common/styles/navbar.styles';
import { ReactComponent as Clock } from '../../../../../assets/icons/clock.svg';

import { SearchBoxComponent } from '../../../../../common/components/search-box/search-box.component';
import { DeliveryBadge } from '@/common/styles';

import { RenderIf, useMediaBreakpoint } from '@/common/components';
import { Proposal } from '@/modules/seller/financial-hub/src/interface/manage-proposal.interface';
interface activeProps {
  data: Proposal[];
  tab: 'Active' | 'Draft' | 'Archived';
}

const ActiveProposal = ({ data, tab }: activeProps) => {
  const { xs, sm, mdLg } = useMediaBreakpoint();

  const onSearchHandle = () => {
    // this will handle search
  };

  const onClearSearch = () => {
    //this will handle clear search
  };

  const generateTitleByStatus = (proposals: Proposal[], status: 'Active' | 'Draft' | 'Archived'): string => {
    const baseTitle = status === 'Active' ? 'Submitted Proposal' : `${status}`;
    return `${baseTitle}${proposals.length > 1 ? 's' : ''} (${proposals.length})`;
  };

  const title = generateTitleByStatus(data, tab);

  const buttons = () => {
    return (
      <Box>
        {tab === 'Active' && (
          <Button
            sx={{
              ...loginBtnStyles,
              backgroundColor: '#FF6A68',
              color: 'white',
              minWidth: '8rem',
              marginRight: '3px',
              border: `1px solid #FF6A68`,
              '&:hover': {
                backgroundColor: Color.priBlue,
              },
            }}
          >
            Withdraw Proposal
          </Button>
        )}
        {tab !== 'Archived' && (
          <Button
            sx={{
              ...loginBtnStyles,
              backgroundColor: Color.priBlue,
              color: 'white',
              minWidth: '8rem',
              '&:hover': {
                backgroundColor: Color.priBlue,
              },
            }}
          >
            View Proposal
          </Button>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ padding: { xs: '16px', md: 0 } }}>
      {/* <Typography sx={{ color: '#7E7E7E', fontSize: '12px !important', fontWeight: 700, mb: '16px' }}>
        Data updated on {updateTime}
      </Typography> */}

      <Box sx={{ width: '100%', margin: 0, padding: 0 }}>
        <SearchBoxComponent
          placeholder='Search proposal'
          styleOverrides={{ width: '100%' }}
          onEnter={onSearchHandle}
          onClear={() => onClearSearch()}
        />
      </Box>
      <Box
        sx={{
          marginTop: '24px',
          padding: '24px',
          borderRadius: '4px',
          border: `1px solid ${Color.bgLine}`,
          background: Color.priWhite,
          borderBottomLeftRadius: '0px',
          borderBottomRightRadius: '0px',
          borderBottom: '0px',
        }}
      >
        <Box>
          <Typography variant='h6' sx={{ fontSize: '20px', fontWeight: '700' }}>
            {title}
          </Typography>
        </Box>
      </Box>
      {data?.map((proposal: Proposal) => (
        <Box
          key={proposal.id}
          sx={{
            padding: { xs: '10px 24px', md: '24px', mdlg: '24px' },
            border: `1px solid ${Color.bgLine}`,
            background: Color.priWhite,
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
            borderBottom: '0px',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '44px' }}>
            <Box sx={{ display: 'flex' }}>
              <Typography variant='h6' sx={{ fontSize: '16px', fontWeight: '600' }}>
                Request: <span style={{ color: Color.priBlue }}>{proposal.requestTitle}</span>
              </Typography>
            </Box>

            <RenderIf value={mdLg}>{buttons()}</RenderIf>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '44px' }}>
            <Typography variant='h6' sx={{ fontSize: '16px', fontWeight: '600' }}>
              Your Offer Includes
            </Typography>
            <Typography variant='h6' sx={{ fontSize: '16px', fontWeight: '600' }}>
              {proposal.offerAmount}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
            <RenderIf value={mdLg}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  border: '1px solid #EAEAEA',
                  padding: '10px 16px',
                  borderRadius: '4px',
                }}
              >
                <Clock color={Color.positive} />
                <Typography
                  sx={{
                    textTransform: 'capitalize',
                    fontSize: '14px !important',
                  }}
                >
                  {proposal.deliveryTime}
                </Typography>
              </Box>
            </RenderIf>

            <RenderIf value={xs || sm}>
              <DeliveryBadge sx={{ display: 'flex', alignItems: 'center', gap: '10px' }} className='Pending'>
                <Typography
                  sx={{
                    textTransform: 'capitalize',
                    fontSize: '14px !important',
                  }}
                >
                  {proposal.deliveryTime}
                </Typography>
              </DeliveryBadge>
            </RenderIf>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '300' }}>{proposal.message}</Typography>
          </Box>

          <RenderIf value={xs || sm}>
            <Box sx={{ marginTop: '10px', width: '100%' }}>{buttons()}</Box>
          </RenderIf>
        </Box>
      ))}
    </Box>
  );
};

export default ActiveProposal;
