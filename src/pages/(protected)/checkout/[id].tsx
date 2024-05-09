// @flow
import React, { useCallback, useMemo } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { ReactComponent as Debit } from '@/modules/checkout/assets/Debit.svg';
import { ReactComponent as AliPay } from '@/modules/checkout/assets/AliPay.svg';
import { ReactComponent as Visa } from '@/modules/checkout/assets/Visa.svg';
import { ReactComponent as GrabPay } from '@/modules/checkout/assets/GrabPay.svg';
import { ReactComponent as PayNow } from '@/modules/checkout/assets/PayNow.svg';
import { ReactComponent as SPay } from '@/modules/checkout/assets/SPay.svg';
import { useGetPackageDetailQuery, useGetServicesDetailQuery } from '@/redux/apis/marketplace.ts';
import { useParams } from '@/router.ts';
import { useNavigate } from 'react-router-dom';
import { capitalize, isEmpty } from 'lodash';
import { useCreateOrderMutation, useOrderContinueMutation } from '@/modules/servi-order/Service/order.api.ts';
import MainLayout from '@/common/layout/main.layout.tsx';
import { ServiceInfoBox } from '@/modules/checkout/order-details/service-info-box.tsx';
import { infoTitle, PackageInfo } from '@/modules/checkout/order-details/package-info.tsx';
import { PriceDetails } from '@/modules/checkout/order-details/price-details.tsx';
import MuiButton from '@/common/components/mui-button.component.tsx';
import { FooterComp } from '@/modules/seller/common/footer-comp.tsx';
import { Color } from '@/theme.ts';
import '@/modules/checkout/style.css';
import useQueryParams from '@/common/utils/hooks/useQueryParams.tsx';
import { packageInfoUpdateAction } from '@/redux/reducers/catalogReducer.ts';
import { useAppDispatch } from '@/redux/hooks.tsx';

