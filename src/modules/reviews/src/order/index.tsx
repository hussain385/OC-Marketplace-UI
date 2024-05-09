import React from 'react';
import AppErrorBoundary from '../../../../common/components/ErrorBoundary';
import OrderReviewComponent from './main.widget';

function OrderReview() {
  return (
    <AppErrorBoundary>
      <OrderReviewComponent />
    </AppErrorBoundary>
  );
}

export default OrderReview;
