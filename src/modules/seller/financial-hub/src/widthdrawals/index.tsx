import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment/moment';
import { isEmpty, isNull, isUndefined } from 'lodash';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { IWithdrawalResponse } from '../interface/withdrawal.interface';
import { useGetWithdrawalsQuery } from '../services/withdrawal.api';
import { useAppSelector } from '../../../../../redux/hooks';
import { IMenuItems, IQueryGlobal } from '../../../../../common/interface';
import { onExportButtonClick } from '../utils/functions';
import { IQueryReturnType } from '../interface';
import { useGetReportQuery } from '../services/index.api';
import { AvailableFunds, TotalEarnings, UpcomingEarnings } from '../components/card.component';
import { createNoResultFoundContext, createNoresultFoundLabel } from '../../../../../common/utils/global_state.util';
import { LIMIT } from '../../../../../common/constants';
import { ReactComponent as NoHistoryIcon } from '../assets/no-earning-history.svg';
import SearchEmptyResult from '../../../../../common/components/search-empty-result.component';
import { FaSliders } from 'react-icons/fa6';
import { CgChevronRight } from 'react-icons/cg';
import WithdrawalsMobileWrapper from '@/modules/seller/financial-hub/src/widthdrawals/WithdrawalsMobileWrapper.tsx';
import Modal from '@/common/components/modal.component.tsx';

const FILTER_TYPE = Object.freeze({
  DateRange: 'date_range',
  ServiceCategory: 'service_category',
  Status: 'status',
});

let params: any = {};

