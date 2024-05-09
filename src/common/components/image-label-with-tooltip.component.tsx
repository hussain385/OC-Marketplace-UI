import React from 'react';
import { Typography, Tooltip, Button } from '@mui/material';
import { MdInfo } from 'react-icons/md';

type componentPropType = {
  tooltipText?: string;
  labelText: string;
};

const ImageLabelWithTooltipComponent = ({ labelText, tooltipText }: componentPropType) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'fit-content' }}>
      <Typography
        sx={{
          fontSize: '14px !important',
          fontWeight: '600',
          width: 'fit-content',
        }}
      >
        {labelText}
      </Typography>
      {tooltipText && (
        <Tooltip
          sx={{ '& .MuiTooltip-popper': { backgroundColor: 'white !important' } }}
          title={tooltipText}
          arrow
          placement='top'
        >
          <Button sx={{ marginLeft: -1 }}>
            <MdInfo style={{ color: '#7E7E7E', fontSize: '2em' }} />
          </Button>
        </Tooltip>
      )}
    </div>
  );
};

export default ImageLabelWithTooltipComponent;
