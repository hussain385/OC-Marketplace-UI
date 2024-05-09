import dayjs, { Dayjs } from 'dayjs';
import { isEmpty, isNull, isUndefined } from 'lodash';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { DataGrid, GridSelectionModel } from '@mui/x-data-grid';
import { GridColumns } from './data-grid-column';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Color, gridStyles } from '../../../../../theme';
import { Text14, TextButton, TextHint } from '../../../../../common/styles';
import DateRangeDropdown from '../../../../../common/components/daterange.component';
import { showToast, ToastTypes } from '../../../../../common/utils';
import { IQueryReturnType } from '../interface';
import { SearchBoxComponent } from '../../../../../common/components/search-box/search-box.component';
import ExportModal from '../../../../../common/components/export-modal';
import Loader from '../../../../../common/components/loader.component';
import Pagination from '../../../../../common/components/pagination';
import { RenderIf } from '../../../../../common/components';
import { ReactComponent as ExportIcon } from '../../../../../assets/icons/excel.svg';
import { ReactComponent as PdfIcon } from '../../../../../assets/icons/pdf.svg';
import { IQueryGlobal } from '../../../../../common/interface';
import { useGetEarningInvoicesQuery } from '../services/invoice-center.api';
import { IInvoiceCenterResponse } from '../interface/invoice-center-interface';
import { onExportButtonClick } from '../utils/functions';
import { LIMIT } from '../../../../../common/constants';
import { ReactComponent as NoHistoryIcon } from '../assets/no-earning-history.svg';
import SearchEmptyResult from '../../../../../common/components/search-empty-result.component';
import { createNoResultFoundContext, createNoresultFoundLabel } from '../../../../../common/utils/global_state.util';
import { FaSliders } from 'react-icons/fa6';
import { CgChevronRight } from 'react-icons/cg';
import InvoiceTileWrapperMobile from '@/modules/seller/financial-hub/src/invoice-center/InvoiceTileWrapper.mobile.tsx';
import Modal from '@/common/components/modal.component.tsx';

const FILTER_TYPE = Object.freeze({
  DateRange: 'date_range',
});

let params: any = {};
const filters: any = {};

