import React, { useState } from 'react';
import { Color } from '@/theme';
import { Box, Button, Typography } from '@mui/material';
import { AppThemeSwitch } from '@/modules/seller/manage-listing/component/switch-btn.component';
import { BiSolidPencil } from 'react-icons/bi';
import { AppThemeBtnComponent } from '@/common/components/app-theme-btn.component';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { IPackage, IServicesData } from '@/common/interface/busines-company-profile-interface';
import { isUndefined } from 'lodash';
import { serviceSetupUpdated } from '@/redux/reducers/companySetupReducers';

type componentPropType = {
  price?: number;
  totalPrice: number;
  onChange: () => void;
  initialPayment: boolean;
  serviceInfo: IPackage;
};

const PackagePriceComponent = ({ price, totalPrice, initialPayment, onChange, serviceInfo }: componentPropType) => {
  const dispatch = useAppDispatch();
  const { serviceData } = useAppSelector((state) => state.mainState.companySetup);
  const [newPrice, setNewPrice] = useState<number>(price ?? 500);
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const onSubmitHandler = async () => {
    const plans: any[] = [];
    [1, 2, 3].map((packageNumber) => {
      const servicePackage: IPackage | undefined = serviceData[`package${packageNumber}` as keyof IServicesData] as IPackage;
      if (servicePackage) {
        const plan = {
          ...servicePackage,
          price: servicePackage.id === serviceInfo.id ? newPrice : servicePackage.price,
        };
        plans.push(plan);
      }
    });
    dispatch(
      serviceSetupUpdated({
        ...serviceData,
        package1: isUndefined(plans.find((value) => Number(value.no) === 1))
          ? undefined
          : plans.find((value) => Number(value.no) === 1),
        package2: isUndefined(plans.find((value) => Number(value.no) === 2))
          ? undefined
          : plans.find((value) => Number(value.no) === 2),
        package3: isUndefined(plans.find((value) => Number(value.no) === 3))
          ? undefined
          : plans.find((value) => Number(value.no) === 3),
      }),
    );
    setShowEdit(false);
  };

  return (
    <Box
      sx={{
        top: 0,
        right: 0,
        width: 'fit-content',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
      }}
    >
      <Box
        sx={{
          backgroundColor: Color.darkGrey,
          borderRadius: '10px',
          width: 'fit-content',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          padding: '1em 2em',
          fontsize: '14px',
          fontWeight: '500',
          gap: '1em',
        }}
      >
        {showEdit ? (
          <Box>
            <Typography sx={{ marginBottom: '5px' }}>Edit package price</Typography>
            <Box sx={{ display: 'flex', gap: '0.5em' }}>
              <Box
                sx={{
                  border: '1px solid #EAEAEA',
                  display: 'flex',
                  gap: '0.5em',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  padding: '5px',
                  borderRadius: '5px',
                  width: '7rem',
                }}
              >
                <Typography sx={{ fontSize: '11px', color: 'black' }}>$S</Typography>
                <input
                  type='number'
                  min='0'
                  value={newPrice}
                  style={{
                    border: 'none',
                    outline: 'none',
                    textAlign: 'right',
                    fontWeight: '800',
                    fontSize: '11px',
                    width: '100%',
                  }}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  onKeyDown={(e) => {
                    if (e.key === '.' || e.key === '-' || e.key === 'e') {
                      e.preventDefault();
                    }
                  }}
                  placeholder='0'
                />
              </Box>
              <AppThemeBtnComponent
                type={'button'}
                text={'Save'}
                onClick={onSubmitHandler}
                backgroundColor={Color.priBlue}
                customButtonStyle={{ border: 'none' }}
              />
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
            <Typography>Package price: S${newPrice}</Typography>
            <Button onClick={() => setShowEdit(true)} sx={{ minWidth: '0px' }}>
              <BiSolidPencil style={{ fontSize: '16px' }} />
            </Button>
          </Box>
        )}
        <Box sx={{ width: '1px', height: '3em', backgroundColor: Color.priWhite }} />
        <Box>
          <Typography sx={{ marginBottom: '5px' }}>Total price calculator</Typography>
          <Box
            sx={{
              border: '1px solid #EAEAEA',
              display: 'flex',
              gap: '0.5em',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: '5px',
              borderRadius: '5px',
            }}
          >
            <Typography sx={{ fontSize: '11px', color: 'black' }}>$S</Typography>
            <input
              type='number'
              min='0'
              value={totalPrice}
              style={{
                border: 'none',
                outline: 'none',
                textAlign: 'right',
                fontWeight: '800',
                fontSize: '11px',
                width: '10rem',
              }}
              onKeyDown={(e) => {
                if (e.key === '.' || e.key === '-' || e.key === 'e') {
                  e.preventDefault();
                }
              }}
              placeholder='0'
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: '0.5em', alignItems: 'center' }}>
        <AppThemeSwitch defaultChecked checked={initialPayment} onClick={onChange} />
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: '500',
            lineHeight: '1.71',
          }}
        >
          Payment on delivery
        </Typography>
      </Box>
    </Box>
  );
};

export default PackagePriceComponent;
