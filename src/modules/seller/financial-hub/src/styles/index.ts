import { Box, styled, Typography } from '@mui/material';
import { Color } from '../../../../../theme';
export const FHStatusLabel = styled(Box)(({ theme }: any) => ({
  borderRadius: '24px',
  background: Color.bgGreyLight,
  border: '0px',
  fontFamily: 'Manrope',
  fontStyle: 'normal',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '4px 16px 4px 24px',
  textTransform: 'capitalize',
  position: 'relative',
  maxWidth: '200px',
  '&::before': {
    content: '""',
    width: '8px',
    height: '8px',
    borderRadius: '8px',
    background: Color.gray,
    position: 'absolute',
    left: '10px',
    top: '50%',
    marginTop: '-3px',
  },
  '&.Released, &.Withdrawn': {
    background: `${Color.green}10`,
    color: Color.green,
    '&::before': {
      background: `${Color.green}`,
    },
  },
  '&.Pending, &.Requested': {
    background: `${Color.purple}10`,
    color: Color.purple,
    '&::before': {
      background: `${Color.purple}`,
    },
  },
  '&.Disputed, &.Failed': {
    background: `${Color.pink}10`,
    color: Color.pink,
    '&::before': {
      background: `${Color.pink}`,
    },
  },
  '&.Voided': {
    background: `${Color.gray}10`,
    color: Color.gray,
    '&::before': {
      background: `${Color.gray}`,
    },
  },
  '&.Processing': {
    background: `${Color.priBlue}10`,
    color: Color.priBlue,
    '&::before': {
      background: `${Color.priBlue}`,
    },
  },
}));

export const Card = styled(Box)(() => ({
  maxWidth: '416px',
  minHeight: '260px',
  maxHeight: '260px',
  flexGrow: '0',
  padding: '24px',
  borderRadius: ' 4px',
  backgroundColor: '#fff',
  border: `1px solid ${Color.line}`,
  justifyContent: 'space-between',
  display: 'flex',
  flexDirection: 'column',
}));

export const SubHeading = styled(Typography)(() => ({
  fontSize: '14px',
  fontWeight: '700',
  color: Color.textHint,
}));

export const CurrenyLabel = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: '700',
  color: Color.textHint,
}));

export const AmountLabel = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: '700',
  color: Color.textBlack,
}));

export const WithdrawStatusInfo = styled(Box)(() => ({
  padding: '16px',
  backgroundColor: '#EFE9FF',
  border: `1px solid ${Color.line}`,
  color: Color.textBlack,
  '&.processing': {
    backgroundColor: '#E9F1FF',
    '& span': {
      fontWeight: '700',
    },
  },
  '&.failed': {
    backgroundColor: '#FDEAE9',
  },
}));
