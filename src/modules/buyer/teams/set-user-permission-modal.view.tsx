import React, { useState, useEffect } from 'react';
import { NameLabel } from '@/common/styles';
import { BiSolidPencil } from 'react-icons/bi';
import { Box, Button } from '@mui/material';
import Modal from '@/common/components/modal.component';
import { isEmpty } from 'lodash';
import { useUpdateEmployeePermissionsMutation } from '@/redux/apis/teamManagementApi';
import { AlertMessageBox, ToastTypes } from '@/common/utils';
import { showAlertMessageMobile } from '@/common/components/mobile-alert-box/alert.component';
import { useNavigate } from '@/router';
import { useMediaBreakpoint } from '@/common/components';
import MuiButton from '@/common/components/mui-button.component';
import { Color } from '@/theme';
import { AppThemeBtnComponent } from '@/common/components/app-theme-btn.component';

type componentPropType = {
  position: string[];
  employeeId: string;
};

const permissionOptions = [
  {
    value: 'Buy',
    heading: 'Buy',
    description: 'Contact sellers, post requests, and make purchases',
  },
  {
    value: 'Sell',
    heading: 'Sell',
    description: 'Create and edit service listings, submit proposals to buyers’ requests, and respond to enquiries',
  },
  {
    value: 'Finance',
    heading: 'Finance',
    description: 'View, extract, and manage procurment transactions, sales earnings information, and earnings payout',
  },
  {
    value: 'None',
    heading: 'None',
    description: '',
  },
];

const SetUserPermissionModalView = ({ position, employeeId }: componentPropType) => {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [inputPermissions, setInputPermissions] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loadingPermissions, setLoadingPermissions] = useState<boolean>(false);
  const [updateEmployeePermission] = useUpdateEmployeePermissionsMutation();
  const navigation = useNavigate();
  const { xs } = useMediaBreakpoint();

  useEffect(() => {
    setPermissions(position.map((value) => value.replace('PG:', '')));
    setInputPermissions(position.map((value) => value.replace('PG:', '')));
  }, [position]);

  const handleUpdatePermissions = () => {
    setLoadingPermissions(true);
    updateEmployeePermission({
      employeeId: employeeId,
      permissions: inputPermissions.includes('None') ? [] : inputPermissions.map((value) => `PG:${value}`),
    }).then((res) => {
      if (typeof res === 'object') {
        if ('error' in res) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const errMsg = (res as any)?.error?.data?.message as string;
          if (errMsg.includes('Unauthorized')) {
            AlertMessageBox(xs, '', errMsg);

            navigation('/login');
          } else {
            AlertMessageBox(xs, '', errMsg);
          }
          setLoadingPermissions(false);
        } else {
          if (!xs) {
            showAlertMessageMobile(`Role has been updated successfully.`, ToastTypes.SUCCESS, 'top-right', '100%');
          } else {
            showAlertMessageMobile(`Role has been updated successfully.`, ToastTypes.SUCCESS);
          }
          setLoadingPermissions(false);
          setModalOpen(false);
          setPermissions(inputPermissions.includes('None') ? [] : inputPermissions);
          setInputPermissions([]);
        }
      }
    });
  };

  return (
    <>
      <Button
        onClick={() => setModalOpen(true)}
        sx={{ textTransform: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <NameLabel sx={{ fontSize: '14px' }}>{isEmpty(permissions) ? 'None' : permissions.join(', ')}</NameLabel>
        <BiSolidPencil style={{ color: 'black', marginLeft: '5px', fontSize: '1.5em' }} />
      </Button>
      <Modal
        noBtnDisplay
        isOpen={modalOpen}
        content={
          <Box>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '2rem' }}>Permissions</h3>
            {permissionOptions.map((option) => (
              <Box key={option.value} sx={{ textTransform: 'none', display: 'flex', alignItems: 'flex-start', gap: '1.2em' }}>
                <input
                  style={{ marginTop: '5px' }}
                  type={'checkbox'}
                  onClick={() => {
                    if (inputPermissions.includes(option.value)) {
                      setInputPermissions((prevState) => prevState.filter((option1) => option1 !== option.value));
                    } else {
                      setInputPermissions((prevState) => [...prevState, option.value]);
                    }
                  }}
                  value={option.value}
                  disabled={inputPermissions.includes('None') && option.heading !== 'None'}
                  checked={inputPermissions.includes(option.value)}
                />
                <Box>
                  <p style={{ fontSize: '14px', fontWeight: 700, marginBottom: 0 }}>{option.heading}</p>
                  <p style={{ marginBottom: '1.5rem' }}>{option.description}</p>
                </Box>
              </Box>
            ))}
            <Box style={{ display: 'flex', gap: '1em', alignItems: 'flex-end' }}>
              <MuiButton
                type='button'
                heightSize='44px'
                widthSize={'30%'}
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
                  setModalOpen(false);
                }}
                value={'Cancel'}
              />
              <AppThemeBtnComponent
                disabled={loadingPermissions}
                text={loadingPermissions ? 'Please wait...' : 'Save'}
                onClick={handleUpdatePermissions}
                backgroundColor={Color.priBlue}
                customButtonStyle={{
                  border: 'none',
                  borderRadius: '2px',
                  height: '44px',
                  width: '30%',
                  '&:hover': {
                    color: Color.priBlue,
                    cursor: 'pointer',
                  },
                }}
              />
            </Box>
          </Box>
        }
        maxWidth={'md'}
        closeVariant={'outside'}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
};

export default SetUserPermissionModalView;
