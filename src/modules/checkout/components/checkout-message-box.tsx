// @flow
import React from 'react';
import { Color } from '../../../theme';
import { Box, Typography } from '@mui/material';
import { categoryTextStyle } from '../order-details/service-info-box';
import { infoTitle } from '../order-details/package-info';
import { PriceText } from '../order-details/price-details';
import MuiButton from '../../../common/components/mui-button.component';
import { useAppSelector } from '../../../redux/hooks';
import { useLocation, useNavigate } from 'react-router-dom';

type componentPropType = {
  setStep?: React.Dispatch<React.SetStateAction<number>>;
};

const CheckoutMessageBox = ({ setStep }: componentPropType) => {
  const { packageCheckoutInfo } = useAppSelector((state) => state.mainState.buyerCatalog);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: Color.priWhite,
        width: { xs: '95%', md: '40em' },
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      }}
    >
      <img
        alt={'success'}
        src={require('../../../assets/success-img/stock-verification-progress.svg').default}
        style={{ width: '100%', height: 'auto' }}
      />
      <Box
        sx={{
          marginInline: '2em',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #EAEAEA',
        }}
      >
        <Typography sx={{ fontSize: '30px', fontWeight: '600', marginTop: '20px' }}>Thanks for placing your order!</Typography>
        <Typography
          sx={{
            ...categoryTextStyle,
            color: '#1D2130',
            fontWeight: '400',
            textAlign: 'center',
            marginBlock: '10px',
          }}
        >
          {queryParams.get('isBuyerVerified') ? (
            <>
              <strong>{packageCheckoutInfo.companyName}</strong> will get in touch with you shortly.
            </>
          ) : (
            <>
              <strong>{packageCheckoutInfo.companyName}</strong> will be notified to start your order once your identity has been
              verified.
            </>
          )}
        </Typography>
        <Typography sx={{ ...categoryTextStyle, color: '#1D2130', textAlign: 'center', marginBottom: '10px' }}>
          Your order number:{' '}
          <span style={{ color: Color.priBlue }}>#{queryParams.get('orderId') ? queryParams.get('orderId') : ''}</span>
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#F6F6F6',
            padding: '0.5em',
            paddingInline: '1em',
            marginBlock: '1em',
            borderRadius: '2px',
            width: '100%',
          }}
        >
          <Box>
            <Typography sx={{ ...infoTitle, color: '#000' }}>{packageCheckoutInfo.companyName}</Typography>
            <Typography sx={{ ...infoTitle, color: '#000' }}>{packageCheckoutInfo.serviceName}</Typography>
            <Typography sx={infoTitle}>{packageCheckoutInfo.categoryName}</Typography>
          </Box>
          <Box sx={{ alignItems: 'flex-end', display: 'flex', flexDirection: 'column' }}>
            <Typography sx={infoTitle}>Total(SGD)</Typography>
            <PriceText>${packageCheckoutInfo.price.toFixed(2)}</PriceText>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-evenly',
          marginBlock: '1em',
          marginBottom: '2em',
        }}
      >
        {!setStep && (
          <MuiButton
            type='button'
            heightSize='44px'
            onClick={() => navigate('/')}
            widthSize={'40%'}
            style={{
              background: Color.bgGreyLight,
              borderRadius: '2px',
              color: Color.priBlue,
              lineHeight: 1.71,
              paddingInline: '2em',
              letterSpacing: '-0.5px',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
            value={'Back to home'}
          />
        )}
        <MuiButton
          type='button'
          onClick={() => {
            navigate(`/account/order-management/${queryParams.get('orderId')}?tab=ACTIVITY`);
          }}
          heightSize='44px'
          widthSize={setStep ? '70%' : '40%'}
          style={{
            background: Color.priBlue,
            borderRadius: '2px',
            color: Color.priWhite,
            lineHeight: 1.71,
            paddingInline: '2em',
            letterSpacing: '-0.5px',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
          value={'View order'}
        />
      </Box>
    </Box>
  );
};

export default CheckoutMessageBox;
