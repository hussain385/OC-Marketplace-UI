import React, { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks.tsx';
import { useNavigate } from '@/router.ts';
import { rolePermission } from '@/common/interface/User.ts';

function Layout() {
  const [search] = useSearchParams();
  const profileType = search.get('profileType');
  const selectedRole = useAppSelector((state) => state.mainState.useInfo.selectedRole);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      selectedRole &&
      !selectedRole.metadata.permissions.includes(profileType === 'seller' ? rolePermission.sell : rolePermission.buy)
    ) {
      navigate('/forbidden-access', { replace: true });
    }
  }, [navigate, profileType, selectedRole]);

  return <Outlet />;
}

export default Layout;
