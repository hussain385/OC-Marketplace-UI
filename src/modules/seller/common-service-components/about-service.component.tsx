import React from 'react';
import { Box, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { subText } from '../manage-listing/manage-listing-form/overview.view';

type componentProps = {
  errors: any;
  control: any;
};

const AboutServiceComponent = ({ errors, control }: componentProps) => {
  return (
    <Box sx={{ marginTop: '1em' }}>
      <Typography className='subHeading'>Introduce about your service</Typography>
      <Typography sx={subText}>
        Describe what you are offering and the most important information for your service. Be as detailed as possible so buyers
        will be able to understand if this meets their needs.
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: '240px',
          border: errors.description?.message ? '1px solid #e11900' : '1px solid #EAEAEA',
          borderRadius: '2px',
          padding: '16.5px 14px',
          marginTop: '0.5em',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Controller
          name={'description'}
          control={control}
          render={({ field }) => {
            return (
              <>
                <textarea
                  draggable={false}
                  onChange={field.onChange}
                  maxLength={600}
                  value={field.value}
                  placeholder='Introduction of the service you provide'
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
                  <Typography sx={{ fontSize: '12px', color: '#7E7E7E' }}>{`${
                    field.value ? field.value.length : 0
                  }/600 Characters`}</Typography>
                </Box>
              </>
            );
          }}
        />
      </Box>
      {Boolean(errors.description?.message) && (
        <Typography className='errorMessage'>{errors.description?.message as never}</Typography>
      )}
    </Box>
  );
};

export default AboutServiceComponent;
