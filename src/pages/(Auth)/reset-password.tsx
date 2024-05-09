import React from 'react';
import UserResetPassword from '@/modules/onboarding/reset-password';
import { useSearchParams } from 'react-router-dom';
import NoMatchRoute from '@/common/layout/404.view';

function ResetPassword() {
  const [search] = useSearchParams();
  const tokenRequest = !!search.get('token');

  if (!tokenRequest) {
    return <NoMatchRoute />;
  }

  return <UserResetPassword />;
}

export default ResetPassword;
