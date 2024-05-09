import { Box, Grid } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MainLayout from '@/common/layout/main.layout';
import { OMTabs } from '@/common/components/tabs/tabs.component';
import { useMediaBreakpoint } from '@/common/components';
import { isEmpty } from 'lodash';
import LandingFooter from '@/modules/homePage/buyer/components/footer.component';
import { useGetOrderDetailsQuery } from '@/modules/servi-order/Service/order.api.ts';
import { useParams } from '@/router.ts';
import { getOrderMyRole, setSelectedOrder } from '@/modules/servi-order/Service/order.slice.ts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks.tsx';
import { OnTabChangeProps } from '@/common/components/tabs/tabs.interface.ts';
import TabPanel from '@/common/components/tab-panel.tsx';
import Activity from '@/modules/servi-order/overview/activity';
import Sidebar from '../sidebar';
import DeliveryTimeline from './timeline';
import EmptyUI from '@/common/components/empty-ui.component';
import useQueryParams from '@/common/utils/hooks/useQueryParams';
import queryBuilder from '@/common/utils/helpers/queryBuilder.ts';
import Requirements from '@/modules/servi-order/overview/requirements';

const title: any = {
  BUYER: 'Order Management',
  SELLER: 'Sale Management',
};

export const OverviewComponent = () => {
  const { id } = useParams('/account/order-management/:id');
  const { xs, sm } = useMediaBreakpoint();
  const dispatch = useAppDispatch();
  const [tabIndex, setTabIndex] = useState(1);
  const client = useAppSelector(getOrderMyRole);
  const [params, setParams] = useQueryParams();
  const selectedOrder = useAppSelector((state) => state.mainState.order.selectedOrder);
  const tabsWithRequirement = useMemo(
    () =>
      xs || sm
        ? ['Overview', 'Delivery timeline', 'Activity', 'Requirements']
        : ['Delivery timeline', 'Activity', 'Requirements' /*, 'Details', 'Requirements', 'Delivery'*/],
    [sm, xs],
  );
  const tabs = useMemo(
    () =>
      xs || sm
        ? ['Overview', 'Delivery timeline', 'Activity']
        : ['Delivery Timeline', 'Activity' /*, 'Details', 'Requirements', 'Delivery'*/],
    [sm, xs],
  );

  /**
   * Get Order details
   */
  const { data, isLoading } = useGetOrderDetailsQuery({
    orderId: id,
    params: queryBuilder((builder) =>
      builder
        .sortBy({ field: 'subOrders.sequence', order: 'ASC' })
        .sortBy({ field: 'activities.createdAt', order: 'DESC' })
        .sortBy({ field: 'requirements.no', order: 'ASC' })
        .setJoin(
          ['requirements', 'activities', 'statuses', 'currentSubOrder', 'subOrders', 'reviews', 'reviews.ratings'].map((e) => ({
            field: e,
          })),
        ),
    ),
  });
  const isRequirements = useMemo(() => !isEmpty(data?.requirements), [data?.requirements]);

  /**
   * Sync data with slice for child components (Redux updates)
   */
  useEffect(() => {
    if (data) {
      dispatch(setSelectedOrder(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (params && !isEmpty(params.get('tab'))) {
      switch (params.get('tab')) {
        case 'REQUIREMENTS':
          setTabIndex(2);
          break;
        case 'ACTIVITY':
          setTabIndex(1);
          break;
        case 'DELIVERY-TIMELINE':
          setTabIndex(0);
          break;
      }
    }
  }, [params]);

  /**
   * on Tab change
   */
  const onTabsChange = useCallback(
    (event: OnTabChangeProps) => {
      setTabIndex(event.index);
      setParams('tab', event.tag);
    },
    [setParams],
  );

  return (
    <MainLayout
      pageTitle={!isLoading ? data?.service.name : undefined}
      breadcrumb={[
        { label: 'Dashboard', path: '/account' },
        { label: title[client ?? 'BUYER'], path: `/account/order-management?profileType=${client?.toLowerCase()}` },
        { label: 'Order details' },
      ]}
    >
      {selectedOrder ? (
        <>
          {/** Tabs  */}
          <Box sx={{ width: '100%' }}>
            <OMTabs activeTab={tabIndex} tabs={isRequirements ? tabsWithRequirement : tabs} onTabChange={onTabsChange} />
          </Box>
          <Box sx={{ height: { xs: '15px', sm: '20px', md: '24px', lg: '30px' }, width: '100%' }}></Box>
          {/** Widgets */}
          <Box sx={{ flexGrow: 1, width: '100%' }}>
            <Grid container spacing={4}>
              {!isLoading ? (
                <Grid item md={8} sx={{ width: '100%' }}>
                  {/** Activity tab */}
                  {/*<RenderIf value={xs || sm}>*/}
                  {/*  <TabPanel value={tabIndex} index={0}>*/}
                  {/*    <Sidebar />*/}
                  {/*  </TabPanel>*/}
                  {/*</RenderIf>*/}
                  <TabPanel value={tabIndex} index={xs || sm ? 1 : 0}>
                    <DeliveryTimeline />
                  </TabPanel>
                  <TabPanel value={tabIndex} index={xs || sm ? 2 : 1}>
                    <Activity />
                  </TabPanel>
                  {/*<TabPanel value={tabIndex} index={3}>*/}
                  {/*  <Details />*/}
                  {/*</TabPanel>*/}
                  <TabPanel value={tabIndex} index={xs || sm ? 3 : 2}>
                    <Requirements />
                  </TabPanel>
                  {/*<TabPanel value={tabIndex} index={5}>*/}
                  {/*  <Delivery />*/}
                  {/*</TabPanel>*/}
                </Grid>
              ) : (
                <Grid item md={8}>
                  Loading activities...
                </Grid>
              )}
              {/** Sidebar */}
              <Grid item md={4} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                {!isLoading ? <Sidebar /> : 'Loading sidebar...'}
              </Grid>
              {/** End Sidebar */}
            </Grid>
            {/*{data && selected_order.categories && tabIndex === (xs || sm ? 2 : 1) && subCategory && (*/}
            {/*  <SuggestionsBoxComponent*/}
            {/*    categoryId={!isNull(subCategory) && subCategory?.uid}*/}
            {/*    serviceId={selected_order.serviceId}*/}
            {/*    description={!isNull(subCategory) && subCategory?.description}*/}
            {/*    title={!isNull(subCategory) && subCategory?.name}*/}
            {/*  />*/}
            {/*)}*/}
            <LandingFooter />
          </Box>
        </>
      ) : (
        <EmptyUI text='No order found.' />
      )}
    </MainLayout>
  );
};