const OrderDetails = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams('/checkout/:id');
  const navigate = useNavigate();
  const [params] = useQueryParams();

  const orderId = useMemo(() => params.get('orderId'), [params]);

  const [CreateOrder, { isLoading: isCreateLoading }] = useCreateOrderMutation();
  const [OrderContinue, { isLoading: isOrderContinue }] = useOrderContinueMutation();

  /**
   * Get the Package
   */
  const { data, isLoading: isPackageLoading } = useGetPackageDetailQuery({
    packageId: id,
    params: {
      join: ['service'],
    },
  });

  /**
   * Get the Entity
   */
  const { data: service } = useGetServicesDetailQuery(
    {
      serviceId: data?.service?.id ?? '',
      params: {
        join: ['entity.profile', 'requirements', 'categories'],
      },
    },
    {
      skip: !data?.service?.id,
    },
  );

  /**
   * Payment plans
   */
  const paymentPlans = useMemo(() => {
    const plans: string[] = [data?.paymentType ? `${capitalize(data.paymentType)} payment` : ''];

    /**
     * Initial deposit / Upfront
     */
    if (data?.milestones?.some((e) => e.items.some((x) => x.type === 'INITIAL_DEPOSIT'))) {
      plans.push('Pay upfront');
    }

    /**
     * Servi-Safe
     */
    if (data?.milestones?.some((e) => e.items.some((x) => x.isEscrow))) {
      plans.push('ServiSafe');
    }

    return plans;
  }, [data?.milestones, data?.paymentType]);

  /**
   * on Pay now
   */
  const onPay = useCallback(async () => {
    if (!data || !service) {
      return;
    }

    const packageInfo = {
      categoryName: '',
      merchantId: '',
      planId: `${data.id}`,
      serviceId: data.service!.id,
      serviceName: service?.name ?? '',
      companyName: service?.entity?.profile.detail.name ?? '',
      whatYouGet: data.description,
      deliveryTime: `${data.deliveryDays} day`,
      paymentSchedule: true,
      packageHeading: data?.name ?? '',
      price: data.price ?? 0,
      orderId: '',
    };

    if (orderId) {
      await OrderContinue({ id: orderId })
        .unwrap()
        .then(() => {
          dispatch(packageInfoUpdateAction({ ...packageInfo, orderId: orderId }));
          navigate(`/checkout/success?orderId=${orderId}`);
        });
      return;
    }

    CreateOrder({
      serviceId: data.service!.id,
      packageId: data.id,
    })
      .unwrap()
      .then((e) => {
        dispatch(packageInfoUpdateAction({ ...packageInfo, orderId: e.id.toString() }));
        navigate(`/checkout/success?requirements=${!isEmpty(service?.requirements)}&orderId=${e.id.toString()}`);
      });
  }, [CreateOrder, OrderContinue, data, dispatch, navigate, orderId, service]);

  if (isPackageLoading) {
    return (
      <MainLayout
        headingShown
        pageTitle='Check out'
        breadcrumb={[{ label: 'Dashboard', path: '/account' }, { label: 'Check out' }]}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
          <CircularProgress color='secondary' size={30} />
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout headingShown pageTitle='Check out' breadcrumb={[{ label: 'Check out' }]}>
      <Box
        sx={{
          width: '100%',
          alignItems: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: '1.3em',
          paddingTop: '0px',
        }}
      >
        <Typography sx={{ fontSize: '24px', fontWeight: '700' }}>You are one step away!</Typography>
        <Box style={{ width: 'inherit' }}>
          {/*<HiddenInputs />*/}
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Box sx={{ width: { xs: '100%', md: '57%' } }}>
              <ServiceInfoBox
                serviceName={data?.service?.name ?? ''}
                companyName={service?.entity?.profile.detail.name ?? ''}
                categoryName={service?.categories?.find((e) => e.level === 2)?.name ?? ''}
              />
              <PackageInfo
                whatYouGet={data?.description ?? ''}
                deliveryTime={data?.deliveryDays ? `${data.deliveryDays} working days` : undefined}
                requirements={data?.prerequisite ?? ''}
                paymentPlans={paymentPlans}
                packageHeading={data?.name ?? ''}
                milestones={data?.milestones}
                currency={data?.currency}
                noOfOrders={data?.subscriptionCount}
              />
            </Box>
            <Box sx={{ width: { xs: '100%', md: '40%' } }}>
              <PriceDetails discount={0} tax={0} servicePackage={data} />
              <Typography sx={infoTitle}>
                By clicking Pay now, you agree to OPNCORP&apos;s{' '}
                <a href='/terms-conditions' target='_blank'>
                  Terms and conditions
                </a>{' '}
                and{' '}
                <a href='/privacy-policy' target='_blank'>
                  Privacy policy
                </a>
              </Typography>
              <MuiButton
                type={'button'}
                widthSize='100%'
                heightSize='44px'
                onClick={onPay}
                style={{
                  background: Color.priBlue,
                  borderRadius: '2px',
                  color: Color.priWhite,
                  lineHeight: 1.71,
                  letterSpacing: '-0.5px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginTop: '1.3em',
                }}
                value={isCreateLoading || isOrderContinue ? 'Loading...' : 'Pay now'}
                disabled={isCreateLoading || isOrderContinue}
              />
              <Box
                sx={{
                  display: 'inline-flex',
                  gap: '6px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  mt: '10px',
                }}
              >
                <Debit height={'24px'} width={'34.5px'} />
                <Visa height={'24px'} width={'34.5px'} />
                <GrabPay height={'24px'} width={'34.5px'} />
                <PayNow height={'24px'} width={'34.5px'} />
                <SPay height={'24px'} width={'34.5px'} />
                <AliPay height={'24px'} width={'34.5px'} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ position: 'absolute', bottom: { xs: '-10em', md: '0em' }, width: '100%' }}>
        <FooterComp />
      </Box>
    </MainLayout>
  );
};

export default OrderDetails;
