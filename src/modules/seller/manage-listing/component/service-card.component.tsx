// @flow
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardMedia, Divider, Menu, MenuItem, Typography } from '@mui/material';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { useAppSelector } from '@/redux/hooks';
import { ProductInfoText } from '@/common/styles/common.styles';
import { isUndefined } from 'lodash';
import { mediaUrlGenerator, showToast, ToastTypes } from '../../../../common/utils';
import { useUpdateServicesMutation } from '@/redux/apis/marketplace';
import ActivateServiceErrorComponent from '@/modules/seller/manage-listing/component/activate-service-error.component';
import Modal from '@/common/components/modal.component';
import { DiscardMessage } from '@/modules/seller/manage-listing/component/quit-editing-modal.component';
import { IService } from '@/common/interface/service-interface.ts';

type ServiceCardType = {
  service: IService;
  setServiceStatus?: React.Dispatch<React.SetStateAction<'asc' | 'desc' | 'ascending' | 'descending'>>;
  serviceStatus?: string;
};

const ServiceCardComponent = ({ service }: ServiceCardType) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  // eslint-disable-next-line no-unused-vars
  const [updateServices, { error: serviceSetupError, isLoading }] = useUpdateServicesMutation();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const { selectedEntity } = useAppSelector((state) => state.mainState.useInfo);
  const status = useMemo(() => selectedEntity?.status, [selectedEntity?.status]);
  const [activateServiceError, setActivateServiceError] = useState<boolean>(false);
  const serviceImageUrl = useMemo(() => (service.medias?.[0] ? mediaUrlGenerator(service.medias?.[0]) : ''), [service.medias]);

  useEffect(() => {
    if (!isUndefined(serviceSetupError)) {
      const message = serviceSetupError as any;
      showToast(message.data.message, ToastTypes.ERROR);
    }
  }, [serviceSetupError]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const viewClick = () => {
    if (service.status === 'ACTIVE') {
      navigate(`/service-detail/${service.id}`, { state: { id: service.id } });
    } else {
      navigate(`/account/manage-listing/edit/${service.id}`);
    }
  };

  const activateClick = async () => {
    if (status !== 'VERIFIED') {
      setActivateServiceError(true);
    } else if (service.status === 'ACTIVE') {
      setErrorModal(true);
    } else {
      await deactivateBtnClick();
    }
  };

  const deactivateBtnClick = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('status', service.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE');
    const serviceInfo: any = await updateServices({ body: formData, serviceId: service.id });
    const { data: latestServiceInfo } = serviceInfo;
    setLoading(false);
    if (latestServiceInfo) {
      showToast('Service updated successfully!', ToastTypes.SUCCESS);
      setErrorModal(false);
    }
  };

  const editClick = () => {
    navigate(`/account/manage-listing/edit/${service.id}`);
  };

  if (service) {
    return (
      <>
        <ActivateServiceErrorComponent open={activateServiceError} onCloseHandle={() => setActivateServiceError(false)} />
        <Card
          sx={{
            zIndex: 0,
            width: { xs: '100%', md: '21em' },
            height: '25.5em',
            marginBlock: '1em',
            position: 'relative',
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          }}
        >
          <div style={{ cursor: 'pointer' }} onClick={viewClick}>
            <CardMedia component='img' height='190' image={serviceImageUrl} alt='service' sx={{ objectFit: 'cover' }} />
            <CardContent sx={{ paddingTop: '8px' }}>
              <ProductInfoText>{service.name}</ProductInfoText>
            </CardContent>
          </div>
          <Box
            sx={{
              borderTop: '1px solid #EFEEEE',
              position: 'absolute',
              bottom: '0',
              width: '100%',
              paddingBlock: '1em',
              paddingInline: '1em',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '70%' }}>
              <Typography sx={{ color: '#1D2130', fontSize: '10px' }}>From </Typography>
              <span style={{ fontSize: '16px', fontWeight: '600' }}>
                <span style={{ fontSize: '16px', marginLeft: '3px' }}>$SGD </span>
                {service.minPrice}
              </span>
            </Box>
            <Button
              onClick={handleClick}
              sx={{
                zIndex: 10,
                border: 'none',
                backgroundColor: 'transparent',
                color: open ? '#2752E7' : '#7E7E7E',
                '&:hover': {
                  color: '#2752E7',
                },
              }}
            >
              <HiOutlineDotsHorizontal fontSize={24} />
            </Button>
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  width: 'inherit',
                  borderRadius: 10,
                  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                },
              }}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem disabled={service.status === 'DISABLED'} onClick={viewClick} sx={{ width: '100%' }}>
                Preview
              </MenuItem>
              <Divider />
              <MenuItem onClick={editClick} sx={{ width: '100%' }}>
                Edit
              </MenuItem>
              <Divider />
              <MenuItem
                disabled={service.status === 'DISABLED' && Number(service.step) < 4}
                onClick={activateClick}
                sx={{ width: '100%' }}
              >
                {isLoading ? 'Loading...' : `${service.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}`}
              </MenuItem>
            </Menu>
          </Box>
        </Card>
        <Modal
          isOpen={errorModal}
          content={
            <DiscardMessage
              heading={'Deactivate this service?'}
              message={'This service will be removed from the marketplace and will no longer be available for new purchases.'}
            />
          }
          okBtnLabel={loading ? 'Loading...' : 'Deactivate'}
          isRedPriButton={true}
          isLoading={loading}
          onCancel={() => setErrorModal(false)}
          buttons={{ fontSize: '12px', width: { xs: '50%', md: '45%' } }}
          onOk={deactivateBtnClick}
        />
      </>
    );
  }

  return (
    <Card
      // onClick={() => navigate(`/service-detail/${service.id}`, { state: { id: service.id } })}
      sx={{ width: '18.7em', height: '22.8em', marginBlock: '1em', cursor: 'pointer' }}
    ></Card>
  );
};

export default ServiceCardComponent;
