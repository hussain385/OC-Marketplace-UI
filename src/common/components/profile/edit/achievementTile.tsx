import React from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import { Color } from '@/theme.ts';

interface IAchievementTile {
  onClick: () => void;
  label: string;
  buttonLabel: string;
}

function AchievementTile({ label, buttonLabel, onClick }: IAchievementTile) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
      <ButtonBase sx={{ color: Color.priBlue, textTransform: 'none', fontWeight: 600 }} onClick={onClick}>
        {buttonLabel}
      </ButtonBase>
    </Box>
  );
}

export default AchievementTile;
