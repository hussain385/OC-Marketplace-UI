// @flow
import React, { ReactNode } from 'react';

import { Box, Button, Typography } from '@mui/material';

import { Color } from '@/theme';

import { RenderIf } from '@/common/components';

import BgImage from '@/assets/success-img/bg.png';

import { FooterComp } from '@/modules/seller/common/footer-comp.tsx';

interface Props {
  title: string;
  subText: string;
  isFooter?: boolean;
  iconBgColor?: string;
  primaryBtnLabel?: string;
  secondaryBnLabel?: string;
  onlyOkBtn?: boolean;
  customIcon?: ReactNode | JSX.Element | undefined;
  okBtnHandle?: () => void;
  cancelBtnHandle?: () => void;
}

export const ApproveSuccess = ({
  title,
  subText,
  isFooter = true,
  customIcon,
  primaryBtnLabel = 'Ok',
  secondaryBnLabel = 'Cancel',
  onlyOkBtn = false,
  okBtnHandle,
  cancelBtnHandle,
}: Props) => {
  return (
    <Box
      style={{
        position: 'relative',
        width: '100%',
        height: '80vh',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '65%',
        }}
      >
        <Box
          sx={{
            width: '85%',
            borderRadius: '8px',
            maxWidth: '464px',
            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.16)',
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              background: `url(${BgImage}) no-repeat center`,
              width: '100%',
              height: '148px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <RenderIf value={customIcon !== undefined}>{customIcon}</RenderIf>

            <RenderIf value={customIcon === undefined}>
              <i style={{ background: Color.priWhite }}>
                <img src={'../verify/stock-verification-progress.svg'} style={{ maxWidth: '100%', width: '100%' }} />
              </i>
            </RenderIf>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              paddingBottom: '18px',
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: '432px',
                textAlign: 'center',
                marginTop: '24px',
                fontSize: ' 24px',
                fontWeight: 'bold',
                letterSpacing: '-0.48px',
                color: Color.lightBlack,
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: title }}></div>
            </Box>

            <Box
              sx={{
                width: '100%',
                maxWidth: '432px',
                height: '70px',
                padding: '14px 0px 14px 16px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  fontSize: '14px',
                  color: Color.textBlack,
                  lineHeight: 1.57,
                  textAlign: 'center',
                  letterSpacing: '-0.5px',
                  maxWidth: '392px',
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: subText }}></div>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: { xs: '80%', md: '78%' },
                gap: { xs: '5px', md: '10px' },
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'center',
              }}
            >
              <RenderIf value={!onlyOkBtn}>
                <Button
                  onClick={() => cancelBtnHandle && cancelBtnHandle()}
                  variant='contained'
                  sx={{
                    backgroundColor: Color.bgGreyLight,
                    maxWidth: { xs: '100%', md: '208px' },
                    width: '100%',
                    borderRadius: '5px',
                    height: '44px',
                    marginBottom: '16px',
                  }}
                >
                  <Typography
                    sx={{
                      color: Color.priBlue,
                      fontSize: '14px',
                      fontWeight: 'bold',
                      fontStretch: 'normal',
                      fontStyle: 'normal',
                      lineHeight: 1.5,
                      letterSpacing: '-0.5px',
                      textTransform: 'initial',
                    }}
                  >
                    {secondaryBnLabel}
                  </Typography>
                </Button>
              </RenderIf>

              <Button
                onClick={() => okBtnHandle && okBtnHandle()}
                variant='contained'
                color='secondary'
                sx={{
                  maxWidth: { xs: '100%', md: '208px' },
                  borderRadius: '5px',
                  height: '44px',
                  width: '100%',
                  marginBottom: '16px',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    fontStretch: 'normal',
                    fontStyle: 'normal',
                    lineHeight: 1.5,
                    letterSpacing: '-0.5px',
                    textTransform: 'initial',
                  }}
                >
                  {primaryBtnLabel}
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <RenderIf value={isFooter}>
        <Box sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
          <FooterComp />
        </Box>
      </RenderIf>
    </Box>
  );
};
