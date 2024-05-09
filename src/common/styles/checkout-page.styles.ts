import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const ThanksPurchaseBox = styled(Box)(() => ({
  borderRadius: '2px',
  borderTop: '1px solid #EDEDED',
  borderBottom: '1px solid #EDEDED',
  borderRight: '1px solid #EDEDED',
  height: '85px',
  display: 'flex',
  flexDirection: 'row',
  gap: '5px',
  justifyContent: 'center',
  marginBlock: '1em',
}));

export const QuestionNoBox = styled(Box)(() => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  width: '2em',
  height: '2em',
  backgroundColor: 'rgba(39,82,231,0.1)',
  borderRadius: 1000,
  fontSize: '12px',
}));

export const QuestionBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '1em',
  marginTop: '2em',
  marginBottom: '1em',
}));

export const ImageAttachBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '17em',
  height: '4em',
  cursor: 'pointer',
  border: '1px dashed #2752E7',
  backgroundColor: '#F6F6F6',
  borderRadius: '2px',
  marginBlock: '1.5em',
}));
