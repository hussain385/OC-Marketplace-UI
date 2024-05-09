import React, { useState } from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import { Text12 } from '@/common/styles';
import { TEmployement } from '@/modules/servi-profile/interfaces';
import { ReactComponent as EditIcon } from '@/assets/icons/edit.svg';
import EmploymentModal from '@/common/components/profile/edit/Employment.modal.tsx';

interface IEmploymentTile {
  employment: TEmployement;
  isEdit?: boolean;
  entityId?: string;
}

function EmploymentTile({ employment, isEdit, entityId }: IEmploymentTile) {
  const [isModal, setIsModal] = useState(false);

  return (
    <Box sx={{ padding: '16px', border: '1px solid #EAEAEA', display: 'flex' }}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Text12 sx={{ fontWeight: '700', fontSize: '15px' }}>{employment.title}</Text12>
          <div style={{ margin: '0px 2px', color: '#646465' }}>-</div>
          <Text12 sx={{ fontWeight: '400', color: '#646465' }}>{employment.years} years of experience</Text12>
        </Box>
        <Typography sx={{ color: '#646465' }}>{employment.companyName}</Typography>
      </Box>
      {isEdit && (
        <ButtonBase sx={{ alignSelf: 'start' }} onClick={() => setIsModal(true)}>
          <EditIcon width={16} height={16} />
        </ButtonBase>
      )}

      <EmploymentModal isOpen={isModal} onClose={() => setIsModal(false)} emp={employment} entityId={entityId} />
    </Box>
  );
}

export default EmploymentTile;