const InvoiceCenter = () => {
  const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);
  const [exportType, setExportType] = useState<string>('');
  const [exportOption, setExportOption] = useState<string>('current');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
  const navigate = useNavigate();
  const [timestamp, setTimestamp] = useState<number>();
  const [isFilterModal, setIsFilterModal] = useState(false);
  const defaultParams: IQueryGlobal = { limit: LIMIT, page, sort: 'createdAt,DESC', join: 'items' };
  const { data, isFetching } = useGetEarningInvoicesQuery<IQueryReturnType<IInvoiceCenterResponse>>({
    params: { ...defaultParams, s: JSON.stringify(params), filter: JSON.stringify(filters.filter) },
    timestamp,
  });

  const [noResultFound, setNoResultFound] = createNoResultFoundContext();
  const [, setSearchKeywords] = createNoresultFoundLabel();

  useEffect(() => {
    if (!isUndefined(data) && data?.data.length === 0 && !isEmpty(params.$or)) {
      setNoResultFound(true);
    } else {
      setNoResultFound(false);
    }
  }, [data, setNoResultFound]);

  const updateQueryParams = (args: any) => {
    Object.assign(params, args);
    const now = dayjs();
    setTimestamp(now.unix());
  };

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
      updateQueryParams({ $or: [{ 'earning.id': { $cont: value.trim() } }, { id: { $cont: value.trim() } }] });
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
        <Text14 sx={{ fontWeight: '600' }}>There are no invoices to display</Text14>
        <Text14 sx={{ color: Color.textHint, marginTop: '8px' }}>
          You’ll find all your invoices here once your orders are completed
        </Text14>
      </Stack>
    );
  };

  return (
    <div>
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
          mx: { xs: '16px', sm: 'unset' },
        }}
      >
        <Box>
          <Typography variant='h6' sx={{ fontSize: '20px', fontWeight: '700' }}>
            Invoice centre
          </Typography>
          <TextHint sx={{ marginTop: '8px', fontSize: '14px' }}>View and manage your invoices</TextHint>
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
              label='Date issued'
              reset={!isFilterApplied}
              isActive={appliedFilters.includes(FILTER_TYPE.DateRange)}
              buttonOverrideStyle={{
                border: `1px solid ${Color.bgLine}`,
                justifyContent: 'space-between',
                height: '44px',
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
            <RenderIf value={isFilterApplied}>
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
                placeholder='Search invoice'
                styleOverrides={{ width: '100%' }}
                onEnter={onSearchHandle}
                onClear={() => onClearSearch()}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      {/** Data Grid */}
      <Box
        sx={{
          width: { xs: 'auto', sm: '100%' },
          height: !isEmpty(data?.data) ? 'auto' : '350px',
          position: 'relative',
          mx: { xs: '16px', sm: 'unset' },
        }}
      >
        {isFetching ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '20px' }}>
            <Loader isLoading />
            <Text14>Loading...</Text14>
          </Box>
        ) : !noResultFound ? (
          <>
            <Box sx={{ height: 'inherit', display: { xs: 'none', sm: 'block' } }}>
              <DataGrid
                loading={isFetching}
                disableColumnFilter
                disableColumnMenu
                disableSelectionOnClick
                checkboxSelection
                rowHeight={60}
                rows={data?.data && !isEmpty(data?.data) ? data?.data : []}
                autoHeight={!isEmpty(data?.data)}
                sortingOrder={['desc', 'asc']}
                columns={GridColumns(navigate)}
                sx={{ ...gridStyles, borderTopLeftRadius: '0px', borderTopRightRadius: '0px' }}
                components={{ NoRowsOverlay: NoResult, Footer: () => null }}
                onSelectionModelChange={(model) => {
                  setSelectionModel(model);
                }}
                selectionModel={selectionModel}
              />
            </Box>

            <Box sx={{ height: 'inherit', display: { xs: 'block', sm: 'none' }, border: `1px solid ${Color.bgLine}` }}>
              <Box
                onClick={() => setIsFilterModal(true)}
                sx={{
                  padding: '8px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <FaSliders size={22} />
                  <Typography sx={{ fontWeight: 600 }}>Filter</Typography>
                </Box>

                <CgChevronRight size={16} />
              </Box>

              {isEmpty(data?.data) ? (
                <Box sx={{ borderTop: `1px solid ${Color.bgLine}`, height: 'inherit' }}>
                  <NoResult />
                </Box>
              ) : (
                <InvoiceTileWrapperMobile invoices={data.data} onSelectionChange={setSelectionModel} />
              )}
            </Box>
            {!isEmpty(data?.data) && (
              <Box sx={{ display: 'flex', flex: '1', justifyContent: 'end', paddingY: '10px' }}>
                <Pagination
                  options={{
                    count: data ? data?.pageCount : 1,
                    onChange(_, page) {
                      setPage(page);
                    },
                  }}
                />
              </Box>
            )}
          </>
        ) : (
          <SearchEmptyResult />
        )}
      </Box>
      {/** Export Modal */}
      <ExportModal
        module='invoices'
        exportType={exportType}
        count={selectionModel.length}
        isOpen={openModal}
        okBtnLabel='Export now'
        onCancel={() => setOpenModal(false)}
        onChange={(e: string) => setExportOption(e)}
        onOk={() => {
          const ids = exportOption === 'custom' && selectionModel.length > 0 ? { id: { $in: selectionModel } } : '';
          const pageOption = exportOption === 'current' ? { page, limit: LIMIT } : null;
          const newParams = { ...ids, ...params };
          onExportButtonClick({
            url: '/earning-invoices',
            defaultParams: { sort: 'createdAt,DESC', join: 'items', ...pageOption },
            newParams,
            action: setOpenModal,
            exportType,
          });
        }}
      />

      <Modal
        content={
          <Box>
            <DateRangeDropdown
              label='Date issued'
              reset={!isFilterApplied}
              isActive={appliedFilters.includes(FILTER_TYPE.DateRange)}
              buttonOverrideStyle={{
                border: `1px solid ${Color.bgLine}`,
                justifyContent: 'space-between',
                height: '44px',
                width: '100%',
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
          </Box>
        }
        isOpen={isFilterModal}
        isBottomSheet
        onCancel={() => setIsFilterModal(false)}
        noBtnDisplay={!isFilterApplied}
        okBtnLabel={'reset'}
        onOk={onClearAll}
      />
    </div>
  );
};

export default InvoiceCenter;
