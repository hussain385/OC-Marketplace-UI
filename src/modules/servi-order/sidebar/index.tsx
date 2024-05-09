import { Box, Typography } from '@mui/material';
import React, { Suspense, useMemo } from 'react';
import { useAppSelector } from '@/redux/hooks.tsx';

const Sidebar = () => {
  const { clientType } = useAppSelector((state) => state.mainState.useInfo);
  const Widgets = useMemo(() => React.lazy(() => import(`./${clientType}.widgets.tsx`)), [clientType]);

  return (
    <Suspense fallback={<Typography>Loading...</Typography>}>
      <Box sx={{ position: 'sticky', top: '75px', marginBottom: '24px' }}>
        <Widgets />
      </Box>
    </Suspense>
  );
};
export default Sidebar;
