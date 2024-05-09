import { useLazyGet4MetaServiceDetailsQuery } from '../../../redux/apis/marketplace';

interface IPopulateObject {
  path: string;
  populate?: TPopulateMixed;
}

export type Sort = 'asc' | 'desc' | 'ascending' | 'descending';

export type TPopulateMixed = string | string[] | IPopulateObject | IPopulateObject[];

const useCatalogSearchApi = () => {
  const [filterMetaServices] = useLazyGet4MetaServiceDetailsQuery();

  async function filterCatalogSearchApi(
    filter?: Partial<{
      keyword?: string;
      categoryIds?: string[] | undefined;
      paymentOptions?: ('SINGLE' | 'MILESTONE' | 'SUBSCRIPTION')[];
      minPrice?: number;
      maxPrice?: number;
      duration?: string | '1-3 days' | 'within 1 week' | 'within 2 weeks' | 'within a month' | 'Others';
    }>,
    options?: Partial<{
      page: number;
      limit: number;
      sort: Sort;
    }>,
    populate?: TPopulateMixed,
  ) {
    const response = await filterMetaServices({
      filter: {
        ...(!filter?.keyword
          ? undefined
          : {
              $or: [filter.keyword, filter.keyword.toUpperCase(), filter.keyword.toLowerCase()]
                .map((text) => [
                  { 'metadata.companyName': { $regex: text, $options: 'i' } },
                  { 'metadata.companyAbout': { $regex: text, $options: 'i' } },
                  { 'metadata.serviceName': { $regex: text, $options: 'i' } },
                  { 'metadata.serviceDescription': { $regex: text, $options: 'i' } },
                ])
                .flat(),
            }),
        ...(!filter?.categoryIds
          ? undefined
          : {
              'metadata.serviceCategoryIds': {
                $in: filter.categoryIds,
              },
            }),
        ...(!filter?.paymentOptions
          ? undefined
          : {
              'metadata.paymentOptions': {
                $in: filter.paymentOptions,
              },
            }),
        ...(!filter?.duration
          ? undefined
          : {
              'metadata.durations': filter.duration,
            }),
        ...(!filter?.minPrice || filter.minPrice <= 0
          ? undefined
          : {
              ...(!filter.paymentOptions
                ? {
                    'metadata.serviceLowestPrice': { $gte: filter.minPrice },
                  }
                : {
                    ...(!filter.paymentOptions.includes('SINGLE')
                      ? undefined
                      : {
                          'metadata.serviceOneTimePaymentPrice': { $gte: filter.minPrice },
                        }),
                    ...(!filter.paymentOptions.includes('MILESTONE')
                      ? undefined
                      : {
                          'metadata.serviceMilestonePrice': { $gte: filter.minPrice },
                        }),
                    ...(!filter.paymentOptions.includes('SUBSCRIPTION')
                      ? undefined
                      : {
                          'metadata.serviceSubscriptionPrice': { $gte: filter.minPrice },
                        }),
                  }),
            }),
        ...(!filter?.maxPrice || filter.maxPrice <= 0
          ? undefined
          : {
              ...(!filter.paymentOptions
                ? {
                    'metadata.serviceHighestPrice': { $lte: filter.maxPrice },
                  }
                : {
                    ...(!filter.paymentOptions.includes('SINGLE')
                      ? undefined
                      : {
                          'metadata.serviceOneTimePaymentPrice': { $lte: filter.maxPrice },
                        }),
                    ...(!filter.paymentOptions.includes('MILESTONE')
                      ? undefined
                      : {
                          'metadata.serviceMilestonePrice': { $lte: filter.maxPrice },
                        }),
                    ...(!filter.paymentOptions.includes('SUBSCRIPTION')
                      ? undefined
                      : {
                          'metadata.serviceSubscriptionPrice': { $lte: filter.maxPrice },
                        }),
                  }),
            }),
      },
      options: {
        page: !options?.page || options.page < 1 ? 1 : options.page, // REQUIRED TO GET PAGINATE
        limit: !options?.limit || options.limit < 1 ? 12 : options.limit, // REQUIRED TO GET PAGINATE
        sort: {
          ...(!filter?.keyword
            ? undefined
            : {
                'metadata.serviceName': options?.sort ?? 'asc',
              }),
          ...(!filter?.paymentOptions
            ? {
                'metadata.serviceLowestPrice': options?.sort ?? 'asc',
              }
            : {
                ...(!filter?.paymentOptions.includes('SINGLE')
                  ? undefined
                  : {
                      'metadata.serviceOneTimePaymentPrice': options?.sort ?? 'asc',
                    }),
                ...(!filter?.paymentOptions.includes('MILESTONE')
                  ? undefined
                  : {
                      'metadata.serviceMilestonePrice': options?.sort ?? 'asc',
                    }),
                ...(!filter?.paymentOptions.includes('SUBSCRIPTION')
                  ? undefined
                  : {
                      'metadata.serviceSubscriptionPrice': options?.sort ?? 'asc',
                    }),
              }),
          createdAt: options?.sort ?? 'desc',
        },
      },
      populate: populate ?? [{ path: '__plans' }, { path: '__medias' }, { path: '__entity', populate: ['__logo'] }],
    }).unwrap();

    try {
      if ('data' in response) {
        return response.data.data.paginate;
      } else {
        return response.error;
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      // console.log(e,'err get')
    }
  }

  return { filterCatalogSearchApi };
};

export default useCatalogSearchApi;
