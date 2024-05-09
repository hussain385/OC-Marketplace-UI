import React from 'react';
import { Box, Typography } from '@mui/material';
import { Color } from '../../../theme';
import { isEmpty } from 'lodash';

type componentProps = {
  onChange: (e: any) => void;
  description: string;
  errors: any;
  characters?: number;
  placeholder?: string;
  fieldName?: string;
};

const TextBoxComponent = ({ description, onChange, errors, characters, placeholder, fieldName }: componentProps) => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '180px',
          border:
            errors[fieldName ? fieldName : 'description'] && errors[fieldName ? fieldName : 'description']?.message
              ? `1px solid ${Color.negative}`
              : '1px solid #EAEAEA',
          borderRadius: '2px',
          padding: '16.5px 14px',
          marginTop: '0.5em',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <textarea
          draggable={false}
          maxLength={characters ? characters : 600}
          value={description}
          onChange={onChange}
          placeholder={placeholder ? placeholder : 'Write brief description here.'}
          style={{
            width: '100%',
            resize: 'none',
            border: 'none',
            height: '190px',
            overflowY: 'auto',
            fontFamily: 'Manrope,sans-serif',
            outline: 'none',
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box />
          <Typography sx={{ fontSize: '12px', color: Color.bgGreyDark }}>
            {isEmpty(description)
              ? `${characters ? characters : 600} Character`
              : `${description.length}/${characters ? characters : 600} Characters`}
          </Typography>
        </Box>
      </Box>
      {Boolean(errors[fieldName ? fieldName : 'description']) && (
        <Typography className='errorMessage'>{errors[fieldName ? fieldName : 'description']?.message as never}</Typography>
      )}
    </>
  );
};

export default TextBoxComponent;
