import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks.tsx';
import { useNavigate } from '@/router.ts';
import { rolePermission } from '@/common/interface/User.ts';

function Layout() {
  const selectedRole = useAppSelector((state) => state.mainState.useInfo.selectedRole);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedRole && !selectedRole.metadata.permissions.includes(rolePermission.finance)) {
      navigate('/forbidden-access', { replace: true });
    }
  }, [navigate, selectedRole]);

  return <Outlet />;
}

export default Layout;
