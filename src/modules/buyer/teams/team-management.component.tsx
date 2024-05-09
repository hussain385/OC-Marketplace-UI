/* eslint-disable no-unused-vars */
import { Avatar, Box, Button, Grid, LinearProgress, styled, Typography } from '@mui/material';

import { DataGrid, GridCellParams, GridColDef, GridRowId, GridSelectionModel } from '@mui/x-data-grid';

import { isEmpty, isNull, isUndefined, startCase } from 'lodash';

import React, { useEffect, useMemo, useState } from 'react';

import DropDownMenu from '@/common/components/dropdown-menu-component/index';

import MainLayout from '@/common/layout/main.layout';

import { Color, gridStyles } from '@/theme';

import { AlertMessageBox, ToastTypes } from '@/common/utils';

import { RenderIf, useMediaBreakpoint } from '@/common/components';

import { IMenuItems, IQueryGlobal } from '@/common/interface';

import { AvatarLabel, BoxContainer, EmailLabel, NameLabel, PrimaryButton, StatusBadge } from '@/common/styles';

import useTitle from '@/common/utils/hooks/useTitle';

import {
  useDeleteFunctionalEmployeeMutation,
  useGetFunctionalEmployeeQuery,
  useGetRolesFiltersQuery,
  useLazyGetFunctionalEmployeeQuery,
} from '@/redux/apis/teamManagementApi';

import { EmployeeActionView } from './employee-action.view';

import RemoveInfoBar from './remove-bar.view';

import RemoveModal from './remove-modal.view';

import { EntityLabel, EntityName, SortableContainer } from './team-management.style';

import EmptyUI from '@/common/components/empty-ui.component';

import { useGetUserMEQuery } from '@/redux/apis/accountApi';

import { useGetEntityInfoQuery } from '@/redux/apis/marketplace';

import usePayloadUseInfo from '@/common/utils/hooks/usePayloadUseInfo';

import { useNavigate } from 'react-router-dom';

import useSafeRender from '@/common/utils/hooks/useSafeRender';

import { showAlertMessageMobile } from '@/common/components/mobile-alert-box/alert.component';

import CircularLoading from '@/common/components/circular-loading';

import { getFilterOptions } from './team-management.service';

import { getCookie } from '@/common/utils/cookie';

import { FooterComp } from '../../seller/common/footer-comp';

import useQueryParams from '@/common/utils/hooks/useQueryParams';

import useScroll from '@/common/utils/hooks/useScroll';

import InviteMemberModal from '@/modules/entities/components/InviteMember.modal';

import SetUserPermissionModalView from '@/modules/buyer/teams/set-user-permission-modal.view';

import OwnerTransferModalView from '@/modules/buyer/teams/owner-transfer-modal.view';

type IRows = {
  createdAt: string;
  email: string;
  entityId: string;
  expiredTime: string | null;
  id: string;
  role: string;
  status: string;
};

const DataGridCustomStyles = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-columnHeaders': { backgroundColor: 'transparent !important' },
}));

export const generateNameAvatar = (name: string, status = 'Accepted'): React.ReactNode => {
  //extra first alphabets from the name
  const style =
    status === 'Pending'
      ? {
          bgcolor: Color.bgGreyLight,
          color: Color.priBlue,
        }
      : {
          bgcolor: Color.priBlue,
        };
  return (
    <Avatar sx={style}>
      <AvatarLabel>{isEmpty(name) ? 'N/A' : startCase(name[0])}</AvatarLabel>
    </Avatar>
  );
};

