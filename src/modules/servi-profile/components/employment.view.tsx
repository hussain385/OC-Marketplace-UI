import React from 'react';
import { useGetEmploymentsQuery } from '@/modules/servi-profile/service/profile.api.ts';
import { Box } from '@mui/material';
import EmploymentTile from '@/modules/servi-profile/components/employment-tile.tsx';
import { useAppSelector } from '@/redux/hooks.tsx';
import { Text16 } from '@/common/styles';
import { ReactComponent as EmploymentIcon } from '@/assets/icons/past-employment.svg';

interface IEmploymentView {
  isEdit?: boolean;
  overRideEntity?: string;
  isHeading?: boolean;
}

function EmploymentView({ isEdit, overRideEntity, isHeading = false }: IEmploymentView) {
  const { entityId } = useAppSelector((state) => state.mainState.useInfo.selectedRole!);
  const { data } = useGetEmploymentsQuery({ filter: `entity.id||$eq||${overRideEntity ?? entityId}` });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', mt: '16px' }}>
      {isHeading && (
        <Box sx={{ display: 'flex' }}>
          <EmploymentIcon /> <Text16 sx={{ marginLeft: '10px' }}>Past Employment</Text16>
        </Box>
      )}
      {data?.data.map((e) => <EmploymentTile key={e.id} employment={e} isEdit={isEdit} entityId={overRideEntity ?? entityId} />)}
    </Box>
  );
}

export default EmploymentView;