const Withdrawal = () => {
  const [isFilterApplied, setIsFilterApplied] = useState<boolean | undefined>(undefined);
  const [exportType, setExportType] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
  const [exportOption, setExportOption] = useState<string>('current');
  const [isFilterModal, setIsFilterModal] = useState(false);
  const navigate = useNavigate();
  const defaultParams: IQueryGlobal = { limit: LIMIT, page, sort: 'createdAt,DESC', join: 'items' };
  const [timestamp, setTimestamp] = useState<number>();
  const { data, isFetching } = useGetWithdrawalsQuery<IQueryReturnType<IWithdrawalResponse>>({
    params: { ...defaultParams, s: JSON.stringify(params) },
    timestamp,
  });
  const {
    useInfo: { user },
  } = useAppSelector((state) => state.mainState);

  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  const [noResultFound, setNoResultFound] = createNoResultFoundContext();
  const [, setSearchKeywords] = createNoresultFoundLabel();

  useEffect(() => {
    if (!isUndefined(data) && data?.data.length === 0 && !isEmpty(params.$or)) {
      setNoResultFound(true);
    } else {
      setNoResultFound(false);
    }
  }, [data, setNoResultFound]);

  const {
    data: reportData,
    isLoading: isReportLoading,
    fulfilledTimeStamp,
  } = useGetReportQuery({
    url: '/withdrawal',
    options: { fromDate, toDate },
  });
  const updateTime = useMemo(() => {
    return moment(fulfilledTimeStamp).format('lll ([GMT] Z)');
  }, [fulfilledTimeStamp]);
  const asOf = dayjs().format('MM ddd, YYYY');

  const updateQueryParams = (args: any) => {
    Object.assign(params, args);
    const now = dayjs();
    setTimestamp(now.unix());
  };

  const statusesMenuItem = [
    {
      name: 'Requested',
      value: '3200',
      labelStyle: { background: `${Color.purple}10`, color: Color.purple, borderRadius: '24px', padding: '4px 16px' },
    },
    {
      name: 'Processing',
      value: '3201',
      labelStyle: { background: `${Color.priBlue}10`, color: Color.priBlue, borderRadius: '24px', padding: '4px 16px' },
    },
    {
      name: 'Withdrawn',
      value: '3202',
      labelStyle: { background: `${Color.green}10`, color: Color.green, borderRadius: '24px', padding: '4px 16px' },
    },
    {
      name: 'Failed',
      value: '3203',
      labelStyle: { background: `${Color.pink}10`, color: Color.pink, borderRadius: '24px', padding: '4px 16px' },
    },
  ];

  const onClearAll = () => {
    setIsFilterApplied(false);
    setAppliedFilters([]);
    params = {};
  };

  const onSearchHandle = (value: string) => {
    if (isEmpty(value)) {
      delete params.$or;
    } else {
      setPage(1);
      setSearchKeywords(value.trim());
      updateQueryParams({ $or: [{ id: { $cont: value.trim() } }] });
    }
  };

  const onClearSearch = () => {
    delete params.$or;
    updateQueryParams({});
  };

  const applyFilter = () => {
    setIsFilterApplied(true);
  };

  const NoResult = () => {
    return (
      <Stack height='100%' alignItems='center' justifyContent='center'>
        <NoHistoryIcon width={64} height={64} style={{ marginBottom: '16px' }} />
        <Text14 sx={{ fontWeight: '600' }}>There are no withdrawals to display</Text14>
        <Text14 sx={{ color: Color.textHint, marginTop: '8px' }}>
          You’ll find all your withdrawals info here once you completed a withdrawal
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
                title={'Requested to withdraw'}
                subtext={'To be transfered *'}
                pending={reportData?.withdrawal?.requested}
                hint='If your withdrawal request is successful, this amount will be transferred to your designated bank account'
              />
            </Grid>
            <Grid item>
              <TotalEarnings
                title={'Total completed withdraws'}
                total={reportData?.withdrawal?.total}
                subtext={'Withdrawn *'}
                note={`Your withdrawal for all-time as of today, ${asOf}`}
                hint={'* The total earnings transferred to your designated bank account within a specific period'}
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
          <Typography variant='h6' sx={{ fontSize: '20px', fontWeight: '700', letterSpacing: '-0.4px' }}>
            Withdrawals history
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
              label='Requested date'
              reset={!isFilterApplied}
              isActive={appliedFilters.includes(FILTER_TYPE.DateRange)}
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
                if (!appliedFilters.includes(FILTER_TYPE.DateRange)) {
                  applyFilter();
                  setAppliedFilters([...appliedFilters, FILTER_TYPE.DateRange]);
                }
                if (!isNull(startDate)) {
                  setPage(1);
                  updateQueryParams({ createdAt: { $gte: startDate.toISOString() } });
                }
                if (!isNull(startDate) && !isNull(endDate)) {
                  setPage(1);
                  const newEndDate = endDate.add(1, 'day');
                  updateQueryParams({ createdAt: { $gte: startDate.toISOString(), $lt: newEndDate.toISOString() } });
                }
                if (isNull(startDate) && isNull(endDate)) {
                  showToast('Start and End date are required', ToastTypes.ERROR);
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
                  updateQueryParams({ status: { $in: items.map((item) => item.value) } });
                } else {
                  updateQueryParams({ status: { $cont: '' } });
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
            <SearchBoxComponent
              placeholder='Search withdrawal'
              styleOverrides={{ width: '100%', maxWidth: { xs: 'unset', md: '320px' } }}
              onEnter={onSearchHandle}
              onClear={() => onClearSearch()}
            />
          </Box>
        </Box>
      </Box>
      {/** Data Grid */}
      {isFetching ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '20px' }}>
          <Loader isLoading />
          <Text14>Loading...</Text14>
        </Box>
      ) : !noResultFound ? (
        <>
          <Box
            sx={{
              display: { xs: 'none', sm: 'block' },
              width: '100%',
              height: !isEmpty(data?.data) ? 'auto' : '350px',
              position: 'relative',
            }}
          >
            <DataGrid
              disableColumnFilter
              disableColumnMenu
              disableSelectionOnClick
              checkboxSelection
              rowHeight={60}
              autoHeight={!isEmpty(data?.data)}
              rows={data?.data && !isEmpty(data?.data) ? data?.data : []}
              sortingOrder={['desc', 'asc']}
              columns={GridColumns(navigate, user)}
              sx={{ ...gridStyles, borderTopLeftRadius: '0px', borderTopRightRadius: '0px' }}
              components={{ NoRowsOverlay: NoResult, Footer: () => null }}
              onSelectionModelChange={(model) => {
                setSelectionModel(model);
              }}
              selectionModel={selectionModel}
            />
            <Box sx={{ display: 'flex', flex: '1', justifyContent: 'end', paddingY: '10px' }}>
              <Pagination
                options={{
                  count: data?.data ? data.pageCount : 1,
                  onChange(_, page) {
                    setPage(page);
                  },
                }}
              />
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'block', sm: 'none' }, border: `1px solid ${Color.bgLine}` }}>
            <Box
              sx={{
                padding: '8px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onClick={() => setIsFilterModal(true)}
            >
              <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <FaSliders size={22} />
                <Typography sx={{ fontWeight: 600 }}>Filter</Typography>
              </Box>

              <CgChevronRight size={16} />
            </Box>

            {!isEmpty(data?.data) ? (
              <WithdrawalsMobileWrapper withdrawals={data.data} onSelectionChange={setSelectionModel} />
            ) : (
              <Box sx={{ borderTop: `1px solid ${Color.bgLine}`, height: '350px', p: '16px', textAlign: 'center' }}>
                <NoResult />
              </Box>
            )}
          </Box>
        </>
      ) : (
        <SearchEmptyResult />
      )}
      {/** Export Modal */}
      <ExportModal
        module='withdrawal history'
        okBtnLabel='Export now'
        exportType={exportType}
        count={selectionModel.length}
        isOpen={openModal}
        onCancel={() => setOpenModal(false)}
        onChange={(e: string) => setExportOption(e)}
        onOk={() => {
          const ids = exportOption === 'custom' && selectionModel.length > 0 ? { id: { $in: selectionModel } } : '';
          const pageOption = exportOption === 'current' ? { page, limit: LIMIT } : null;
          const newParams = { ...ids, ...params };
          onExportButtonClick({
            url: '/withdrawals',
            defaultParams: { sort: 'createdAt,DESC', join: 'items', ...pageOption },
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
              label='Requested date'
              reset={!isFilterApplied}
              isActive={appliedFilters.includes(FILTER_TYPE.DateRange)}
              buttonOverrideStyle={{
                border: `1px solid ${Color.bgLine}`,
                justifyContent: 'space-between',
                height: '44px',
                padding: '6px 12px 6px 14px',
                width: '100%',
                borderBottom: 0,
              }}
              isColon={false}
              onApply={(e) => {
                const startDate: Dayjs = e.startDate as Dayjs;
                const endDate: Dayjs = e.endDate as Dayjs;
                if (!appliedFilters.includes(FILTER_TYPE.DateRange)) {
                  applyFilter();
                  setAppliedFilters([...appliedFilters, FILTER_TYPE.DateRange]);
                }
                if (!isNull(startDate)) {
                  setPage(1);
                  updateQueryParams({ createdAt: { $gte: startDate.toISOString() } });
                }
                if (!isNull(startDate) && !isNull(endDate)) {
                  setPage(1);
                  const newEndDate = endDate.add(1, 'day');
                  updateQueryParams({ createdAt: { $gte: startDate.toISOString(), $lt: newEndDate.toISOString() } });
                }
                if (isNull(startDate) && isNull(endDate)) {
                  showToast('Start and End date are required', ToastTypes.ERROR);
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
                  updateQueryParams({ status: { $in: items.map((item) => item.value) } });
                } else {
                  updateQueryParams({ status: { $cont: '' } });
                }
              }}
            />
          </Box>
        }
      />
    </Box>
  );
};

export default Withdrawal;
