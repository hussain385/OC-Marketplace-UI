import { isEmpty, isNull, startCase } from 'lodash';
import { IMenuItems, IQueryGlobal } from '../../../common/interface';

export type Row = {
  id: number;
  name: string;
  email?: string;
  role: string;
  permission: string;
  status: string;
};

/**
 * TODO this method will be used when api response get
 * @param response
 * @returns

export const mapTeamManagementData = (response: any):Row[] => {
    return [
        {
            id: 1,
            name: 'waqas',
            email: 'waqas@abc.com',
            role: 'owner',
            permission: 'admin',
            status: 'pending',
        }
    ]
}
*/

export const getFilterOptions = (queryParams: any, item: IMenuItems, label?: string): IQueryGlobal => {
  const filterQuery: string[] = [];

  if (queryParams.get('Permission') === null && queryParams.get('Position') === null && label) {
    filterQuery.push(`${label === 'Position' ? 'position' : 'role'}||$eq||${startCase(item.value as string)}`);
  } else {
    if (item.value !== 'all') {
      filterQuery.push(`${label === 'Position' ? 'position' : 'role'}||$eq||${startCase(item.value as string)}`);
    }
    if (label === 'Position' && !isNull(queryParams.get('Permission'))) {
      !isEmpty(queryParams.get('Permission')) &&
        filterQuery.push(`role||$eq||${startCase(queryParams.get('Permission') as string)}`);
    } else if (label === 'Permission' && !isNull(queryParams.get('Position'))) {
      !isEmpty(queryParams.get('Position')) &&
        filterQuery.push(`position||$eq||${startCase(queryParams.get('Position') as string)}`);
    }
  }

  return { filter: filterQuery };
};
