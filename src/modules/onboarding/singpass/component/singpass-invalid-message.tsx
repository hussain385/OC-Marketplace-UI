import { Typography, Box, Button } from '@mui/material';
import React, { ReactNode } from 'react';
import { useAppDispatch } from '../../../../redux/hooks';
import { SingpassInvalidMessageStyles } from '../../../../common/styles/singpass-invalid-message';

import { skipCustomCancelButton } from '../../../../common/styles/skip-moda-styles';

import PopupModalBox from '../../../../common/components/popup-modal-box';
import { isUndefined } from 'lodash';
import { identityUserInfoTempDataUpdated } from '../../../../redux/reducers/authReducers';

const SingpassInvalidMessageComponent = ({
  title,
  desc,
  customStyles,
  closeFunction,
}: {
  title?: string | ReactNode;
  desc?: string | ReactNode;
  customStyles?: React.CSSProperties;
  closeFunction?: () => void;
}) => {
  const dispatch = useAppDispatch();

  const cancelFunc = () => {
    dispatch(identityUserInfoTempDataUpdated({}));
    if (!isUndefined(closeFunction)) {
      closeFunction();
    }
  };
  return (
    <PopupModalBox parentStyle={customStyles} childrenStyle={SingpassInvalidMessageStyles.popupBoxChildrenStyles}>
      <Box>
        <Typography sx={SingpassInvalidMessageStyles.singpassInfoText}>
          {!isUndefined(title) ? title : <span>Singpass info can&apos;t be retrieved</span>}
        </Typography>
        <Typography sx={SingpassInvalidMessageStyles.singpassInfoDescriptionText}>
          {!isUndefined(desc) ? (
            desc
          ) : (
            <span>
              Sorry, your info can &apos;t be retrieved from Singpass. To verify your organisation, please provide the details
              below.
            </span>
          )}
        </Typography>
        <Box sx={SingpassInvalidMessageStyles.singpassButtonWrapper}>
          <Button onClick={cancelFunc} type='button' variant='contained' sx={skipCustomCancelButton}>
            <Typography sx={SingpassInvalidMessageStyles.singpassButtonLabel}>
              {/* {formSubmitted ? 'Please Wait...' : 'Continue'} */}
              Close
            </Typography>
          </Button>
        </Box>
      </Box>
    </PopupModalBox>
  );
};

export default SingpassInvalidMessageComponent;
