import React, { useEffect, useMemo } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { Color } from '@/theme';
import { AvatarLabel } from '../../styles';
import { isEmpty, isUndefined } from 'lodash';
import usePayloadUseInfo from '../../utils/hooks/usePayloadUseInfo';
import { Capitalize } from '../../utils';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { companyProfiles } from '../../interface/busines-company-profile-interface';

type componentPropType = {
  setSelectedUID: React.Dispatch<React.SetStateAction<string>>;
  selectedUID: string;
};

const SelectEntityComponent = ({ setSelectedUID, selectedUID }: componentPropType) => {
  const { user, selectedEntity } = usePayloadUseInfo();
  const isIndividual = useMemo(
    () =>
      !isUndefined(selectedEntity) &&
      !isEmpty(selectedEntity) &&
      selectedEntity?.profile?.type !== null &&
      selectedEntity?.profile?.type.includes(companyProfiles.individual) === true,
    [selectedEntity, selectedEntity?.profile.type],
  );

  useEffect(() => {
    setSelectedUID(selectedEntity?.uid ? selectedEntity.uid : '');
  }, [selectedEntity]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '7px 10px',
        border: '1px solid #eaeaea',
        marginTop: '1em',
      }}
      onClick={() => setSelectedUID(selectedEntity ? selectedEntity.uid : '')}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.7em' }}>
        <Avatar sx={{ bgcolor: Color.priBlue }}>
          <AvatarLabel>
            {isIndividual
              ? !isEmpty(user) && user
                ? user.name[0].toUpperCase()
                : ''
              : selectedEntity
              ? selectedEntity.profile.detail.name[0].toUpperCase()
              : ''}
          </AvatarLabel>
        </Avatar>
        {isIndividual ? (
          <Typography sx={{ fontWeight: 'bold' }}>{user && Capitalize(user.name)}</Typography>
        ) : (
          <Box>
            <Typography sx={{ fontWeight: 'bold' }}>
              {selectedEntity && Capitalize(selectedEntity.profile.detail.name)}
            </Typography>
            <Typography>{user && Capitalize(user.name)}</Typography>
          </Box>
        )}
      </Box>
      <CheckCircleIcon sx={{ color: selectedUID === (selectedEntity as any).uid ? Color.priBlue : Color.bgGreyDark }} />
    </Box>
  );
};

export default SelectEntityComponent;
