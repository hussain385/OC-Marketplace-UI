/* eslint-disable no-unused-vars */
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import dayjs, { Dayjs } from 'dayjs';
import { isEmpty, isNull } from 'lodash';
import { Box, Divider, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { GridSelectionModel } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import MainLayout from '@/common/layout/main.layout';
import { ReactComponent as ExportIcon } from '../../../assets/icons/excel.svg';
import { ReactComponent as PdfIcon } from '../../../assets/icons/pdf.svg';
import { RenderIf } from '../../../common/components';
import { SearchBoxComponent } from '../../../common/components/search-box/search-box.component';
import DateRangeDropdown from '../../../common/components/daterange.component';
import DropDownSearch from './order/component/dropdown-search.comonent';
import { DropDownMenuComponent } from '../../../common/components/dropdown-menu-component/dropdown-menu.component';
import { useLazyGetInvoicesQuery } from '../../../redux/apis/transactionApi';
import RemoveInfoBar from '../teams/remove-bar.view';
import OrderTableRow from './order/component/order-table.component';
import { showToast, ToastTypes } from '../../../common/utils';
import { TextButton } from '../../../common/styles';
import Pagination from '../../../common/components/pagination';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { SERVICE_URLS } from '../../../common/constants';
import { IInvoiceResponse } from './order/types';
import { Color } from '../../../theme';
import Modal from '../../../common/components/modal.component';
import { exportBilling } from '../services/billing.api';
import Loader from '../../../common/components/loader.component';

let params: any = {};

const Billing = () => {
  const [invoiceModel, setInvoiceModel] = useState<GridSelectionModel>([]);
  const [openRemoveBar, setOpenRemoveBar] = useState<boolean>(false);
  const [invoices, setInvoices] = useState<IInvoiceResponse[]>([]);
  const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);
  const [sync, setSync] = useState<number>();
  const [page, setPage] = useState<number>(1);
  const [exportType, setExportType] = useState<string>('');
  const [totalPage, setTotalPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [getInvoices, { isFetching }] = useLazyGetInvoicesQuery();
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportOption, setExportOption] = useState<string>('current');
  const dispatch = useAppDispatch();
  const {
    useInfo: { token, selectedEntity, userRole },
  } = useAppSelector((state) => state.mainState);
  const statuses = [
    { name: 'All', value: '' },
    { name: 'Paid', value: '2290' },
    { name: 'Pending', value: '2291' },
    { name: 'Refunded', value: '2292' },
    { name: 'Refunding', value: '2293' },
    { name: 'Failed', value: '2294' },
  ];

  const Api = axios.create({
    baseURL: SERVICE_URLS.TRANSACTION,
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${token}`,
      'x-client-type': userRole,
      'x-client-id': selectedEntity?.uid ?? '',
    },
  });

  useEffect(() => {
    params = {}; //reseting params when page load
  }, []);

  useEffect(() => {
    loadInvoices();
  }, [sync]);

  useEffect(() => {
    setOpenModal(false);
  }, [isExporting]);

  const loadInvoices = async () => {
    const query = params ? { params: `s=${JSON.stringify(params)}`, page: page } : { params: ``, page: page };
    const { data, isSuccess } = await getInvoices(query);
    if (isSuccess) {
      setInvoiceModel([]);
      setOpenRemoveBar(false);
      setInvoices(data.data as IInvoiceResponse[]);
      setTotalPage(data.pageCount);
    } else {
      //TODO log error trace
    }
  };

  const updateParams = (args: any) => {
    Object.assign(params, args);
    const now = dayjs();
    setIsFilterApplied(true);
    setSync(now.unix());
  };

  const onlyRefreshData = () => {
    const now = dayjs();
    setSync(now.unix());
  };

  const exportInvoice = async (type: string) => {
    //download invoice in pdf or csv
    setIsExporting(true);
    const ids = exportOption === 'custom' ? { id: { $in: invoiceModel } } : '';
    const newParams = JSON.parse(JSON.stringify(params));
    const queryParams = !isEmpty(invoiceModel) ? Object.assign(newParams, ids) : newParams;
    const query = JSON.stringify(queryParams);
    const pageNumber = exportOption === 'current' ? `&page=${page}&limit=10` : '';
    const url = `/invoices?join=items&join=items.transaction&export=${type}&s=${queryParams && query}${pageNumber}`;
    dispatch(exportBilling({ url, state: { selectedEntity, userRole, token } }))
      .unwrap()
      .then((response: any) => {
        const fileName = type === 'pdf' ? `${uuidv4()}.pdf` : `${uuidv4()}.csv`;
        const href = URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', fileName); //or any other extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
        setIsExporting(false);
      })
      .catch(() => {
        setIsExporting(false);
      });
    //const response = await Api.get(url);
    /*
    const file = new Blob([response.data], { type: fileType });
    const fileURL = URL.createObjectURL(file);
    const pdfWindow: Window | null = window.open();
    if(pdfWindow){
      pdfWindow.location.href = fileURL;
    }
    */
  };

  const onSearchHandle = (value: string) => {
    if (isEmpty(value)) {
      delete params.id;
    } else {
      setPage(1);
      updateParams({ id: { $cont: value.trim() } });
    }
  };

  const onClearSearch = () => {
    delete params.id;
    const now = dayjs();
    setSync(now.unix());
  };

  const onClearAll = () => {
    setIsFilterApplied(false);
    params = {};
    const now = dayjs();
    setSync(now.unix());
  };

  const onGridRowSelectionHandle = (model: GridSelectionModel) => {
    setInvoiceModel(model);
    if (model.length > 0) {
      setOpenRemoveBar(true);
    } else {
      setOpenRemoveBar(false);
    }
  };

  const onCloseModalHandle = () => {
    setOpenModal(false);
    setExportType('');
  };

  const onOkModalHandle = () => {
    exportInvoice(exportType);
  };

  const exportModalContent = () => {
    const icon =
      exportType === 'csv' ? <ExportIcon style={{ width: 36 }} className='export' /> : exportType === 'pdf' ? <PdfIcon /> : '';
    return (
      <Box>
        <Box sx={{ display: 'flex' }}>
          <Box>{icon}</Box>
          <Typography sx={{ fontSize: '18px' }}>Export my billings to {exportType}</Typography>
        </Box>
        <Box>
          <FormControl>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              defaultValue='current'
              name='radio-buttons-group'
              onChange={(e) => setExportOption(e.target.value)}
            >
              <FormControlLabel value='current' control={<Radio />} label='Current page' />
              <FormControlLabel value='all' control={<Radio />} label='All of billing' />
              <FormControlLabel
                value='custom'
                control={<Radio />}
                disabled={invoiceModel.length === 0}
                label={`Selected: ${invoiceModel.length} row(s)`}
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
    );
  };

  return (
    <MainLayout
      headingShown
      pageTitle='Billing management'
      breadcrumb={[{ label: 'Dashboard', path: '/account' }, { label: 'Billing management' }]}
      customStyleContainer={{ padding: '16px' }}
    >
      <Loader isLoading={isFetching} isCenter />
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
        <Typography sx={{ fontWeight: 700, fontSize: '24px', lineHeight: '33px', letterSpacing: '-0.02em' }}>
          Billing management
        </Typography>
      </Box>
      <Box sx={{ width: '100%', mt: '16px' }}>
        {/**
         * Filters
         */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '6px',
            mb: '1rem',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Box sx={{ display: 'flex', gap: '1%', flexDirection: { xs: 'column', sm: 'row' }, width: '100%' }}>
            <DateRangeDropdown
              label='Date range'
              reset={!isFilterApplied}
              buttonOverrideStyle={{
                border: { xs: `1px solid ${Color.bgLine}`, sm: 'unset' },
                justifyContent: 'space-between',
                height: '44px',
                padding: '6px 10px 6px 15px',
              }}
              onApply={(e) => {
                const startDate: Dayjs = e.startDate as Dayjs;
                const endDate: Dayjs = e.endDate as Dayjs;
                if (!isNull(startDate) && !isNull(endDate)) {
                  //const newStartDate = endDate.add(1, 'day');
                  const newEndDate = endDate.add(1, 'day');
                  setPage(1);
                  updateParams({ createdAt: { $gte: startDate.toISOString(), $lt: newEndDate.toISOString() } });
                } else {
                  showToast('Start and End date are required', ToastTypes.ERROR);
                }
              }}
            />
            <DropDownSearch
              label='Service provider'
              buttonOverrideStyle={{
                border: { xs: `1px solid ${Color.bgLine}`, sm: 'unset' },
                justifyContent: 'space-between',
                height: '44px',
                padding: '6px 10px 6px 15px',
              }}
              onEnter={(e) => {
                setPage(1);
                updateParams({ 'order.sellerEntityName': { $cont: e.trim() } });
              }}
              onClear={() => {
                delete params['order.sellerEntityName'];
                onlyRefreshData();
              }}
            />
            <DropDownMenuComponent
              label='Status'
              reset={!isFilterApplied}
              menuItems={statuses}
              overrideLabelStyle={{ color: Color.pureBlack, fontWeight: '600' }}
              noTick={true}
              onMenuItemClick={(item) => {
                setPage(1);
                if (item.value === '') {
                  updateParams({ status: { $cont: '' } });
                } else {
                  updateParams({ status: { $eq: item.value } });
                }
              }}
            />
            <RenderIf value={isFilterApplied}>
              <TextButton sx={{ color: Color.priBlue, padding: '10px 16px', fontSize: '14px' }} onClick={() => onClearAll()}>
                Clear all
              </TextButton>
            </RenderIf>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              width: '100%',
              flexDirection: { xs: 'row-reverse', md: 'row' },
              gap: '24px',
            }}
            component='form'
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
                  setExportType('csv');
                  setOpenModal(true);
                }}
              />
              <Divider orientation='vertical' variant='middle' sx={{ marginX: '6px', height: '24px', background: Color.line }} />
              <PdfIcon
                onClick={() => {
                  setExportType('pdf');
                  setOpenModal(true);
                }}
              />
            </Box>
            <SearchBoxComponent
              placeholder='Search transaction ID'
              styleOverrides={{ width: '100%', maxWidth: { xs: 'unset', md: '320px' } }}
              onEnter={onSearchHandle}
              onClear={() => onClearSearch()}
            />
          </Box>
        </Box>
        {/**
         * Data Grid
         */}
        <OrderTableRow rows={invoices} waitingMessage={isFetching} onRowSelection={onGridRowSelectionHandle} />
        {/** Pagination */}
        <Box sx={{ display: 'flex', flex: '1', justifyContent: 'end', paddingY: '10px' }}>
          <Pagination
            options={{
              count: totalPage,
              onChange(_, page) {
                setPage(page);
                onlyRefreshData();
              },
            }}
          />
        </Box>
      </Box>
      <RemoveInfoBar
        isOpen={openRemoveBar}
        content={`${invoiceModel.length} rows selected`}
        onClose={() => {
          setOpenRemoveBar(false);
        }}
      />
      <Modal
        isOpen={openModal}
        isLoading={isExporting}
        okBtnLabel='Export now'
        content={exportModalContent()}
        onCancel={onCloseModalHandle}
        onOk={onOkModalHandle}
      />
    </MainLayout>
  );
};

export default Billing;
