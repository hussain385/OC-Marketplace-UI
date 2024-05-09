// @flow
import React, { useRef } from 'react';
import { Box, FormHelperText, Typography } from '@mui/material';
import { FormLabel, GreyRoundedContainer } from '../../../common/styles';
import { AppThemeBtnComponent } from '../../../common/components/app-theme-btn.component';
import { Color } from '../../../theme';
import { isEmpty } from 'lodash';
import { selectErrorStyleHelperText } from '../../../common/styles/select-input-form.styles';

const BusinessCertificateComponent = (props: {
  file: any;
  setFile: React.Dispatch<React.SetStateAction<any>>;
  setValue: any;
  errors: any;
  setError: any;
}) => {
  const uploadDocRef = useRef<HTMLInputElement>(null);
  return (
    <Box>
      <FormLabel sx={{ marginBottom: '0.7em' }}>Business registration certificate</FormLabel>
      <Box sx={{ display: 'flex', gap: '0.7em', alignItems: 'center' }}>
        <input
          ref={uploadDocRef}
          style={{ display: 'none' }}
          type={'file'}
          onChange={(e) => {
            props.setFile(e.target.files);
            props.setValue('fileName', (e.target.files as any)[0].name);
            props.setError('fileName', { type: 'focus' }, { shouldFocus: false });
          }}
        />
        <AppThemeBtnComponent
          onClick={() => uploadDocRef.current?.click()}
          customButtonStyle={{ border: `1px solid ${Color.bgLine}`, padding: '10px 16px', display: 'block', minWidth: '95px' }}
          text={'+ Upload'}
          color={'black'}
          fontSize={'14px'}
        />
        <GreyRoundedContainer sx={{ width: '84%', justifyContent: 'flex-start', gap: '12px' }}>
          <img alt={'file'} src={require('../../../assets/icons/file.svg').default} />
          <Typography>{isEmpty(props.file) ? 'No file uploaded' : props.file[0].name}</Typography>
        </GreyRoundedContainer>
      </Box>
      <FormHelperText sx={{ margin: 0, mt: 0 }} error={!!props.errors['fileName']}>
        <span style={selectErrorStyleHelperText}>
          {props.errors['fileName'] && props.errors['fileName']?.message !== ('Expected string, received function' as never)
            ? (props.errors['fileName']?.message as never)
            : ''}
        </span>
      </FormHelperText>
    </Box>
  );
};

export default BusinessCertificateComponent;
