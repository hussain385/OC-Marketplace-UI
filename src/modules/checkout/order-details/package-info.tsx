// @flow
import React, { useRef } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { titleValue } from './service-info-box';
import '../style.css';
import { styled } from '@mui/system';
import PointerDisplayComponent from '../../../common/components/pointer-display.component';
import { Milestone } from '@/common/interface/service-interface.ts';
import { MilestoneTimeline } from '@/modules/checkout/order-details/package-info.styles.tsx';
import MilestoneTile from '@/modules/checkout/order-details/milestoneTile.tsx';

type Props = {
  whatYouGet: string | string[];
  deliveryTime?: string | number;
  requirements?: string;
  paymentPlans: string[];
  packageHeading: string;
  milestones?: Milestone[];
  currency?: string;
  noOfOrders?: number;
};

export const infoTitle = {
  fontSize: '12px',
  fontWeight: '700',
  color: '#7E7E7E',
};

export const InfoBox = styled(Box)(() => ({
  marginBlock: '1em',
}));

export const PackageInfo = ({
  whatYouGet,
  deliveryTime,
  paymentPlans,
  requirements,
  packageHeading,
  milestones,
  currency,
  noOfOrders,
}: Props) => {
  const whatYouGetTextRef = useRef<HTMLTextAreaElement>(null);
  const requirementsTextRef = useRef<HTMLTextAreaElement>(null);

  return (
    <Box sx={{ marginBlock: '1em' }}>
      <Typography sx={{ marginBlock: '1em', ...titleValue }}>Package info</Typography>
      <Box sx={{ border: '1px solid #EAEAEA', padding: '1.5em' }}>
        <Typography sx={{ fontSize: '20px', fontWeight: '700', marginBottom: '10px' }}>{packageHeading}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ width: '55%' }}>
            <InfoBox>
              <Typography sx={infoTitle}>What you’ll get</Typography>
              <PointerDisplayComponent displayText={whatYouGet} textRef={whatYouGetTextRef} />
            </InfoBox>
            {requirements && (
              <InfoBox>
                <Typography sx={infoTitle}>Requirements</Typography>
                <PointerDisplayComponent displayText={requirements} textRef={requirementsTextRef} />
              </InfoBox>
            )}
          </Box>
          <Box sx={{ width: '40%' }}>
            {deliveryTime && (
              <InfoBox>
                <Typography sx={infoTitle}>Deliver time</Typography>
                <ul>
                  <Typography component={'li'}>{deliveryTime}</Typography>
                </ul>
              </InfoBox>
            )}
            {noOfOrders && (
              <InfoBox>
                <Typography sx={infoTitle}>No.of orders</Typography>
                <ul>
                  <Typography component={'li'}>{noOfOrders} orders</Typography>
                </ul>
              </InfoBox>
            )}
            <InfoBox>
              <Typography sx={infoTitle}>Payment plan</Typography>
              <ul>
                {paymentPlans.map((e) => (
                  <Typography key={e} component={'li'}>
                    {e}
                  </Typography>
                ))}
              </ul>
            </InfoBox>
          </Box>
        </Box>

        {milestones && milestones.length > 0 && (
          <Box>
            <Divider />
            <Typography sx={{ marginTop: '12px' }}>These are the steps we will follow to complete your project.</Typography>
            <MilestoneTimeline>
              {milestones.map((m) => (
                <MilestoneTile key={m.id} milestone={m} currency={currency ?? 'SGD'} />
              ))}
            </MilestoneTimeline>
          </Box>
        )}
      </Box>
    </Box>
  );
};
