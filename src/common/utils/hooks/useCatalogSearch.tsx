import { useMemo } from 'react';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import useQueryParams from './useQueryParams';
import queryToObject from '@/common/utils/helpers/queryToObject.ts';

export function useCatalogSearchOptions() {
  const qb = RequestQueryBuilder.create();
  const [params] = useQueryParams();

  /**
   * Search query
   */
  const search = useMemo(() => {
    const search = params.get('s');
    if (search) {
      /// Fix for unknown characters like ? { [
      const searchQuery = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

      return [
        { 'entity.profile.detail.name': { $contL: searchQuery } },
        { 'entity.profile.detail.about': { $contL: searchQuery } },
        { name: { $contL: searchQuery } },
        { description: { $contL: searchQuery } },
      ];
    }

    return undefined;
  }, [params]);

  /**
   * Min and Max price
   */
  const { min, max } = useMemo(() => {
    return {
      min: Number(params.get('minP')),
      max: Number(params.get('maxP')),
    };
  }, [params]);

  /**
   * Category
   */
  const category = useMemo(() => params.get('cat'), [params]);

  /**
   * Package Type
   */
  const packageType = useMemo(() => params.get('ser'), [params]);

  /**
   * Delivery Time
   */
  const deliveryTime = useMemo(() => params.get('dt'), [params]);

  const query = qb
    .sortBy(JSON.parse(params.get('sort') ?? '{"field":"createdAt","order":"DESC"}'))
    .setJoin({ field: 'entity.profile' })
    .setJoin({ field: 'packages' })
    .setLimit(12)
    .setPage(+(params.get('page') ?? 1))
    .search({
      $and: [
        // Filter by Completed service
        { status: 'ACTIVE' },

        // For search text
        ...(search ? [{ $or: search }] : []),

        // Filter by Min/Max Price
        ...(min > 0 || max > 0 ? [{ minPrice: { $gte: min > 0 ? min : undefined, $lte: max > 0 ? max : undefined } }] : []),

        // Filter by category
        ...(category ? [{ 'categories.id': { $in: [category] } }] : []),

        // Filter by delivery time
        ...(deliveryTime ? [{ minDeliveryDays: { $lte: deliveryTime } }] : []),
      ],
    });

  const query1 = queryToObject(query.query(false));

  /**
   * Custom Filter by package type
   */
  if (packageType) {
    const s = JSON.parse(query1['s']);
    s['$and'].push({ $or: [{ enabledPaymentTypes: { $arrCont: [packageType] } }] });

    Object.assign(query1, {
      s: JSON.stringify(s),
    });
  }

  return query1;
}
