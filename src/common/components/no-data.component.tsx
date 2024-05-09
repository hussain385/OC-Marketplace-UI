import React from 'react';

import { Box, Typography } from '@mui/material';

import { Color } from '../../theme';

type Props = {
  content?: string;
  style?: React.CSSProperties;
};
const defaultStyles = {
  paddingY: '16px',
  borderTop: `1px solid ${Color.line}`,
  borderBottom: `1px solid ${Color.line}`,
};

const NoDataView = ({ content = 'No data found', style = defaultStyles }: Props) => {
  return (
    <Box sx={style}>
      <Typography sx={{ fontSize: '12px', fontWeight: '500', color: Color.textHint, width: '100%', textAlign: 'center' }}>
        {content}
      </Typography>
    </Box>
  );
};
export default NoDataView;
