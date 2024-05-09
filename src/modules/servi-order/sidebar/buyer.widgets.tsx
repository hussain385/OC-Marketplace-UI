import React, { ReactNode } from 'react';
import DetailsMiniComponent from '../components/details-mini';
import SupportCenterComponent from '../components/details-mini/support-center.component';

// eslint-disable-next-line react/jsx-key
const widgets: ReactNode[] = [<DetailsMiniComponent />, <SupportCenterComponent />];

const BuyerWidgets = () => {
  return widgets.map((widget, index) => <div key={index}>{widget}</div>);
};

export default BuyerWidgets;
