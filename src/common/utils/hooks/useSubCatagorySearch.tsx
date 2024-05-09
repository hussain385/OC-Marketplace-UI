/* eslint-disable no-unused-vars */
import { isEmpty, isUndefined } from 'lodash';
import React, { useState } from 'react';
import { UseFormReset } from 'react-hook-form';
import { useAppDispatch } from '../../../redux/hooks';
import { IMenuItems } from '../../interface';
import {
  createNoResultFoundContext,
  createNoresultFoundLabel,
  createSubcategoryBudgetRange,
  createSubcategoryDeliveryTime,
  createSubcategoryIdName,
  createSubFilterDefault,
  createSortingDefault,
  createPageLimit,
} from '../global_state.util';
import useCatalogPayload from './useCatalogPayload';
import useCatalogSearchApi, { Sort } from './useSearchApi';
import { catalogSubServiceDetailsUpdateAction } from '../../../redux/reducers/catalogReducer';

const useSubCatagorySearch = () => {
  const { filterCatalogSearchApi } = useCatalogSearchApi();
  const [deliveryTime, setDeliveryTime] = createSubcategoryDeliveryTime();
  const [budgetRange, setBudgetRange] = createSubcategoryBudgetRange();
  const [selectedCatagory] = createSubcategoryIdName();
  const dispatch = useAppDispatch();
  const [, setFilterActive] = createSubFilterDefault();
  const [, setLabelNoResult] = createNoresultFoundLabel();
  const [, setDisplayNoResult] = createNoResultFoundContext();
  const { catalogSubServiceDetails } = useCatalogPayload();
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  const [clearAll, setClearAll] = useState<boolean>(false);
  const [getSort, setSelectedSort] = createSortingDefault();
  const [pageSelected, setPageSelected] = createPageLimit();

  const onBudgetRangeFilter = async (
    min: number,
    max: number,
    setAnchorEl: React.Dispatch<React.SetStateAction<number | HTMLElement | null>>,
    reset: UseFormReset<{
      min: number;
      max: number;
    }>,
  ) => {
    const minRange = Number(min);
    const maxRange = Number(max);
    const maxRangeValue = Number(maxRange) + Number(1);

    if (
      (!isEmpty(minRange) && !isEmpty(maxRange)) ||
      (!isUndefined(minRange) && !isUndefined(maxRange) && minRange <= maxRange && maxRange !== 0)
    ) {
      const durationDetails = !isEmpty(deliveryTime) ? deliveryTime : undefined;
      const categoryId = !isEmpty(selectedCatagory) ? [selectedCatagory.id] : undefined;
      const limitValue = pageSelected;
      const sort = getSort ? (getSort as Sort) : undefined;

      const res = await filterCatalogSearchApi(
        {
          minPrice: minRange,
          maxPrice: maxRangeValue,
          duration: durationDetails,
          categoryIds: categoryId,
        },
        { limit: limitValue, sort },
      );

      if ('docs' in res && !isEmpty(res.docs)) {
        dispatch(catalogSubServiceDetailsUpdateAction(res.docs));
        setBudgetRange({ min: minRange, max: maxRange });
        setFilterActive(true);
        setDisplayNoResult(false);
      } else {
        if (!isEmpty(deliveryTime)) {
          setLabelNoResult(
            `budget range between ${minRange}-${maxRange} and delivery time ${deliveryTime} in ${selectedCatagory.name}`,
          );
        } else {
          setLabelNoResult(`budget range between ${minRange}-${maxRange}  in ${selectedCatagory.name}`);
        }
        reset();
        setFilterActive(true);
        setDisplayNoResult(true);
        dispatch(catalogSubServiceDetailsUpdateAction([]));
        /*
        setTimeout(() => {
          setDisplayNoResult(false);
          dispatch(catalogSubCategoryServicesDetails(catalogSubServiceDetails));
        }, 4000);
        */
      }
    }

    setAnchorEl(null);
  };

  const onHandlerDeliveryTime = async (
    delivery: string,
    setAnchorEl: React.Dispatch<React.SetStateAction<number | HTMLElement | null>>,
  ) => {
    const minPrice = budgetRange.min !== 0 ? budgetRange.min : undefined;
    const maxPrice = budgetRange.max !== 0 ? budgetRange.max : undefined;
    const categoryId = !isEmpty(selectedCatagory) ? [selectedCatagory.id] : undefined;
    const limitValue = pageSelected;
    const sort = getSort ? (getSort as Sort) : undefined;

    if (!isUndefined(delivery) && !isEmpty(delivery)) {
      const res = await filterCatalogSearchApi(
        {
          minPrice: minPrice,
          maxPrice: maxPrice,
          duration: delivery !== 'Others' ? delivery : '',
          categoryIds: categoryId,
        },
        { limit: limitValue, sort },
      );
      if ('docs' in res && !isEmpty(res.docs)) {
        dispatch(catalogSubServiceDetailsUpdateAction(res.docs));
        setDeliveryTime(delivery);
        setFilterActive(true);
        setDisplayNoResult(false);
      } else {
        if (budgetRange.max !== 0) {
          setLabelNoResult(
            `budget range between ${budgetRange.min}-${budgetRange.max} and delivery time ${delivery} in ${selectedCatagory.name}`,
          );
        } else {
          setLabelNoResult(`delivery time ${delivery} in ${selectedCatagory.name}`);
        }

        setFilterActive(true);
        setDisplayNoResult(true);
        /*
        setTimeout(() => {
          setDisplayNoResult(false);
          dispatch(catalogSubCategoryServicesDetails(catalogSubServiceDetails));
          setFilterActive(false);
        }, 4000);
        */
      }
      setAnchorEl(null);
    } else {
      dispatch(catalogSubServiceDetailsUpdateAction(undefined));
      setFilterActive(false);
      setAnchorEl(null);
    }
  };

  const onHandlerRecommended = async (sorting: IMenuItems, range: { min: number; max: number }) => {
    const minPrice = budgetRange.min !== 0 ? budgetRange.min : undefined;
    const maxPrice = budgetRange.max !== 0 ? budgetRange.max : undefined;
    const categoryId = !isEmpty(selectedCatagory) ? [selectedCatagory.id] : undefined;
    const durationDetails = !isEmpty(deliveryTime) ? deliveryTime : undefined;

    const getSortValue = sorting.value.includes('low')
      ? ('asc' as Sort)
      : sorting.value.includes('high')
      ? ('desc' as Sort)
      : undefined;

    const limitValue = pageSelected;

    if (!isEmpty(sorting.value)) {
      const res = await filterCatalogSearchApi(
        {
          minPrice: minPrice,
          maxPrice: maxPrice,
          duration: durationDetails,
          categoryIds: categoryId,
        },
        { limit: limitValue, sort: getSortValue },
      );

      if ('docs' in res && !isEmpty(res.docs)) {
        dispatch(catalogSubServiceDetailsUpdateAction(res.docs));
        //setFilterActive(true);
        setDisplayNoResult(false);
        setSelectedSort(getSortValue);
      } else {
        //setFilterActive(false);
        setDisplayNoResult(true);
        dispatch(catalogSubServiceDetailsUpdateAction([]));
      }
    }
  };

  const onHandlerPageSearch = async (limit: IMenuItems) => {
    const minPrice = budgetRange.min !== 0 ? budgetRange.min : undefined;
    const maxPrice = budgetRange.max !== 0 ? budgetRange.max : undefined;
    const categoryId = !isEmpty(selectedCatagory) ? [selectedCatagory.id] : undefined;
    const durationDetails = !isEmpty(deliveryTime) ? deliveryTime : undefined;
    const limitValue = !isEmpty(limit.value) ? Number(limit.value) : undefined;
    const getSortValue = !isEmpty(getSort) ? (getSort as Sort) : undefined;

    if (!isEmpty(limit.value)) {
      const res = await filterCatalogSearchApi(
        {
          minPrice: minPrice,
          maxPrice: maxPrice,
          duration: durationDetails,
          categoryIds: categoryId,
        },
        { limit: limitValue, sort: getSortValue },
      );

      if ('docs' in res && !isEmpty(res.docs)) {
        dispatch(catalogSubServiceDetailsUpdateAction(res.docs));
        setFilterActive(true);
        setDisplayNoResult(false);
        setPageSelected(Number(limit.value));
      } else {
        setFilterActive(true);
        dispatch(catalogSubServiceDetailsUpdateAction(catalogSubServiceDetails));
      }
    }
  };

  const clearAllSubCategoryDetails = () => {
    dispatch(catalogSubServiceDetailsUpdateAction(undefined));
    setMin(0);
    setMax(0);
    setClearAll(false);
    setDisplayNoResult(false);
    setFilterActive(false);
    setBudgetRange({ min: 0, max: 0 });
    setSelectedSort('');
    setPageSelected(10);
    setDeliveryTime('');
  };

  return {
    onBudgetRangeFilter,
    onHandlerRecommended,
    onHandlerPageSearch,
    onHandlerDeliveryTime,
    clearAllSubCategoryDetails,
    setMin,
    setMax,
    min,
    max,
    clearAll,
    setClearAll,
  };
};

export default useSubCatagorySearch;
