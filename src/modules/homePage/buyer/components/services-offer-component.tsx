import { Box, Typography } from '@mui/material';
import React from 'react';

import ServicesOfferStyles, { BoxContainerItem, BoxDetailInfoContainer, GridItemDiv } from '../../styles/services-offer-styles';
import { servicesOfferItems } from '../utils/mock-data';

const ServicesOffer = () => {
  return (
    <>
      {servicesOfferItems.map((item, key) => (
        <div
          key={item.id}
          style={{
            background:
              key % 2 === 1
                ? 'linear-gradient(180deg, #FFECF7 0%, rgba(254, 255, 255, 0.00) 38.02%)'
                : 'linear-gradient(rgb(217 235 248) 0%, rgb(254, 255, 255) 28.55%)',
          }}
        >
          <Box
            sx={{
              ...ServicesOfferStyles.boxGridContainer,
              backgroundImage: {
                xs: 'none',
                md: `url(${
                  key % 2 !== 1
                    ? require('@/assets/home-page/buyer/services-bg.svg').default
                    : require('@/assets/home-page/buyer/services-bg-pink.svg').default
                })`,
              },
            }}
          >
            <GridItemDiv sx={{ direction: item.id === 2 ? 'rtl' : 'ltr' }}>
              <BoxContainerItem
                sx={{
                  backgroundImage: { xs: item.backgroundXS, sm: item.background },
                  order: { xs: 2, sm: 1 },
                  height: { xs: '65vh', md: 'auto' },
                }}
              ></BoxContainerItem>

              <BoxDetailInfoContainer sx={{ direction: item.id === 2 ? 'ltr' : 'unset', order: { xs: 1, sm: 2 } }}>
                <Box sx={{ width: { xs: '90%', lg: '100%' } }}>
                  <Typography sx={ServicesOfferStyles.headingText}>{item.heading}</Typography>
                  <Typography sx={ServicesOfferStyles.subheadingText}>{item.subheading}</Typography>
                  <Typography sx={ServicesOfferStyles.descriptionText}>{item.description}</Typography>
                </Box>
              </BoxDetailInfoContainer>
            </GridItemDiv>
          </Box>
        </div>
      ))}
    </>
  );
};

export default ServicesOffer;
