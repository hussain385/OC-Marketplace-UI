// @flow
import React from 'react';
import { Typography, Box } from '@mui/material';

type Props = {
  errors: any;
};

export const ManagePlanErrorsComponents = ({ errors }: Props) => {
  return (
    <Box sx={{ width: '100%' }}>
      {Boolean(errors.package1) && <Typography className='errorMessage'>{errors?.package1?.title?.message as never}</Typography>}
      {Boolean(errors.package1) && (
        <Typography className='errorMessage'>{errors?.package1?.description?.message as never}</Typography>
      )}
      {Boolean(errors.package1) && (
        <Typography className='errorMessage'>{errors?.package1?.duration?.message as never}</Typography>
      )}
      {Boolean(errors.package1) && (
        <Typography className='errorMessage'>{errors?.package1?.requirements?.message as never}</Typography>
      )}
      {Boolean(errors.package1) && <Typography className='errorMessage'>{errors?.package1?.price?.message as never}</Typography>}
      {Boolean(errors.package2) && <Typography className='errorMessage'>{errors?.package2?.title?.message as never}</Typography>}
      {Boolean(errors.package2) && (
        <Typography className='errorMessage'>{errors?.package2?.description?.message as never}</Typography>
      )}
      {Boolean(errors.package2) && (
        <Typography className='errorMessage'>{errors?.package2?.duration?.message as never}</Typography>
      )}
      {Boolean(errors.package2) && (
        <Typography className='errorMessage'>{errors?.package2?.requirements?.message as never}</Typography>
      )}
      {Boolean(errors.package2) && <Typography className='errorMessage'>{errors?.package2?.price?.message as never}</Typography>}
      {Boolean(errors.package3) && <Typography className='errorMessage'>{errors?.package3?.title?.message as never}</Typography>}
      {Boolean(errors.package3) && (
        <Typography className='errorMessage'>{errors?.package3?.description?.message as never}</Typography>
      )}
      {Boolean(errors.package3) && (
        <Typography className='errorMessage'>{errors?.package3?.duration?.message as never}</Typography>
      )}
      {Boolean(errors.package3) && (
        <Typography className='errorMessage'>{errors?.package3?.requirements?.message as never}</Typography>
      )}
      {Boolean(errors.package3) && <Typography className='errorMessage'>{errors?.package3?.price?.message as never}</Typography>}
    </Box>
  );
};
