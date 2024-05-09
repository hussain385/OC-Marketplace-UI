import { isEmpty, isNull } from 'lodash';
import { useSetState } from 'react-use';
import { Dayjs } from 'dayjs';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { GridRowParams } from '@mui/x-data-grid';
import MainLayout from '@/common/layout/main.layout';
import { OMTabs } from '@/common/components/tabs/tabs.component';
import { RenderIf, useMediaBreakpoint } from '@/common/components';
import OrderDataGridComponent from './components/data-grid/data-grid.component';
import { SearchBoxComponent } from '@/common/components/search-box/search-box.component';
import { setCookie } from '@/common/utils/cookie';
import { orderGridColumns } from './components/data-grid/data-grid-config';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { OnTabChangeProps } from '@/common/components/tabs/tabs.interface';
import { TextButton } from '@/common/styles';
import { Color } from '@/theme';
import { FooterComp } from '@/modules/seller/common/footer-comp';
import { setClientType } from '@/redux/reducers/authReducers';
import useScroll from '@/common/utils/hooks/useScroll';
import { useGetOrdersQuery } from '@/modules/servi-order/Service/order.api.ts';
import queryBuilder from '@/common/utils/helpers/queryBuilder.ts';
import DropDownMenu from '@/common/components/dropdown-menu-component';
import { IMenuItems } from '@/common/interface';
import { Order, orderStatus, subOrderStatus } from './interface';
import { showToast, ToastTypes } from '@/common/utils';
import DateRangeDropdown from '@/common/components/daterange.component';
import Loader from '@/common/components/loader.component';
import EmptyUI from '@/common/components/empty-ui.component';
import { getOrderMyRole } from './Service/order.slice';
import { useNavigate } from '@/router';

const title = {
  buyer: 'Order management',
  seller: 'Sale management',
};

const activeStatus = [
  subOrderStatus.inProgress,
  subOrderStatus.requestRevision,
  subOrderStatus.reviewDelivery,
  subOrderStatus.waitingPayment,
  subOrderStatus.waitingRequirement,
] as string[];

const orderStatuses: IMenuItems[] = [
  {
    name: 'All',
    value: activeStatus.toString(),
  },
  {
    name: 'In progress',
    value: subOrderStatus.inProgress,
  },
  {
    name: 'Review delivery',
    value: subOrderStatus.reviewDelivery,
  },
  {
    name: 'Request revision',
    value: subOrderStatus.requestRevision,
  },
  {
    name: 'Request cancellation',
    value: orderStatus.requestCancellation,
  },
  {
    name: 'Waiting Requirement',
    value: subOrderStatus.waitingRequirement,
  },
  {
    name: 'Waiting Payment',
    value: subOrderStatus.waitingPayment,
  },
];

