// @flow
import React from 'react';
import { Box, Typography } from '@mui/material';
import { AiFillCheckCircle } from 'react-icons/ai';
import { Color } from '../../../theme';
import usePayloadUseInfo from '../../../common/utils/hooks/usePayloadUseInfo';
import { isUndefined } from 'lodash';
import { RenderIf, useMediaBreakpoint } from '../../../common/components';

type Props = {
  step: number;
  singaporeCompany?: boolean;
  navigateSingpassMyInfoBiz?: () => void;
};

const steps = ['Search organisation', 'Identify authorised officer', 'Review details'];
const nonSingaporeSteps = ['Organisation name', 'Identify authorised officer', 'Review details'];

const SetupOrganisationStepsComponent = ({ step, singaporeCompany, navigateSingpassMyInfoBiz }: Props) => {
  const { isRetrieve } = usePayloadUseInfo();
  const { xs } = useMediaBreakpoint();

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: { xs: undefined, md: 'flex-end' },
          justifyContent: 'space-between',
          marginBottom: '1em',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Typography sx={{ fontSize: '18px !important', marginBottom: '5px', fontWeight: '700' }}>
          Set up your organisation ({step}/3)
        </Typography>
        {singaporeCompany && isUndefined(isRetrieve) && (
          <Box style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
            <Typography
              sx={{
                fontSize: '12px !important',
                marginBottom: '5px',
                fontWeight: '600',
                color: Color.bgGreyDark,
              }}
            >
              Singapore resident?
            </Typography>
            <Box
              style={{ backgroundColor: '#F4333D', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
              onClick={navigateSingpassMyInfoBiz}
            >
              <Typography sx={{ fontSize: '11px !important', fontWeight: '700', color: 'white' }}>
                Retrieve MyInfo business
              </Typography>
              <Typography sx={{ fontSize: '10px !important', color: 'white' }}>with singpass</Typography>
            </Box>
          </Box>
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: { xs: 'start', sm: 'center' }, gap: '0.6em', marginBottom: '2em' }}>
        {(singaporeCompany ? steps : nonSingaporeSteps).map((value, key) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'wrap', justifyContent: 'center' }} key={key}>
            <RenderIf value={!xs}>
              <AiFillCheckCircle fontSize={20} color={key + 1 <= step ? Color.priBlue : Color.bgGreyDark} />
            </RenderIf>
            <RenderIf value={xs}>
              <AiFillCheckCircle fontSize={30} color={key + 1 <= step ? Color.priBlue : Color.bgGreyDark} />
            </RenderIf>
            <Typography
              sx={{
                fontSize: '14px !important',
                color: key + 1 <= step ? Color.priBlue : Color.bgGreyDark,
                fontWeight: '700',
                textAlign: 'center',
              }}
            >
              {value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SetupOrganisationStepsComponent;
