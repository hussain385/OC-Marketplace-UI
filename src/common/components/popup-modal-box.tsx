import React from 'react';
import { Box } from '@mui/material';

// eslint-disable-next-line no-unused-vars
type ModalProps = {
  setMatch: () => void;
  label?: string;
};

const PopupBox: React.FunctionComponent<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> &
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> &
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
    React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
      label?: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      childrenStyle?: any;
      parentStyle?: React.CSSProperties;
      // setMatch?: React.Dispatch<React.SetStateAction<boolean>>;
      children?: React.ReactNode;
    }
> = ({ children, childrenStyle, parentStyle }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: 999999,
        background: 'rgba(0, 0, 0, 0.5)',
        overflowY: 'hidden',
        ...parentStyle,
      }}
    >
      <Box
        sx={{
          ...childrenStyle,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default React.memo(PopupBox);
