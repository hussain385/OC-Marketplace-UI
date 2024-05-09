import React from 'react';
import { ShadowBox } from '@/common/styles';
import ActivityListComponent from './activity-list.component';

const ActivitiesComponent = () => {
  return (
    <ShadowBox sx={{ marginY: '24px', padding: '24px 0px 24px 0px !important' }}>
      <ActivityListComponent />
    </ShadowBox>
  );
};

export default ActivitiesComponent;
