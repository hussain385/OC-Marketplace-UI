import { Grid, styled } from '@mui/material';
import { Color } from '@/theme';

const defaultStyles = {
  fontSize: '12px',
  padding: '12px 16px',
  border: `1px solid ${Color.E3E3E3}`,
};

export const GridHeaderRowStyle = {
  background: Color.E9EEFD,
};

export const GridHeaderColum = styled(Grid)({
  ...defaultStyles,
  fontWeight: 700,
});

export const GridColum = styled(Grid)({
  ...defaultStyles,
  background: Color.priWhite,
});

export const GridColumnFooter = styled(Grid)({
  ...defaultStyles,
  borderColor: Color.EFEEEE,
  //border: `1px solid ${Color.EFEEEE}`,
  background: Color.E3E3E3,
});
