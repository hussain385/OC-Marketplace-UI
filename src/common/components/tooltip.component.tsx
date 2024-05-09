import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import React from 'react';

export const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: '10px',
    minWidth: '423px',
    fontSize: '14px',
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid #E6E8ED',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.16)',
  },
  [`& .${tooltipClasses.arrow}`]: {
    '&:before': {
      border: '1px solid #E6E8ED',
    },
    color: 'white !important',
  },
});
