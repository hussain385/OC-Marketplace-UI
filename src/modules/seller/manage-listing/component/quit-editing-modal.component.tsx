import React from 'react';
import Modal from '@/common/components/modal.component';
import { useNavigate } from '@/router';
import { Box, Typography } from '@mui/material';

type componentPropType = {
  openModal: boolean;
  saveLoading: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  isDirty: boolean;
  onSave?: () => void;
};

export const DiscardMessage = ({ message, heading }: { message: string; heading: string }) => {
  return (
    <Box>
      <Typography sx={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>{heading}</Typography>
      <Typography sx={{ fontSize: '13px', fontWeight: 'normal', marginBottom: '1em' }}>{message}</Typography>
    </Box>
  );
};

const QuitEditingModalComponent = ({ openModal, setOpenModal, isDirty, onSave, saveLoading }: componentPropType) => {
  const navigate = useNavigate();

  return (
    <Modal
      isOpen={openModal}
      content={
        <DiscardMessage
          heading={'Quit editing?'}
          message={
            "If you quit now, any changes you've made and haven't saved will be lost. To save your progress, click 'Save and quit'."
          }
        />
      }
      okBtnLabel={saveLoading ? 'Loading...' : 'Save and quit'}
      isRedPriButton={true}
      onCancel={async (reason) => {
        setOpenModal(false);
        if (reason === 'closeButtonClick') {
          navigate('/account/manage-listing');
        }
      }}
      cancelBtnText={'Quit anyway'}
      buttons={{ fontSize: '12px', width: { xs: '50%', md: '45%' } }}
      onOk={async () => {
        if (isDirty) {
          onSave && onSave();
        }
        setOpenModal(false);
      }}
    />
  );
};

export default QuitEditingModalComponent;
