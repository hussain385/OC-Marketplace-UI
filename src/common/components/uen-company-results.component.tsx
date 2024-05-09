// @flow
import React, { useState } from 'react';
import { GreyRoundedContainer } from '../styles';
import { Box, Typography } from '@mui/material';
import { Color } from '../../theme';
import { AiFillCheckCircle } from 'react-icons/ai';

type Props = {
  uen: string;
  SearchResult: any[];
};
export const UenCompanyResultsComponent = ({ uen, SearchResult }: Props) => {
  const [resultSelected, setResultSelected] = useState<any>(SearchResult[0]);
  return (
    <Box style={{ display: 'flex', gap: '0.7em', flexDirection: 'column', marginTop: '1em' }}>
      <Typography
        sx={{
          fontSize: '14px',
          fontWeight: '400',
          color: Color.bgGreyDark,
        }}
      >
        Showing {SearchResult.length} for <span style={{ color: 'black' }}>&apos;{uen}&apos;</span>
      </Typography>
      {SearchResult.map((result, key) => (
        <GreyRoundedContainer onClick={() => setResultSelected(result)} key={key}>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '600',
              color: 'black',
            }}
          >
            {result.name}
          </Typography>
          <AiFillCheckCircle fontSize={20} color={resultSelected.name === result.name ? Color.priBlue : Color.bgGreyDark} />
        </GreyRoundedContainer>
      ))}
    </Box>
  );
};
