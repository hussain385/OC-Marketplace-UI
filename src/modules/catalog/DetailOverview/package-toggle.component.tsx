// @flow
import React, { useRef, useMemo } from 'react';

import { Box, Divider, Typography } from '@mui/material';

import '../style.css';

import { IoIosInformationCircle } from 'react-icons/io';

import { Tooltip } from 'react-tooltip';

import { ReactComponent as DeliverTimerIcon } from '@/assets/icons/Timer.svg';

import { ReactComponent as Subscription } from '@/assets/icons/subscription.svg';

import { ReactComponent as MilestoneIcon } from '@/assets/icons/milestone-icon.svg';

import { ReactComponent as Lock } from '@/assets/icons/lock.svg';

import { ReactComponent as NoFund } from '@/assets/icons/nofund.svg';

import { ReactComponent as CheckIcon } from '@/assets/icons/ic-check.svg';

import { ReactComponent as Revision } from '@/assets/icons/revision.svg';

import { ReactComponent as DotIcon } from '@/assets/icons/dot-icon.svg';

import { useGetPackageDetailQuery } from '@/redux/apis/marketplace.ts';

import { isEmpty } from 'lodash';

import { Color } from '@/theme';

import { Extra, Milestone } from '@/common/interface/service-interface';

import MuiAppThemeBtnComponent from '@/common/components/mui-app-theme-btn.component';

import PointerDisplayComponent from '@/common/components/pointer-display.component';

import { RenderIf } from '@/common/components';

import { NumericFormat } from 'react-number-format';

// type Props = {
//   packageProp: { description: string; duration: string; requirements: string; price: string; is_one_time_payment: boolean };
//   preview?: boolean;
//   serviceCount: number;
// };

type Props = {
  packageProp: Extra;
  preview?: boolean;
  serviceCount: number;
  requirements?: string[];
};

