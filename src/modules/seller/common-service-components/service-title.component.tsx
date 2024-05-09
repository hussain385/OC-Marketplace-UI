import React from 'react';
import { Box, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { subText } from '../manage-listing/manage-listing-form/overview.view';

type componentProps = {
  errors: any;
  control: any;
};

const ServiceTitleComponent = ({ errors, control }: componentProps) => {
  return (
    <Box sx={{ marginTop: '1em' }}>
      <Typography sx={{ my: '8px' }} className='subHeading'>
        Professional service title
      </Typography>
      <Typography sx={subText}>
        The title must clearly describe your service to make sure your customers will understand what you offer just by scanning
        the info.
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: '100px',
          border: errors.title?.message ? '1px solid #e11900' : '1px solid #EAEAEA',
          borderRadius: '2px',
          padding: '16.5px 14px',
          marginTop: '0.5em',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Controller
          name={'name'}
          control={control}
          render={({ field }) => {
            return (
              <>
                <textarea
                  draggable={false}
                  onChange={field.onChange}
                  value={field.value}
                  maxLength={100}
                  placeholder='Write your title here.'
                  style={{
                    width: '100%',
                    resize: 'none',
                    border: 'none',
                    height: '100%',
                    overflowY: 'auto',
                    fontFamily: 'Manrope,sans-serif',
                    outline: 'none',
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box />
                  <Typography sx={{ fontSize: '12px', color: '#7E7E7E' }}>{`${
                    field.value ? field.value.length : 0
                  }/100 Characters`}</Typography>
                </Box>
              </>
            );
          }}
        />
      </Box>
      {Boolean(errors.name?.message) && <Typography className='errorMessage'>{errors.name?.message as never}</Typography>}
      <Typography sx={subText}>
        Tip: If you&apos;re selling tax consultancy services, you can write:{' '}
        <span style={{ fontWeight: '600' }}>
          “We provide monitoring of statutory tax filing deadlines and satisfying all necessary requirements”.
        </span>{' '}
        Describing it this way will also make your service easily searchable
      </Typography>
    </Box>
  );
};

export default ServiceTitleComponent;
