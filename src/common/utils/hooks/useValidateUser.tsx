import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFilterMultipleEntitiesQueryMutation } from '@/redux/apis/marketplace';

const useValidateUser = () => {
  const [filterMultipleEntitiesQuery] = useFilterMultipleEntitiesQueryMutation();

  const navigate = useNavigate();

  const fetchQueries = React.useCallback(() => {
    navigate('/account');
  }, []);

  const navigateAccountInfo = () => {
    fetchQueries();
  };
  return { navigateAccountInfo, filterMultipleEntitiesQuery };
};

export default useValidateUser;
