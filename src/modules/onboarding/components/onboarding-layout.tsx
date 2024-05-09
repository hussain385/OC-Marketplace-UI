import { RenderIf } from '@/common/components';
import BackgroundBoxWrapper from '@/common/components/background-box.wrapper';
import BoxWrapper from '@/common/components/box-wrapper';
import { Color } from '@/theme';
import { Box, SxProps, Typography } from '@mui/material';
import { isUndefined } from 'lodash';
import React from 'react';

type Props = {
  title: string;
  subTextComponent?: React.ReactNode;
  children: React.ReactNode;
  hideMainFooter?: boolean;
  showHelpFooter?: boolean;
  customStyles?: {
    outerBoxStyle?: React.CSSProperties | SxProps;
    innerBoxStyle?: React.CSSProperties | SxProps;
  };
  footerComponent?: React.ReactNode;
};

const OnBoardingLayout = ({
  title,
  children,
  subTextComponent,
  showHelpFooter = false,
  hideMainFooter = false,
  customStyles,
  footerComponent,
}: Props) => {
  return (
    <BackgroundBoxWrapper onCustomStyles={customStyles ? customStyles?.outerBoxStyle : undefined}>
      <Box
        sx={(theme) => ({
          width: { xs: '92%', sm: '100%', md: '100%' },
          margin: '0 auto',
          height: { xs: '80vh', sm: '80vh', md: '89vh' },
          paddingTop: { xs: '20px', sm: '0', md: '0' },

          [theme.breakpoints.down(321)]: {
            paddingTop: '100px',
          },
        })}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column' }}>
          <Box sx={{ textAlign: 'center', marginBottom: '26px' }}>
            <Typography
              sx={{ fontSize: '40px', fontWeight: '600', marginBottom: subTextComponent ? '26px' : '' }}
              component={'h2'}
            >
              {title}
            </Typography>
            <RenderIf value={!isUndefined(subTextComponent)}>
              <Box sx={{ display: 'flex' }}>{subTextComponent}</Box>
            </RenderIf>
          </Box>
          <BoxWrapper
            onCustomParentStyle={{ height: 'auto', display: 'block', width: '100%' }}
            onCustomChildrenStyle={customStyles?.innerBoxStyle ?? undefined}
          >
            {children}
          </BoxWrapper>
          <RenderIf value={hideMainFooter && showHelpFooter}>
            <Box sx={{ display: 'flex', marginTop: '10px' }}>
              <Typography>For any other questions or concerns, feel free to contact us at </Typography>
              <Typography
                sx={{ paddingLeft: '5px' }}
                component='a'
                href='mailto:help@opncorp.com?subject=Enquiry'
                target='_blank'
              >
                help@opncorp.com
              </Typography>
            </Box>
          </RenderIf>
          <RenderIf value={!isUndefined(footerComponent)}>{footerComponent}</RenderIf>
        </Box>
      </Box>
      <RenderIf value={!hideMainFooter}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ color: Color.textGray2, fontSize: '12px', letterSpacing: '0px' }}>
            &copy; 2023 OPNCORP. All rights reserved.
          </Typography>
        </Box>
      </RenderIf>
    </BackgroundBoxWrapper>
  );
};

export default OnBoardingLayout;
