// @flow
/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { Avatar, Box, Button, Typography } from '@mui/material';
import '../style.css';
import { BsShieldCheck } from 'react-icons/bs';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { SellerProfileAwardCard } from '../components/seller-profile-award-card';
import { SellerProfileStaffCard } from '../components/seller-profile-staff-card';
import { isEmpty, isNull, isUndefined } from 'lodash';
import { Color } from '@/theme';
import { bottomBtnStyle } from '@/common/styles/common.styles';
import { mediaUrlGenerator } from '../../../common/utils';
import moment from 'moment';
import { useAppSelector } from '@/redux/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { Star } from '@mui/icons-material';
import { companyProfiles } from '@/common/interface/busines-company-profile-interface';

type CompanyDetailsPropType = {
  companyDetails: any;
  setOpenMessage: React.Dispatch<React.SetStateAction<boolean>>;
  serviceId: string;
};

export const CompanyDetailsInfoComponent = ({ companyDetails, setOpenMessage, serviceId }: CompanyDetailsPropType) => {
  const { user } = useAppSelector((state) => state.mainState.useInfo);
  let logoUrl = '';
  if (!isUndefined(companyDetails.profile.detail.logo) && !isNull(companyDetails.profile.detail.logo)) {
    logoUrl = mediaUrlGenerator(companyDetails.profile.detail.logo);
  }
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const [seeMoreAward, setSeeMoreAward] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  return (
    <Box sx={{ width: { xs: '100%', md: '40%' } }}>
      <Box className={'SellerInfoBox'}>
        <Box className={'center'}>
          <Avatar src={logoUrl} style={{ width: '7em', height: '7em' }} />
          <Typography sx={{ fontSize: '16px', fontWeight: '700', marginTop: '1em' }}>
            {companyDetails.profile.detail.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center', marginBlock: '0.5em' }}>
              <BsShieldCheck size='13' color={Color.positive} />
              <Typography className='subHeading' style={{ color: Color.positive }}>
                verified
              </Typography>
            </Box>
            <Typography sx={{ color: '#EAEAEA' }}>|</Typography>
            <Box sx={{ color: Color.orderStar, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Star height={'12px'} width={'12px'} sx={{ fontSize: '12px', fontWeight: '600' }} />
              <Typography sx={{ fontSize: '12px', fontWeight: '600' }}>5.0 (0)</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
            <Typography className='simpleText'>Professional experience:</Typography>
            <Typography className='simpleText'>16 YRS</Typography>
          </Box>
          {!queryParams.get('publicProfileView') && (
            <Button
              onClick={() => {
                if (isEmpty(user)) {
                  navigate('/login');
                } else {
                  setOpenMessage(true);
                }
              }}
              disabled={user?.roles.some((e) => e.entityId === companyDetails.uid)}
              sx={{
                ...bottomBtnStyle,
                display: 'flex',
                marginTop: '1em',
                border: `1px solid ${
                  user?.roles.some((e) => e.entityId === companyDetails.uid) ? Color.bgGreyDark : Color.positive
                }`,
                color: user?.roles.some((e) => e.entityId === companyDetails.uid) ? Color.bgGreyDark : Color.positive,
              }}
            >
              Contact provider
            </Button>
          )}
          <Typography className='simpleText' sx={{ wordWrap: 'break-word' }}>
            {companyDetails.profile.detail.about}
          </Typography>
        </Box>
      </Box>
      {/*{!isEmpty(companyDetails['__awards']) && (*/}
      {/*  <Box className={'SellerInfoBox mt-01'}>*/}
      {/*    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>*/}
      {/*      <Typography sx={{ fontSize: '18px', fontWeight: '700' }}>Awards/Achievements</Typography>*/}
      {/*      {companyDetails['__awards'].length > 3 ? (*/}
      {/*        <>*/}
      {/*          {seeMoreAward ? (*/}
      {/*            <>*/}
      {/*              {companyDetails['__awards'].map((value: any, key: number) => (*/}
      {/*                <SellerProfileAwardCard awardDetail={value} key={key} />*/}
      {/*              ))}*/}
      {/*              <Button*/}
      {/*                onClick={() => setSeeMoreAward(!seeMoreAward)}*/}
      {/*                sx={{ color: Color.priBlue, textTransform: 'capitalize', marginTop: '15px' }}*/}
      {/*              >*/}
      {/*                See Less <AiOutlineArrowUp size={18} />*/}
      {/*              </Button>*/}
      {/*            </>*/}
      {/*          ) : (*/}
      {/*            <>*/}
      {/*              <SellerProfileAwardCard awardDetail={companyDetails['__awards'][0]} />*/}
      {/*              <SellerProfileAwardCard awardDetail={companyDetails['__awards'][1]} />*/}
      {/*              <Button*/}
      {/*                onClick={() => setSeeMoreAward(!seeMoreAward)}*/}
      {/*                sx={{ color: Color.priBlue, textTransform: 'capitalize', marginTop: '15px' }}*/}
      {/*              >*/}
      {/*                See All <AiOutlineArrowDown size={18} />*/}
      {/*              </Button>*/}
      {/*            </>*/}
      {/*          )}*/}
      {/*        </>*/}
      {/*      ) : (*/}
      {/*        <>*/}
      {/*          {companyDetails['__awards'].map((value: any, key: number) => (*/}
      {/*            <SellerProfileAwardCard awardDetail={value} key={key} />*/}
      {/*          ))}*/}
      {/*        </>*/}
      {/*      )}*/}
      {/*    </Box>*/}
      {/*  </Box>*/}
      {/*)}*/}
      {/*{companyDetails.profile.type !== companyProfiles.individual && !isEmpty(companyDetails['__employees']) && (*/}
      {/*  <Box className={'SellerInfoBox mt-01'}>*/}
      {/*    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>*/}
      {/*      <Typography sx={{ fontSize: '18px', fontWeight: '700' }}>Staffs</Typography>*/}
      {/*      {companyDetails['__employees'].length > 3 ? (*/}
      {/*        <>*/}
      {/*          {seeMore ? (*/}
      {/*            <>*/}
      {/*              {companyDetails['__employees'].map((value: any, key: number) => (*/}
      {/*                <SellerProfileStaffCard staffDetail={value} key={key} />*/}
      {/*              ))}*/}
      {/*              <Button*/}
      {/*                onClick={() => setSeeMore(!seeMore)}*/}
      {/*                sx={{ color: Color.priBlue, textTransform: 'capitalize', marginTop: '15px' }}*/}
      {/*              >*/}
      {/*                See Less <AiOutlineArrowUp size={18} style={{ marginBottom: '2px' }} />*/}
      {/*              </Button>*/}
      {/*            </>*/}
      {/*          ) : (*/}
      {/*            <>*/}
      {/*              <SellerProfileStaffCard staffDetail={companyDetails['__employees'][0]} />*/}
      {/*              <SellerProfileStaffCard staffDetail={companyDetails['__employees'][1]} />*/}
      {/*              <Button*/}
      {/*                onClick={() => setSeeMore(!seeMore)}*/}
      {/*                sx={{ color: Color.priBlue, textTransform: 'capitalize', marginTop: '15px' }}*/}
      {/*              >*/}
      {/*                See All <AiOutlineArrowDown size={18} style={{ marginBottom: '2px' }} />*/}
      {/*              </Button>*/}
      {/*            </>*/}
      {/*          )}*/}
      {/*        </>*/}
      {/*      ) : (*/}
      {/*        <>*/}
      {/*          {companyDetails['__employees'].map((value: any, key: number) => (*/}
      {/*            <SellerProfileStaffCard staffDetail={value} key={key} />*/}
      {/*          ))}*/}
      {/*        </>*/}
      {/*      )}*/}
      {/*    </Box>*/}
      {/*  </Box>*/}
      {/*)}*/}
    </Box>
  );
};
