import React, { useEffect, useMemo, useState } from 'react';
import { WrapperMain } from '@/common/styles/navbar.styles';
import { Color } from '@/theme';
import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import MilestoneContainerView from '@/modules/seller/manage-listing/manage-listing-form/milestone-container.view';
import { ReactSortable } from 'react-sortablejs';
import { FiPlus } from 'react-icons/fi';
import { AppThemeBtnComponent } from '@/common/components/app-theme-btn.component';
import { useAppSelector } from '@/redux/hooks';
import useGetServiceInfo from '@/modules/seller/hooks/useGetServiceInfo';
import QuitEditingModalComponent from '@/modules/seller/manage-listing/component/quit-editing-modal.component';
import { IMilestoneState, IPackage, IServicesData } from '@/common/interface/busines-company-profile-interface';
import PackagePriceComponent from '@/modules/seller/manage-listing/component/package-price.component';
import InitialPaymentInput from '@/modules/seller/manage-listing/component/initial-payment.input';
import { useAddMileStoneBulkMutation, useUpdateServicesMutation } from '@/redux/apis/marketplace';
import { isEmpty, isNil, isUndefined } from 'lodash';
import { showToast, ToastTypes } from '@/common/utils';
import { useNavigate } from 'react-router-dom';
import Loader from '@/common/components/loader.component';
import useScroll from '@/common/utils/hooks/useScroll.tsx';

type Props = {
  updateStepCount: (value: number) => void;
  step: number;
};

