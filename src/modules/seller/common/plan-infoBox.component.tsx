import React from 'react';
import { Box, Typography } from '@mui/material';

const subText = {
  fontWeight: '400',
  fontSize: '12px',
  color: '#7E7E7E',
  marginTop: '0.3em',
  width: '100%',
  maxWidth: '1440px',
  letterSpacing: '-0.5px',
};

const PlanInfoBox = ({ paymentPlanType }: { paymentPlanType: string[] }) => {
  return (
    <Box sx={{ width: '25%', minWidth: '215px' }}>
      <Box
        sx={{
          backgroundColor: '#F7F7F7',
          height: '3.5em',
          padding: '10px 20px',
          borderBottom: '1px solid #EAEAEA',
        }}
      >
        <Typography className='subHeading'>Your package</Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: '#F7F7F7',
          height: '6.25em',
          padding: '10px 20px',
          borderBottom: '1px solid #EAEAEA',
        }}
      >
        <Typography className='subHeading'>Status</Typography>
        <Typography style={subText}>Indicate if your package is active or not</Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: '#F7F7F7',
          height: '15.5em',
          padding: '10px 20px',
          borderBottom: '1px solid #EAEAEA',
        }}
      >
        <Typography className='subHeading'>What&apos;s in the package?</Typography>
        <Typography style={subText}>
          Summarize the most important information in each service package that you offer so that users can easily compare them
          with each other and make a choice. You can use maximum 175 chars
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: '#F7F7F7',
          height: '15.5em',
          padding: '10px 20px',
          borderBottom: '1px solid #EAEAEA',
        }}
      >
        <Typography className='subHeading'>Things to note (Optional)</Typography>
        <Typography style={subText}>List all prerequisites for each package</Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: '#F7F7F7',
          height: '8em',
          padding: '10px 20px',
          borderBottom: '1px solid #EAEAEA',
        }}
      >
        <Typography className='subHeading'>Payment plan</Typography>
        <Typography style={subText}>Set a payment plan</Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: '#F7F7F7',
          height: '8em',
          padding: '10px 20px',
          borderBottom: '1px solid #EAEAEA',
        }}
      >
        <Typography className='subHeading'>Delivery time</Typography>
        <Typography style={subText}>Indicate how long it will take to complete the order</Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: '#F7F7F7',
          height: '8em',
          padding: '10px 20px',
          borderBottom: '1px solid #EAEAEA',
        }}
      >
        <Typography className='subHeading'>Revision</Typography>
        <Typography style={subText}>Set a limit for the number of revisions allowed</Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: '#F7F7F7',
          height: '9.75em',
          padding: '10px 20px',
          borderBottom: paymentPlanType.includes('SUBSCRIPTION') ? '1px solid #EAEAEA' : 'none',
        }}
      >
        <Typography className='subHeading'>Price & Payment schedule</Typography>
        <Typography style={subText}>Set the amount and payment frequency for each package</Typography>
      </Box>
      {paymentPlanType.includes('SUBSCRIPTION') && (
        <>
          <Box
            sx={{
              backgroundColor: '#F7F7F7',
              height: '12em',
              padding: '10px 20px',
              borderBottom: '1px solid #EAEAEA',
            }}
          >
            <Typography className='subHeading'>Payment plan</Typography>
            <Typography style={subText}>Set a payment frequency</Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: '#F7F7F7',
              height: '8em',
              padding: '10px 20px',
              borderBottom: '1px solid #EAEAEA',
            }}
          >
            <Typography className='subHeading'>No of orders</Typography>
            <Typography style={subText}>Set the number of orders</Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default PlanInfoBox;
