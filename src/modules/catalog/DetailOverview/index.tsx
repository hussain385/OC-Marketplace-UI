// @flow
/* eslint-disable no-unused-vars */

import React, { useEffect, useMemo, useState } from 'react';

import { Box, Typography } from '@mui/material';

import { MdOutlineArrowForwardIos } from 'react-icons/md';

import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';

import 'react-image-gallery/styles/css/image-gallery.css';

import '../style.css';

import { AboutCompanyComponent } from './about-company.component';

import { PackagesOverviewComponent } from './packages-overview.component';

import { ComparePackagesComponent } from './compare-packages.component';

import { CatalogWrapper } from '../components/catalog-wrapper';

import { isNull, isUndefined } from 'lodash';

import { MessageSuccessBox } from '../components/message-success-box';

import { SuggestionsBoxComponent } from './suggestions-box.component';

import { DetailOverviewLoadingPage } from '../components/detail-overview-loading-page';

import { ICompanyInfo } from '@/common/interface/catalog-interface';
import { Package } from '@/common/interface/service-interface';
import { mediaUrlGenerator, showToast, ToastTypes } from '@/common/utils';

import { HeadingTypography } from '@/common/styles/catalog.styles';

import { useAppSelector } from '@/redux/hooks';

/**
 * Neo import(s)
 */
import { QuickChat } from './serviceDetail.quickChat';
import EmptyUI from '../../../common/components/empty-ui.component';
import { useGetServicesDetailQuery } from '@/redux/apis/marketplace.ts';
import { useParams } from '@/router.ts';
import ServiceReview from '@/modules/reviews/src/service-review';
import UserProfileInfoView from '@/modules/servi-profile/components/user-profile-info.view';

export const DetailOverview = () => {
  const { serviceId } = useParams('/service-detail/:serviceId');
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const { selectedEntity } = useAppSelector((state1) => state1.mainState.useInfo);

  const [isQuickChat, setIsQuickChat] = React.useState(false);

  /**
   * Get the Entity
   */
  const { data, isLoading, error } = useGetServicesDetailQuery({
    serviceId,
    params: {
      join: ['packages', 'entity.profile', 'categories'],
      filter: { status: { $eq: 'ENABLE' } },
    },
  });

  /**
   * Category and Sub Category
   */
  const category = useMemo(() => data?.categories?.find((c) => c.level === 1), [data?.categories]);
  const subCategory = useMemo(() => data?.categories?.find((c) => c.level === 2), [data?.categories]);

  /**
   * Filter out the company info
   * TODO: need to change the name because of freelancer
   */
  const companyInfo: ICompanyInfo | undefined = useMemo(() => {
    if (data?.entity) {
      return {
        name: data.entity.profile.detail.name ?? '',
        createdAt: data.entity.profile.detail.operationYear?.toString() ?? 0,
        about: data.entity.profile.detail.about ?? '',
        logo: data.entity.profile.detail.logo ? mediaUrlGenerator(data.entity.profile.detail.logo) : '',
        id: data.entity.id,
      };
    }
  }, [data]);

  const plans: Package[] = useMemo(() => {
    if (!data || !data.packages) {
      return []; // Return an empty array if data or data.packages is undefined or null
    }
    const packages = [...(data?.packages ?? [])];
    const sorted = packages?.sort((a, b) => a.no - b.no);
    return sorted; // Fallback to an empty array if no packages
  }, [data]);

  /**
   * Images for the Gallery package
   */
  const images: ReactImageGalleryItem[] = useMemo(
    () => data?.medias.map((i) => ({ original: mediaUrlGenerator(i), thumbnail: mediaUrlGenerator(i) })) ?? [],
    [data?.medias],
  );

  useEffect(() => {
    if (!isUndefined(error)) {
      const message = error as any;
      showToast(message.error, ToastTypes.ERROR);
    }
  }, [error]);

  if (isUndefined(data) && isLoading) {
    return (
      <CatalogWrapper detailBar={true}>
        <>
          <DetailOverviewLoadingPage />
        </>
      </CatalogWrapper>
    );
  }

  if (isUndefined(data)) {
    return (
      <CatalogWrapper detailBar={true}>
        <EmptyUI text={'Service not found'} />
      </CatalogWrapper>
    );
  }

  return (
    <CatalogWrapper detailBar={true}>
      <>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingInline: '10px',
            flexDirection: { xs: 'column', md: 'row' },
            gap: '10px',
          }}
        >
          <Box
            sx={{
              width: { xs: '100%', md: '60%' },
            }}
          >
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              {!isNull(category) && category?.name}
              <MdOutlineArrowForwardIos style={{ marginInline: '10px', fontSize: '14px' }} />
              {!isNull(subCategory) && subCategory?.name}
            </Typography>
            <HeadingTypography>{data?.name}</HeadingTypography>
            <ImageGallery
              thumbnailPosition='left'
              showNav={false}
              showFullscreenButton={false}
              showPlayButton={false}
              slideOnThumbnailOver={false}
              items={images}
            />
            <Box sx={{ marginBlock: '2em' }}>
              <Typography sx={{ fontSize: '20px !important', fontWeight: 'bold' }}>About the services</Typography>
              <Typography style={{ marginTop: '10px' }}>{data?.description}</Typography>
            </Box>
            {/** Seller Profile short details */}
            <AboutCompanyComponent entity={data?.entity} serviceId={serviceId} />
            <Box sx={{ mt: 1 }}>
              <Typography sx={{ fontWeight: 700, fontSize: '20px', lineHeight: '24px', letterSpacing: '-0.5px' }}>
                Compare packages
              </Typography>
            </Box>
            <ComparePackagesComponent
              companyServices={plans}
              serviceName={data?.name}
              companyName={companyInfo?.name}
              categoryName={subCategory?.name ?? ''}
              companyId={companyInfo?.id}
              serviceId={serviceId}
            />
            <Box sx={{ marginTop: '3em' }}>
              <SuggestionsBoxComponent
                categoryId={category?.id ?? ''}
                subCategoryId={subCategory?.id ?? ''}
                description={''}
                // description={subCategory?.description}
                title={subCategory?.name ?? ''}
                serviceId={serviceId}
              />
            </Box>
          </Box>
          <Box sx={{ width: { xs: '100%', md: '35%' } }}>
            <PackagesOverviewComponent
              setOpenMessage={setIsQuickChat}
              companyServices={plans}
              serviceName={data?.name}
              companyName={companyInfo?.name}
              categoryName={subCategory?.name ?? ''}
              companyId={companyInfo?.id}
              serviceId={serviceId}
            />
          </Box>
        </Box>

        {!isQuickChat || !data?.entity ? (
          <></>
        ) : (
          <QuickChat
            purchasingEntity={selectedEntity?.uid ?? ''}
            salesEntity={data?.entity}
            service={data}
            onClickClose={() => setIsQuickChat(!isQuickChat)}
          />
        )}
        <Box sx={{ marginTop: '54px' }}>
          <ServiceReview />
        </Box>
        <MessageSuccessBox isOpen={openSuccess} onClose={() => setOpenSuccess(false)} />
      </>
    </CatalogWrapper>
  );
};
