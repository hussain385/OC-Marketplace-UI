import { isUndefined } from 'lodash';
import { Link } from 'react-router-dom';

import { Box, SxProps, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

import BackgroundBoxWrapper from '@/common/components/background-box.wrapper';
import BoxWrapper from '@/common/components/box-wrapper';
import BoxNotificationMessageStyles from '@/common/styles/box-notification-styles';
import { Color } from '@/theme';
import { AppThemeBtnComponent } from '@/common/components/app-theme-btn.component';
import { utilityStyles } from '@/common/styles/utility.styles';
import BgImage from '@/assets/success-img/bg2.png';
import { FaCircleCheck } from 'react-icons/fa6';

type StockProgressVerificationProps = {
  heading: string | ReactNode;
  isDefault: boolean;
  subHeading: string | ReactNode;
  btnLeftLabel?: string;
  btnRightabel?: string;
  onLeftClickBtnAction?: () => void;
  onRightClickBtnAction?: () => void;
  childrenNode?: ReactNode;
  singleButton?: boolean;
  boxSx?: SxProps;
  hideActionButtons?: boolean;
  showFooter?: boolean;
  boxWrapperStyle?: SxProps;
  noBtnDisplay?: boolean;
  bgImageUrl?: string;
  customIcon?: ReactNode;
};

const BoxNotificationMessageComponent = ({
  heading,
  subHeading,
  isDefault,
  btnLeftLabel,
  btnRightabel,
  onLeftClickBtnAction,
  onRightClickBtnAction,
  childrenNode,
  singleButton,
  hideActionButtons,
  showFooter,
  boxSx,
  boxWrapperStyle,
  noBtnDisplay,
  bgImageUrl,
  customIcon,
}: StockProgressVerificationProps) => {
  return (
    <BackgroundBoxWrapper onCustomStyles={BoxNotificationMessageStyles.backgroundWrapperIdentifiedMessage}>
      <BoxWrapper onCustomChildrenStyle={{ ...BoxNotificationMessageStyles.verificationOnHoldMessage, ...boxWrapperStyle }}>
        <Box>
          {isDefault === true ? (
            <Box
              sx={{
                background: `url(${bgImageUrl ? bgImageUrl : BgImage}) no-repeat center`,
                width: '100%',
                height: '148px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              {customIcon ? customIcon : <FaCircleCheck size={80} color={'#22B567'} />}
            </Box>
          ) : (
            childrenNode
          )}
        </Box>
        <Box sx={{ ...BoxNotificationMessageStyles.boxMessageNotificationWrapper, ...boxSx }}>
          <Typography sx={BoxNotificationMessageStyles.customHeading}>{heading}</Typography>
          <Typography sx={BoxNotificationMessageStyles.customSubHeading}>{subHeading}</Typography>
          {!noBtnDisplay && (
            <>
              {!isUndefined(hideActionButtons) && hideActionButtons ? null : !isUndefined(singleButton) &&
                singleButton === true ? (
                <Box sx={{ ...BoxNotificationMessageStyles.customWrapperButton, justifyContent: 'center' }}>
                  <AppThemeBtnComponent
                    hover={Color.priBlue}
                    customButtonStyle={BoxNotificationMessageStyles.visitDashboardCustomButton}
                    onClick={onRightClickBtnAction}
                    color={Color.priWhite}
                    backgroundColor={Color.priBlue}
                    width={utilityStyles.maxWidthx392}
                    text={btnRightabel}
                  />
                </Box>
              ) : (
                <Box sx={BoxNotificationMessageStyles.customWrapperButton}>
                  <AppThemeBtnComponent
                    overrideFontStyle={BoxNotificationMessageStyles.visitDashboardCustomFont}
                    customButtonStyle={BoxNotificationMessageStyles.visitDashboardCustomButton}
                    onClick={onLeftClickBtnAction}
                    color={Color.pureBlack}
                    backgroundColor={Color.priWhite}
                    width={utilityStyles.fluidWidthx45}
                    text={btnLeftLabel}
                  />
                  <AppThemeBtnComponent
                    hover={Color.priBlue}
                    customButtonStyle={BoxNotificationMessageStyles.visitDashboardCustomButton}
                    onClick={onRightClickBtnAction}
                    color={Color.priWhite}
                    backgroundColor={Color.priBlue}
                    width={utilityStyles.fluidWidthx45}
                    text={btnRightabel}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
        {!isUndefined(showFooter) && showFooter ? (
          <Box sx={{ fontSize: '14px', marginBottom: '20px', textAlign: 'center' }}>
            You’ll be redirected shortly or you can <Link to='/'>click here to go back to homepage</Link>
          </Box>
        ) : null}
      </BoxWrapper>
    </BackgroundBoxWrapper>
  );
};

export default BoxNotificationMessageComponent;
