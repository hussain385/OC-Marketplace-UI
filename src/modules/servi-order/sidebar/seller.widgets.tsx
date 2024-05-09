import React, { ReactNode } from 'react';
import DeliveryDueByComponent from '../components/delivery-due-by/delivery-due-by.component';
import DetailsMiniComponent from '../components/details-mini';
import SupportCenterComponent from '../components/details-mini/support-center.component';

// eslint-disable-next-line react/jsx-key
const widgets: ReactNode[] = [<DeliveryDueByComponent />, <DetailsMiniComponent />, <SupportCenterComponent />];

const SellerWidgets = () => {
  return widgets.map((widget, index) => <div key={index}>{widget}</div>);
};

export default SellerWidgets;
