import { createGlobalState } from 'react-use';

import { Dayjs } from 'dayjs';

export const Modal = createGlobalState(false);

export const useClick = createGlobalState<boolean>(false);

export const useValidated = createGlobalState<boolean>(false);

export const ImagePreviewSrc = createGlobalState<string>('');

export const ImagePreviewModal = createGlobalState<boolean>(false);

export const isFilterStateOrder = createGlobalState<boolean>(false);

export const useGlobalCountryOpen = createGlobalState<boolean>(false);

export const useGlobalFocus = createGlobalState<boolean>(false);

export const useGlobalLogoutState = createGlobalState<boolean>(false);

export const useGlobalRemindMe = createGlobalState<boolean>(false);

export const useSkipForNow = createGlobalState<boolean>(false);

export const useGlobalCTANext = createGlobalState<boolean>(false);

export const useServerError = createGlobalState<boolean>(false);
export const useServerErrorMessage = createGlobalState<string>('');

export const IsRegistered = createGlobalState<boolean>(false);

export const useServices = createGlobalState<{ name: string; id: string }>({ name: '', id: '' });

export const globalSearchFilter = createGlobalState<boolean>(false);

export const getAutoCompleteSelected = createGlobalState<string>('');

export const createBudgetMin = createGlobalState<number>(0);
export const createBudgetMax = createGlobalState<number>(0);
export const createDeliverTime = createGlobalState<string>('Others');
export const createServiceOption = createGlobalState<string>('');
export const createCategoryId = createGlobalState<string>('');

export const createDateRangeLabel = createGlobalState<string>('');

export const createClearStateInputContext = createGlobalState<boolean>(false);
export const createNoResultFoundContext = createGlobalState<boolean>(false);
export const createDefaultSearchKeywordContext = createGlobalState<string>('');
export const createCustomStylePrint = createGlobalState<boolean>(false);
export const createNoresultFoundLabel = createGlobalState<string>('');
export const createServiceProviderLabel = createGlobalState<string>('');
export const createFilterStateOutsideCatalogSearch = createGlobalState<string>('');
export const billingNoResultFoundContext = createGlobalState<boolean>(false);
export const EnDateContext = createGlobalState<Dayjs | null | string>('');
export const StartDateContext = createGlobalState<Dayjs | null | string>('');

export const getValueDefaultDeliveryOptionContext = createGlobalState<string>('');

export const getFilterQuerySelectedItem = createGlobalState<string>('');
export const getSelectedServiceOption = createGlobalState<number>(0);
export const getSelectedSorting = createGlobalState<number>(0);
export const getSelectedCatalogId = createGlobalState<number>(0);
export const getSelectedCategoryName = createGlobalState<string>('');
export const createSubcategoryDeliveryTime = createGlobalState<string>('');
export const createSubcategoryBudgetRange = createGlobalState<{ min: number; max: number }>({ min: 0, max: 0 });
export const createSubcategoryIdName = createGlobalState<{ id: string; name: string; description?: string }>({
  id: '',
  name: '',
});
export const createSortingDefault = createGlobalState<string | undefined>();
export const createSubFilterDefault = createGlobalState<boolean>(false);
export const createPageLimit = createGlobalState<number>(10);
export const createVisibleScroll = createGlobalState<boolean>(false);
export const catalogSearchFilterApply = createGlobalState<boolean>(false);
export const catalogCurrentPage = createGlobalState<number>(1);