export const OrderManagementCompoent = () => {
  const [search] = useSearchParams();
  const profileType = search.get('profileType');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [{ status, orderDate, keyword, isDateFilterApplied }, setState] = useSetState({
    status: activeStatus.toString(),
    orderDate: {} as any,
    keyword: '',
    isDateFilterApplied: false,
  });

  const { selectedEntity, clientType: client } = useAppSelector((state) => state.mainState.useInfo);
  const myRole = useAppSelector(getOrderMyRole);
  const { mdLg } = useMediaBreakpoint();
  const {
    data: orders,
    isFetching,
    isSuccess,
  } = useGetOrdersQuery(
    queryBuilder((builder) =>
      builder
        .search({
          $and: [
            { [profileType === 'seller' ? 'seller.id' : 'buyer.id']: { $eq: selectedEntity?.id } },
            {
              [['COMPLETED', 'CANCELLED', 'REQUEST_CANCELLATION'].includes(status) ? 'status' : 'currentSubOrder.status']: {
                $in: status.split(','),
              },
            },
            ...(!['COMPLETED', 'CANCELLED', 'REQUEST_CANCELLATION'].includes(status)
              ? [{ status: { $notin: ['CANCELLED', 'COMPLETED'] } }]
              : []),
            ...(Object.keys(orderDate).length > 0 ? [orderDate] : []),
            ...(!isEmpty(keyword) ? [{ 'service.name': { $contL: keyword } }] : []),
          ],
        })
        .setJoin({ field: 'currentSubOrder' })
        .setJoin({ field: 'subOrders' })
        .sortBy({ field: 'createdAt', order: 'DESC' }),
    ),
    { skip: !selectedEntity?.id },
  );

  useScroll({ useEffectDep: [] });

  useEffect(() => {
    if (profileType) {
      const CType = profileType === 'seller' ? 'seller' : 'buyer';
      dispatch(setClientType(CType));
      setCookie('x-client-type', CType, 15);
    } else {
      setCookie('x-client-type', 'buyer', 15);
    }
  }, [dispatch, profileType, status]);

  const onTabChangeHandle = (value: OnTabChangeProps) => {
    switch (value.tag) {
      case 'ACTIVE':
        setState({ status: activeStatus.toString() });
        break;
      case 'COMPLETED':
        setState({ status: orderStatus.completed });
        break;
      case 'CANCELLED':
        setState({ status: orderStatus.cancelled });
        break;
    }
  };

  const onDataGridRowClick = (params: GridRowParams) => {
    const activeTab = params.row.currentSubOrder.status === subOrderStatus.waitingRequirement ? 'REQUIREMENTS' : '';
    navigate({pathname: '/account/order-management/:id', search: createSearchParams({tab: activeTab}).toString()}, { params: { id: params.row.id } });
  };

  const onDataGridResponsiveRowClick = (row: Order) => {
    navigate('/account/order-management/:id', { params: { id: row.id } });
  };

  const onSearchHandle = (value: string) => {
    setState({ keyword: value.trim() });
  };

  const onClearAll = () => {
    setState({ status: activeStatus.toString(), orderDate: {}, keyword: '', isDateFilterApplied: false });
  };

  const onClearSearch = () => {
    setState({ keyword: '' });
  };

  const onMenuItemClick = (menuItem: IMenuItems) => {
    if (isEmpty(menuItem.value)) {
      setState({ status: activeStatus.toString() });
    } else {
      setState({ status: menuItem.value });
    }
  };

  return (
    <MainLayout pageTitle={title[client]} breadcrumb={[{ label: 'Dashboard', path: '/account' }, { label: title[client] }]}>
      <RenderIf value={isFetching && !orders}>
        <Loader isLoading />
      </RenderIf>
      <RenderIf value={!!orders}>
        <>
          {/** Data type filter tabs */}
          <Box sx={{ width: '100%' }}>
            <OMTabs
              activeTab={0}
              activeCount={orders?.data.length.toString()}
              tabs={[`Active`, `Completed`, `Cancelled`]}
              onTabChange={onTabChangeHandle}
              variant='scrollable'
              scrollButtons='auto'
            ></OMTabs>
          </Box>
          {/** filters component */}
          <Box
            sx={{
              width: '100%',
              paddingBottom: { xs: '0px', md: '25px' },
              paddingTop: '25px',
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'column', md: 'row' },
            }}
          >
            {mdLg && (
              <>
                <Box sx={{ display: 'flex', width: '100%' }}>
                  <Box>
                    <DateRangeDropdown
                      label={'Order date'}
                      reset={!isDateFilterApplied}
                      isActive={isDateFilterApplied}
                      buttonOverrideStyle={{
                        border: `1px solid ${Color.bgLine}`,
                        justifyContent: 'space-between',
                        height: '44px',
                        padding: '6px 12px 6px 14px',
                      }}
                      isColon={false}
                      onApply={(e) => {
                        const startDate: Dayjs = e.startDate as Dayjs;
                        const endDate: Dayjs = e.endDate as Dayjs;

                        if (!isNull(startDate)) {
                          setState({ orderDate: { createdAt: { $gte: startDate.toISOString() } } });
                        }
                        if (!isNull(startDate) && !isNull(endDate)) {
                          const newEndDate = endDate.add(1, 'day');
                          setState({
                            orderDate: { createdAt: { $gte: startDate.toISOString(), $lt: newEndDate.toISOString() } },
                            isDateFilterApplied: true,
                          });
                        }
                        if (isNull(startDate) && isNull(endDate)) {
                          showToast('Start and End date are required', ToastTypes.ERROR);
                        }
                      }}
                    />
                  </Box>
                  <RenderIf value={!['COMPLETED', 'CANCELLED'].includes(status)}>
                    <Box sx={{ paddingLeft: '16px' }}>
                      <DropDownMenu
                        label={'Status'}
                        noTick
                        menuItems={orderStatuses}
                        overrideLabelStyle={{ color: Color.pureBlack, fontWeight: '600' }}
                        buttonOverrideStyle={{
                          border: `1px solid ${Color.bgLine}`,
                          justifyContent: 'space-between',
                          height: '44px',
                        }}
                        onMenuItemClick={onMenuItemClick}
                      />
                    </Box>
                  </RenderIf>
                  <RenderIf value={isDateFilterApplied}>
                    <Box>
                      <TextButton
                        sx={{ color: Color.priBlue, padding: '10px 16px', fontSize: '14px' }}
                        onClick={() => onClearAll()}
                      >
                        Clear all
                      </TextButton>
                    </Box>
                  </RenderIf>
                </Box>
                <Box>
                  <SearchBoxComponent
                    placeholder='Search for order'
                    styleOverrides={{ width: { xs: '100%', md: '320px' } }}
                    onEnter={onSearchHandle}
                    onClear={() => onClearSearch()}
                  />
                </Box>
              </>
            )}
            {!mdLg && (
              <>
                <Box sx={{ marginBottom: '15px' }}>
                  <SearchBoxComponent
                    placeholder='Search for order'
                    styleOverrides={{ width: { xs: '100%', md: '320px' } }}
                    onEnter={onSearchHandle}
                    onClear={() => onClearSearch()}
                  />
                </Box>
                <Box sx={{ display: 'flex', width: '100%' }}>
                  <Box sx={{ display: 'flex', flex: { xs: '1', sm: '0' } }}>
                    <DateRangeDropdown
                      label={'Order date'}
                      reset={!isDateFilterApplied}
                      isActive={isDateFilterApplied}
                      buttonOverrideStyle={{
                        border: `1px solid ${Color.bgLine}`,
                        justifyContent: 'space-between',
                        height: '44px',
                        padding: '6px 12px 6px 14px',
                      }}
                      isColon={false}
                      onApply={(e) => {
                        const startDate: Dayjs = e.startDate as Dayjs;
                        const endDate: Dayjs = e.endDate as Dayjs;

                        if (!isNull(startDate)) {
                          setState({ orderDate: { createdAt: { $gte: startDate.toISOString() } } });
                        }
                        if (!isNull(startDate) && !isNull(endDate)) {
                          const newEndDate = endDate.add(1, 'day');
                          setState({
                            orderDate: { createdAt: { $gte: startDate.toISOString(), $lt: newEndDate.toISOString() } },
                            isDateFilterApplied: true,
                          });
                        }
                        if (isNull(startDate) && isNull(endDate)) {
                          showToast('Start and End date are required', ToastTypes.ERROR);
                        }
                      }}
                    />
                  </Box>
                  <RenderIf value={isDateFilterApplied}>
                    <Box>
                      <TextButton
                        sx={{ color: Color.priBlue, padding: '10px 16px', fontSize: '14px' }}
                        onClick={() => onClearAll()}
                      >
                        Clear all
                      </TextButton>
                    </Box>
                  </RenderIf>
                </Box>
              </>
            )}
          </Box>
          {/** Order data grid */}
          {isFetching ? (
            <Loader isLoading />
          ) : (
            <OrderDataGridComponent
              columns={orderGridColumns(myRole!, navigate)}
              dataSource={orders?.data ?? []}
              disableColumnFilter
              disableColumnMenu
              disableSelectionOnClick
              onRowClick={onDataGridRowClick}
              onResponsiveRowClick={onDataGridResponsiveRowClick}
            />
          )}
        </>
      </RenderIf>
      <RenderIf value={!orders && isSuccess}>
        <EmptyUI text='No orders found.' />
      </RenderIf>
      <Box sx={{ position: 'absolute', bottom: '0em', width: '100%' }}>
        <FooterComp />
      </Box>
    </MainLayout>
  );
};
