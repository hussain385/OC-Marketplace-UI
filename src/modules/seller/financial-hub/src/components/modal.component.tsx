import { Box, Modal as MuiModal, styled, SxProps, Typography } from '@mui/material';
import React from 'react';
import { RenderIf } from '../../../../../common/components';
import { IoCloseSharp } from 'react-icons/io5';

interface IProps {
  isOpen: boolean;
  onClose?: () => void;
  boxSx?: SxProps;
  children: React.ReactNode;
  heading?: string;
  isClose?: boolean;
}

export function BasicModal({ isOpen, onClose, boxSx, children, isClose, heading }: IProps) {
  return (
    <MuiModal open={isOpen} onClose={onClose}>
      <ModalBoxStyled sx={boxSx}>
        <RenderIf value={!!isClose}>
          <Box className={'head-container'}>
            <Typography>{heading}</Typography>
            <IoCloseSharp onClick={onClose} />
          </Box>
        </RenderIf>
        {children}
      </ModalBoxStyled>
    </MuiModal>
  );
}

const ModalBoxStyled = styled(Box)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-54%, -50%);
  padding: 20px;
  width: 90%;
  max-width: 848px;
  margin: 16px;

  border-radius: 4px;
  border: 1px solid var(--line, #eaeaea);
  background: #fff;

  & > .head-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;

    & > .MuiTypography-root {
      color: var(--black-text, #000);

      /* Subtitle T3 */
      font-size: 20px !important;
      font-style: normal;
      font-weight: 700;
      line-height: 24px; /* 120% */
      letter-spacing: -0.5px;
    }

    & > svg {
      width: 24px;
      height: 24px;
      color: #7e7e7e;
      cursor: pointer;
    }
  }
`;
