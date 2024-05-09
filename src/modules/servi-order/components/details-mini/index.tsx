//import { Box } from '@mui/material';
import { Box, Divider } from '@mui/material';
import React from 'react';
import { RenderIf, useMediaBreakpoint } from '@/common/components';
import { Heading14, ShadowBox } from '@/common/styles';
// eslint-disable-next-line no-unused-vars
import { BoxBorder } from '../data-grid/data-grid.style';
import OrderDetailsSide from './details-side.component';
import ProjectStatusComponent from './project-status.component';
import OrderDetailsServiceInfo from './service-info.component';
import { useAppSelector } from '@/redux/hooks';
import { isUndefined } from 'lodash';
// import { OrderReview } from '@/modules/reviews/src';

type componentPropType = {
  shouldShowProjectStatus?: boolean;
};

const DetailsMiniComponent = ({ shouldShowProjectStatus }: componentPropType) => {
  const { selectedOrder } = useAppSelector((state) => state.mainState.order);
  // eslint-disable-next-line no-unused-vars
  const { xs, sm, mdLg } = useMediaBreakpoint();

  return (
    <Box>
      {/** Mobile View */}
      <RenderIf value={xs || sm}>
        <BoxBorder>
          <RenderIf value={selectedOrder!.status !== 'CANCELLED'}>
            <ProjectStatusComponent />
          </RenderIf>
        </BoxBorder>
        {/* <RenderIf value={selectedOrder!.status === 'REVIEW'}>
          <OrderReview />
        </RenderIf> */}
        <BoxBorder>
          <Heading14>Order details</Heading14>
          <OrderDetailsServiceInfo />
          <OrderDetailsSide />
        </BoxBorder>
      </RenderIf>
      {/** End Mobile view */}
      {/** Desktop view */}
      <RenderIf value={mdLg}>
        <ShadowBox sx={{ width: '100%', flexDirection: 'column', marginBottom: '24px' }}>
          <Heading14>Order details</Heading14>
          <OrderDetailsServiceInfo />
          <OrderDetailsSide />
          <RenderIf value={selectedOrder?.status !== 'CANCELLED' && isUndefined(shouldShowProjectStatus)}>
            <Divider light sx={{ marginY: '16px' }} />
            <ProjectStatusComponent />
          </RenderIf>
        </ShadowBox>
      </RenderIf>
    </Box>
  );
};

export default DetailsMiniComponent;
