// @flow
import * as React from 'react';
import { StepConnector, Typography } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { styled } from '@mui/system';
import { StepIconProps } from '@mui/material/StepIcon';
import { stepConnectorClasses } from '@mui/material/StepConnector';
import { AiOutlineCheck } from 'react-icons/ai';

type Props = {
  stepCount: number;
  manageListing?: boolean;
};

const steps = ['Public profile', 'Service overview', 'Package', 'Requirements', 'Publish'];
const manageListingSteps = ['Overview', 'Package', 'Payment', 'Requirements', 'Publish'];

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  border: '5px solid white',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: '#2752e7',
    border: '5px solid #D4DCFA',
  }),
  ...(ownerState.completed && {
    backgroundColor: '#2752e7',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: completed ? <AiOutlineCheck /> : <Typography>1</Typography>,
    2: completed ? <AiOutlineCheck /> : <Typography>2</Typography>,
    3: completed ? <AiOutlineCheck /> : <Typography>3</Typography>,
    4: completed ? <AiOutlineCheck /> : <Typography>4</Typography>,
    5: completed ? <AiOutlineCheck /> : <Typography>5</Typography>,
  };

  return (
    <ColorlibStepIconRoot
      sx={{ width: { xs: '2.7em', md: '3em' }, height: { xs: '2.7em', md: '3em' } }}
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: 'url(../verify/ic-arrow-left1.svg)',
      height: 20,
      width: { xs: 15, md: 0 },
      backgroundRepeat: 'no-repeat',
      marginTop: '0.5em',
      transform: 'rotate(180deg)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'url(../verify/ic-arrow-left1.svg)',
      height: 20,
      width: { xs: 15, md: 0 },
      backgroundRepeat: 'no-repeat',
      marginTop: '0.5em',
      transform: 'rotate(180deg)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    backgroundImage: 'url(../verify/ic-arrow-left2.svg)',
    height: 20,
    width: { xs: 15, md: 0 },
    backgroundRepeat: 'no-repeat',
    borderTopStyle: 'none',
    transform: 'rotate(180deg)',
    marginTop: '0.5em',
  },
}));

export function ProfileSetupSteps(props: Props) {
  return (
    <Stepper sx={{ marginBottom: '1.3em', marginTop: '1.3em' }} activeStep={props.stepCount} connector={<ColorlibConnector />}>
      {(props.manageListing ? manageListingSteps : steps).map((label, index) => (
        <Step key={label} completed={props.stepCount > index}>
          <StepLabel StepIconComponent={ColorlibStepIcon}>
            <Typography
              sx={(theme) => ({
                [theme.breakpoints.up(0)]: {
                  display: 'none',
                },
                [theme.breakpoints.up(674)]: {
                  display: 'flex',
                },
              })}
            >
              {label}
            </Typography>
            {/*{steps.length !== index + 1 && (*/}
            {/*    <Box*/}
            {/*        component='img'*/}
            {/*        sx={{*/}
            {/*            display: {*/}
            {/*                xs: 'flex',*/}
            {/*                sm: 'flex',*/}
            {/*                md: 'none',*/}
            {/*                lg: 'none',*/}
            {/*            },*/}
            {/*            transform: 'rotate(180deg)',*/}
            {/*        }}*/}
            {/*        alt='arrow'*/}
            {/*        src={(props.stepCount > index) ? '../verify/ic-arrow-left1.svg' : '../verify/ic-arrow-left2.svg'}*/}
            {/*    />*/}
            {/*)}*/}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
