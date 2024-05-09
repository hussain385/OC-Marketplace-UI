/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '../baseAPI';
import { IGlobalPagination, IQueryGlobal } from '../../common/interface';
import { Category } from '@/common/interface/service-interface.ts';
import { IServiceRes } from '@/common/interface/busines-company-profile-interface';

export const catalogApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<IGlobalPagination<Category>, IQueryGlobal>({
      query(params) {
        return {
          url: `marketplace/service-categories`,
          params,
        };
      },
    }),
    getServicesBySubCategory: builder.query<any, IQueryGlobal>({
      query(queryObject) {
        return {
          url: `marketplace/service-metadatas`,
          params: queryObject,
        };
      },
    }),
    getOverViewOfServices: builder.query<{ data: IServiceRes }, { code: string; queryObject: IQueryGlobal }>({
      query({ code, queryObject }) {
        return {
          url: `marketplace/services/${code}`,
          params: queryObject,
        };
      },
    }),
    get4Services: builder.query<any, IQueryGlobal>({
      query(queryObject) {
        return {
          url: `marketplace/services`,
          params: queryObject,
        };
      },
    }),
  }),
});

export const {
  useLazyGetServicesBySubCategoryQuery,
  useGetOverViewOfServicesQuery,
  useLazyGetOverViewOfServicesQuery,
  useGet4ServicesQuery,
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
} = catalogApis;
