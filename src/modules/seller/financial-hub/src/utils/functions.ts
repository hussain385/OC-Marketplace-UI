import { isEmpty } from 'lodash';
import { IQueryGlobal } from '../../../../../common/interface';
import { getCookie } from '../../../../../common/utils/cookie';
import { ICategory } from '../interface/earning.interface';
import { exportReportApi } from '../services/index.api';

interface IExportHandle {
  url: string;
  defaultParams: IQueryGlobal;
  newParams: any;
  extraParams?: any;
  exportType: string; // csv | pdf
  action?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const onExportButtonClick = async ({ url, defaultParams, newParams, extraParams, exportType, action }: IExportHandle) => {
  const query = { ...defaultParams, export: exportType, ...extraParams };
  if (!isEmpty(newParams)) query.s = JSON.stringify(newParams);
  action && action(false);
  const token = getCookie('token') as string;
  const entityId = getCookie('x-client-entityId') as string;
  const role = getCookie('x-client-type') as string;
  await exportReportApi({ url, params: query, type: exportType, state: { entityId, role, token } });
};

export const displayCategorySubcateogry = (categories: ICategory[], separatorSymbol = ', ') => {
  return categories
    ? categories.map((category: any, index: number) => {
        const separator = index + 1 !== categories.length ? separatorSymbol : '';
        return `${category.name}${separator}`;
      })
    : null;
};

export const onPrintClickHandle = () => {
  window.print();
};