const PaymentView = ({ step, updateStepCount }: Props) => {
  const navigate = useNavigate();
  const [stepCount, setStepCountValue] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [initialPayment, setInitialPayment] = useState<{ show: boolean; price: number; id?: string }>({ show: false, price: 0 });
  const [addMilestoneBulk, { error: serviceSetupError, isLoading }] = useAddMileStoneBulkMutation();
  const [updateServices, { error: serviceUpdateError, isLoading: serviceUpdateLoading }] = useUpdateServicesMutation();
  const [isMileStonePresent, setIsMileStonePresent] = useState<boolean>(true);
  const [milestoneArray, setMilestoneArray] = useState<IMilestoneState[]>([
    { price: 0, deliverable: '', inverted: false, id: 0, duration: '', isEscrow: false },
  ]);
  const { serviceData } = useAppSelector((state) => state.mainState.companySetup);
  const [newQuery, setNewQuery] = useState<boolean>(false);
  const totalPrice = useMemo(() => {
    const initialValue = 0;
    return milestoneArray.reduce((oldValue, currentValue) => oldValue + currentValue.price, initialValue) + initialPayment.price;
  }, [milestoneArray, initialPayment]);
  useScroll({ useEffectDep: [stepCount] });

  const isEdit = useMemo(
    () => serviceData.edit && serviceData.step > 3,
    [serviceData.edit, serviceData.status, serviceData.step],
  );

  const packageData = useMemo(() => {
    const packageInfo: IPackage[] = [];
    [1, 2, 3].map((number) => {
      if (
        serviceData &&
        (serviceData[`package${number}` as keyof IServicesData] as IPackage) &&
        (serviceData[`package${number}` as keyof IServicesData] as IPackage)?.paymentType === 'MILESTONE' &&
        (serviceData[`package${number}` as keyof IServicesData] as IPackage)?.status
      ) {
        packageInfo.push(serviceData[`package${number}` as keyof IServicesData] as IPackage);
      }
    });
    return packageInfo;
  }, [serviceData]);

  useGetServiceInfo({ newQuery });

  useEffect(() => {
    setMilestoneArray([]);
    setInitialPayment({ show: false, price: 0 });
    setIsMileStonePresent(false);
    {
      packageData.map((value, key) => {
        if (key === stepCount) {
          if (value.milestones) {
            setIsMileStonePresent(!isEmpty(value.milestones));
            setMilestoneArray(
              value.milestones
                .map((value, index) => {
                  if (value.initialDepositId) {
                    setInitialPayment({
                      price: value.initialDepositPrice ?? 0,
                      show: value.inverted,
                      id: value.initialDepositId,
                    });
                  }
                  return { ...value, id: index };
                })
                .filter((value) => !value.initialDepositId),
            );
          }
        }
      });
    }
    setMilestoneArray((prevState) =>
      isEmpty(prevState) ? [{ price: 0, deliverable: '', inverted: false, id: 0, duration: '', isEscrow: false }] : prevState,
    );
  }, [packageData, stepCount]);

  useEffect(() => {
    if (!isUndefined(serviceSetupError)) {
      const message = serviceSetupError as any;
      showToast(message.data.message, ToastTypes.ERROR);
    }
    if (!isUndefined(serviceUpdateError)) {
      const message = serviceUpdateError as any;
      showToast(message.data.message, ToastTypes.ERROR);
    }
  }, [serviceSetupError, serviceUpdateError]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => setStepCountValue(newValue);

  const handleNextStep = async (packageId: string, price: number, quitModalSubmit?: boolean) => {
    const bulkMileStone = milestoneArray.map((value, key) => ({
      id: value.uid,
      no: key + 1, // Milestone 1
      items: [
        {
          no: 1,
          type: 'PAYMENT',
          price: value.price,
          isEscrow: value.isEscrow,
        },
        {
          no: 2,
          type: 'DELIVERABLE', // Deliverable 1
          deliverableText: value.deliverable,
          deliveryDays: value.duration,
        },
      ],
    }));
    if (initialPayment.show) {
      bulkMileStone.unshift({
        id: initialPayment.id,
        no: 0, // "no" == 0 => Special case "Initial Deposit"
        items: [
          {
            no: 1,
            type: 'INITIAL_DEPOSIT',
            price: initialPayment.price,
            isEscrow: true,
          },
        ],
      });
    }
    const addData = {
      packageId: packageId,
      price: price,
      bulk: bulkMileStone,
    };
    await addMilestoneBulk({ data: addData }).unwrap();
    if (packageData.length === stepCount + 1) {
      const formData = new FormData();
      formData.append('step', serviceData.step > 2 ? `${serviceData.step}` : '3');
      await updateServices({ body: formData, serviceId: serviceData.uid }).unwrap();
      updateStepCount(step + 1);
      setNewQuery(!newQuery);
      if (quitModalSubmit) {
        navigate('/account/manage-listing');
      }
      setMilestoneArray([{ price: 0, deliverable: '', inverted: false, id: 0, duration: '', isEscrow: false }]);
    } else {
      if (quitModalSubmit) {
        navigate('/account/manage-listing');
      }
      setStepCountValue(stepCount + 1);
      setNewQuery(!newQuery);
      setMilestoneArray([{ price: 0, deliverable: '', inverted: false, id: 0, duration: '', isEscrow: false }]);
    }
  };

  return (
    <WrapperMain>
      <Typography
        sx={(theme) => ({
          fontSize: '24px',
          fontWeight: 'bold',
          lineHeight: 'normal',
          letterSpacing: '-0.48px',
          color: Color.textBlack,
          marginTop: '2em',
          [theme.breakpoints.down(321)]: {
            fontSize: '21px',
          },
        })}
      >
        {packageData.map((value, key) => {
          if (key === stepCount) {
            return `Payment - ${value.name}`;
          }
        })}
      </Typography>
      {isMileStonePresent && (
        <Tabs
          TabIndicatorProps={{ style: { background: '#c4c4c4', color: '#c4c4c4' } }}
          textColor='secondary'
          indicatorColor='secondary'
          value={stepCount}
          onChange={handleChange}
          aria-label='basic tabs example'
          sx={{
            textTransform: 'none',
            '& .MuiTabs-indicator': {
              backgroundColor: `${Color.priBlue} !important`,
            },
            '& .Mui-selected': {
              color: `${Color.priBlue} !important`,
              textTransform: 'none',
            },
            '& .MuiButtonBase-root': {
              textTransform: 'none',
              fontSize: { xs: '13px', md: '14px' },
              fontWeight: '700',
            },
            '& .MuiTabs-scroller': {
              overflow: 'auto !important',
            },
          }}
        >
          {packageData.map((value, key) => (
            <Tab value={key} label={value.name} key={key} />
          ))}
        </Tabs>
      )}
      {packageData.map((value, key) => {
        if (key === stepCount) {
          return (
            <div key={key} style={{ width: '100%', position: 'relative' }}>
              <InitialPaymentInput
                initialDeposit={initialPayment.price}
                showInitialDeposit={initialPayment.show}
                setInitialDeposit={(value) => setInitialPayment((prevState) => ({ ...prevState, price: value }))}
              />
              <ReactSortable list={milestoneArray} group='cards' animation={150} setList={setMilestoneArray}>
                {milestoneArray.map((milestoneValue, key) => (
                  <MilestoneContainerView
                    index={key}
                    milestoneArray={milestoneArray}
                    initialPayment={initialPayment.show}
                    key={key}
                    milestone={milestoneValue}
                    disabled={false}
                    setMilestoneArray={setMilestoneArray}
                    error={totalPrice > Number(value.price ?? 500)}
                  />
                ))}
              </ReactSortable>
              <Box
                sx={{
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'center',
                  display: 'flex',
                  height: '15em',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ width: '2.22px', height: '100%', backgroundColor: Color.darkGrey }} />
                <Button
                  onClick={() =>
                    setMilestoneArray((prevState) => [
                      ...prevState,
                      { price: 0, deliverable: '', inverted: false, id: milestoneArray.length, duration: '', isEscrow: false },
                    ])
                  }
                  sx={{
                    backgroundColor: '#2752E7',
                    height: 'fit-content',
                    minWidth: 'fit-content',
                    padding: '5.778px',
                    '&:hover': {
                      backgroundColor: '#2752E7',
                    },
                  }}
                >
                  <FiPlus style={{ color: '#fff', fontSize: '15px' }} />
                </Button>
                <Box sx={{ width: '2.22px', height: '100%', backgroundColor: Color.darkGrey }} />
                <Box
                  sx={{
                    backgroundColor: Color.darkGrey,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 'fit-content',
                    padding: '17.769px 35.538px',
                  }}
                >
                  <p style={{ fontSize: '17px', color: '#fff', fontWeight: '800', marginBottom: 0 }}>End</p>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  width: '100%',
                  gap: '1em',
                  justifyContent: 'center',
                  marginBlock: '5em',
                  marginBottom: '0px',
                }}
              >
                {isEdit ? (
                  <AppThemeBtnComponent
                    type='button'
                    onClick={() => navigate(`/service-detail/${serviceData.uid}`, { state: { id: serviceData.uid } })}
                    customButtonStyle={{ height: '40px', border: `1px solid ${Color.positive}` }}
                    color={Color.positive}
                    backgroundColor={'white'}
                    width={{ xs: '100%', md: '30%' }}
                    fontSize={'14px'}
                    text={'Preview'}
                    hover={'#ffffff'}
                  />
                ) : (
                  <AppThemeBtnComponent
                    type='button'
                    onClick={() => setOpenModal(true)}
                    customButtonStyle={{
                      height: '40px',
                      border: `1px solid ${Color.bgGreyDark}`,
                      display: 'block',
                    }}
                    color={Color.bgGreyDark}
                    backgroundColor={'white'}
                    width={{ xs: '100%', md: '30%' }}
                    fontSize={'14px'}
                    text={'Cancel'}
                    hover={'#ffffff'}
                  />
                )}
                <AppThemeBtnComponent
                  disabled={
                    totalPrice !== Number(value.price ?? 500) ||
                    !isUndefined(
                      milestoneArray.find(
                        (milestoneArray) => isEmpty(milestoneArray.deliverable) || isEmpty(`${milestoneArray.duration}`),
                      ),
                    ) ||
                    isLoading ||
                    serviceUpdateLoading ||
                    (initialPayment.show && initialPayment.price === 0)
                  }
                  onClick={() => handleNextStep(value.id, value.price ?? 0)}
                  customButtonStyle={{ height: '40px', width: { xs: '100%', md: '30%' } }}
                  color={Color.priWhite}
                  backgroundColor={
                    totalPrice !== Number(value.price ?? 500) ||
                    !isUndefined(
                      milestoneArray.find(
                        (milestoneArray) => isEmpty(milestoneArray.deliverable) || isEmpty(`${milestoneArray.duration}`),
                      ),
                    ) ||
                    isLoading ||
                    serviceUpdateLoading ||
                    (initialPayment.show && initialPayment.price === 0)
                      ? Color.line
                      : Color.priBlue
                  }
                  width={'30%'}
                  fontSize={'14px'}
                  hover={Color.textHint}
                  text={isLoading || serviceUpdateLoading ? 'Loading...' : 'Save and continue'}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  marginBottom: '2em',
                  marginTop: { xs: '10px', md: '1em' },
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ width: '30%' }} />
                <Button
                  sx={{
                    color: 'black',
                    textTransform: 'none',
                    width: '30%',
                    justifyContent: 'flex-end',
                  }}
                  onClick={() => {
                    updateStepCount(step - 1);
                  }}
                >
                  <Typography>{'<- Previous'}</Typography>
                </Button>
              </Box>
              <QuitEditingModalComponent
                openModal={openModal}
                setOpenModal={setOpenModal}
                onSave={() => {
                  if (
                    !(
                      totalPrice !== Number(value.price ?? 500) ||
                      !isUndefined(
                        milestoneArray.find(
                          (milestoneArray) => isEmpty(milestoneArray.deliverable) || isEmpty(`${milestoneArray.duration}`),
                        ),
                      )
                    )
                  ) {
                    handleNextStep(value.id, value.price ?? 0, true);
                  }
                }}
                saveLoading={isLoading || serviceUpdateLoading}
                isDirty={false}
              />
              <PackagePriceComponent
                price={value.price ?? 0}
                serviceInfo={value}
                totalPrice={totalPrice}
                onChange={() => setInitialPayment({ price: 0, show: !initialPayment.show })}
                initialPayment={initialPayment.show}
              />
            </div>
          );
        }
      })}
      {(isEmpty(packageData) || isNil(packageData)) && (
        <div style={{ width: '100%', position: 'relative' }}>
          <Loader isLoading={true} size={30} isCenter isCenterUIStyle={{ position: 'relative', height: '60vh' }} />
        </div>
      )}
    </WrapperMain>
  );
};

export default PaymentView;
