// @flow
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { isEmpty, isUndefined } from 'lodash';
import { AppThemeBtnComponent } from '@/common/components/app-theme-btn.component';
import { Color } from '@/theme';
import { useAddPackagesBulkMutation, useUpdateServicesMutation } from '@/redux/apis/marketplace';
import { showToast, ToastTypes } from '../../../../common/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { ServicesSchema } from './manage-listing.schema';
import ServicePlanFormComponent from '../../common-service-components/service-plan-form.component';
import { IPackage, IServicesData } from '@/common/interface/busines-company-profile-interface';
import useGetServiceInfo from '../../hooks/useGetServiceInfo';
import { IPackagePrice } from '@/common/interface/service-interface';
import PlanInfoBox from '../../common/plan-infoBox.component';
import { WrapperMain } from '@/common/styles/navbar.styles';
import { useAppSelector } from '@/redux/hooks';
import QuitEditingModalComponent from '@/modules/seller/manage-listing/component/quit-editing-modal.component';
import PackageAddMobileVersionComponent from '@/modules/seller/manage-listing/component/package-add-mobile-version.component';
import { useNavigate } from 'react-router-dom';

type Props = {
  updateStepCount: (value: number) => void;
  step: number;
};
const subText = {
  fontWeight: '400',
  fontSize: '12px',
  color: '#7E7E7E',
  marginTop: '0.3em',
  width: '100%',
  maxWidth: '1440px',
  letterSpacing: '-0.5px',
};

const deliveryInDays = {
  '1-3 days': 3,
  'within 1 week': 7,
  'within 2 weeks': 14,
  'within a month': 30,
  Others: 60,
};

