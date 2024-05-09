import React, { Component, FunctionComponent, ReactElement } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { Box, Button, styled, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { Color } from '../../theme';
import BoxMessageDisplay from './box-message-display';
import { useNavigate } from 'react-router-dom';

interface IAppErrorB {
  children: React.ReactNode;
  fallback?: ReactElement<unknown, string | FunctionComponent | typeof Component>;
  text?: string;
}

interface IPageBF {
  text?: string;
}

/**
 * Error Boundary for our app
 *
 * @param children Required field must have in every module
 * @param text Custom text for default fallback
 * @param fallback Custom fallback if you want to replace default. For page boundary
 * @constructor
 */
function AppErrorBoundary({ children, text, fallback }: IAppErrorB) {
  return (
    <ErrorBoundary
      fallback={fallback ?? <ErrorContainer>{text ?? 'Oh snap...Something went wrong please try again later'}</ErrorContainer>}
    >
      {children}
    </ErrorBoundary>
  );
}

/**
 * Page Boundary Fallback for the whole page boundary must set before parent component of the page.
 *
 * @param text Custom text in the modal
 * @constructor
 */
export function PageBoundaryFallback({ text }: IPageBF) {
  const navigate = useNavigate();

  return (
    <BoxMessageDisplay overideStyle={{ background: Color.bgGreyLight }}>
      <BoundaryContainer>
        <Box className={'modal-container'}>
          <ErrorOutlineIcon />
          <Typography className={'modal-head'}>Error!</Typography>
          <Typography className={'modal-text'}>{text ?? 'Oh snap...Something went wrong please try again later'}</Typography>
          <Box className={'btn-container'}>
            <Button variant='contained' color='secondary' onClick={() => navigate('/')}>
              Go Home
            </Button>
            <Button variant='contained' color='secondary' onClick={() => window.location.reload()}>
              Try again
            </Button>
          </Box>
        </Box>
      </BoundaryContainer>
    </BoxMessageDisplay>
  );
}

const ErrorContainer = styled('div')`
  color: ${Color.negative};
  padding: 5px;
  text-align: center;
`;

const BoundaryContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  & .modal-container {
    background-color: ${Color.priWhite};
    color: ${Color.negative};
    padding: 36px;
    border-radius: 5px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    & .MuiSvgIcon-root {
      font-size: 100px;
      margin-bottom: 10px;
    }

    & .modal-head {
      font-size: 24px !important;
      font-weight: bold;
      margin-bottom: 10px;
    }

    & .btn-container {
      display: flex;
      gap: 10px;

      & .MuiButtonBase-root {
        margin-top: 20px;
        width: 100%;
        height: 44px;
        text-transform: none;
      }

      & .MuiButtonBase-root:first-child {
        background: ${Color.orderStatus.cancelled};
      }
    }
  }
`;

export default AppErrorBoundary;
