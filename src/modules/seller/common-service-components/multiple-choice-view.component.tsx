import React from 'react';
import { Box, FormControlLabel, RadioGroup, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import BpRadio from '../../../common/components/bp-radio.component';
import { IRequirementState } from '@/common/interface/busines-company-profile-interface';

type componentPropType = {
  setRequirementSelect: (value: IRequirementState) => void;
  value: IRequirementState;
  setOptionsSetReactSortable: (value: boolean) => void;
};

const MultipleChoiceViewComponent = ({ value, setRequirementSelect, setOptionsSetReactSortable }: componentPropType) => {
  return (
    <Box
      onClick={() => {
        setRequirementSelect({ ...value, edit: true });
        setOptionsSetReactSortable(false);
      }}
      className={'requirementCard'}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
        <img
          src={require('../../../assets/requirement-icons/checkbox.png').default}
          style={{ width: '16px', height: '13.33px' }}
        />
        <Typography sx={{ color: '#7E7E7E' }}>{value.type}</Typography>
      </Box>
      <Typography sx={{ fontSize: '14px', fontWeight: '500' }}>{value.question}</Typography>
      {value.isAllowMultipleChoice ? (
        <Box sx={{ marginLeft: '1em', display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
          {value.options?.map((option, key) => (
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', minHeight: '2em' }} key={key}>
              <Checkbox
                disabled
                sx={{
                  borderRadius: 2,
                  color: '#eaeaea',
                  '&.Mui-checked': {
                    color: '#2752E7',
                    padding: '0 9px 0 0',
                  },
                }}
              />
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: '500',
                  lineHeight: '1.71',
                  wordBreak: 'break-word',
                }}
              >
                {option}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <RadioGroup sx={{ marginLeft: '1em', display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
          {value.options?.map((option, key) => (
            <FormControlLabel
              value={option}
              key={key}
              disabled
              control={<BpRadio />}
              label={
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: 1.71,
                    letterSpacing: '-0.5px',
                    wordBreak: 'break-word',
                  }}
                >
                  {option}
                </Typography>
              }
            />
          ))}
        </RadioGroup>
      )}
      {value.isAllowMultipleChoice && (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox
            defaultChecked
            disabled
            sx={{
              borderRadius: 2,
              color: '#eaeaea',
              '&.Mui-checked': {
                color: 'rgba(39,82,231,0.3)',
                padding: '0 9px 0 0',
              },
            }}
          />
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '500',
              lineHeight: '1.71',
              color: '#7E7E7E',
            }}
          >
            Allow to choose more than 1 option
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MultipleChoiceViewComponent;
