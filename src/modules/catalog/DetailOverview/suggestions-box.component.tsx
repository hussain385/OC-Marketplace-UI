// @flow
import React, { useState, useEffect } from 'react';

import { Box, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { ShimmerCard } from '../components/shimmer-card';

import { isEmpty, isNull, isUndefined } from 'lodash';

import { CatalogCard } from '../components/catalog-card';

import { Color } from '../../../theme';

import EmptyUI from '../../../common/components/empty-ui.component';

import { mediaUrlGenerator } from '../../../common/utils';
import { useGetServicesQuery } from '@/redux/apis/marketplace';
import { IService } from '@/common/interface/service-interface';
import { IoIosArrowForward } from 'react-icons/io';

type PropsType = {
  categoryId: string;
  description: string;
  title: string;
  serviceId: string;
  subCategoryId: string;
};

export const SuggestionsBoxComponent = ({ categoryId, description, title, serviceId, subCategoryId }: PropsType) => {
  const navigate = useNavigate();
  const [serviceFilter, setServiceFilter] = useState<any[]>([]);
  const { data, isLoading } = useGetServicesQuery({
    join: ['packages', 'entity.profile', 'categories'],
    s: JSON.stringify({ $and: [{ 'categories.id': { $in: [categoryId, subCategoryId] } }, { status: 'ACTIVE' }] }),
    limit: 4,
  });

  useEffect(() => {
    const fetchServices = async () => {
      if (!isUndefined(data)) {
        setServiceFilter(() => (data as any).data.filter((service: IService) => serviceId !== service.id));
      }
    };
    fetchServices().then(null);
  }, [categoryId, data, serviceId]);

  return (
    <Box sx={{ paddingBlock: '2em', paddingInline: '20px', position: 'relative' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Typography sx={{ color: Color.textBlack, fontSize: '24px', fontWeight: '500' }}>
          Explore other options in {title}
        </Typography>
        {!isEmpty(serviceFilter) && (
          <>
            {serviceFilter.length >= 4 && !isLoading && (
              <Typography
                onClick={() =>
                  navigate(`/catalog/sub-category/${categoryId}`, {
                    state: { id: categoryId, description: description, title: title },
                  })
                }
                sx={{
                  color: Color.textBlack,
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                View all services <IoIosArrowForward style={{ color: Color.priBlue }}>&gt;</IoIosArrowForward>
              </Typography>
            )}
          </>
        )}
      </Box>
      {isEmpty(serviceFilter) && isLoading ? (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
        </Box>
      ) : !isEmpty(serviceFilter) ? (
        <Box
          sx={{ display: 'flex', gap: '1em', maxWidth: '786px', overflow: 'hidden', overflowX: 'scroll', scrollbarWidth: 'thin' }}
        >
          {serviceFilter.map((service: IService, key: number) => {
            let logoUrl = '';
            if (!isUndefined(service.entity?.profile.detail.logo) && !isNull(service.entity.profile.detail.logo)) {
              logoUrl = mediaUrlGenerator(service.entity?.profile.detail.logo);
            }
            return (
              <CatalogCard
                companyName={service.entity?.profile.detail.name}
                logo={logoUrl}
                key={key}
                service={service}
                index={key}
                isCatalog
              />
            );
          })}
        </Box>
      ) : (
        <Box sx={{ height: '22.8em' }}>
          <EmptyUI text={'No Other Services Available'} />
        </Box>
      )}
    </Box>
  );
};
