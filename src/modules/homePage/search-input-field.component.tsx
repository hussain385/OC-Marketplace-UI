import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { MuiTextField } from '../../common/styles/homepage.styles';

const SearchInputFieldComponent = () => {
  return (
    <Grid container sx={{ position: 'relative' }}>
      <MuiTextField placeholder='What service are you looking for?' />
      <Box>
        <Button
          variant='contained'
          color='secondary'
          sx={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            top: 0,
            textTransform: 'capitalize',
            minheight: '56px',
          }}
        >
          <span style={{ marginTop: '10px' }}>
            <i>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4ZM2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11Z'
                  fill='white'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M15.9428 15.9429C16.3333 15.5524 16.9665 15.5524 17.357 15.9429L21.707 20.2929C22.0975 20.6834 22.0975 21.3166 21.707 21.7071C21.3165 22.0977 20.6833 22.0977 20.2928 21.7071L15.9428 17.3571C15.5523 16.9666 15.5523 16.3334 15.9428 15.9429Z'
                  fill='white'
                />
              </svg>
            </i>
          </span>
          &nbsp; <Typography sx={{ display: { xs: 'none', sm: 'block', md: 'block' } }}>Search</Typography>
        </Button>
      </Box>
    </Grid>
  );
};

export default SearchInputFieldComponent;
