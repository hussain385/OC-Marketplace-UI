import { styled as materialStyled } from '@mui/material';

export const OrderListAlphabet = materialStyled('ol')(({ theme }) => ({
  counterReset: 'list',
  width: '93%',
  margin: 0,
  marginInline: 'auto',
}));

export const ListItemAlphabet = materialStyled('li')(({ theme }) => ({
  listStyle: 'none',
  position: 'relative',
  fontSize: '1rem',
  marginTop: '24px',
  marginBottom: '16px',
  paddingLeft: '1rem',
  '&::before': {
    content: 'attr(data-left) counter(list, lower-alpha) attr(data-right)',
    counterIncrement: 'list',
    position: 'absolute',
    left: '-1.4em',
  },
}));

export const OrderListCounter = materialStyled('ol')(({ theme }) => ({
  counterReset: 'list',
  marginLeft: '1.2rem',
}));

export const ListItemCounter = materialStyled('li')(({ theme }) => ({
  fontSize: '1rem',
  marginTop: '24px',
  marginBottom: '16px',
}));

export const OrderListDecimalCounterOutSide = materialStyled('ol')(({ theme }) => ({
  counterReset: 'item',
  listStyleType: ' upper-roman',
  margin: 0,
  padding: 0,
}));

export const OrderListDecimalCounterInside = materialStyled('ol')(({ theme }) => ({
  counterReset: 'subitem',
  listStyleType: 'decimal',
  margin: 0,
  padding: 0,
}));

export const ListItemDecimalOutside = materialStyled('li')(({ theme }) => ({
  counterIncrement: 'item',
  listStyle: 'none',
  position: 'relative',
  fontSize: '1rem',
  marginTop: '24px',
  marginBottom: '16px',
  paddingLeft: '0.5rem',
  '&::before': {
    content: 'counter(item)',
    counterIncrement: 'list',
    position: 'absolute',
    left: '-1.4em',
  },
}));

export const ListItemDecimalInside = materialStyled('li')(({ theme }) => ({
  counterIncrement: 'subitem',
  listStyle: 'none',
  position: 'relative',
  fontSize: '1rem',
  marginTop: '24px',
  marginBottom: '16px',
  paddingLeft: '1rem',
  '&::before': {
    content: 'counter(item) "." counter(subitem)',
    position: 'absolute',
    left: '-1.4em',
  },
}));
