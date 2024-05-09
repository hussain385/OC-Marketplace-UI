import { isEmpty, isUndefined } from 'lodash';
import { useCallback } from 'react';
import { useGet4ServicesQuery } from '../../../redux/apis/catalogApi';
import usePayloadUseInfo from './usePayloadUseInfo';
import { useNavigate } from '@/router.ts';

const useGetServicesById = () => {
  const { user, selectedEntity } = usePayloadUseInfo();

  const roleId = !isUndefined(selectedEntity) ? selectedEntity?.uid : '0';

  const { data: getServicesById } = useGet4ServicesQuery({ filter: { 'relations.entityId': roleId } });

  const navigate = useNavigate();

  const navigateServicesDetails = useCallback(() => {
    if (!isEmpty(user) && !isUndefined(getServicesById?.data.services)) {
      if (!isEmpty(getServicesById?.data.services)) {
        navigate('/account/manage-listing');
      } else {
        navigate('/account/manage-listing/form');
      }
    } else {
      navigate('/login');
    }
  }, [user, getServicesById?.data.services]);

  return { navigateServicesDetails };
};

export default useGetServicesById;
