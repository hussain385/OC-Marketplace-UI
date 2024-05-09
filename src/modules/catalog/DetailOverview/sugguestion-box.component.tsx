// @flow
import React from 'react';
import { Typography, Button } from '@mui/material';

type Props = {
  text: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
};
export const SugguestionBoxComponent = ({ text, setMessage, setError }: Props) => {
  return (
    <Button
      onClick={() => {
        setMessage(text);
        setError('');
      }}
      sx={{
        backgroundColor: 'transparent',
        border: '1px solid #EAEAEA',
        marginRight: '1em',
        marginTop: '1em',
        width: 'fit-content',
      }}
    >
      <Typography sx={{ color: '#1D2130', textTransform: 'initial', fontSize: '14px' }}>{text}</Typography>
    </Button>
  );
};
