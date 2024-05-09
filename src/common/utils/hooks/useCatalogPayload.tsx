import { isUndefined } from 'lodash';

import { useAppSelector } from '../../../redux/hooks';

const useCatalogPayload = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { buyerCatalog } = useAppSelector((state) => state.mainState);

  const { serviceMetaData, serviceDetails, allCategories, category, catalogSubServiceDetails } = !isUndefined(buyerCatalog)
    ? buyerCatalog
    : buyerCatalog;

  return { serviceMetaData, serviceDetails, allCategories, category, catalogSubServiceDetails };
};

export default useCatalogPayload;
