import React, { useState } from 'react';
import { IMenuItems } from '@/common/interface';
import { AlertMessageBox, ToastTypes } from '@/common/utils';
import { showAlertMessageMobile } from '@/common/components/mobile-alert-box/alert.component';
import DropDownMenu from '@/common/components/dropdown-menu-component';
import { useUpdateEmployeeRoleMutation } from '@/redux/apis/teamManagementApi';
import { useMediaBreakpoint } from '@/common/components';
import { useNavigate } from '@/router';
import Modal from '@/common/components/modal.component';
import { Box } from '@mui/material';
import { Color } from '@/theme';
import { AppThemeBtnComponent } from '@/common/components/app-theme-btn.component';
import MuiButton from '@/common/components/mui-button.component';

type componentPropType = {
  employeeId: string;
  onSuccessCallback: () => void;
  isDefaultSelected: number;
  roles: string[];
  ownerPermissions: IMenuItems[];
  email: string;
  name: string;
};

const OwnerTransferModalView = ({
  employeeId,
  onSuccessCallback,
  isDefaultSelected,
  roles,
  ownerPermissions,
  name,
  email,
}: componentPropType) => {
  const navigation = useNavigate();
  const [selectedItem, setSelectedItem] = useState<number>(isDefaultSelected);
  const [loadingRole, setLoadingRole] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [updateEmployeeRole] = useUpdateEmployeeRoleMutation();
  const { xs } = useMediaBreakpoint();

  const handleRoleTransfer = (role: string) => {
    setLoadingRole(true);
    updateEmployeeRole({ employeeId: employeeId, role: role }).then((res) => {
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
          setLoadingRole(false);
          setSelectedItem(selectedItem);
        } else {
          onSuccessCallback();
          if (!xs) {
            showAlertMessageMobile(`Role has been updated successfully.`, ToastTypes.SUCCESS, 'top-right', '100%');
          } else {
            showAlertMessageMobile(`Role has been updated successfully.`, ToastTypes.SUCCESS);
          }
          const selectedRoleOwner = role === 'Admin' ? 1 : role === 'Member' ? 2 : 0;
          const selectedRoleAdmin = role === 'Member' ? 1 : 0;
          setSelectedItem(roles.includes('Owner') ? selectedRoleOwner : selectedRoleAdmin);
          setLoadingRole(false);
        }
      }
    });
  };

  return (
    <>
      <DropDownMenu
        onMenuItemClick={(item: IMenuItems) => {
          if (item.value === 'Owner') {
            setModalOpen(true);
          } else {
            const selectedRoleOwner = item.value === 'Admin' ? 1 : item.value === 'Member' ? 2 : 0;
            const selectedRoleAdmin = item.value === 'Member' ? 1 : 0;
            setSelectedItem(roles.includes('Owner') ? selectedRoleOwner : selectedRoleAdmin);
            handleRoleTransfer(item.value);
          }
        }}
        defaultSelectedItem={selectedItem}
        menuItems={ownerPermissions}
        buttonOverrideStyle={{ padding: '0px 3px' }}
      />
      <Modal
        noBtnDisplay
        isOpen={modalOpen}
        content={
          <Box>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '2rem' }}>Transfer ownership to this person</h3>
            <p
              style={{
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: 0,
                textTransform: 'capitalize',
              }}
            >
              {name}
            </p>
            <p style={{ fontSize: '14px', marginBottom: '1rem', color: '#1D2130' }}>{email}</p>
            <p style={{ marginBottom: '2em' }}>
              You&apos;ll be the owner until we verify that this person is your organisation&apos;s legal representative.
            </p>
            <Box style={{ display: 'flex', gap: '1em' }}>
              <MuiButton
                type='button'
                heightSize='44px'
                widthSize={'50%'}
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
                  setSelectedItem(0);
                  setTimeout(() => setSelectedItem(selectedItem), 500);
                  setModalOpen(false);
                }}
                value={'Cancel'}
              />
              <AppThemeBtnComponent
                disabled={loadingRole}
                text={loadingRole ? 'Please wait...' : 'Transfer'}
                onClick={() => handleRoleTransfer('Owner')}
                backgroundColor={Color.priBlue}
                customButtonStyle={{
                  border: 'none',
                  borderRadius: '2px',
                  width: '50%',
                  '&:hover': {
                    color: Color.priBlue,
                    cursor: 'pointer',
                  },
                }}
              />
            </Box>
          </Box>
        }
        maxWidth={'sm'}
        closeVariant={'outside'}
        onCancel={() => {
          setModalOpen(false);
          setSelectedItem(0);
          setTimeout(() => setSelectedItem(selectedItem), 500);
        }}
      />
    </>
  );
};

export default OwnerTransferModalView;
