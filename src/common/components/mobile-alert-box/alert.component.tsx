import { Box } from '@mui/system';
import { GridCloseIcon } from '@mui/x-data-grid';
import React from 'react';
import { CloseButtonProps, toast, ToastOptions, ToastPosition } from 'react-toastify';
import { ToastTypes } from '../../utils';
// import { ToastContainer } from 'react-toastify';

import './toastify-alert.css';

const CloseButton = ({ closeToast }: CloseButtonProps) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }} component='span'>
    <i onClick={closeToast}>
      <GridCloseIcon />
    </i>
  </Box>
);

export const showAlertMessageMobile = (
  message: string,
  type: ToastTypes,
  position: ToastPosition = 'bottom-center',
  width = '80%',
) => {
  const optionsSuccess: ToastOptions = {
    style: {
      width: width,
      minWidth: '174px',
      margin: '0 auto',
      background: '#2CAF70',
      marginBottom: '30px',
      boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.16)',
      borderRadius: '2px',
      fontSize: '12px',
      lineHeight: '20px',
      letterSpacing: '-0.5px',
      fontFamily: 'Manrope',
      textAlign: 'center',
    },
    closeButton: CloseButton,
    position: position,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    theme: 'colored',
    draggable: true,
    progress: undefined,
  };

  const optionError: ToastOptions = {
    style: {
      width: width,
      minWidth: '174px',
      margin: '0 auto',
      height: '100%',
      maxHeight: '30px',
      background: '#ED5151',
      marginBottom: '30px',
      boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.16)',
      borderRadius: '2px',
      fontSize: '12px',
      lineHeight: '20px',
      letterSpacing: '-0.5px',
      fontFamily: 'Manrope',
      textAlign: 'center',
    },
    closeButton: CloseButton,
    className: 'closeBtn',
    position: position,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    theme: 'colored',
    draggable: true,
    progress: undefined,
  };
  const optionsStandard: ToastOptions = {
    style: {
      width: width,
      color: '#000000',
      minWidth: '174px',
      margin: '0 auto',
      height: '100%',
      maxHeight: '30px',
      background: '#FFE164',
      marginBottom: '30px',
      boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.16)',
      borderRadius: '2px',
      fontSize: '12px',
      lineHeight: '20px',
      letterSpacing: '-0.5px',
      fontFamily: 'Manrope',
      textAlign: 'center',
    },
    closeButton: CloseButton,
    className: 'closeBtn',
    position: position,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    theme: 'colored',
    draggable: true,
    progress: undefined,
  };

  switch (type) {
    case ToastTypes.SUCCESS:
      toast.success(message, optionsSuccess);
      break;
    case ToastTypes.ERROR:
      toast.error(message, optionError);
      break;
    default:
      toast.info(message, optionsStandard);
      break;
  }
};

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const ToastStyle: React.CSSProperties | any = {
//   '&.toastProgress': {
//     backgroud: 'green',
//   },
//   '&.toastBody': {
//     backgroud: 'green',
//   },
// };

const showToastMessage = () => {
  showAlertMessageMobile('Update successful!', ToastTypes.SUCCESS);
  showAlertMessageMobile('Update failed!', ToastTypes.ERROR);
  showAlertMessageMobile('Having trouble connecting!', ToastTypes.INFO);
};

const AlertComponent = () => {
  return (
    <Box>
      <button onClick={showToastMessage}>Click Me</button>
    </Box>
  );
};

export default AlertComponent;
