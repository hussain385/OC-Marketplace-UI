import { isEmpty, isNull, isUndefined } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useGetOverViewOfServicesQuery } from '@/redux/apis/catalogApi';
import { Link, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ManageListingForm } from '@/modules/seller/manage-listing/manage-listing-form';
import Loader from '@/common/components/loader.component';
import { resetCompanySetupData, serviceSetupUpdated } from '@/redux/reducers/companySetupReducers';
import { IPackage } from '@/common/interface/busines-company-profile-interface';
import MainLayout from '@/common/layout/main.layout';
import { RenderIf } from '@/common/components';

const EditService = () => {
  const { selectedEntity, selectedRole } = useAppSelector((state) => state.mainState.useInfo);
  const dispatch = useAppDispatch();
  const [isEditAllow, setIsEditAllow] = useState<boolean>(false);
  const { id } = useParams();
  const { data, isLoading } = useGetOverViewOfServicesQuery(
    {
      code: id ?? '',
      queryObject: {
        join: ['packages', 'entity.profile', 'requirements', 'packages.milestones', 'packages.milestones.items', 'categories'],
      },
    },
    { refetchOnMountOrArgChange: true },
  );

  const updateServiceData = useCallback(
    (service: any) => {
      const pic: { picUrl: string; uid: string }[] = [];
      service.medias.forEach((media: any) => {
        const { protocol, domain, container, uid } = media;
        pic.push({ picUrl: `${protocol}://${domain}/${container}/${uid}`, uid: uid });
      });
      const plans: IPackage[] = service.packages.map((serviceInfo: any) => ({
        id: serviceInfo.id,
        name: serviceInfo.name,
        no: serviceInfo.no,
        description: serviceInfo.description ? serviceInfo.description : '',
        deliveryDays: serviceInfo.deliveryDays ? serviceInfo.deliveryDays : '',
        prerequisite: serviceInfo.prerequisite ? serviceInfo.prerequisite : '',
        price: serviceInfo.price,
        isContactFirst: serviceInfo.isContactFirst ? serviceInfo.isContactFirst : false,
        maxRevision: serviceInfo.maxRevision ? serviceInfo.maxRevision : '',
        paymentFrequency: serviceInfo.paymentFrequency ? serviceInfo.paymentFrequency : '',
        subscriptionCount: serviceInfo.subscriptionCount ? serviceInfo.subscriptionCount : '',
        paymentType: serviceInfo.paymentType ? serviceInfo.paymentType : '',
        status: serviceInfo.status === 'ACTIVE',
      }));
      dispatch(
        serviceSetupUpdated({
          edit: true,
          uid: service.id,
          servicePic: pic,
          step: service.step,
          categories: service.categories.map((c: { id: string }) => c.id),
          about: service.description && !isNull(service.description) ? service.description : '',
          title: service.name && !isNull(service.name) ? service.name : '',
          status: service.status,
          package1: isUndefined(plans[0]) ? undefined : plans[0],
          package2: isUndefined(plans[1]) ? undefined : plans[1],
          package3: isUndefined(plans[2]) ? undefined : plans[2],
        }),
      );
    },
    [dispatch],
  );

  useEffect(() => {
    if (!isUndefined(data) && id) {
      if (!isEmpty(data.data)) {
        const service = data.data;
        if (service?.entity?.uid === selectedEntity?.uid) {
          if (selectedRole?.metadata?.permissions?.includes('PG:Sell')) {
            updateServiceData(service);
            setIsEditAllow(true);
          }
        }
      } else {
        dispatch(resetCompanySetupData());
      }
    }
  }, [data]);

  if (!isEditAllow) {
    return (
      <MainLayout pageTitle='Manage listing'>
        <RenderIf value={isLoading}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <Loader isLoading size={40} />
          </Box>
        </RenderIf>
        <RenderIf value={!isEditAllow && !isLoading}>
          <Box>
            You&apos;re not allowed to edit this service. You can only edit your own services. &nbsp;
            <Link to={'/account/manage-listing'}>Go to Manage listing</Link>
          </Box>
        </RenderIf>
      </MainLayout>
    );
  } else {
    return <ManageListingForm />;
  }
};

export default EditService;
