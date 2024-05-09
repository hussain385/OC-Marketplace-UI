import { Box, Typography } from '@mui/material';
import React from 'react';
import { Heading24, RoundContainer, TextButton } from '../../../../common/styles';
import { OrganisationProps } from './organisation-selection.interface';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Color } from '../../../../theme';

import organizationSelectionStyle, { BusinessEentityType, heading24Mobile, ToggleButton } from './organisation-selection.style';
import { RenderIf, useMediaBreakpoint } from '../../../../common/components';

export const OrganistaionSelection = (props: OrganisationProps) => {
  const { xs, sm, mdLg } = useMediaBreakpoint();

  return (
    <RoundContainer sx={{ maxWidth: { xs: '100%', sm: '100%', md: '748px', margin: '0 auto', width: '100%' } }}>
      <RenderIf value={sm || mdLg}>
        <Box>
          <TextButton onClick={props.onBackBtnListener} sx={{ color: Color.textBlack }}>
            <ArrowBackIosIcon fontSize='small' />
            <span style={{ fontSize: '14px' }}>Back</span>
          </TextButton>
        </Box>
      </RenderIf>
      <Box sx={{ marginY: '16px' }}>
        <RenderIf value={sm || mdLg}>
          <Heading24>{props.label}</Heading24>
        </RenderIf>
        <RenderIf value={xs}>
          <Heading24 sx={heading24Mobile}>{props.label}</Heading24>
        </RenderIf>
      </Box>
      <RenderIf value={!xs}>
        <BusinessEentityType>
          <Typography sx={{ color: Color.textHint }}>Your business entity type:</Typography>
          <ToggleButton
            onClick={() => props.setSingaporeCompany && props.setSingaporeCompany(true)}
            sx={{ ml: 1 }}
            className={props.singaporeCompany ? 'active' : ''}
          >
            {props.singaporeTitle ? props.singaporeTitle : 'Singapore company'}
          </ToggleButton>
          <ToggleButton
            onClick={() => props.setSingaporeCompany && props.setSingaporeCompany(false)}
            sx={{ ml: 1 }}
            className={props.singaporeCompany ? '' : 'active'}
          >
            {props.nonSingaporeTitle ? props.nonSingaporeTitle : ' Non-Singapore company'}
          </ToggleButton>
        </BusinessEentityType>
      </RenderIf>
      <RenderIf value={xs}>
        <Box sx={organizationSelectionStyle.mobileBoxWrapper}>
          <Typography sx={{ color: Color.textHint }}>Your business entity type:</Typography>
          <Box sx={{ display: 'flex', flex: 1, mt: '16px' }}>
            <ToggleButton
              onClick={() => props.setSingaporeCompany && props.setSingaporeCompany(true)}
              sx={organizationSelectionStyle.mobileToggleSingaporeButton}
              className={props.singaporeCompany ? 'active' : ''}
            >
              <Typography component='span' sx={organizationSelectionStyle.mobiletoggleButtonText1}>
                Singapore company
              </Typography>
            </ToggleButton>
            <ToggleButton
              onClick={() => props.setSingaporeCompany && props.setSingaporeCompany(false)}
              sx={organizationSelectionStyle.mobiletoggleNonSingaporeButton}
              className={props.singaporeCompany ? '' : 'active'}
            >
              <Typography component='span' sx={organizationSelectionStyle.mobiletoggleButtonText2}>
                Non-Singapore company
              </Typography>
            </ToggleButton>
          </Box>
        </Box>
      </RenderIf>
    </RoundContainer>
  );
};
