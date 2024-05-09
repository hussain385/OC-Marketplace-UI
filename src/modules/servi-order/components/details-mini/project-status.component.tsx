import { Box, Step, StepLabel } from '@mui/material';
import React from 'react';
import { Heading14 } from '@/common/styles';
import { ProjectStatusStepper, ProjectStepperIconRoot } from '../../order-management.style';
import { StepIconProps } from '@mui/material/StepIcon';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppSelector } from '@/redux/hooks';
import { useMediaBreakpoint } from '@/common/components';

const ProjectStatusComponent = () => {
  const { selectedOrder } = useAppSelector((state) => state.mainState.order);
  const { xs, sm } = useMediaBreakpoint();
  const unSorted = [...selectedOrder!.statuses];
  const sorted = unSorted.sort((a, b) => a.no - b.no);
 
  /**
   * Get the current order status index 
   * @returns active index 
   */
  const getActiveStepIndex = (): number => {
    let selectedIndex = 0;
    sorted?.map((status, index) => {
      if (status.isFinished){
        selectedIndex = index + 1;
      }
    });
    return selectedIndex;
  }
 

  return (
    <Box>
      <Box sx={{ marginY: '16px' }}>
        <Heading14>Project status</Heading14>
      </Box>
      <Box sx={{ overflow: 'auto' }}>
        <ProjectStatusStepper
          orientation={xs || sm ? 'horizontal' : 'vertical'}
          activeStep={getActiveStepIndex()}
          alternativeLabel={xs || sm}
        >
          {sorted?.map((status, index) => (
            <Step key={index}>
              <StepLabel StepIconComponent={CustomStepIcons}>{status.name}</StepLabel>
            </Step>
          ))}
        </ProjectStatusStepper>
      </Box>
    </Box>
  );
};

// eslint-disable-next-line no-unused-vars
function CustomStepIcons(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <ProjectStepperIconRoot ownerState={{ active }} className={className}>
      {completed ? <CheckCircleIcon className='CustomStepIcon-completedIcon' /> : <div className='CustomStepIcon-circle' />}
    </ProjectStepperIconRoot>
  );
}

export default ProjectStatusComponent;
