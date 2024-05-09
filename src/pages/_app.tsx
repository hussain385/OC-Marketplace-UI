import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { StyledToastContainer } from '@/common/styles';
import { useGetUserMEQuery } from '@/redux/apis/accountApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import MainLayout from '@/common/layout/main.layout';
import { Color } from '@/theme';
import { Box, Typography } from '@mui/material';
import { PageBoundaryFallback } from '@/common/components/ErrorBoundary.tsx';
import { useGetEntityInfoQuery } from '@/redux/apis/marketplace.ts';
import { selectedEntityUpdated } from '@/redux/reducers/authReducers.ts';
import HistoryListener from '@/common/components/HistoryListener';
import SessionTimeout from '@/common/components/session-timeout';

function App() {
  const dispatch = useAppDispatch();
  const { token, selectedEntity, selectedRole } = useAppSelector((state) => state.mainState.useInfo);
  useGetUserMEQuery(undefined, {
    pollingInterval: 60 * 1000,
    skip: !token,
  });
  const { data: entity } = useGetEntityInfoQuery(
    {
      entityId: selectedEntity?.uid ?? selectedRole?.entityId ?? '',
      queryObject: {
        populate: [
          { path: '__awards', populate: ['__avatar'] },
          { path: '__logo' },
          { path: '__employees', populate: ['__avatar'] },
        ],
      },
    },
    {
      pollingInterval: 60 * 1000,
      skip: !token || (!selectedEntity?.uid && !selectedRole?.entityId),
    },
  );

  useEffect(() => {
    if (entity?.data) {
      dispatch(selectedEntityUpdated(entity?.data));
    }
  }, [dispatch, entity?.data]);

  return (
    <>
      <HistoryListener />
      <StyledToastContainer />
      <SessionTimeout />
      <Outlet />
    </>
  );
}

export function Pending() {
  return (
    <MainLayout>
      <Box
        sx={{
          background: Color.priWhite,
          padding: '20px',
          width: '100%',
        }}
      >
        <Typography align='center' variant='h3' component='h3'>
          Pending...
        </Typography>
      </Box>
    </MainLayout>
  );
}

export function Catch() {
  return <PageBoundaryFallback />;
}

export default App;
