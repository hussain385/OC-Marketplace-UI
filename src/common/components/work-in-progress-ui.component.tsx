import React from 'react';
import { Typography } from '@mui/material';
import Lottie from 'react-lottie';
import * as animationData from '../../assets/animation/page-in-development.json';

const WorkInProgress = () => {
  return (
    <div>
      <Typography sx={{ fontSize: '30px !important', fontWeight: '700', marginTop: '3em', marginBottom: '-1.5em' }}>
        Page in development.
      </Typography>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: animationData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        height={400}
        width={400}
      />
    </div>
  );
};

export default WorkInProgress;
