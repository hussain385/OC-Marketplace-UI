import React from 'react';
import Modal from '../modal.component';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { ReactComponent as ExportIcon } from '../../../assets/icons/excel.svg';
import { ReactComponent as PdfIcon } from '../../../assets/icons/pdf.svg';

interface Props {
  isOpen: boolean;
  module?: string;
  exportType: 'csv' | 'pdf';
  count: number;
  onChange?: (value: string) => void;
}

const ExportModal: React.FC<Props & any> = ({ module, exportType, count, isOpen, onChange, ...others }) => {
  const content = () => {
    const icon =
      exportType === 'csv' ? (
        <ExportIcon className='export' style={{ marginRight: '10px' }} />
      ) : exportType === 'pdf' ? (
        <PdfIcon style={{ marginRight: '10px' }} />
      ) : (
        ''
      );
    return (
      <Box>
        <Box sx={{ display: 'flex' }}>
          <Box>{icon}</Box>
          <Typography sx={{ fontSize: '18px' }}>
            Export my {module} to {exportType}
          </Typography>
        </Box>
        <Box>
          <FormControl>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              defaultValue='current'
              name='radio-buttons-group'
              onChange={(e) => onChange && onChange(e.target.value)}
            >
              <FormControlLabel value='current' control={<Radio />} label='Current page' />
              <FormControlLabel value='all' control={<Radio />} label={`All of ${module}`} />
              <FormControlLabel value='custom' control={<Radio />} disabled={count === 0} label={`Selected: ${count} row(s)`} />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
    );
  };

  return <Modal content={content()} isOpen={isOpen} isBottomSheet {...others} />;
};

export default ExportModal;
