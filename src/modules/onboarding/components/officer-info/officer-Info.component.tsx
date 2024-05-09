import { Avatar, Box, SxProps } from '@mui/material';
import React from 'react';
import { Text14 } from '../../../../common/styles';
import { RenderIf, useMediaBreakpoint } from '../../../../common/components';
import { isEmpty, isUndefined } from 'lodash';
import officerInfoStyles, { OfficerInfoBox } from './officer-info.style';
import { IOfficerInfo } from './offer-info.interface';
import { Color } from '../../../../theme';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import usePayloadUseInfo from '../../../../common/utils/hooks/usePayloadUseInfo';

export const OfficerInfo = (props: IOfficerInfo & { customStyles?: SxProps | React.CSSProperties }) => {
  const onClickHandle = () => {
    props.isClickable && props.onClickHandle ? props.onClickHandle(props.id) : null;
  };

  const { isRetrieve } = usePayloadUseInfo();

  const labelStyles = {
    fontWeight: 600,
    width: '50%',
    fontSize: '12px',
  };

  const headingStyles = {
    color: Color.textHint,
    ...labelStyles,
  };

  const { xs } = useMediaBreakpoint();

  return (
    <OfficerInfoBox sx={props.customStyles} onClick={onClickHandle} className={props.id === props.selectedId ? 'is-active' : ''}>
      <Avatar sx={{ marginRight: '15px' }} src={require('./officer-avatar.svg').default}></Avatar>
      {isUndefined(isRetrieve) ? (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', width: '100%' }}>
          <Box sx={{ width: '100%' }}>
            <Text14>{props.name}</Text14>
            <Box sx={{ display: 'flex', alignItems: 'stretch' }} className='info'>
              <RenderIf value={!isEmpty(props.role)}>
                <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
                  <span style={{ paddingRight: '10px' }}>Business role: </span>
                  <Text14
                    sx={{
                      width: '17em',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      '-webkit-line-clamp': '2',
                      'line-clamp': '2',
                      '-webkit-box-orient': 'vertical',
                    }}
                  >
                    {props.role}
                  </Text14>
                </Box>
              </RenderIf>
              <RenderIf value={props.id !== ''}>
                <Box sx={{ display: 'flex', paddingLeft: '15px', alignItems: 'stretch' }}>
                  <span style={{ paddingRight: '10px' }}>ID: </span>
                  <Text14>{props.id}</Text14>
                </Box>
              </RenderIf>
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          <RenderIf value={!xs}>
            <Box sx={officerInfoStyles.desktopOfficerBoxWrapper}>
              <Box sx={officerInfoStyles.officerboxContainerLabel}>
                <Text14 sx={headingStyles}>Full name</Text14>
                <Text14 sx={headingStyles}>ID</Text14>
                <Text14 sx={headingStyles}>Nationality</Text14>
                <Text14 sx={headingStyles}>Business role</Text14>
              </Box>
              <Box sx={officerInfoStyles.officerBoxContainerValue}>
                <Text14 sx={labelStyles}>{props.name}</Text14>
                <Text14 sx={labelStyles}>{props.id}</Text14>
                <Text14 sx={labelStyles}>Singapore</Text14>
                <Text14 sx={labelStyles}>{props.role}</Text14>
              </Box>
            </Box>
          </RenderIf>
          <RenderIf value={xs}>
            <Box sx={officerInfoStyles.mobileOfficerBoxWrapper}>
              <Box sx={officerInfoStyles.officerboxContainerLabel}>
                <Text14 sx={headingStyles}>Full name</Text14>
                <Text14 sx={headingStyles}>ID</Text14>
              </Box>
              <Box sx={officerInfoStyles.mobileContainerValue1}>
                <Text14 sx={labelStyles}>{props.name}</Text14>
                <Text14 sx={labelStyles}>{props.id}</Text14>
              </Box>
              <Box sx={officerInfoStyles.officerboxContainerLabel}>
                <Text14 sx={headingStyles}>Nationality</Text14>
                <Text14 sx={headingStyles}>Business role</Text14>
              </Box>
              <Box sx={officerInfoStyles.officerBoxContainerValue}>
                <Text14 sx={labelStyles}>Singapore</Text14>
                <Text14 sx={labelStyles}>{props.role}</Text14>
              </Box>
            </Box>
          </RenderIf>
        </>
      )}
      <CheckCircleIcon
        sx={{
          color: props.id === props.selectedId && (props.isClickable as boolean) ? Color.priBlue : Color.transparent,
        }}
      />
    </OfficerInfoBox>
  );
};