export const ManagePlanView = ({ updateStepCount, step }: Props) => {
  const navigate = useNavigate();
  const { serviceData } = useAppSelector((state) => state.mainState.companySetup);
  const [addPackagesBulk, { error: serviceSetupError, isLoading }] = useAddPackagesBulkMutation();
  const [updateServices, { error: serviceUpdateError, isLoading: serviceUpdateLoading }] = useUpdateServicesMutation();
  const [packages, setPackages] = useState<number[]>([0]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [paymentPlanType, setPaymentPlanType] = useState<string[]>(['Milestone', 'Milestone', 'Milestone']);
  const [allStatusesError, setAllStatusesError] = useState(false);
  const [newQuery, setNewQuery] = useState<boolean>(false);
  const [packagePrices, setPackagePrices] = useState<IPackagePrice>({
    package1: 0,
    package2: 0,
    package3: 0,
  });
  const isEdit = useMemo(
    () => serviceData.edit && serviceData.step > 3,
    [serviceData.edit, serviceData.status, serviceData.step],
  );

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

  const formDefaultValues = {
    description: '',
    deliveryDays: '',
    prerequisite: '',
    price: '',
    paymentType: 'MILESTONE',
    paymentFrequency: 'Monthly',
    isContactFirst: false,
    subscriptionCount: '',
    maxRevision: '',
    status: true,
  };

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<any>({
    resolver: yupResolver(ServicesSchema({ packages, packagePrices })),
    defaultValues: {
      package1: {
        name: 'Lite',
        ...formDefaultValues,
      },
      package2: {
        name: 'Starter',
        ...formDefaultValues,
      },
      package3: {
        name: 'Essential',
        ...formDefaultValues,
      },
    },
  });

  useGetServiceInfo({ setValue: setValue, setPackages: setPackages, newQuery: newQuery });

  const onSubmitHandler = async (data: any, quitModalSubmit?: boolean) => {
    const plans: any[] = [];
    const statuses: boolean[] = [];
    setAllStatusesError(false);
    packages.map((packageNumber) => {
      if (!data[`package${packageNumber + 1}`].status) {
        statuses.push(data[`package${packageNumber + 1}`].status);
      }
      const servicePackage: IPackage | undefined = serviceData[`package${packageNumber + 1}` as keyof IServicesData] as IPackage;
      const plan = {
        id: servicePackage?.id,
        no: packageNumber + 1,
        name: data[`package${packageNumber + 1}`].name,
        status: data[`package${packageNumber + 1}`].status ? 'ACTIVE' : 'DISABLED',
        description: data[`package${packageNumber + 1}`].description,
        isContactFirst: data[`package${packageNumber + 1}`].isContactFirst,
        prerequisite: isEmpty(data[`package${packageNumber + 1}`].prerequisite)
          ? undefined
          : data[`package${packageNumber + 1}`].prerequisite,
        paymentType: data[`package${packageNumber + 1}`].paymentType,
        paymentFrequency:
          data[`package${packageNumber + 1}`].paymentType === 'SUBSCRIPTION'
            ? data[`package${packageNumber + 1}`].paymentFrequency.toUpperCase()
            : null,
        subscriptionCount:
          data[`package${packageNumber + 1}`].paymentType === 'MILESTONE' ||
          isEmpty(`${data[`package${packageNumber + 1}`].subscriptionCount}`)
            ? null
            : Number(data[`package${packageNumber + 1}`].subscriptionCount),
        maxRevision: Number(data[`package${packageNumber + 1}`].maxRevision),
        deliveryDays: Number(
          deliveryInDays[data[`package${packageNumber + 1}`].deliveryDays as keyof typeof deliveryInDays] ??
            data[`package${packageNumber + 1}`].deliveryDays,
        ),
        price: Number(data[`package${packageNumber + 1}`].price),
        currency: 'SGD',
        milestones: servicePackage?.milestones ? servicePackage?.milestones : [],
      };
      plans.push(plan);
    });

    if (statuses.length === packages.length) {
      setAllStatusesError(true);
      return;
    }

    try {
      await addPackagesBulk({ data: { serviceId: serviceData.uid, bulk: plans } }).unwrap();
      const formData = new FormData();
      formData.append(
        'step',
        serviceData.step > 1 ? `${serviceData.step}` : plans.find((value) => value.paymentType === 'MILESTONE') ? '2' : '3',
      );
      await updateServices({ body: formData, serviceId: serviceData.uid });
      setNewQuery(!newQuery);
      if (plans.find((value) => value.paymentType === 'MILESTONE' && value.status === 'ACTIVE' && !value.isContactFirst)) {
        updateStepCount(step + 1);
      } else {
        updateStepCount(step + 2);
      }

      if (quitModalSubmit) {
        navigate('/account/manage-listing');
      }
    } catch (e) {
      return;
    }
  };

  const listingEdit = serviceData.edit && !['DISABLE', 'DRAFT'].includes(serviceData.status) && serviceData.step > 2;

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <WrapperMain>
        <form
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          onSubmit={handleSubmit((data) => onSubmitHandler(data, false))}
          noValidate
        >
          <Box sx={{ width: '100%', maxWidth: { xs: '90vw', md: '73em' } }}>
            <Typography
              sx={{
                fontSize: '24px !important',
                color: '#1d2130',
                fontWeight: '700',
                marginBottom: '1em',
                marginTop: '1em',
              }}
            >
              Packages
            </Typography>
            <Typography className='subHeading'>Your packages</Typography>
            <Typography style={subText}>Please add here the service packages you would like to sell to customers</Typography>
          </Box>
          <Box
            sx={{
              border: allStatusesError ? '1px solid #e11900' : '1px solid #EAEAEA',
              marginTop: '1em',
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'row',
              maxWidth: { xs: '90vw', md: '73em' },
              overflowX: 'auto',
              marginBottom: '2em',
            }}
          >
            <PlanInfoBox paymentPlanType={paymentPlanType} />
            {packages.map((value, key) => (
              <ServicePlanFormComponent
                key={key}
                control={control}
                loopKey={key}
                setValue={setValue}
                getValue={getValues}
                errors={errors}
                setAllStatusesError={setAllStatusesError}
                packagePrices={packagePrices}
                setPackagePrices={setPackagePrices}
                paymentPlanType={paymentPlanType}
                setPaymentPlanType={setPaymentPlanType}
              />
            ))}
            <Box
              sx={{
                width: packages.length === 1 ? '50%' : packages.length === 2 ? '25%' : '0%',
                display: packages.length === 3 ? 'none' : 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderLeft: '1px solid #EAEAEA',
                paddingInline: '16px',
                justifyContent: 'center',
              }}
            >
              <Typography
                className='subHeading'
                sx={{ fontWeight: '500 !important', fontSize: '14px !important', textAlign: 'center' }}
              >
                Add more package offer to meet the need
                <br />( Maximum 3 packages)
              </Typography>
              <Button onClick={() => setPackages(() => [...packages, packages.length])}>
                <Typography
                  className='subHeading'
                  sx={{
                    fontWeight: '500 !important',
                    fontSize: '14px !important',
                    textAlign: 'center',
                    color: '#2752E7',
                  }}
                >
                  + Add package
                </Typography>
              </Button>
            </Box>
          </Box>
          {packages.map((value, key) => (
            <PackageAddMobileVersionComponent
              key={key}
              control={control}
              loopKey={key}
              setValue={setValue}
              getValue={getValues}
              errors={errors}
              setAllStatusesError={setAllStatusesError}
              packagePrices={packagePrices}
              setPackagePrices={setPackagePrices}
            />
          ))}
          <Button
            sx={{ display: { xs: 'flex', md: 'none' }, width: '100%', marginBottom: '2em' }}
            onClick={() => setPackages(() => [...packages, packages.length])}
          >
            <Typography
              className='subHeading'
              sx={{
                fontWeight: '500 !important',
                fontSize: '14px !important',
                color: '#2752E7',
                width: '100%',
                textAlign: 'left',
              }}
            >
              + Add package
            </Typography>
          </Button>
          {allStatusesError && (
            <Typography className='errorMessage' sx={{ width: '100%' }}>
              At least one package should be active
            </Typography>
          )}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              width: { xs: '100%', md: '70%' },
              gap: '1em',
              justifyContent: 'center',
            }}
          >
            <AppThemeBtnComponent
              type='button'
              onClick={() => setOpenModal(true)}
              customButtonStyle={{
                height: '40px',
                border: `1px solid ${isEdit ? Color.priRed : Color.bgGreyDark}`,
                display: { xs: 'block', md: isEdit ? 'none' : 'block' },
              }}
              color={isEdit ? Color.priRed : Color.bgGreyDark}
              backgroundColor={'white'}
              width={{ xs: '100%', md: '40%' }}
              fontSize={'14px'}
              text={!isEdit ? 'Cancel' : 'Quit editing'}
              hover={'#ffffff'}
            />
            {isEdit && (
              <AppThemeBtnComponent
                type='button'
                onClick={() => navigate(`/service-detail/${serviceData.uid}`, { state: { id: serviceData.uid } })}
                customButtonStyle={{ height: '40px', border: `1px solid ${Color.positive}` }}
                color={Color.positive}
                backgroundColor={'white'}
                width={{ xs: '100%', md: '40%' }}
                fontSize={'14px'}
                text={'Preview'}
                hover={'#ffffff'}
              />
            )}
            <AppThemeBtnComponent
              type='submit'
              disabled={isSubmitting}
              customButtonStyle={{ height: '40px', width: { xs: '100%', md: '40%' } }}
              color={isSubmitting ? Color.textBlack : Color.priWhite}
              backgroundColor={isSubmitting ? Color.bgGreyLight : Color.priBlue}
              width={'33%'}
              fontSize={'14px'}
              hover={Color.textHint}
              text={isSubmitting ? 'Please wait..' : listingEdit ? 'Save' : 'Save and continue'}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              maxWidth: '53.5em',
              width: '100%',
              marginBottom: '2em',
              marginTop: { xs: '10px', md: '1em' },
            }}
          >
            <Button
              sx={{ color: 'black', textTransform: 'none' }}
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
            onSave={handleSubmit((data) => onSubmitHandler(data, true))}
            saveLoading={isLoading || serviceUpdateLoading}
            isDirty={isDirty}
          />
        </form>
      </WrapperMain>
    </Box>
  );
};
