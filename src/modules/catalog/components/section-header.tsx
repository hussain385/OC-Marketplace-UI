// @flow
import React from 'react';

import { Box, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { useMediaBreakpoint } from '../../../common/components';

type PropsType = {
  title: string;
  id: number | string;
  description: string;
  isServices: number;
};

export const SectionHeader = ({ title, id, description, isServices }: PropsType) => {
  const navigate = useNavigate();
  const { xs } = useMediaBreakpoint();

  return (
    <Box
      sx={{ display: 'flex', alignItems: { xs: 'flex-end', md: 'center' }, justifyContent: 'space-between', marginTop: '3em' }}
    >
      <Box
        sx={{
          alignItems: { xs: 'flex-start', md: 'center' },
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: '0.5em', md: '1em' },
          display: 'flex',
          maxWidth: '75%',
        }}
      >
        <Typography
          sx={{
            fontWeight: '700',
            fontSize: '24px !important',
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            padding: '0px 16px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px',
            height: '2em',
            fontWeight: '700',
            color: '#7E7E7E',
            borderRadius: '50em',
            border: '1px solid #EAEAEA',
          }}
        >
          {isServices} services available
        </Box>
      </Box>
      {/* for now i will change this to 3 to one temp. */}
      {isServices >= 4 && (
        <Typography
          onClick={() => navigate(`/catalog/sub-category/${id}`, { state: { id: id, description: description, title: title } })}
          sx={{ color: '#2752E7', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}
        >
          {xs ? 'View all' : 'View all services'} -&gt;
        </Typography>
      )}
    </Box>
  );
};
