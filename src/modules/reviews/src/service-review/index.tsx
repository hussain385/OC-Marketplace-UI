import React from 'react';

import { Divider } from '@mui/material';

import ReviewBar from '../components/service/review-bar';
import Comments from '../components/service/comments';
import AppErrorBoundary from '../../../../common/components/ErrorBoundary';

function ServiceReview() {
  return (
    <AppErrorBoundary>
      <ReviewBar />
      <Divider sx={{ marginY: '24px' }} />
      <Comments />
    </AppErrorBoundary>
  );
}

export default ServiceReview;
