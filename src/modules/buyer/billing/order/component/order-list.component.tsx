/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { isEmpty, isUndefined } from 'lodash';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { createGlobalState } from 'react-use';
import CircularLoading from '../../../../../common/components/circular-loading';

import EmptyUI from '../../../../../common/components/empty-ui.component';

import { BoxContainer } from '../../../../../common/styles';

import {
  createClearStateInputContext,
  createDateRangeLabel,
  createServiceProviderLabel,
  EnDateContext,
  isFilterStateOrder,
  StartDateContext,
} from '../../../../../common/utils/global_state.util';
import useCatalogPayload from '../../../../../common/utils/hooks/useCatalogPayload';

import { useDebounce } from '../../../../../common/utils/hooks/useDebounce';
import { useLazyGetOverViewOfServicesQuery } from '../../../../../redux/apis/catalogApi';
import {
  useGetTransactionBillingOrderQuery,
  useLazyGetKeyStatusQuery,
  useLazyGetTransactionBillingOrderQuery,
} from '../../../../../redux/apis/transactionApi';

import { BillingStatusOrder, Orders, ServiceProvider, UnionToIntersection } from '../types';

import OrderFilterRow, { EndDateDateGLobalState, onFilterDateActive, StartDateGLobalState } from './order-filter.component';

import OrderTableRow from './order-table.component';
import { IServiceCategory } from '../../../../../common/interface/catalog-interface';

export const StateOrderNameDropdownGlobal = createGlobalState<string>('');
export const StateProviderNameDropdownGlobal = createGlobalState<string>('');
export const StateSearchFilterCompanyName = createGlobalState<any[] | []>([]);
export const StateIsStartFiltering = createGlobalState<boolean>(false);

