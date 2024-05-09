import styled from '@emotion/styled';
import { Radio, Typography } from '@mui/material';
import { Color } from '../../theme';
import { utilityStyles } from './utility.styles';

const { semiBoldText, fontSizex14, spacingx5, lineHeightx171 } = utilityStyles;

export const RadioDefaultStyled = styled(Radio)(({ theme }) => ({
  color: Color.priBlue,
  '&.Mui-checked': {
    color: Color.priBlue,
  },
}));

export const RadioCustomStyled = styled(Radio)(({ theme }) => ({
  color: Color.line,
  '&.Mui-checked': {
    color: Color.priBlue,
  },
}));

export const RadioLabel = styled(Typography)(({ theme }) => ({
  fontWeight: semiBoldText,
  fontSize: fontSizex14,
  lineHeight: lineHeightx171,
  letterSpacing: spacingx5,
}));