export const PackageToggleComponent = ({ packageProp, requirements, serviceCount }: Props) => {
  const textAreaRef1 = useRef<HTMLTextAreaElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  /**
   * Get the package detail based on id, join with milestones to get milestones.items
   * this will be used to get servifundsecure status
   */
  const { data } = useGetPackageDetailQuery({
    packageId: packageProp.id,
    params: {
      join: ['milestones', 'milestones.items'],
    },
  });

  const checkIsEscrowTrue = (data: Milestone[]): boolean => {
    for (const milestone of data) {
      for (const item of milestone.items) {
        if (item.isEscrow === true) {
          return true;
        }
      }
    }

    return false;
  };

  const isEscrow = useMemo(() => {
    return data && data.milestones ? checkIsEscrowTrue(data.milestones) : false;
  }, [data]); // Recomputes only if `data` changes

  return (
    <>
      <Box sx={{ lineHeight: '32px', pt: '20px' }} className='packageBox'>
        <Typography sx={{ mb: 1 }} className='subHeading'>
          What You&#39;ll Get
        </Typography>
        <PointerDisplayComponent displayText={packageProp?.description} textRef={textAreaRef1} />
      </Box>

      {!packageProp?.isContactFirst && (
        <>
          {packageProp?.paymentType === 'MILESTONE' && (
            <Box className='packageBox' sx={{ pb: '10px' }}>
              <Typography className='subHeading'>Delivery Time</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                <DeliverTimerIcon color={Color.positive} />
                <Typography
                  sx={{
                    textTransform: 'capitalize',
                    fontSize: '14px !important',
                  }}
                >
                  {packageProp?.deliveryDays} working days
                </Typography>
              </Box>
            </Box>
          )}
          {packageProp?.maxRevision && (
            <Box className='packageBox' sx={{ pb: '10px' }}>
              <Typography sx={{ mb: 1 }} className='subHeading'>
                Revision
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                <Revision color={Color.positive} />
                {/* <PointerDisplayComponent displayText={`${packageProp?.maxRevision} revisions`} textRef={textAreaRef} /> */}
                <Typography
                  sx={{
                    textTransform: 'capitalize',
                    fontSize: '14px !important',
                  }}
                >
                  {packageProp?.maxRevision} revisions
                </Typography>
              </Box>
            </Box>
          )}
          {packageProp?.prerequisite && !isEmpty(packageProp?.prerequisite) && (
            <Box className='packageBox'>
              <Typography sx={{ mb: 1 }} className='subHeading'>
                Requirements
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                <DotIcon color={Color.positive} />
                <Typography>{packageProp?.prerequisite} </Typography>
              </Box>
            </Box>
          )}
          {packageProp?.paymentType && (
            <Box className='packageBox' sx={{ pb: '10px' }}>
              <Typography className='subHeading'>Payment Plan</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                {packageProp.paymentType === 'SUBSCRIPTION' ? (
                  <Subscription color={Color.positive} />
                ) : (
                  <MilestoneIcon color={Color.positive}></MilestoneIcon>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ textTransform: 'capitalize', fontSize: '14px !important', fontWeight: '600' }}>
                    {packageProp.paymentType === 'SUBSCRIPTION'
                      ? 'Subscription'
                      : `Milestone Payment ${packageProp.milestones?.length ? `(${packageProp.milestones?.length} Milestones)` : ''}`}
                  </Typography>
                  <IoIosInformationCircle
                    style={{ color: Color.textGray7E, width: '20px', height: '20px', marginLeft: '5px', marginRight: '5px' }}
                    data-tooltip-id='tooltip-inline'
                    data-tooltip-content={
                      packageProp.paymentType === 'SUBSCRIPTION'
                        ? 'Subscription means paying regularly (e.g., monthly, annually) to access a service or product continuously.'
                        : 'Milestone payment means dividing the total payment into installments for each deliverable.'
                    }
                  />
                  <Tooltip
                    id='tooltip-inline'
                    style={{
                      backgroundColor: 'white',
                      color: Color.textBlack,
                      filter: 'drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.16))',
                      maxWidth: '200px',
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                {isEscrow ? (
                  <>
                    <Lock color={Color.positive} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ textTransform: 'capitalize', fontSize: '14px !important', fontWeight: '600' }}>
                        ServiFundSecure
                      </Typography>
                      <IoIosInformationCircle
                        style={{ color: Color.textGray7E, width: '20px', height: '20px', marginLeft: '5px', marginRight: '5px' }}
                        data-tooltip-id='tooltip-inline'
                        data-tooltip-content='ServiFundSecure ensures your funds are held safely until you approve release to the service provider.'
                      />
                      <Tooltip
                        id='tooltip-inline'
                        style={{
                          backgroundColor: 'white',
                          color: Color.textBlack,
                          filter: 'drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.16))',
                          maxWidth: '200px',
                        }}
                      />
                    </Box>
                  </>
                ) : (
                  <>
                    <NoFund color={Color.positive} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ textTransform: 'capitalize', fontSize: '14px !important', fontWeight: '600' }}>
                        No ServiFundSecure
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          )}

          {packageProp?.paymentType === 'SUBSCRIPTION' && (
            <Box className='packageBox' sx={{ pb: '10px' }}>
              <Typography sx={{ mb: 1 }} className='subHeading'>
                No. of orders
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                <CheckIcon color={Color.positive} />

                <PointerDisplayComponent displayText={`${packageProp?.subscriptionCount} orders`} textRef={textAreaRef} />
              </Box>
            </Box>
          )}
          <RenderIf value={serviceCount > 1}>
            <MuiAppThemeBtnComponent
              type='button'
              onClick={() => {
                const win: Window = window;
                win.scrollTo(0, (document.getElementById('compare-packages') as HTMLElement).offsetTop - 235);
              }}
              widthSize='100%'
              heightSize='44px'
              style={{
                background: Color.priWhite,
                borderRadius: '2px',
                border: 'none',
                color: Color.priBlue,
                lineHeight: 1.71,
                letterSpacing: '-0.5px',
                fontSize: '14px',
                fontWeight: 'bold',
                marginBlock: '0.3em',
              }}
              value={'Compare packages'}
            />
          </RenderIf>

          <Divider style={{ marginBlock: '1em' }} color='eaeaea' />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 700, color: Color.pureBlack, fontSize: '14px' }} className='subHeading'>
              Estimated
            </Typography>
            <Typography sx={{ fontSize: '32px', fontWeight: 'bold' }}>
              <NumericFormat
                value={packageProp?.price}
                thousandSeparator
                decimalScale={2}
                fixedDecimalScale
                displayType={'text'}
                style={{ fontSize: '32px', fontWeight: '700', color: Color.textBlack }}
                prefix={'S$'}
              />
            </Typography>
          </Box>
        </>
      )}
    </>
  );
};
