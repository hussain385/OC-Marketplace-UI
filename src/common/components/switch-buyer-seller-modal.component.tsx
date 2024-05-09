import React, { useState } from 'react';
import { Box, Dialog, DialogContent, Typography } from '@mui/material';
import MuiButton from './mui-button.component';
import { Color } from '../../theme';
import { getCookie, setCookie } from '../utils/cookie';
import SelectEntityComponent from './authentication/select-entity.component';
import { useLazyGetEntityInfoQuery } from '../../redux/apis/marketplace';
import { isEmpty, isUndefined } from 'lodash';
import { useAppDispatch } from '../../redux/hooks';
import useValidateUser from '../utils/hooks/useValidateUser';
import { selectedEntityUpdated } from '../../redux/reducers/authReducers';
import { USER_GROUP_LOWERCASE } from '../interface';

type componentProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const SwitchBuyerSellerModal = ({ isOpen, handleClose }: componentProps) => {
  const [selectedUID, setSelectedUID] = useState<string>('');
  const [Entity, { isLoading }] = useLazyGetEntityInfoQuery();
  const { navigateAccountInfo } = useValidateUser();
  const dispatch = useAppDispatch();

  const handleSwitchNow = async () => {
    await Entity({
      entityId: selectedUID,
      queryObject: {
        populate: [
          { path: '__awards', populate: ['__avatar'] },
          { path: '__logo' },
          { path: '__employees', populate: ['__avatar'] },
        ],
      },
    })
      .unwrap()
      .then(({ data }: any) => {
        if (!isUndefined(data)) {
          const { entity } = data;
          setCookie(
            'x-client-type',
            getCookie('x-client-type') === USER_GROUP_LOWERCASE.seller ? USER_GROUP_LOWERCASE.buyer : USER_GROUP_LOWERCASE.seller,
            1,
          );
          dispatch(selectedEntityUpdated(entity));
          setSelectedUID('');
          navigateAccountInfo();
          handleClose();
        }
      });
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          width: '100%',
          margin: '0 auto',
          maxWidth: '35em',
        },
      }}
      open={isOpen}
      onClose={() => {
        handleClose();
        setSelectedUID('');
      }}
      maxWidth={'md'}
      fullWidth
    >
      <DialogContent sx={{ padding: '24px' }}>
        <Typography sx={{ fontSize: '20px', fontWeight: '700' }}>
          You’re switching to{' '}
          {getCookie('x-client-type') === USER_GROUP_LOWERCASE.seller ? USER_GROUP_LOWERCASE.buyer : USER_GROUP_LOWERCASE.seller}
        </Typography>
        <SelectEntityComponent selectedUID={selectedUID} setSelectedUID={setSelectedUID} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
            marginTop: '1.5em',
          }}
        >
          <MuiButton
            type='button'
            heightSize='44px'
            widthSize={'48%'}
            style={{
              background: Color.bgGreyLight,
              borderRadius: '2px',
              color: Color.priBlue,
              lineHeight: 1.71,
              paddingInline: '2em',
              letterSpacing: '-0.5px',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
            onClick={() => {
              handleClose();
              setSelectedUID('');
            }}
            value={'Cancel'}
          />
          <MuiButton
            type='button'
            heightSize='44px'
            widthSize={'48%'}
            onClick={handleSwitchNow}
            disabled={isLoading}
            style={{
              background: isEmpty(selectedUID) || isLoading ? 'rgba(39,82,231,0.35)' : Color.priBlue,
              borderRadius: '2px',
              color: Color.priWhite,
              lineHeight: 1.71,
              paddingInline: '2em',
              letterSpacing: '-0.5px',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
            value={isLoading ? 'Loading...' : 'Switch now'}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SwitchBuyerSellerModal;
