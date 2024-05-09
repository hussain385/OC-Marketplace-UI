import React from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';
import { Color } from '@/theme.ts';
import { useNavigate } from 'react-router-dom';
import { TiPlus } from 'react-icons/ti';
import { Path } from '@/router';

function EntityInfo({ isFreelancerEntity }: { isFreelancerEntity: boolean }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        maxWidth: { xs: '100%', md: '320px' },
        width: '100%',
        borderRadius: '8px',
        border: '1px solid #EAEAEA',
        padding: '32px',
        alignSelf: 'start',
      }}
    >
      <Typography sx={{ mb: '20px' }}>
        You can only have{' '}
        <Typography component={'span'} sx={{ fontWeight: 700 }}>
          one non-registered
        </Typography>{' '}
        business account. There is{' '}
        <Typography component={'span'} sx={{ fontWeight: 700 }}>
          no limit for registered businesses.
        </Typography>
      </Typography>
      <ButtonBase
        sx={{
          background: Color.priBlue,
          padding: '10px 44px',
          alignSelf: 'end',
          borderRadius: '4px',
          color: 'white',
          fontSize: '12px',
          fontWeight: 700,
          width: '100%',
          display: 'flex',
          gap: '5px',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() =>
          isFreelancerEntity ? navigate('/setup-organisation?isFreelancerEntity=true' as Path) : navigate('/setup-organisation')
        }
      >
        <TiPlus size={10} />
        Add a business account
      </ButtonBase>
    </Box>
  );
}

export default EntityInfo;
