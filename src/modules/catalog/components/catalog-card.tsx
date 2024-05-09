// @flow
import { Avatar, Box, Button, Card, CardContent, CardMedia, Divider, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { FiCreditCard } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { ProductInfoText } from '@/common/styles/common.styles';
import { isEmpty, startCase } from 'lodash';
import { mediaUrlGenerator } from '../../../common/utils';
import { Star } from '@mui/icons-material';
import { Color } from '@/theme';
import { getAverageReviewsRating, getTotalReviewsCount } from '../../reviews/src/utils/functions';
import { RenderIf } from '@/common/components';
import { IService } from '@/common/interface/service-interface';
import { AvatarLabel } from '@/common/styles';
import { RiCheckLine } from 'react-icons/ri';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface.ts';

type CatalogCardType = {
  service: IService;
  logo?: string;
  companyName?: string;
  index?: number;
  isCatalog?: boolean;
};

export const CatalogCard = React.memo(({ service, logo, companyName, index, isCatalog = false }: CatalogCardType) => {
  const navigate = useNavigate();

  /**
   * Service logo to show on header
   */
  const serviceImageUrl = useMemo(() => (service.medias?.[0] ? mediaUrlGenerator(service.medias[0]) : ''), [service.medias]);

  /**
   * Entity type for tag
   */
  const isBusiness = useMemo(() => service.entity?.profile.type === companyProfiles.business, [service.entity?.profile.type]);

  /**
   * Total count of reviews to show
   */
  const totalCountReviews: number = useMemo(() => {
    return getTotalReviewsCount(undefined);
  }, []);

  /**
   * Average reviews to show
   */
  const totalAverageReviews: number = useMemo(() => {
    return getAverageReviewsRating(undefined);
  }, []);

  if (!service) {
    return <Card sx={{ width: '18.7em', height: '22.8em', marginBlock: '1em', cursor: 'pointer' }} />;
  }

  return (
    <Card
      onClick={() => (isCatalog ? null : navigate(`/service-detail/${service.id}`, { state: { id: service.id } }))}
      sx={{
        minWidth: isCatalog ? { xs: '100%', sm: '320px' } : { xs: '100%', md: '23%' },
        maxWidth: isCatalog ? { xs: '100%', sm: '320px' } : { xs: '100%', md: '23%' },
        height: isCatalog ? '441px' : '25.5em',
        cursor: isCatalog ? undefined : 'pointer',
        position: 'relative',
      }}
    >
      {/** Tags */}
      <Box
        sx={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          backgroundColor: !isBusiness ? '#2CAF70' : '#2752E7',
          borderRadius: '8px',
          px: '12px',
          py: '3px',
          color: 'white',
        }}
      >
        <Typography sx={{ fontSize: '12px', fontWeight: 700, letterSpacing: 'normal' }}>
          {isBusiness ? 'AGENCY' : 'FREELANCER'}
        </Typography>
      </Box>

      {/** Image */}
      <CardMedia component='img' height='190px' image={serviceImageUrl} alt='service' />

      {/** Body */}
      <CardContent sx={{ paddingTop: '8px' }}>
        <Stack direction={'row'} sx={{ alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <Stack direction='row' spacing={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <Avatar
              src={logo}
              style={{
                width: '2em',
                height: '2em',
                border: '1px solid #EEEEEE',
                backgroundColor: logo ? Color.bgGreyLight : Color.priBlue,
              }}
            >
              <AvatarLabel>
                {isCatalog ? startCase(service.entity?.profile.detail.name[0]) : startCase(companyName ? companyName[0] : 'N/A')}
              </AvatarLabel>
            </Avatar>
            <Box sx={{ width: { xs: '100px', sm: '100px' } }}>
              <Typography sx={{ fontSize: isCatalog ? '14px' : '12px', fontWeight: '600' }} noWrap>
                {isCatalog ? service.entity?.profile.detail.name : companyName}
              </Typography>
            </Box>
          </Stack>
          <RenderIf value={totalCountReviews >= 1}>
            <Stack
              direction='row'
              sx={{ alignItems: 'center', justifyContent: 'space-between', gap: '4px', color: Color.orderStar }}
            >
              <Star height={'12px'} width={'12px'} sx={{ fontSize: '12px', fontWeight: '600' }} />
              <Typography sx={{ fontSize: '12px', fontWeight: '600' }}>
                {totalAverageReviews.toPrecision(2)} ({totalCountReviews})
              </Typography>
            </Stack>
          </RenderIf>
        </Stack>
        <Box sx={{ width: { xs: '138px', sm: '138px' } }}>
          <ProductInfoText sx={{ fontSize: isCatalog ? '14px' : '16px', height: '40px' }}>{service.name}</ProductInfoText>
        </Box>

        {/** Package offers */}
        {isCatalog && (
          <Box sx={{ mt: '19px' }}>
            {service.packages.some((p) => p.paymentType === 'SUBSCRIPTION') && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <RiCheckLine size={16} color={'#66D19E'} />
                <Typography>Offers subscription</Typography>
              </Box>
            )}
            {service.packages.some((p) => p.paymentType === 'MILESTONE') && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <RiCheckLine size={16} color={'#66D19E'} />
                <Typography>Milestone payment available</Typography>
              </Box>
            )}
          </Box>
        )}
      </CardContent>

      {/** Footer */}
      <Box
        sx={{
          borderTop: '1px solid #EFEEEE',
          position: 'absolute',
          bottom: '0',
          width: '100%',
          paddingBlock: '1em',
        }}
      >
        {!isCatalog ? (
          <Box sx={{ paddingInline: '1em', display: 'flex', justifyContent: 'space-between' }}>
            <Stack
              direction='row'
              spacing={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <FiCreditCard />
              <Typography sx={{ fontSize: { xs: '9px', sm: '9px', md: '12px' } }}>One-time payment</Typography>
            </Stack>
            <Divider orientation='vertical' flexItem />
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Typography sx={{ color: '#1D2130', fontSize: '10px' }}>From </Typography>
              <span style={{ fontSize: '16px', fontWeight: '600' }}>
                <span style={{ fontSize: '16px', marginLeft: '3px' }}>$SGD </span>
                {service.minPrice}
              </span>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              gridColumn: '1/-1',
              gridRows: '5/-1',
              paddingInline: '16px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ color: Color.textHint, fontSize: '10px', fontWeight: 600, lineHeight: '24px' }}>
                STARTING AT
              </Typography>
              &nbsp; &nbsp;
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 600,
                  lineHeight: '24px',
                  width: '63px',
                  color: index && index % 2 === 1 ? '#2CAF70' : Color.textBlack,
                }}
              >
                {!isEmpty(service.packages)
                  ? service.packages[0].currency.replace('Currency is optional and default is', '')
                  : 'null'}
                &nbsp;
                {service.minPrice}
              </Typography>
            </Box>
            <Button
              sx={{
                color: Color.priBlue,
                background: Color.bgGreyLight,
                width: 'auto',
                padding: '5px 10px 5px 10px',
                height: '34px',
                gridColumns: '2/-1',
                gridRows: '1/-1',
                justifySelf: 'end',
                textTransform: 'initial',
                fontWeight: 600,
                fontSize: '14px',
                letterSpacing: '-0.03em',
              }}
              onClick={() => navigate(`/service-detail/${service.id}`, { state: { id: service.id } })}
            >
              Check it now
            </Button>
          </Box>
        )}
      </Box>
    </Card>
  );
});

CatalogCard.displayName = 'CatalogCard';
