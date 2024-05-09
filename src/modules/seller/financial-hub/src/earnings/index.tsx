import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment';
import { isEmpty, isNull, isUndefined } from 'lodash';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Color, gridStyles } from '../../../../../theme';
import { Text14, TextButton, TextHint } from '../../../../../common/styles';
import DateRangeDropdown from '../../../../../common/components/daterange.component';
import RenderIf from '../../../../../common/components/render-if.component';
import { DropDownMenuComponent } from '../../../../../common/components/dropdown-menu-component/dropdown-menu.component';
import { showToast, ToastTypes } from '../../../../../common/utils';
import { ReactComponent as ExportIcon } from '../../../../../assets/icons/excel.svg';
import { ReactComponent as PdfIcon } from '../../../../../assets/icons/pdf.svg';
import { SearchBoxComponent } from '../../../../../common/components/search-box/search-box.component';
import ExportModal from '../../../../../common/components/export-modal';
import { DataGrid, GridSelectionModel } from '@mui/x-data-grid';
import { GridColumns } from './data-grid-column';
import Loader from '../../../../../common/components/loader.component';
import Pagination from '../../../../../common/components/pagination';
import { IMenuItems, IQueryGlobal } from '../../../../../common/interface';
import { onExportButtonClick } from '../utils/functions';
import { IEarningResponse } from '../interface/earning.interface';
import { useGetEarningsQuery, useLazyGetEarningsQuery } from '../services/earning.api';
import { IPaginateFinancialHubResponse } from '../interface';
import { useGetReportQuery } from '../services/index.api';
import { AvailableFunds, TotalEarnings, UpcomingEarnings } from '../components/card.component';
import { LIMIT } from '../../../../../common/constants';
import { ReactComponent as NoHistoryIcon } from '../assets/no-earning-history.svg';
import { createNoResultFoundContext, createNoresultFoundLabel } from '../../../../../common/utils/global_state.util';
import SearchEmptyResult from '../../../../../common/components/search-empty-result.component';
import { FaSliders } from 'react-icons/fa6';
import { CgChevronRight } from 'react-icons/cg';
import EarningMobileWrapper from '@/modules/seller/financial-hub/src/earnings/EarningMobileWrapper.tsx';
import Modal from '@/common/components/modal.component.tsx';

const FILTER_TYPE = Object.freeze({
  DateRange: 'date_range',
  ServiceCategory: 'service_category',
  Status: 'status',
});

const statusesMenuItem: IMenuItems[] = [
  {
    name: 'Pending',
    value: '3000',
    labelStyle: { background: `${Color.purple}10`, color: Color.purple, borderRadius: '24px', padding: '4px 16px' },
  },
  {
    name: 'Released',
    value: '3001',
    labelStyle: { background: `${Color.green}10`, color: Color.green, borderRadius: '24px', padding: '4px 16px' },
  },
  {
    name: 'Disputed',
    value: '3002',
    labelStyle: { background: `${Color.pink}10`, color: Color.pink, borderRadius: '24px', padding: '4px 16px' },
  },
  {
    name: 'Voided',
    value: '3003',
    labelStyle: { background: `${Color.gray}10`, color: Color.gray, borderRadius: '24px', padding: '4px 16px' },
  },
];