const OrderList = () => {
  const { data: ordersItem } = useGetTransactionBillingOrderQuery({
    join: 'transactions',
    sort: 'createdAt,DESC',
    filter: ['orderItems.paymentStatus||$eq||2270'],
  });

  const [getOverViewOfServices] = useLazyGetOverViewOfServicesQuery();

  const [getTransactionPaymentStatus] = useLazyGetKeyStatusQuery();

  const [getTransactionBillingOrder] = useLazyGetTransactionBillingOrderQuery();

  const [data, setData] = useState<Orders[]>([]);
  const { allCategories } = useCatalogPayload();

  const [statusOrder, SetStatusOrder] = useState<BillingStatusOrder[]>([]);
  // const [companiesValue, setCompanies] = useState<any>([]);
  // const [servicesValue, setServices] = useState<any>([]);
  const mounted = React.useRef<boolean>(false);

  // const companyName = [
  //   'Tax Compliance & Tax Filing Services',
  //   'Foreign Qualifications Service',
  //   'Web Design Services Design',
  //   'Registered Agent Service',
  //   'Certificate of Existence Service',
  // ];

  let cloneData: Orders[] = [];
  const statusData: BillingStatusOrder[] = [];

  const statusPayment: any = [];
  const companyServiceProvider: any = [];

  async function getCompanyRequestById(arr: string[], type = '') {
    const resService: ({ data: any } | { error: FetchBaseQueryError | SerializedError })[] = [];

    if (type === 'services') {
      for (let i = 0; i < arr.length; i++) {
        const res: any = await getOverViewOfServices({
          code: arr[i],
          queryObject: {
            populate: [{ path: '__entity', populate: ['__logo'] }],
          },
        }).unwrap();

        resService.push(res);
      }
      return resService;
    }
    if (type === 'paymentStatus') {
      for (let i = 0; i < arr.length; i++) {
        const res = await getTransactionPaymentStatus({ filter: [`code||$eq||${arr[i]}`] }).unwrap();

        resService.push(res);
      }
      return resService;
    }
  }

  const resData = ordersItem?.data;

  async function mapPaymentStatusResponseData() {
    const uniqueStatusPayment = [
      ...new Set(resData.flatMap((item: { orderItems: [{ paymentStatus: string }] }) => item.orderItems[0].paymentStatus)),
    ];

    const getPaymentStatusCode: any = await getCompanyRequestById(uniqueStatusPayment as string[], 'paymentStatus');

    if (Array.isArray(getPaymentStatusCode) && getPaymentStatusCode.length > 0) {
      getPaymentStatusCode.map((item: { data: { data: [{ code: string; text: string }] } }) =>
        statusPayment.push({
          code: item.data.data[0].code,
          status: item.data.data[0].text,
        }),
      );
    }
  }

  async function mapServiceResponseData() {
    // const resServicesValue: any = await getCompanyRequestById(uniqueServicesId as string[], 'services');

    // resServicesValue.map((item: { data: { data: { id: number; attributes: { name: string } } } }) =>
    //   companyServiceProvider.push({
    //     serviceId: item.data.data.id.toString(),
    //     serviceName: item.data.data.attributes.name,
    //   }),
    // );

    const uniqueServicesId = [...new Set(resData.flatMap((item: { serviceId: string }) => item.serviceId))];

    const resServicesValue: any = await getCompanyRequestById(uniqueServicesId as string[], 'services');

    if (!isUndefined(resServicesValue?.data)) {
      if (Array.isArray(resServicesValue) && resServicesValue.length > 0) {
        resServicesValue.map(
          (item: { data: { data: { uid: string; name: string; __entity: { profile: { details: { name: string } } } } } }) =>
            companyServiceProvider.push({
              serviceId: item?.data?.data?.uid,
              serviceName: item.data.data.name,
              companyName: item.data.data.__entity.profile.details.name,
            }),
        );
      }
    } else {
      companyServiceProvider.push({
        serviceId: undefined,
        serviceName: 'Service not found',
        companyName: 'Service not found',
      });
    }
  }

  const getOrders = useCallback(async () => {
    mounted.current = true;

    if (ordersItem?.data.length > 0) {
      await mapPaymentStatusResponseData();

      await mapServiceResponseData();

      cloneData = [];

      resData.map(
        async (item: {
          currency: string;
          id: string;
          name: string;
          serviceId: string;
          createdAt: string;
          categories: string[];
          sellerEntityName: string;
          orderItems: [{ dueAmount: number; paymentDate: string; paymentStatus: string }];
          transactions: [{ id: string }];
        }) => {
          const paymentStatus = statusPayment.find((value: { code: string }) => value.code === item.orderItems[0].paymentStatus);

          let categoryName = '';

          if (!isEmpty(item.categories)) {
            const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[0]);

            if (!isEmpty(findCategory)) {
              categoryName = findCategory ? (findCategory.name as string) : '';
            } else {
              const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[1]);

              categoryName = findCategory ? (findCategory.name as string) : '';
            }
          }

          statusData.push({ list: paymentStatus.status, code: item.orderItems[0].paymentStatus });

          cloneData.push({
            currency: item.currency,
            dueAmount: item.orderItems[0].dueAmount,
            id: item.transactions[0]?.id ?? '',
            order: item.id,
            paymentDate: item.createdAt,
            paymentStatus: paymentStatus.status,
            serviceName: item.name ?? '',
            serviceTitle: categoryName,
            serviceProvider: item.sellerEntityName ?? '',
            serviceId: item.serviceId,
          });
        },
      );

      statusData.unshift({ list: 'All', code: '' });

      const uniqueStatus = getUniqueArray<BillingStatusOrder>(statusData, 'list', 'code');

      setData(cloneData);
      SetStatusOrder(uniqueStatus);
    }
  }, [ordersItem]);

  useEffect(() => {
    if (cloneData.length === 0 && ordersItem?.data.length > 0) {
      getOrders();
    }

    () => (mounted.current = false);
  }, [ordersItem]);

  const [rows, setRows] = useState<Orders[]>(data);
  const [isNotFound, setNoRecord] = useState<boolean>(false);
  const [orderName, setOrderName] = StateOrderNameDropdownGlobal();
  const [providerName, setProviderName] = StateProviderNameDropdownGlobal();
  const [providerLabel, setLabelProvider] = createServiceProviderLabel();
  const [orderStatusCode, setOrderStatusCode] = useState<string>('');
  const [dataRangeLabel, setDateRangeLabel] = createDateRangeLabel();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlerClick = async (
    items: BillingStatusOrder[],
    index: number,
    type: string,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null | number>>,
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, prefer-const
    let arrFilterRow: UnionToIntersection<Orders[]> = [];
    let filteredValue: BillingStatusOrder = { list: '', code: '' };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items.filter((item: any, i: number) => i === index).map((val: any) => (filteredValue = val));

    if (filteredValue.list === 'All') {
      if (!isEmpty(dataRangeLabel) && dataRangeLabel !== 'All' && !isEmpty(providerLabel) && providerLabel !== 'All') {
        const dateLabel = dataRangeLabel.split(' - ');

        const getStartDate = moment(dateLabel[0]).format('YYYY-MM-DD');
        const getEndDate = moment(dateLabel[1]).add(1, 'days').format('YYYY-MM-DD');
        const orderFilter: any = await getTransactionBillingOrder({
          filter: [
            `sellerEntityName||$eq||${providerLabel}`,
            `createdAt||$gte||${getStartDate}`,
            `createdAt||$lt||${getEndDate}`,
          ],
          join: 'transactions',
        }).unwrap();

        const resOrderData = orderFilter?.data as any;

        await mapPaymentStatusResponseData();

        resOrderData.map((item: any) => {
          const paymentStatus = statusPayment.find((value: { code: string }) => value.code === item.orderItems[0].paymentStatus);

          let categoryName = '';

          if (!isEmpty(item.categories)) {
            const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[0]);

            if (!isEmpty(findCategory)) {
              categoryName = findCategory ? (findCategory.name as string) : '';
            } else {
              const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[1]);

              categoryName = findCategory ? (findCategory.name as string) : '';
            }
          }

          arrFilterRow.push({
            currency: item.currency,
            dueAmount: item.orderItems[0].dueAmount,
            id: item.transactions[0]?.id ?? '',
            order: item.id,
            paymentDate: item.createdAt,
            paymentStatus: paymentStatus.status,
            serviceName: item.name ?? '',
            serviceTitle: categoryName,
            serviceProvider: item.sellerEntityName ?? '',
            serviceId: item.serviceId,
          });
        });
      }

      if (!isEmpty(providerLabel) && providerLabel !== 'All' && isEmpty(dataRangeLabel)) {
        const orderFilter: any = await getTransactionBillingOrder({
          filter: [`sellerEntityName||$cont||${providerLabel}`],
          join: 'transactions',
        }).unwrap();

        const resOrderData = orderFilter?.data as any;

        await mapPaymentStatusResponseData();

        resOrderData.map((item: any) => {
          const paymentStatus = statusPayment.find((value: { code: string }) => value.code === item.orderItems[0].paymentStatus);

          let categoryName = '';

          if (!isEmpty(item.categories)) {
            const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[0]);

            if (!isEmpty(findCategory)) {
              categoryName = findCategory ? (findCategory.name as string) : '';
            } else {
              const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[1]);

              categoryName = findCategory ? (findCategory.name as string) : '';
            }
          }

          arrFilterRow.push({
            currency: item.currency,
            dueAmount: item.orderItems[0].dueAmount,
            id: item.transactions[0]?.id ?? '',
            order: item.id,
            paymentDate: item.createdAt,
            paymentStatus: paymentStatus.status,
            serviceName: item.name ?? '',
            serviceTitle: categoryName,
            serviceProvider: item.sellerEntityName ?? '',
            serviceId: item.serviceId,
          });
        });
      }

      if (!isEmpty(arrFilterRow)) {
        setRows(arrFilterRow as Orders[]);
        setNoRecord(false);
        setOrderStatusCode(filteredValue.code);
        setOrderName(filteredValue.list !== 'All' ? filteredValue.list : '');
        setState(false);
      } else {
        if (isEmpty(providerLabel) && isEmpty(dataRangeLabel)) {
          clearAllRecords();
          setNoRecord(false);
          setState(false);
          setOrderStatusCode(filteredValue.code);
          setOrderName(filteredValue.list !== 'All' ? filteredValue.list : '');
        } else {
          setState(true);
          setNoRecord(true);
          setOrderStatusCode(filteredValue.code);
          setOrderName(filteredValue.list !== 'All' ? filteredValue.list : '');
        }
      }
    } else {
      if (
        !isEmpty(dataRangeLabel) &&
        dataRangeLabel !== 'All' &&
        !isEmpty(filteredValue.list) &&
        !isEmpty(providerLabel) &&
        providerLabel !== 'All'
      ) {
        const dateLabel = dataRangeLabel.split(' - ');

        const getStartDate = moment(dateLabel[0]).format('YYYY-MM-DD');
        const getEndDate = moment(dateLabel[1]).add(1, 'days').format('YYYY-MM-DD');

        const orderFilter: any = await getTransactionBillingOrder({
          filter: [
            `sellerEntityName||$eq||${providerLabel}`,
            `createdAt||$gte||${getStartDate}`,
            `createdAt||$lt||${getEndDate}`,
            `orderItems.paymentStatus||$eq||${filteredValue.code}`,
          ],
          join: 'transactions',
        }).unwrap();

        const resOrderData = orderFilter?.data as any;

        await mapPaymentStatusResponseData();

        resOrderData.map((item: any) => {
          const paymentStatus = statusPayment.find((value: { code: string }) => value.code === item.orderItems[0].paymentStatus);

          let categoryName = '';

          if (!isEmpty(item.categories)) {
            const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[0]);

            if (!isEmpty(findCategory)) {
              categoryName = findCategory ? (findCategory.name as string) : '';
            } else {
              const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[1]);

              categoryName = findCategory ? (findCategory.name as string) : '';
            }
          }

          arrFilterRow.push({
            currency: item.currency,
            dueAmount: item.orderItems[0].dueAmount,
            id: item.transactions[0]?.id ?? '',
            order: item.id,
            paymentDate: item.createdAt,
            paymentStatus: paymentStatus.status,
            serviceName: item.name ?? '',
            serviceTitle: categoryName,
            serviceProvider: item.sellerEntityName ?? '',
            serviceId: item.serviceId,
          });
        });
      }

      if (
        !isEmpty(dataRangeLabel) &&
        dataRangeLabel !== 'All' &&
        !isEmpty(filteredValue.list) &&
        isEmpty(providerLabel)
        // providerLabel !== 'All' // TODO: check this, because the condition is isEmpty(providerLabel) above
      ) {
        const dateLabel = dataRangeLabel.split(' - ');

        const getStartDate = moment(dateLabel[0]).format('YYYY-MM-DD');
        const getEndDate = moment(dateLabel[1]).add(1, 'days').format('YYYY-MM-DD');

        const orderFilter: any = await getTransactionBillingOrder({
          filter: [
            `sellerEntityName||$eq||${providerLabel}`,
            `createdAt||$gte||${getStartDate}`,
            `createdAt||$lt||${getEndDate}`,
            `orderItems.paymentStatus||$eq||${filteredValue.code}`,
          ],
          join: 'transactions',
        }).unwrap();

        const resOrderData = orderFilter?.data as any;

        await mapPaymentStatusResponseData();

        resOrderData.map((item: any) => {
          const paymentStatus = statusPayment.find((value: { code: string }) => value.code === item.orderItems[0].paymentStatus);

          let categoryName = '';

          if (!isEmpty(item.categories)) {
            const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[0]);

            if (!isEmpty(findCategory)) {
              categoryName = findCategory ? (findCategory.name as string) : '';
            } else {
              const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[1]);

              categoryName = findCategory ? (findCategory.name as string) : '';
            }
          }

          arrFilterRow.push({
            currency: item.currency,
            dueAmount: item.orderItems[0].dueAmount,
            id: item.transactions[0]?.id ?? '',
            order: item.id,
            paymentDate: item.createdAt,
            paymentStatus: paymentStatus.status,
            serviceName: item.name ?? '',
            serviceTitle: categoryName,
            serviceProvider: item.sellerEntityName ?? '',
            serviceId: item.serviceId,
          });
        });
      }

      if (!isEmpty(providerLabel) && providerLabel !== 'All' && isEmpty(dataRangeLabel)) {
        const orderFilter: any = await getTransactionBillingOrder({
          filter: [`sellerEntityName||$cont||${providerLabel}`, `orderItems.paymentStatus||$eq||${filteredValue.code}`],
          join: 'transactions',
        }).unwrap();

        const resOrderData = orderFilter?.data as any;

        await mapPaymentStatusResponseData();

        resOrderData.map((item: any) => {
          const paymentStatus = statusPayment.find((value: { code: string }) => value.code === item.orderItems[0].paymentStatus);

          let categoryName = '';

          if (!isEmpty(item.categories)) {
            const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[0]);

            if (!isEmpty(findCategory)) {
              categoryName = findCategory ? (findCategory.name as string) : '';
            } else {
              const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[1]);

              categoryName = findCategory ? (findCategory.name as string) : '';
            }
          }

          arrFilterRow.push({
            currency: item.currency,
            dueAmount: item.orderItems[0].dueAmount,
            id: item.transactions[0]?.id ?? '',
            order: item.id,
            paymentDate: item.createdAt,
            paymentStatus: paymentStatus.status,
            serviceName: item.name ?? '',
            serviceTitle: categoryName,
            serviceProvider: item.sellerEntityName ?? '',
            serviceId: item.serviceId,
          });
        });
      }

      if (isEmpty(providerLabel) && isEmpty(dataRangeLabel)) {
        const orderFilterPaymentStatus: any = await getTransactionBillingOrder({
          filter: [`orderItems.paymentStatus||$eq||${filteredValue.code}`],
          join: 'transactions',
        }).unwrap();

        const resOrderData = orderFilterPaymentStatus?.data as any;

        await mapPaymentStatusResponseData();

        resOrderData.map((item: any) => {
          const paymentStatus = statusPayment.find((value: { code: string }) => value.code === item.orderItems[0].paymentStatus);

          let categoryName = '';

          if (!isEmpty(item.categories)) {
            const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[0]);

            if (!isEmpty(findCategory)) {
              categoryName = findCategory ? (findCategory.name as string) : '';
            } else {
              const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[1]);

              categoryName = findCategory ? (findCategory.name as string) : '';
            }
          }

          arrFilterRow.push({
            currency: item.currency,
            dueAmount: item.orderItems[0].dueAmount,
            id: item.transactions[0]?.id ?? '',
            order: item.id,
            paymentDate: item.createdAt,
            paymentStatus: paymentStatus.status,
            serviceName: item.name ?? '',
            serviceTitle: categoryName,
            serviceProvider: item.sellerEntityName ?? '',
            serviceId: item.serviceId,
          });
        });
      }

      if (!isEmpty(arrFilterRow)) {
        setRows(arrFilterRow as Orders[]);
        setNoRecord(false);
        setOrderStatusCode(filteredValue.code);
        setOrderName(filteredValue.list !== 'All' ? filteredValue.list : '');

        setState(false);
      } else {
        setState(true);
        setNoRecord(true);
        setOrderStatusCode(filteredValue.code);
        setOrderName(filteredValue.list !== 'All' ? filteredValue.list : '');
      }
    }

    setAnchorEl(null);
  };

  const [, setCompanyFilter] = StateSearchFilterCompanyName();
  const [, setState] = isFilterStateOrder();
  const [, setFilterCompany] = StateIsStartFiltering();

  const [start] = StartDateGLobalState();
  const [end] = EndDateDateGLobalState();
  const [waitingMessage, setWaitingMessage] = useState<boolean>(false);

  const [, setClearState] = createClearStateInputContext();

  const clearSearchData = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setRows([]);
      getOrders();
      setClearState(false);
      setNoRecord(false);
    }
  };

  const handlerSearch = useDebounce(async (e) => {
    const arrData: UnionToIntersection<Orders[]> = [];

    if (e.target.value !== '') {
      const orderFilter: any = await getTransactionBillingOrder({
        filter: [`id||$cont||${e.target.value}`],
        join: 'transactions',
      }).unwrap();

      const resOrderData = orderFilter?.data as any;

      await mapPaymentStatusResponseData();

      resOrderData.map((item: any) => {
        const paymentStatus = statusPayment.find((value: { code: string }) => value.code === item.orderItems[0].paymentStatus);

        let categoryName = '';

        if (!isEmpty(item.categories)) {
          const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[0]);

          if (!isEmpty(findCategory)) {
            categoryName = findCategory ? (findCategory.name as string) : '';
          } else {
            const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[1]);

            categoryName = findCategory ? (findCategory.name as string) : '';
          }
        }

        arrData.push({
          currency: item.currency,
          dueAmount: item.orderItems[0].dueAmount,
          id: item.transactions[0]?.id ?? '',
          order: item.id,
          paymentDate: item.createdAt,
          paymentStatus: paymentStatus.status,
          serviceName: item.name ?? '',
          serviceTitle: categoryName,
          serviceProvider: item.sellerEntityName ?? '',
          serviceId: item.serviceId,
        });
      });

      if (!isEmpty(arrData)) {
        setRows(arrData as Orders[]);
        setClearState(true);
        setNoRecord(false);
        setState(false);
      } else {
        setState(true);
        setNoRecord(true);
        setClearState(true);
      }
    } else {
      setWaitingMessage(true);
      setClearState(false);

      setTimeout(() => {
        getOrders();
      }, 2000);

      // setData(cloneData as Orders[]);
      setState(false);
    }
  }, 500);

  const [, setDefaultStartValue] = StartDateContext();
  const [, setDefaultEndValue] = EnDateContext();

  const clearAllRecords = () => {
    setRows([]);
    getOrders().then(null);
    setNoRecord(false);
    setProviderName('');
    setLabelProvider('');
    setOrderName('');
    setDateRangeLabel('');
    setDefaultStartValue('');
    setDefaultEndValue('');
  };

  function getUniqueArray<T>(array: T[], key1: keyof T, key2: keyof T) {
    return array.reduce((uniqueArray, obj) => {
      const isDuplicate = uniqueArray.some((uniqueObj) => uniqueObj[key1] === obj[key1] && uniqueObj[key2] === obj[key2]);
      if (!isDuplicate) {
        uniqueArray.push(obj);
      }
      return uniqueArray;
    }, [] as T[]);
  }

  const handleFilterSearch = useDebounce(async (e) => {
    const arrData: Array<{ provider?: string; id?: string }> = [];

    if (e.target.value !== '') {
      const orderFilter: any = await getTransactionBillingOrder({
        filter: [`sellerEntityName||$cont||${e.target.value}`],
        join: 'transactions',
      }).unwrap();

      const resOrderData = orderFilter?.data as any;

      resOrderData.map((item: any) => {
        arrData.push({ provider: item.sellerEntityName, id: item.serviceId });
      });

      const uniqueArray = getUniqueArray<ServiceProvider>(arrData, 'provider', 'id');

      if (!isEmpty(uniqueArray)) {
        setWaitingMessage(true);
        setCompanyFilter(uniqueArray);
        setFilterCompany(false);
      } else {
        setCompanyFilter([]);
        setFilterCompany(true);
        setTimeout(() => {
          setFilterCompany(false);
        }, 5000);
      }
    } else {
      if (isEmpty(dataRangeLabel) && isEmpty(orderName)) {
        getOrders();
        setRows(data as Orders[]);
        setState(false);
        setCompanyFilter([]);
        setFilterCompany(false);
      }
    }
  }, 500);

  const onCompanyFilteredShow = useDebounce(async (item: string) => {
    const arrData: UnionToIntersection<Orders[]> = [];

    await mapPaymentStatusResponseData();

    if (!isEmpty(dataRangeLabel) && dataRangeLabel !== 'All' && !isEmpty(orderName) && !isEmpty(item) && item !== 'All') {
      const dateLabel = dataRangeLabel.split(' - ');

      const getStartDate = moment(dateLabel[0]).format('YYYY-MM-DD');
      const getEndDate = moment(dateLabel[1]).add(1, 'days').format('YYYY-MM-DD');

      const orderFilter: any = await getTransactionBillingOrder({
        filter: [
          `sellerEntityName||$eq||${item}`,
          `createdAt||$gte||${getStartDate}`,
          `createdAt||$lt||${getEndDate}`,
          `orderItems.paymentStatus||$eq||${orderStatusCode}`,
        ],
        join: 'transactions',
      }).unwrap();

      const resOrderData = orderFilter?.data as any;

      await mapPaymentStatusResponseData();

      resOrderData.map((item: any) => {
        const paymentStatus = statusPayment.find((value: { code: string }) => value.code === item.orderItems[0].paymentStatus);

        let categoryName = '';

        if (!isEmpty(item.categories)) {
          const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[0]);

          if (!isEmpty(findCategory)) {
            categoryName = findCategory ? (findCategory.name as string) : '';
          } else {
            const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[1]);

            categoryName = findCategory ? (findCategory.name as string) : '';
          }
        }

        arrData.push({
          currency: item.currency,
          dueAmount: item.orderItems[0].dueAmount,
          id: item.transactions[0]?.id ?? '',
          order: item.id,
          paymentDate: item.createdAt,
          paymentStatus: paymentStatus.status,
          serviceName: item.name ?? '',
          serviceTitle: categoryName,
          serviceProvider: item.sellerEntityName ?? '',
          serviceId: item.serviceId,
        });
      });
    }

    if (!isEmpty(dataRangeLabel) && dataRangeLabel !== 'All' && isEmpty(orderName) && !isEmpty(item) && item !== 'All') {
      const dateLabel = dataRangeLabel.split(' - ');

      const getStartDate = moment(dateLabel[0]).format('YYYY-MM-DD');
      const getEndDate = moment(dateLabel[1]).add(1, 'days').format('YYYY-MM-DD');

      const orderFilter: any = await getTransactionBillingOrder({
        filter: [`sellerEntityName||$eq||${item}`, `createdAt||$gte||${getStartDate}`, `createdAt||$lt||${getEndDate}`],
        join: 'transactions',
      }).unwrap();

      const resOrderData = orderFilter?.data as any;

      await mapPaymentStatusResponseData();

      resOrderData.map((item: any) => {
        const paymentStatus = statusPayment.find((value: { code: string }) => value.code === item.orderItems[0].paymentStatus);

        let categoryName = '';

        if (!isEmpty(item.categories)) {
          const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[0]);

          if (!isEmpty(findCategory)) {
            categoryName = findCategory ? (findCategory.name as string) : '';
          } else {
            const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[1]);

            categoryName = findCategory ? (findCategory.name as string) : '';
          }
        }

        arrData.push({
          currency: item.currency,
          dueAmount: item.orderItems[0].dueAmount,
          id: item.transactions[0]?.id ?? '',
          order: item.id,
          paymentDate: item.createdAt,
          paymentStatus: paymentStatus.status,
          serviceName: item.name ?? '',
          serviceTitle: categoryName,
          serviceProvider: item.sellerEntityName ?? '',
          serviceId: item.serviceId,
        });
      });
    }

    if (!isEmpty(orderName) && orderName !== 'All' && isEmpty(dataRangeLabel)) {
      const orderFilter: any = await getTransactionBillingOrder({
        filter: [`sellerEntityName||$eq||${item}`, `orderItems.paymentStatus||$eq||${orderStatusCode}`],
        join: 'transactions',
      }).unwrap();

      const resOrderData = orderFilter?.data as any;

      await mapPaymentStatusResponseData();

      resOrderData.map((item: any) => {
        const paymentStatus = statusPayment.find((value: { code: string }) => value.code === item.orderItems[0].paymentStatus);

        let categoryName = '';

        if (!isEmpty(item.categories)) {
          const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[0]);

          if (!isEmpty(findCategory)) {
            categoryName = findCategory ? (findCategory.name as string) : '';
          } else {
            const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[1]);

            categoryName = findCategory ? (findCategory.name as string) : '';
          }
        }

        arrData.push({
          currency: item.currency,
          dueAmount: item.orderItems[0].dueAmount,
          id: item.transactions[0]?.id ?? '',
          order: item.id,
          paymentDate: item.createdAt,
          paymentStatus: paymentStatus.status,
          serviceName: item.name ?? '',
          serviceTitle: categoryName,
          serviceProvider: item.sellerEntityName ?? '',
          serviceId: item.serviceId,
        });
      });
    }
    if ((isEmpty(orderName) || orderName === 'All') && isEmpty(dataRangeLabel)) {
      const filterServiceProvider: any = await getTransactionBillingOrder({
        filter: [`sellerEntityName||$eq||${item}`],
        join: 'transactions',
      }).unwrap();

      const resOrderData = filterServiceProvider?.data as any;

      await mapPaymentStatusResponseData();

      resOrderData.map((item: any) => {
        const paymentStatus = statusPayment.find((value: { code: string }) => value.code === item.orderItems[0].paymentStatus);

        let categoryName = '';

        if (!isEmpty(item.categories)) {
          const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[0]);

          if (!isEmpty(findCategory)) {
            categoryName = findCategory ? (findCategory.name as string) : '';
          } else {
            const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[1]);

            categoryName = findCategory ? (findCategory.name as string) : '';
          }
        }

        arrData.push({
          currency: item.currency,
          dueAmount: item.orderItems[0].dueAmount,
          id: item.transactions[0]?.id ?? '',
          order: item.id,
          paymentDate: item.createdAt,
          paymentStatus: paymentStatus.status,
          serviceName: item.name ?? '',
          serviceTitle: categoryName,
          serviceProvider: item.sellerEntityName ?? '',
          serviceId: item.serviceId,
        });
      });
    }

    if (!isEmpty(arrData)) {
      setNoRecord(false);
      setRows(arrData as Orders[]);
      setCompanyFilter([]);
      setLabelProvider(item);
    } else {
      setNoRecord(true);
      setState(true);
      setCompanyFilter([]);
      setFilterCompany(false);
      setLabelProvider(item);
    }
  }, 500);

  const [, setActiveRange] = onFilterDateActive();

  const handlerDateRangeFilter = async (setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null | number>>) => {
    const arrData: UnionToIntersection<Orders[]> = [];

    if (!isEmpty(data)) {
      const getStartDate = moment(start).format('YYYY-MM-DD');
      const getEndDate = moment(end).add(1, 'days').format('YYYY-MM-DD');

      if (!isEmpty(providerLabel) && providerLabel !== 'All' && !isEmpty(orderName)) {
        const orderFilterData: any = await getTransactionBillingOrder({
          filter: [
            `sellerEntityName||$eq||${providerLabel}`,
            `createdAt||$gte||${getStartDate}`,
            `createdAt||$lt||${getEndDate}`,
            `orderItems.paymentStatus||$eq||${orderStatusCode}`,
          ],
          join: 'transactions',
        }).unwrap();

        const resOrderData = orderFilterData?.data as any;

        await mapPaymentStatusResponseData();

        resOrderData.map((item: any) => {
          const paymentStatus = statusPayment.find((value: { code: string }) => value.code === item.orderItems[0].paymentStatus);

          let categoryName = '';

          if (!isEmpty(item.categories)) {
            const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[0]);

            if (!isEmpty(findCategory)) {
              categoryName = findCategory ? (findCategory.name as string) : '';
            } else {
              const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[1]);

              categoryName = findCategory ? (findCategory.name as string) : '';
            }
          }

          arrData.push({
            currency: item.currency,
            dueAmount: item.orderItems[0].dueAmount,
            id: item.transactions[0]?.id ?? '',
            order: item.id,
            paymentDate: item.createdAt,
            paymentStatus: paymentStatus.status,
            serviceName: item.name ?? '',
            serviceTitle: categoryName,
            serviceProvider: item.sellerEntityName ?? '',
            serviceId: item.serviceId,
          });
        });
      }

      if (!isEmpty(providerLabel) && providerLabel !== 'All' && isEmpty(orderName)) {
        const orderFilterData: any = await getTransactionBillingOrder({
          filter: [
            `sellerEntityName||$eq||${providerLabel}`,
            `createdAt||$gte||${getStartDate}`,
            `createdAt||$lt||${getEndDate}`,
          ],
          join: 'transactions',
        }).unwrap();

        const resOrderData = orderFilterData?.data as any;

        await mapPaymentStatusResponseData();

        resOrderData.map((item: any) => {
          const paymentStatus = statusPayment.find((value: { code: string }) => value.code === item.orderItems[0].paymentStatus);

          let categoryName = '';

          if (!isEmpty(item.categories)) {
            const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[0]);

            if (!isEmpty(findCategory)) {
              categoryName = findCategory ? (findCategory.name as string) : '';
            } else {
              const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[1]);

              categoryName = findCategory ? (findCategory.name as string) : '';
            }
          }

          arrData.push({
            currency: item.currency,
            dueAmount: item.orderItems[0].dueAmount,
            id: item.transactions[0]?.id ?? '',
            order: item.id,
            paymentDate: item.createdAt,
            paymentStatus: paymentStatus.status,
            serviceName: item.name ?? '',
            serviceTitle: categoryName,
            serviceProvider: item.sellerEntityName ?? '',
            serviceId: item.serviceId,
          });
        });
      }

      if (isEmpty(providerLabel) && isEmpty(orderName)) {
        const orderFilterData: any = await getTransactionBillingOrder({
          filter: [`createdAt||$gte||${getStartDate}`, `createdAt||$lt||${getEndDate}`],
          join: 'transactions',
        }).unwrap();

        const resOrderData = orderFilterData?.data as any;

        await mapPaymentStatusResponseData();

        resOrderData.map((item: any) => {
          const paymentStatus = statusPayment.find((value: { code: string }) => value.code === item.orderItems[0].paymentStatus);

          let categoryName = '';

          if (!isEmpty(item.categories)) {
            const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[0]);

            if (!isEmpty(findCategory)) {
              categoryName = findCategory ? (findCategory.name as string) : '';
            } else {
              const findCategory = allCategories.find((value: IServiceCategory) => value.uid === item.categories[1]);

              categoryName = findCategory ? (findCategory.name as string) : '';
            }
          }

          arrData.push({
            currency: item.currency,
            dueAmount: item.orderItems[0].dueAmount,
            id: item.transactions[0]?.id ?? '',
            order: item.id,
            paymentDate: item.createdAt,
            paymentStatus: paymentStatus.status,
            serviceName: item.name ?? '',
            serviceTitle: categoryName,
            serviceProvider: item.sellerEntityName ?? '',
            serviceId: item.serviceId,
          });
        });
      }

      if (!isEmpty(arrData)) {
        setActiveRange(false);
        setState(false);
        setRows(arrData as Orders[]);
        setAnchorEl(null);
        setNoRecord(false);
        setDateRangeLabel(`${moment(start).format('DD MMM YYYY')} - ${moment(end).format('DD MMM YYYY')}`);
      } else {
        setDateRangeLabel(`${moment(start).format('DD MMM YYYY')} - ${moment(end).format('DD MMM YYYY')}`);
        setNoRecord(true);
        setState(true);
        setActiveRange(true);
        setTimeout(() => {
          setActiveRange(false);
        }, 5000);
        setRows(data);
      }
    } else {
      getOrders();
      // setData(cloneData as Orders[]);
      setAnchorEl(null);
      setDateRangeLabel('');
    }
  };

  return (
    <Box>
      <OrderFilterRow
        handlerDateRangeFilter={handlerDateRangeFilter}
        handleSearch={handlerSearch}
        data={rows}
        statusData={statusOrder}
        handlerClick={handlerClick}
        handleFilterSearch={handleFilterSearch}
        onCompanyFilteredShow={onCompanyFilteredShow}
        clearSearchData={clearSearchData}
        clearAllRecords={clearAllRecords}
      />
      <OrderTableRow rows={isEmpty(rows) && !isNotFound ? data : isNotFound ? [] : rows} waitingMessage={waitingMessage} />
    </Box>
  );
};

const BillingOrderList = () => {
  const {
    data: ordersItem,
    error: isOrderError,
    isError,
    isLoading,
  } = useGetTransactionBillingOrderQuery({ join: 'transactions', sort: 'createdAt,DESC' });

  if (isLoading) {
    return <CircularLoading />;
  }
  // if (!isUndefined(is                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         OrderError)) {
  //   return <DisplayError errorMsg={isOrderError as object} />;
  // }

  if ((isError && isEmpty(ordersItem?.data?.data)) || !isUndefined(isOrderError)) {
    return (
      <BoxContainer sx={{ height: '50vh' }}>
        <EmptyUI text='No result found' />
      </BoxContainer>
    );
  } else {
    return <OrderList />;
  }
};

export default React.memo(BillingOrderList);
