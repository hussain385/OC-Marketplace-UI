import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks.tsx';
import { useNavigate } from '@/router.ts';

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isUser = useAppSelector((state) => !!state.mainState.useInfo.user);

  /**
   * Protected routes
   */
  useEffect(() => {
    if (!isUser) {
      navigate(
        { pathname: '/login', search: `redirect=${encodeURIComponent(location.pathname + location.search)}` },
        {
          replace: true,
        },
      );
    }
  }, [isUser, location.pathname, location.search, navigate]);

  return <Outlet />;
}

export default Layout;
