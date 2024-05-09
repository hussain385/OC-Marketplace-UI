// @flow
import React, { useMemo } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Color } from '@/theme';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { resetCompanySetupData } from '@/redux/reducers/companySetupReducers';
import { useNavigate } from '@/router.ts';

export const SuccessBoxView = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedEntity } = useAppSelector((state) => state.mainState.useInfo);

  const status = useMemo(() => selectedEntity?.status, [selectedEntity?.status]);

  const addNewPackage = async () => {
    if (['PENDING', 'PROCESSING', 'VERIFIED'].includes(status as string)) {
      dispatch(resetCompanySetupData());
      navigate('/account/manage-listing/form');
    } else {
      navigate('/account/entities/verify-now/freelancer');
    }
  };

  return (
    <Box style={{ position: 'relative', height: '80vh', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: { xs: '95%', md: '65%' },
        }}
      >
        <Box
          sx={{
            background: Color.priWhite,
            width: '85%',
            borderRadius: '8px',
            maxWidth: '42em',
            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.16)',
          }}
        >
          <i style={{ background: Color.priWhite }}>
            {status === 'VERIFIED' ? (
              <img
                alt={'success'}
                src={require('@/assets/success-img/stock-verification-progress.svg').default}
                style={{ maxWidth: '100%', width: '100%' }}
              />
            ) : ['PENDING', 'PROCESSING'].includes(status as string) ? (
              <img
                alt={'success'}
                src={require('@/assets/success-img/stock-verification-hold.svg').default}
                style={{ maxWidth: '100%', width: '100%' }}
              />
            ) : (
              <img
                alt={'success'}
                src={require('@/assets/success-img/company-draft-success.svg').default}
                style={{ maxWidth: '100%', width: '100%' }}
              />
            )}
          </i>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              paddingBottom: '18px',
            }}
          >
            <Typography
              sx={{
                width: '100%',
                textAlign: 'center',
                marginTop: '24px',
                fontSize: { xs: '20px', md: '24px' },
                fontWeight: 'bold',
                color: Color.lightBlack,
              }}
            >
              {status === 'VERIFIED' ? 'Your service has been published. Nice work!' : 'You’ve created a listing. Well done!'}
            </Typography>
            <Typography
              sx={{
                fontSize: '14px',
                color: Color.textBlack,
                textAlign: 'center',
                marginTop: '5px',
                marginBottom: '2em',
              }}
            >
              {status === 'VERIFIED'
                ? 'Feel free to add more services to grow your presence.'
                : ['PENDING', 'PROCESSING'].includes(status as string)
                  ? "You'll be able to publish it manually once the verification process is done."
                  : 'To publish this service, the verification process must be completed.'}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: { xs: '80%', md: '78%' },
                flexDirection: { xs: 'column', md: 'row' },
                marginBottom: '1em',
                gap: '10px',
              }}
            >
              <Button
                onClick={() =>
                  navigate(
                    {
                      pathname: `/account/manage-listing`,
                      search: `tab=${status === 'VERIFIED' ? 0 : 1}`,
                    },
                    {},
                  )
                }
                variant='contained'
                sx={{
                  backgroundColor: Color.bgGreyLight,
                  width: '100%',
                  borderRadius: '5px',
                  height: '44px',
                  padding: '10px 36.5px',
                  color: Color.priBlue,
                  fontSize: '14px',
                  fontWeight: 'bold',
                  textTransform: 'none',
                }}
              >
                Done
              </Button>
              <Button
                onClick={addNewPackage}
                variant='contained'
                color='secondary'
                sx={{
                  width: '100%',
                  borderRadius: '5px',
                  height: '44px',
                  padding: '10px 36.5px',
                  fontSize: '14px !important',
                  fontWeight: 'bold',
                  textTransform: 'none',
                }}
              >
                {['PENDING', 'PROCESSING', 'VERIFIED'].includes(status as string) ? 'Add more services' : 'Verify now'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