function TeamManagementResult() {
  const [queryParams] = useQueryParams();
  const navigation = useNavigate();
  const { data: getListInvitationRequest }: any = useGetFunctionalEmployeeQuery({}, { refetchOnMountOrArgChange: true });
  const [staffSelectionModel, setStaffSelectionModel] = useState<GridSelectionModel>([]);
  const [openRemoveBar, setOpenRemoveBar] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openInviteModal, setOpenInviteModal] = useState<boolean>(false);
  const [deleteFunctionalEmployee] = useDeleteFunctionalEmployeeMutation();
  const [rows, setRows] = useState<IRows[]>([]);
  const [roles, setRole] = useState<string[]>([]);
  const [notfound, setNotFound] = useState<boolean>(false);
  const { selectedEntity, user } = usePayloadUseInfo();
  const [rolesFilters, setRolesFilters] = useState<IMenuItems[]>([]);
  const { data: roleFiltersList } = useGetRolesFiltersQuery(
    {
      xClientType: isNull(getCookie('x-client-type')) ? 'buyer' : `${getCookie('x-client-type')}`,
      xClientId: selectedEntity ? selectedEntity.uid : '',
    },
    { refetchOnMountOrArgChange: true },
  );
  const [getFunctionalEmployee] = useLazyGetFunctionalEmployeeQuery();

  useSafeRender(() => {
    if (user) {
      const role: React.SetStateAction<string[]> = [];

      user.roles
        .filter((value: { entityId: string }) => value.entityId === (selectedEntity as any).uid)
        .map((getRole: { role: string }) => {
          role.push(getRole.role);
        });

      setRole(role);
    }
  });

  useEffect(() => {
    if (!isUndefined(roleFiltersList)) {
      setRolesFilters([
        {
          name: 'All',
          value: 'all',
        },
        ...roleFiltersList.map((roles: any) => ({ name: roles.position, value: roles.position })),
      ]);
    }
  }, [roleFiltersList]);

  useTitle('OPNCORP | TEAM MANAGEMENT');

  useScroll({ useEffectDep: [] });

  const permissionFilters: IMenuItems[] = [
    {
      name: 'All',
      value: 'all',
    },
    {
      name: 'Owner',
      value: 'Owner',
    },
    {
      name: 'Admin',
      value: 'Admin',
    },
    {
      name: 'Member',
      value: 'Member',
    },
  ];

  const ownerPermissions: IMenuItems[] = useMemo(
    () => permissionFilters.filter((permission) => permission.name !== 'All'),
    [permissionFilters],
  );
  const adminPermissions: IMenuItems[] = useMemo(
    () => ownerPermissions.filter((permission) => permission.name !== 'Owner'),
    [ownerPermissions],
  );

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 570,
      headerClassName: 'super-app-theme--header',
      renderCell: (params: GridCellParams) => _nameFieldRenderer(params),
    },
    {
      field: 'position',
      headerName: 'Team management',
      headerClassName: 'super-app-theme--header',
      width: 253,

      renderCell: (params: GridCellParams) => _permissionDropdownColRenderer(params),
    },
    {
      field: 'role',
      headerName: 'Permission',
      headerClassName: 'super-app-theme--header',
      width: 253,
      renderCell: (params: GridCellParams) => _roleDropdownColRenderer(params),
    },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      renderCell: (params: GridCellParams) => _optionsDropdownColRenderer(params),
    },
  ];

  /**
   * render name field method
   * @param params GridCellParams
   * @returns ReactNode
   */

  const _nameFieldRenderer = (params: GridCellParams): React.ReactNode => {
    return (
      <Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
        <Box>{generateNameAvatar(params.row.email, params.row.status)}</Box>
        <Box sx={{ paddingX: '16px' }}>
          {params.row.email === user?.email ? (
            <NameLabel>
              {user && startCase(user.name)}
              <span style={{ color: Color.textHint }}>(You)</span>
            </NameLabel>
          ) : (
            !isNull(params.row.name) && <NameLabel>{startCase(params.row.name)}</NameLabel>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <EmailLabel variant='subtitle2'>{params.row.email}</EmailLabel>
            <RenderIf value={params.row.status === 'Pending'}>
              <StatusBadge className='Pending'>Pending</StatusBadge>
            </RenderIf>
          </Box>
        </Box>
      </Box>
    );
  };

  const _optionsDropdownColRenderer = (params: GridCellParams): React.ReactNode => {
    if (params.row.email !== user?.email) {
      return <EmployeeActionView rows={params} />;
    } else {
      return <div />;
    }
  };

  const _roleDropdownColRenderer = (params: GridCellParams): React.ReactNode => {
    return params.row.status === 'Accepted' &&
      !roles.includes('Member') &&
      params.row.email !== user?.email &&
      params.row.role !== 'Owner' ? (
      <SetUserPermissionModalView position={params.row.metadata.permissions} employeeId={`${params.row.id}`} />
    ) : (
      <NameLabel
        sx={{
          fontSize: '14px',
          textTransform: 'capitalize',
          marginLeft: '8px',
          color: params.row.status === 'Accepted' ? 'initial' : '#848484',
        }}
      >
        {isEmpty(params.row.metadata.permissions)
          ? 'None'
          : params.row.metadata.permissions.map((value: string) => value.replace('PG:', '')).join(', ')}
      </NameLabel>
    );
  };

  const _permissionDropdownColRenderer = (params: GridCellParams): React.ReactNode => {
    const isDefaultSelectedRoleOwner = params.row.role === 'Admin' ? 1 : params.row.role === 'Member' ? 2 : 0;
    const isDefaultSelectedRoleAdmin = params.row.role === 'Member' ? 1 : 0;

    return params.row.status === 'Accepted' &&
      !roles.includes('Member') &&
      params.row.email !== user?.email &&
      params.row.role !== 'Owner' ? (
      <OwnerTransferModalView
        employeeId={`${params.row.id}`}
        onSuccessCallback={() => {
          setOpenModal(false);
          setStaffSelectionModel([]);
        }}
        isDefaultSelected={roles.includes('Owner') ? isDefaultSelectedRoleOwner : isDefaultSelectedRoleAdmin}
        roles={roles}
        ownerPermissions={roles.includes('Owner') ? ownerPermissions : adminPermissions}
        email={`${params.row.email}`}
        name={`${params.row.name}`}
      />
    ) : (
      <NameLabel
        sx={{
          fontSize: '14px',
          textTransform: 'capitalize',
          marginLeft: '8px',
          color: params.row.status === 'Accepted' ? 'initial' : '#848484',
        }}
      >
        {params.row.role}
      </NameLabel>
    );
  };

  const _onRemoveInfoBarHandle = () => {
    setOpenModal(true);
    setOpenRemoveBar(false);
  };

  const _onInviteStaffClick = () => {
    setOpenInviteModal(true);
  };

  const _onModalOkHandle = () => {
    staffSelectionModel.forEach((value) => {
      const getId: GridRowId = value;

      deleteFunctionalEmployee(getId as string).then((res: any) => {
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
          } else {
            setOpenModal(false);
            setStaffSelectionModel([]);
            if (!xs) {
              showAlertMessageMobile(`${value} has been removed from your team.`, ToastTypes.SUCCESS, 'top-right', '100%');
            } else {
              showAlertMessageMobile(`${value} has been removed from your team.`, ToastTypes.SUCCESS);
            }
          }
        }
      });
    });
  };

  const permissionFilter = (item: IMenuItems, label?: string) => {
    const filterQuery: IQueryGlobal = getFilterOptions(queryParams, item, label);

    if (isEmpty(filterQuery.filter)) {
      setRows(getListInvitationRequest?.data);
      setNotFound(false);
    } else {
      getFunctionalEmployee({ params: filterQuery }).then((res: any) => {
        if ('data' in res) {
          if (!isEmpty(res.data.data)) {
            setRows(res.data.data);
            setNotFound(false);
          } else {
            setRows([]);
            setNotFound(true);
          }
        }
      });
    }
  };

  const { xs, sm, mdLg } = useMediaBreakpoint();

  const CustomNoRowsOverlay = () => {
    return <EmptyUI text='No Employees' />;
  };

  const _modalContent = (): string | React.ReactNode => {
    return `${staffSelectionModel.length} employee(s) will no longer have access to your organisation. Are you sure you want to remove?`;
  };

  const resultData = !isEmpty(rows) ? rows : notfound === true ? [] : getListInvitationRequest?.data;

  return (
    <MainLayout
      pageTitle='Team management'
      handlerInviteMember={() => _onInviteStaffClick()}
      customStyleContainer={{ display: 'flex', justifyContent: 'space-between' }}
      teamManagement={true}
      breadcrumb={[{ label: 'Dashboard', path: '/account' }, { label: 'Team management' }]}
      roles={roles}
    >
      <BoxContainer>
        <Box>
          <Grid container direction='row' spacing={2} justifyContent='space-between'>
            <Grid item>
              <Grid container>
                <Grid sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row', md: 'row' } }}>
                  <EntityLabel
                    sx={{
                      fontSize: { xs: '14px', sm: '12px', md: '12px' },
                      padding: { xs: '0 16px', sm: '0', md: '0' },
                    }}
                  >
                    Entity name:
                  </EntityLabel>
                  <EntityName
                    sx={{
                      fontSize: {
                        xs: '14px',
                        sm: '12px',
                        md: '12px',
                      },
                      fontWeight: { xs: '600', sm: '700', md: '700' },
                      marginTop: { xs: '4px', sm: '0', md: '0' },
                    }}
                  >
                    {selectedEntity?.profile?.type ? (
                      selectedEntity?.profile?.detail?.name
                    ) : (
                      <Button onClick={() => navigation('/setup-organisation')} sx={{ color: Color.priBlue, fontWeight: '700' }}>
                        Verify your company
                      </Button>
                    )}
                    {selectedEntity?.profile?.type && (
                      <>
                        {selectedEntity?.status !== 'VERIFIED' ? (
                          <Box className='pending-status'>
                            <Typography
                              sx={{
                                fontSize: '12px',
                                fontWeight: '600',
                                fontStretch: 'normal',
                                fontStyle: 'normal',
                                lineHeight: '1.33',
                                letterSpacing: '-0.5px',
                                textAlign: 'center',
                                color: '#ff6a68',
                              }}
                            >
                              Pending verification
                            </Typography>
                          </Box>
                        ) : (
                          <img
                            alt='verified'
                            style={{ marginLeft: '1vw' }}
                            src={require('../../../assets/icons/verified.svg').default}
                          />
                        )}
                      </>
                    )}
                  </EntityName>
                </Grid>
              </Grid>
            </Grid>

            <RenderIf value={sm || (mdLg && (roles.includes('Owner') === true || roles.includes('Admin') === true))}>
              <Grid item>
                <PrimaryButton className='small' onClick={() => _onInviteStaffClick()}>
                  Invite member
                </PrimaryButton>
              </Grid>
            </RenderIf>
          </Grid>
        </Box>
        <SortableContainer sx={{ borderBottom: !isEmpty(rolesFilters) ? `1px solid ${Color.bgLine}` : 'none' }}>
          {!isEmpty(rolesFilters) && (
            <>
              <DropDownMenu onMenuItemClick={permissionFilter} label='Position' menuItems={rolesFilters} />
              <DropDownMenu onMenuItemClick={permissionFilter} label='Permission' menuItems={permissionFilters} />
            </>
          )}
        </SortableContainer>

        <div style={{ display: 'flex', height: isEmpty(resultData) ? 400 : '100%' }}>
          <DataGridCustomStyles
            autoHeight={!isEmpty(resultData)}
            rows={resultData}
            components={{
              LoadingOverlay: LinearProgress,
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            columns={columns}
            disableColumnFilter
            disableColumnMenu
            disableSelectionOnClick
            checkboxSelection
            sx={gridStyles}
            isRowSelectable={(params) => {
              const roles: string[] = [];
              user?.roles
                .filter((value: { entityId: string }) => value.entityId === params.row.entityId)
                .map((getRole: { role: string }) => {
                  roles.push(getRole.role);
                });

              if (
                roles.includes('Owner') &&
                (params.row.role === 'Member' ||
                  params.row.role === 'Admin' ||
                  (params.row.status === 'Pending' && params.row.role.includes('Owner') === true))
              ) {
                return true;
              }

              return (
                roles.includes('Admin') &&
                (params.row.role === 'Member' ||
                  (params.row.status === 'Pending' && params.row.role.includes('Owner') === true) ||
                  (params.row.email !== user?.email && params.row.role === 'Admin'))
              );
            }}
            onSelectionModelChange={(model) => {
              setStaffSelectionModel(model);
              if (model.length == 0) {
                setOpenRemoveBar(false);
              } else {
                setOpenRemoveBar(true);
              }
            }}
            selectionModel={staffSelectionModel}
          />
        </div>
      </BoxContainer>
      <RemoveInfoBar
        content={`${staffSelectionModel.length} staffs selected`}
        isOpen={openRemoveBar}
        isRemoveButton={true}
        onClose={() => {
          setOpenRemoveBar(false);
          setStaffSelectionModel([]);
        }}
        onRemove={() => _onRemoveInfoBarHandle()}
      />
      <RemoveModal
        isOpen={openModal}
        content={_modalContent()}
        onClose={() => {
          setOpenModal(false);
          setStaffSelectionModel([]);
        }}
        onOk={() => _onModalOkHandle()}
      />

      <InviteMemberModal
        isOpen={openInviteModal}
        onClose={() => {
          setOpenInviteModal(false);
        }}
        uid={selectedEntity?.uid ?? ''}
      />
      <Box sx={{ position: 'absolute', bottom: '0em', width: '100%' }}>
        <FooterComp />
      </Box>
    </MainLayout>
  );
}

const TeamManagement = () => {
  const { selectedEntity: selectedEntityValue } = usePayloadUseInfo();

  const { data: profileInfo }: any = useGetUserMEQuery();

  const roleId = !isUndefined(profileInfo?.roles[0]?.entityId) ? profileInfo?.roles[0]?.entityId : selectedEntityValue?.uid;

  const { isLoading: IsFunctionalEmpLoading, isError: IsFunctionEmpError }: any = useGetFunctionalEmployeeQuery(
    {},
    { refetchOnMountOrArgChange: true },
  );

  const {
    data: getEntity,
    isLoading,
    isError: isEntityError,
  } = useGetEntityInfoQuery(
    { entityId: roleId as string },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  if (isLoading || IsFunctionalEmpLoading) {
    return (
      <MainLayout
        pageTitle='Team management'
        breadcrumb={[{ label: 'Dashboard', path: '/account' }, { label: 'Team management' }]}
      >
        <CircularLoading />
        <Box sx={{ position: 'absolute', bottom: '0em', width: '100%' }}>
          <FooterComp />
        </Box>
      </MainLayout>
    );
  }

  if ((IsFunctionEmpError && isNull(getEntity?.data?.profile?.type)) || isUndefined(roleId) || isEntityError) {
    return (
      <MainLayout
        pageTitle='Team management'
        breadcrumb={[{ label: 'Dashboard', path: '/account' }, { label: 'Team management' }]}
      >
        <BoxContainer sx={{ height: '50vh' }}>
          <EmptyUI text='Company not found' />
        </BoxContainer>
        <Box sx={{ position: 'absolute', bottom: '0em', width: '100%' }}>
          <FooterComp />
        </Box>
      </MainLayout>
    );
  } else {
    return <TeamManagementResult />;
  }
};

export default TeamManagement;