let params: any = {};
let $s: any = {};
const Earnings = () => {
  const [isFilterApplied, setIsFilterApplied] = useState<boolean | undefined>(undefined);
  const [exportType, setExportType] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
  const navigate = useNavigate();
  const [categories, setCategories] = useState<IMenuItems[]>([]);
  const [exportOption, setExportOption] = useState<string>('current');
  const [timestamp, setTimestamp] = useState<number>(0);
  const [isFilterModal, setIsFilterModal] = useState(false);
  const defaultParams: IQueryGlobal = { limit: LIMIT, page, sort: 'completedAt,DESC', join: 'items' };
  const { data, isFetching } = useGetEarningsQuery<{
    data: IPaginateFinancialHubResponse<IEarningResponse>;
    isFetching: boolean;
  }>({
    params: { ...defaultParams, ...params },
    timestamp,
  });

  const [getEarningCategories] = useLazyGetEarningsQuery();

  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  const [noResultFound, setNoResultFound] = createNoResultFoundContext();
  // eslint-disable-next-line no-unused-vars
  const [_, setSearchKeywords] = createNoresultFoundLabel();

  const runOnce = useRef(false);

  const {
    data: reportData,
    isLoading: isReportLoading,
    fulfilledTimeStamp,
  } = useGetReportQuery({
    url: '/earning',
    options: { fromDate, toDate },
  });

  const updateTime = useMemo(() => {
    return moment(fulfilledTimeStamp).format('lll ([GMT] Z)');
  }, [fulfilledTimeStamp]);
  const asOf = dayjs().format('MM ddd, YYYY');

  const loadCategories = useCallback(async () => {
    const { data, isSuccess } = await getEarningCategories({
      params: { ...defaultParams },
    });
    const response = data as IPaginateFinancialHubResponse<IEarningResponse>;
    if (isSuccess) {
      generateCategoryMenuItems(response.data);
    }
  }, [getEarningCategories]);

  useEffect(() => {
    if (!runOnce.current) {
      runOnce.current = true;
      loadCategories();
    }
  }, [loadCategories]);

  useEffect(() => {
    if (!isUndefined(data) && data?.data.length === 0 && !isEmpty($s.$or)) {
      setNoResultFound(true);
    } else {
      setNoResultFound(false);
    }
  }, [data, setNoResultFound]);

  const generateCategoryMenuItems = (data: IEarningResponse[]) => {
    const menuItems: IMenuItems[] = [];
    const categoryIdList: string[] = [];
    if (data) {
      data.map((item: IEarningResponse) => {
        item.order.metadata.categories.map((category) => {
          if (!categoryIdList.includes(category.uid) && item.order.mainCategory === category.uid) {
            menuItems.push({ name: category.name, value: category.uid });
            categoryIdList.push(category.uid);
          }
        });
      });
      setCategories(menuItems);
    }
  };

  const updateQueryParams = (args: any) => {
    Object.assign(params, args);
    if (!isEmpty($s)) {
      params.s = JSON.stringify($s);
    }
    const now = dayjs();
    setTimestamp(now.unix());
  };

  const onClearAll = () => {
    setIsFilterApplied(false);
    setAppliedFilters([]);
    params = {};
    $s = {};
  };

  const onSearchHandle = (value: string) => {
    if (isEmpty(value)) {
      delete $s.$or;
      delete params.s.$or;
    } else {
      Object.assign($s, {
        $or: [
          { 'order.name': { $cont: value.trim() } },
          { 'order.buyerEntityName': { $cont: value.trim() } },
          { id: { $cont: value.trim() } },
        ],
      });
      setSearchKeywords(value.trim());
    }
    setPage(1);
    updateQueryParams({});
  };

  const onClearSearch = () => {
    Object.assign(params, { s: JSON.parse(params.s) });
    delete $s.$or;
    delete params.s.$or;
    updateQueryParams({});
  };

  const applyFilter = () => {
    setIsFilterApplied(true);
  };

  /**
   * Grid row selection handle
   * @param model
   */

  const onGridRowSelectionHandle = (model: GridSelectionModel) => {
    setSelectionModel(model);
  };

  const NoResult = () => {
    return (
      <Stack height='100%' alignItems='center' justifyContent='center'>
        <NoHistoryIcon width={64} height={64} style={{ marginBottom: '16px' }} />
        <Text14 sx={{ fontWeight: '600' }}>There are no earnings to display</Text14>
        <Text14 sx={{ color: Color.textHint, marginTop: '8px' }}>
          You’ll find all your earnings info here once your orders are completed
        </Text14>
      </Stack>
    );
  };

  return (
    <Box sx={{ padding: { xs: '16px', md: 0 } }}>
      <Typography sx={{ color: '#7E7E7E', fontSize: '12px !important', fontWeight: 700, mb: '16px' }}>
        Data updated on {updateTime}
      </Typography>
      <Box sx={{ display: 'flex' }}>
        {isReportLoading ? (
          'Loading...'
        ) : (
          <Grid container spacing={2}>
            <Grid item>
              <AvailableFunds
                balance={reportData?.balance}
                subtext={'Available to withdraw'}
                hint={'The available amount can be withdrawn through a set payout method'}
              />
            </Grid>
            <Grid item>
              <UpcomingEarnings
                subtext={'Awaiting release *'}
                pending={reportData?.earning?.pending}
                hint='This amount will be released after 2 days if order is completed without dispute'
                note={`As of today, ${asOf}`}
              />
            </Grid>
            <Grid item>
              <TotalEarnings
                total={reportData?.earning?.total}
                subtext={'Released *'}
                note={`* Your earnings for all-time as of today, ${asOf}`}
                hint={'* This includes both the amount available for withdrawal and the amount already withdrawn'}
                onMenuItemClick={(value: string) => {
                  switch (value) {
                    case 'this-week':
                      setFromDate(dayjs().startOf('week').toISOString());
                      setToDate(dayjs().toISOString());
                      break;
                    case 'this-month':
                      setToDate(dayjs().toISOString());
                      setFromDate(dayjs().startOf('month').toISOString());
                      break;
                    case 'this-year':
                      setFromDate(dayjs().startOf('year').toISOString());
                      setToDate(dayjs().toISOString());
                      break;
                    default:
                      setFromDate('');
                      setToDate('');
                      break;
                  }
                }}
              />
            </Grid>
          </Grid>
        )}
      </Box>
      <Box
        sx={{
          marginTop: '24px',
          padding: '24px',
          borderRadius: '4px',
          border: `1px solid ${Color.bgLine}`,
          background: Color.priWhite,
          borderBottomLeftRadius: '0px',
          borderBottomRightRadius: '0px',
          borderBottom: '0px',
        }}
      >
        <Box>
          <Typography variant='h6' sx={{ fontSize: '20px', fontWeight: '700' }}>
            Earnings history
          </Typography>
          <TextHint sx={{ marginTop: '8px' }}>Keep track of your income</TextHint>
        </Box>
        {/** Filters */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '6px',
            mt: '24px',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: '1%', flexDirection: { xs: 'column', sm: 'row' }, width: '100%' }}>
            <DateRangeDropdown
              label='Delivery date'
              reset={!isFilterApplied}
              isActive={appliedFilters.includes(FILTER_TYPE.DateRange)}
              buttonOverrideStyle={{
                border: `1px solid ${Color.bgLine}`,
                justifyContent: 'space-between',
                height: '44px',
                padding: '6px 12px 6px 14px',
              }}
              onApply={(e) => {
                const startDate: Dayjs = e.startDate as Dayjs;
                const endDate: Dayjs = e.endDate as Dayjs;
                if (!appliedFilters.includes(FILTER_TYPE.DateRange)) {
                  applyFilter();
                  setAppliedFilters([...appliedFilters, FILTER_TYPE.DateRange]);
                }
                if (!isNull(startDate)) {
                  setPage(1);
                  Object.assign($s, { completedAt: { $gte: startDate.toISOString() } });
                  updateQueryParams({});
                }
                if (!isNull(startDate) && !isNull(endDate)) {
                  setPage(1);
                  const newEndDate = endDate.add(1, 'day');
                  Object.assign($s, { completedAt: { $gte: startDate.toISOString(), $lt: newEndDate.toISOString() } });
                  updateQueryParams({});
                }
                if (isNull(startDate) && isNull(endDate)) {
                  showToast('Start and End date are required', ToastTypes.ERROR);
                }
              }}
            />
            <DropDownMenuComponent
              noSelectionMode
              isCheckBox={categories.length > 0}
              isApplyOption
              isActive={appliedFilters.includes(FILTER_TYPE.ServiceCategory)}
              isFilterApplied={appliedFilters.includes(FILTER_TYPE.ServiceCategory)}
              label='Service category'
              reset={!isUndefined(isFilterApplied) && !isFilterApplied}
              menuItems={categories.length > 0 ? categories : [{ name: 'No categories found', value: '' }]}
              overrideLabelStyle={{ color: Color.pureBlack, fontWeight: '600' }}
              buttonOverrideStyle={{ border: `1px solid ${Color.bgLine}`, justifyContent: 'space-between' }}
              noTick={true}
              onMenuItemMultiSelect={(items: IMenuItems[]) => {
                setPage(1);
                applyFilter();
                if (!appliedFilters.includes(FILTER_TYPE.ServiceCategory)) {
                  setAppliedFilters([...appliedFilters, FILTER_TYPE.ServiceCategory]);
                }

                if (items.length > 0) {
                  Object.assign($s, { 'order.mainCategory': { $in: items.map((item) => item.value) } });
                  updateQueryParams({});
                  //updateQueryParams({ filter: `order.mainCategory||$cont||${items.map((item) => item.value).toString()}` });
                } else {
                  Object.assign($s, { 'order.mainCategory': { $cont: '' } });
                }
              }}
            />

            <DropDownMenuComponent
              noSelectionMode
              label='Status'
              reset={!isUndefined(isFilterApplied) && !isFilterApplied}
              isActive={appliedFilters.includes(FILTER_TYPE.Status)}
              isCheckBox
              isApplyOption
              isFilterApplied={appliedFilters.includes(FILTER_TYPE.Status)}
              menuItems={statusesMenuItem}
              overrideLabelStyle={{ color: Color.pureBlack, fontWeight: '600' }}
              buttonOverrideStyle={{ border: `1px solid ${Color.bgLine}`, justifyContent: 'space-between' }}
              noTick={true}
              onMenuItemMultiSelect={(items: IMenuItems[]) => {
                setPage(1);
                applyFilter();
                if (!appliedFilters.includes(FILTER_TYPE.Status)) {
                  setAppliedFilters([...appliedFilters, FILTER_TYPE.Status]);
                }
                if (items.length > 0) {
                  Object.assign($s, { status: { $in: items.map((item) => item.value) } });
                  updateQueryParams({});
                } else {
                  Object.assign($s, { status: { $cont: '' } });
                  updateQueryParams({});
                }
              }}
            />
            <RenderIf value={!isUndefined(isFilterApplied) && isFilterApplied}>
              <TextButton sx={{ color: Color.priBlue, padding: '10px 16px', fontSize: '14px' }} onClick={() => onClearAll()}>
                Clear all
              </TextButton>
            </RenderIf>
          </Box>
          {/** Export and Search options */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              width: '100%',
              flexDirection: { xs: 'row-reverse', md: 'row' },
              gap: '24px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                sx={{
                  marginRight: '5px',
                  color: Color.textHint,
                  fontSize: '12px',
                  lineHeight: '24px',
                  fontWeight: 700,
                  letterSpacing: '-0.5px',
                  display: { xs: 'none', md: 'ruby' },
                }}
              >
                Export to:
              </Typography>
              <ExportIcon
                onClick={() => {
                  if (!isEmpty(data?.data)) {
                    setExportType('csv');
                    setOpenModal(true);
                  } else {
                    showToast('There is no record to export', ToastTypes.WARNING);
                  }
                }}
              />
              <Divider orientation='vertical' variant='middle' sx={{ marginX: '6px', height: '24px', background: Color.line }} />
              <PdfIcon
                onClick={() => {
                  if (!isEmpty(data?.data)) {
                    setExportType('pdf');
                    setOpenModal(true);
                  } else {
                    showToast('There is no record to export', ToastTypes.WARNING);
                  }
                }}
              />
            </Box>
            <Box sx={{ width: '100%', margin: 0, padding: 0 }}>
              <SearchBoxComponent
                placeholder='Search earning'
                styleOverrides={{ width: '100%' }}
                onEnter={onSearchHandle}
                onClear={() => onClearSearch()}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          padding: '8px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: `1px solid ${Color.bgLine}`,
          borderBottom: 0,
        }}
        onClick={() => setIsFilterModal(true)}
      >
        <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <FaSliders size={22} />
          <Typography sx={{ fontWeight: 600 }}>Filter</Typography>
        </Box>

        <CgChevronRight size={16} />
      </Box>

      {/** Data Grid */}
      <Box sx={{ width: '100%', height: !isEmpty(data?.data) ? 'auto' : '350px', position: 'relative' }}>
        {isFetching && !data ? (
          <Box>
            <Loader isLoading />
            Loading...
          </Box>
        ) : !noResultFound ? (
          <>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <DataGrid
                loading={isFetching}
                disableColumnFilter
                disableColumnMenu
                disableSelectionOnClick
                checkboxSelection
                rowHeight={60}
                rows={data?.data && !isEmpty(data?.data) ? data?.data : []}
                autoHeight={data?.data && !isEmpty(data?.data)}
                sortingOrder={['desc', 'asc']}
                columns={GridColumns(navigate)}
                sx={{ ...gridStyles, borderTopLeftRadius: '0px', borderTopRightRadius: '0px' }}
                components={{ NoRowsOverlay: NoResult, Footer: () => null }}
                onSelectionModelChange={onGridRowSelectionHandle}
                selectionModel={selectionModel}
              />
            </Box>
            <Box sx={{ display: { xs: 'block', sm: 'none', border: `1px solid ${Color.bgLine}` } }}>
              {!isEmpty(data?.data) ? (
                <EarningMobileWrapper earnings={data.data} onSelectionChange={setSelectionModel} />
              ) : (
                <Box sx={{ height: '350px', borderTop: `1px solid ${Color.bgLine}`, p: '16px', textAlign: 'center' }}>
                  <NoResult />
                </Box>
              )}
            </Box>
            <Box sx={{ display: 'flex', flex: '1', justifyContent: 'end', paddingY: '10px' }}>
              <Pagination
                options={{
                  count: data?.data ? data?.pageCount : 1,
                  onChange(_, page) {
                    setPage(page);
                  },
                }}
              />
            </Box>
          </>
        ) : (
          <SearchEmptyResult />
        )}
      </Box>

      {/** Export Modal */}
      <ExportModal
        module='earning history'
        okBtnLabel='Export now'
        exportType={exportType}
        count={selectionModel.length}
        isOpen={openModal}
        onCancel={() => setOpenModal(false)}
        onChange={(e: string) => setExportOption(e)}
        onOk={() => {
          const ids = exportOption === 'custom' && selectionModel.length > 0 ? { id: { $in: selectionModel } } : '';
          const pageOption = exportOption === 'current' ? { page, limit: LIMIT } : null;
          const newParams = { ...ids };
          if (!isEmpty(params.s)) {
            Object.assign(newParams, JSON.parse(params.s));
          }
          onExportButtonClick({
            url: '/earnings',
            defaultParams: { sort: 'completedAt,DESC', join: 'items', ...pageOption, filter: params.filter },
            newParams,
            action: setOpenModal,
            exportType,
          });
        }}
      />

      <Modal
        isOpen={isFilterModal}
        isBottomSheet
        onCancel={() => setIsFilterModal(false)}
        noBtnDisplay={!isFilterApplied}
        okBtnLabel={'reset'}
        onOk={onClearAll}
        content={
          <Box>
            <DateRangeDropdown
              label='Delivery date'
              reset={!isFilterApplied}
              isActive={appliedFilters.includes(FILTER_TYPE.DateRange)}
              buttonOverrideStyle={{
                border: `1px solid ${Color.bgLine}`,
                justifyContent: 'space-between',
                height: '44px',
                padding: '6px 12px 6px 14px',
                borderBottom: 0,
                width: '100%',
                borderRadius: 0,
              }}
              onApply={(e) => {
                const startDate: Dayjs = e.startDate as Dayjs;
                const endDate: Dayjs = e.endDate as Dayjs;
                if (!appliedFilters.includes(FILTER_TYPE.DateRange)) {
                  applyFilter();
                  setAppliedFilters([...appliedFilters, FILTER_TYPE.DateRange]);
                }
                if (!isNull(startDate)) {
                  setPage(1);
                  Object.assign($s, { completedAt: { $gte: startDate.toISOString() } });
                  updateQueryParams({});
                }
                if (!isNull(startDate) && !isNull(endDate)) {
                  setPage(1);
                  const newEndDate = endDate.add(1, 'day');
                  Object.assign($s, { completedAt: { $gte: startDate.toISOString(), $lt: newEndDate.toISOString() } });
                  updateQueryParams({});
                }
                if (isNull(startDate) && isNull(endDate)) {
                  showToast('Start and End date are required', ToastTypes.ERROR);
                }
              }}
            />
            <DropDownMenuComponent
              noSelectionMode
              isCheckBox={categories.length > 0}
              isApplyOption
              isActive={appliedFilters.includes(FILTER_TYPE.ServiceCategory)}
              isFilterApplied={appliedFilters.includes(FILTER_TYPE.ServiceCategory)}
              label='Service category'
              reset={!isUndefined(isFilterApplied) && !isFilterApplied}
              menuItems={categories.length > 0 ? categories : [{ name: 'No categories found', value: '' }]}
              overrideLabelStyle={{ color: Color.pureBlack, fontWeight: '600' }}
              buttonOverrideStyle={{
                border: `1px solid ${Color.bgLine}`,
                justifyContent: 'space-between',
                borderBottom: 0,
                borderRadius: 0,
              }}
              noTick={true}
              onMenuItemMultiSelect={(items: IMenuItems[]) => {
                setPage(1);
                applyFilter();
                if (!appliedFilters.includes(FILTER_TYPE.ServiceCategory)) {
                  setAppliedFilters([...appliedFilters, FILTER_TYPE.ServiceCategory]);
                }

                if (items.length > 0) {
                  Object.assign($s, { 'order.mainCategory': { $in: items.map((item) => item.value) } });
                  updateQueryParams({});
                  //updateQueryParams({ filter: `order.mainCategory||$cont||${items.map((item) => item.value).toString()}` });
                } else {
                  Object.assign($s, { 'order.mainCategory': { $cont: '' } });
                }
              }}
            />

            <DropDownMenuComponent
              noSelectionMode
              label='Status'
              reset={!isUndefined(isFilterApplied) && !isFilterApplied}
              isActive={appliedFilters.includes(FILTER_TYPE.Status)}
              isCheckBox
              isApplyOption
              isFilterApplied={appliedFilters.includes(FILTER_TYPE.Status)}
              menuItems={statusesMenuItem}
              overrideLabelStyle={{ color: Color.pureBlack, fontWeight: '600' }}
              buttonOverrideStyle={{ border: `1px solid ${Color.bgLine}`, justifyContent: 'space-between', borderRadius: 0 }}
              noTick={true}
              onMenuItemMultiSelect={(items: IMenuItems[]) => {
                setPage(1);
                applyFilter();
                if (!appliedFilters.includes(FILTER_TYPE.Status)) {
                  setAppliedFilters([...appliedFilters, FILTER_TYPE.Status]);
                }
                if (items.length > 0) {
                  Object.assign($s, { status: { $in: items.map((item) => item.value) } });
                  updateQueryParams({});
                } else {
                  Object.assign($s, { status: { $cont: '' } });
                  updateQueryParams({});
                }
              }}
            />
          </Box>
        }
      />
    </Box>
  );
};

export default Earnings;
