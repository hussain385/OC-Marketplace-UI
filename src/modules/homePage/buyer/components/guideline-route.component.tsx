import { Box, SxProps } from '@mui/material';
import React from 'react';
import GuidelineRouteStyles, { ExploreServicesBtn, Heading, BoxContainer } from '../../styles/guideline-route.style';

const GuidelineRoute = ({
  userRoute,
  buttonText,
  customButtonStyle,
  navigateRoute,
  scrollRef,
}: {
  userRoute: string;
  buttonText?: string | React.ReactNode;
  customButtonStyle?: React.CSSProperties | SxProps;
  navigateRoute?: () => void;
  scrollRef?: React.MutableRefObject<HTMLDivElement>;
}) => {
  return (
    <BoxContainer sx={{ height: '24vh', width: { xs: '90%', md: '100%' }, borderRadius: '1em !important' }} ref={scrollRef}>
      <Box sx={GuidelineRouteStyles.gridItem}>
        <Heading>Interested to be a {userRoute} on the platform?</Heading>
        <ExploreServicesBtn onClick={navigateRoute} sx={customButtonStyle}>
          {buttonText ? buttonText : 'Sign up now'}
        </ExploreServicesBtn>
      </Box>
    </BoxContainer>
  );
};

export default GuidelineRoute;
