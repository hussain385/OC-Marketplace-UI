import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Color } from '../../../theme';

type componentType = {
  optionNo: number;
  optionDescription: string;
  setOptions: React.Dispatch<React.SetStateAction<{ id: number; option: string }[]>>;
  options: { id: number; option: string }[];
  setValue: any;
  errorFlag: boolean;
  setErrorFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

const OptionsUIComponent = ({
  optionNo,
  optionDescription,
  setOptions,
  options,
  setValue,
  errorFlag,
  setErrorFlag,
}: componentType) => {
  return (
    <div style={{ marginTop: '10px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography>Option {optionNo}</Typography>
        <Button
          disabled={options.length < 3}
          onClick={() => {
            setOptions((prevState) => prevState.filter((value, key) => key !== optionNo - 1));
            setValue(
              'options',
              options.filter((value, key) => key !== optionNo - 1),
            );
          }}
          sx={{ textTransform: 'none' }}
        >
          <Typography sx={{ color: options.length < 3 ? Color.bgGreyDark : Color.priBlue, fontSize: '12px' }}>Delete</Typography>
        </Button>
      </Box>
      <input
        type={'search'}
        disabled={optionDescription === 'Other'}
        value={optionDescription}
        onChange={(e) => {
          setErrorFlag(false);
          setOptions((prevState) =>
            prevState.map((value, key) => {
              if (key === optionNo - 1) {
                return { id: value.id, option: e.target.value };
              } else {
                return value;
              }
            }),
          );
          setValue(
            'options',
            options.map((value, key) => {
              if (key === optionNo - 1) {
                return e.target.value;
              } else {
                return value.option;
              }
            }),
          );
        }}
        placeholder={'Write your option here.'}
        style={{
          borderStyle: 'solid',
          borderWidth: '1px',
          height: '44px',
          borderRadius: '2px',
          width: '100%',
          paddingInline: '1em',
          borderColor: errorFlag ? Color.negative : Color.line,
          marginTop: '7px',
          outline: 'none',
        }}
      />
      {errorFlag && <Typography className='errorMessage'>This field is required and minimum 3 chars are required</Typography>}
    </div>
  );
};

export default OptionsUIComponent;
