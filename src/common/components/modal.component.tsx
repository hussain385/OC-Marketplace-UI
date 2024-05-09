import {
  Box,
  Breakpoint,
  Dialog as MuiDialog,
  DialogContent,
  IconButton,
  ModalProps,
  SxProps,
  Theme,
  useMediaQuery,
} from '@mui/material';

import React from 'react';
import { PrimaryButton, PrimaryRedButton, SecondryButton } from '../styles';
import { IoMdClose } from 'react-icons/io';

export type CloseReason = 'backdropClick' | 'escapeKeyDown' | 'closeButtonClick';

type Props = {
  content: string | React.ReactNode | JSX.Element;
  isOpen: boolean;
  isLoading?: boolean;
  onCancel?: (reason: CloseReason) => void;
  onOk?: () => void;
  closeBtnLabel?: string;
  okBtnLabel?: string;
  isRedPriButton?: boolean;
  cancelBtnText?: string;
  maxWidth?: Breakpoint | false;
  isFullWidth?: boolean;
  footerDisplay?: 'flex' | 'block';
  actionButtonPosition?: 'left' | 'center' | 'right';
  footerJustify?: 'space-between' | 'center' | 'end' | 'start';
  buttons?: SxProps<Theme>;
  isResponseFull?: boolean;
  extraFooter?: React.ReactNode;
  footerSx?: SxProps;
  isBottomSheet?: boolean;
  isForm?: boolean;
  onSubmit?: React.FormEventHandler<HTMLDivElement>;
  noBtnDisplay?: boolean;
  dialogContentStyle?: SxProps;
  closeVariant?: 'outside';
  dialogSx?: SxProps;
};

export default function Modal(props: Props & Omit<ModalProps, 'open' | 'onClose' | 'children'>) {
  const { onSubmit, ...otherProps } = props;
  const md = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const onCloseHandle = (reason: CloseReason) => {
    props.onCancel && props.onCancel(reason);
  };

  const onOkHandle = () => {
    props.onOk && props.onOk();
  };

  return (
    <MuiDialog
      sx={
        props.isResponseFull
          ? {
              ...props.dialogSx,
              '& .MuiPaper-root': {
                width: { xs: '100%', md: 'calc(100% - 10px)' },
                maxHeight: { xs: '100vh', md: 'calc(100% - 64px)' },
                padding: 0,
                margin: 0,
              },
            }
          : {
              ...props.dialogSx,
              '.MuiPaper-root':
                props.isBottomSheet && md
                  ? {
                      maxWidth: { xs: '100%', md: 'auto' },
                      position: 'absolute',
                      width: '100%',
                      pb: '20px',
                      borderRadius: '8px 8px 0px 0px',
                      bottom: 0,
                      margin: 0,
                    }
                  : {
                      borderRadius: '10px !important',
                      overflow: 'visible',
                    },
            }
      }
      onClose={(event, reason) => onCloseHandle(reason)}
      open={props.isOpen}
      maxWidth={props.maxWidth}
      fullWidth={props.isFullWidth}
      {...otherProps}
    >
      {props.closeVariant === 'outside' && (
        <IconButton
          sx={{ position: 'absolute', right: '-50px', top: 0, backgroundColor: 'white', ':hover': { backgroundColor: 'white' } }}
          onClick={() => onCloseHandle('closeButtonClick')}
        >
          <IoMdClose color={'black'} />
        </IconButton>
      )}
      <DialogContent sx={{ padding: { xs: '16px', md: '24px' }, ...props.dialogContentStyle }}>
        <Box component={props.isForm ? 'form' : undefined} onSubmit={onSubmit}>
          <Box sx={{ padding: '10px' }}>{props.content}</Box>
          <Box
            sx={{
              display: props.footerDisplay,
              textAlign: props.actionButtonPosition,
              justifyContent: props.footerJustify,
              ...props.footerSx,
            }}
          >
            {props.extraFooter}
            {!props.noBtnDisplay && (
              <Box
                sx={{
                  width: !props.extraFooter ? '100%' : undefined,
                  display: !props.extraFooter ? props.footerDisplay : undefined,
                  justifyContent: 'center',
                }}
              >
                {!!props.onCancel && (
                  <SecondryButton sx={{ marginRight: '5px', ...props.buttons }} onClick={() => onCloseHandle('closeButtonClick')}>
                    {props.cancelBtnText ? props.cancelBtnText : 'Cancel'}
                  </SecondryButton>
                )}

                {props.isRedPriButton && (
                  <PrimaryRedButton
                    sx={{ marginLeft: '5px', ...props.buttons }}
                    onClick={onOkHandle}
                    disabled={props.isLoading}
                    type={props.isForm ? 'submit' : undefined}
                  >
                    {props.okBtnLabel}
                  </PrimaryRedButton>
                )}
                {!props.isRedPriButton && (
                  <PrimaryButton
                    sx={{ marginLeft: '5px', ...props.buttons }}
                    onClick={onOkHandle}
                    disabled={props.isLoading}
                    type={props.isForm ? 'submit' : undefined}
                  >
                    {props.okBtnLabel}
                  </PrimaryButton>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
    </MuiDialog>
  );
}

Modal.defaultProps = {
  okBtnLabel: 'Remove',
  isFullWidth: true,
  maxWidth: 'sm',
  footerDisplay: 'flex',
  actionButtonPosition: 'right',
  isLoading: false,
  footerJustify: 'space-between',
  isResponseFull: false,
  buttons: {
    flex: 1,
  },
};
