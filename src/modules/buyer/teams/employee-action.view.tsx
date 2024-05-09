/* eslint-disable no-unused-vars */
// @flow
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { Box, Divider, Menu, MenuItem } from '@mui/material';
import { GridCellParams } from '@mui/x-data-grid';
import { isUndefined } from 'lodash';
import { AlertMessageBox, ToastTypes } from '../../../common/utils';
import { useAppDispatch } from '../../../redux/hooks';
import { useDeleteFunctionalEmployeeMutation, useSendInvitationMutation } from '../../../redux/apis/teamManagementApi';
import usePayloadUseInfo from '../../../common/utils/hooks/usePayloadUseInfo';
import { useMediaBreakpoint } from '../../../common/components';
import { showAlertMessageMobile } from '../../../common/components/mobile-alert-box/alert.component';
import useSafeRender from '../../../common/utils/hooks/useSafeRender';
import { getCookie } from '../../../common/utils/cookie';
import { USER_GROUP_LOWERCASE } from '../../../common/interface';

type Props = {
  rows: GridCellParams;
  onUpdateInfo?: () => void;
};

export const EmployeeActionView = ({ rows, onUpdateInfo }: Props) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [deleteFunctionalEmployee, { error, isSuccess }] = useDeleteFunctionalEmployeeMutation();

  const [activeRole, setActiveRole] = useState<boolean>(false);
  const [roles, setRole] = useState<string[]>([]);
  const navigate = useNavigate();

  const { user } = usePayloadUseInfo();

  const { xs } = useMediaBreakpoint();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  // useEffect(() => {
  //   if (!isUndefined(error)) {
  //     const message = error as any;
  //     setIsSubmitting(false);
  //     showToast(message.data.error.message, ToastTypes.ERROR);
  //   } else if (isSuccess) {
  //     setIsSubmitting(false);
  //     onUpdateInfo && onUpdateInfo();
  //     showToast('Employee list updated successfully!', ToastTypes.SUCCESS);
  //   }
  // }, [error, isSuccess]);

  useSafeRender(() => {
    if (user && !activeRole) {
      const role: React.SetStateAction<string[]> = [];

      user.roles
        .filter((value: { entityId: string }) => value.entityId === rows.row.entityId)
        .map((getRole: { role: string }) => {
          role.push(getRole.role);
        });

      setRole(role);
      setActiveRole(true);
    }
  });

  const handleRemove = async () => {
    setIsSubmitting(true);

    await deleteFunctionalEmployee(rows.row.id).then((res) => {
      if (typeof res === 'object') {
        if ('error' in res) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const errMsg = (res as any)?.error?.data?.message as string;
          if (errMsg.includes('Unauthorized')) {
            AlertMessageBox(xs, errMsg);

            navigate('/login');
          } else {
            AlertMessageBox(xs, '', errMsg);
          }
        } else {
          if (!xs) {
            showAlertMessageMobile(`${rows.row.email} has been removed from your team.`, ToastTypes.SUCCESS, 'top-right', '100%');
          } else {
            showAlertMessageMobile(`${rows.row.email} has been removed from your team.`, ToastTypes.SUCCESS);
          }

          setIsSubmitting(false);
          setAnchorEl(null);
        }
      }
    });
  };

  const [sendInvitation] = useSendInvitationMutation();

  const onResendInvitation = async () => {
    await sendInvitation({
      invitation: {
        email: rows.row.email,
        entityId: rows.row.entityId,
        clientType:
          getCookie('x-client-type') === USER_GROUP_LOWERCASE.seller ? USER_GROUP_LOWERCASE.seller : USER_GROUP_LOWERCASE.buyer,
        role: rows.row.role,
      },
    }).then(async (res: unknown) => {
      if (typeof res === 'object' && res !== null) {
        if ('error' in res) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const errMsg = (res as any)?.error?.data?.message as string;
          if (errMsg.includes('Unauthorized')) {
            AlertMessageBox(xs, '', errMsg);

            navigate('/login');
          } else {
            AlertMessageBox(xs, '', errMsg);
          }
        }
        AlertMessageBox(xs, 'Invitation was sent successfully');
        setIsSubmitting(false);
        setAnchorEl(null);
      }
    });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
      <button
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          padding: 0,
          margin: 0,
          justifyContent: 'center',
          border: 'none',
        }}
        onClick={handleClick}
      >
        {/* {roles.includes('Member') === true &&
          !roles.includes('Owner') === true &&
          rows.row.email === user.email &&
          (rows.row.role !== 'Owner' || rows.row.role !== 'Admin') && <HiOutlineDotsHorizontal />} */}

        {roles.includes('Admin') &&
          (rows.row.role === 'Member' ||
            (rows.row.status === 'Pending' && rows.row.role.includes('Owner') === true) ||
            (rows.row.email === user?.email && rows.row.role === 'Admin')) && <HiOutlineDotsHorizontal />}

        {roles.includes('Owner') &&
          (rows.row.role === 'Member' ||
            rows.row.role === 'Admin' ||
            (rows.row.status === 'Pending' && rows.row.role.includes('Owner') === true)) && <HiOutlineDotsHorizontal />}

        {/* {(rows.row.role.includes('Member') === true ||
          rows.row.role.includes('Admin') === true ||
          (rows.row.status === 'Pending' && rows.row.role.includes('Owner') === true)) && <HiOutlineDotsHorizontal />} */}
      </button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          style: {
            width: 160,
            borderRadius: 10,
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
          },
        }}
      >
        <MenuItem onClick={onResendInvitation} disabled={rows.row.status !== 'Pending' || rows.row.email === user?.email}>
          Resend
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleRemove}>{isSubmitting ? 'Please wait..' : 'Remove'}</MenuItem>
      </Menu>
    </Box>
  );
};
