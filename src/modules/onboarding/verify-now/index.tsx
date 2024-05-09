/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { CompanyRegisterationWrapper } from '@/common/layout/company-registeration.wrapper';
import { Heading24, TextButton } from '@/common/styles';
import { Color } from '@/theme';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AvatarComponent from '@/common/components/navbar/avatar.component';
import countryData from '@/mock/country-info.json';
import { ICountrySelectInfo } from '@/common/interface/country-interface';
import VerifyAndChooseCountryComponent from '@/modules/onboarding/verify-now/components/verify-and-choose-country.component';
import VerifyNowFormComponent from '@/modules/onboarding/verify-now/components/verify-now-form.component';
import VerifyNowCompanyFormComponent from '@/modules/onboarding/verify-now/components/verify-now-company-form.component';
import VerifyNowLegalRepresentativeComponent from '@/modules/onboarding/verify-now/components/verify-now-legal-representative.component';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useNavigate } from '@/router';
import { mediaUrlGenerator } from '@/common/utils';
import { useSearchParams } from 'react-router-dom';
import { useGetEntityInfoQuery } from '@/redux/apis/marketplace';
import { selectEntityFromManage } from '@/redux/reducers/authReducers';

const VerifyNow = () => {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const dispatch = useAppDispatch();
  const { selectManageEntity, selectedEntity } = useAppSelector((state) => state.mainState.useInfo);
  const [verifyFormShow, setVerifyFormShow] = useState<boolean>(search.get('open') === 'form');
  const user = useAppSelector((state) => state.mainState?.useInfo.user);
  const entityUid = location.pathname.split('/').slice(-1)[0];
  const [selectedCountry, setSelectedCountry] = useState<ICountrySelectInfo | undefined>({
    name: 'Singapore',
    flag: '🇸🇬',
    code: 'SG',
    dial_code: '+65',
    region: 'North & South America',
  });
  const { data, error } = useGetEntityInfoQuery(
    {
      entityId: entityUid,
      queryObject: {
        populate: [
          { path: '__logo' },
          { path: '__mainIdentityMedia' },
          { path: '__backIdentityMedia' },
          { path: '__selfieIdentityMedia' },
          { path: '__proofOfResidenceMedias' },
        ],
      },
    },
    { refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    if (data && !error && (data as any)?.data.entity) {
      dispatch(selectEntityFromManage((data as any).data.entity));
    }
  }, [data]);

  useEffect(() => {
    setSelectedCountry(countryData.find((country) => country.name === 'Singapore'));
  }, [countryData]);

  useEffect(() => {
    if (selectManageEntity?.status === 'INVITING' && selectManageEntity?.identity?.detail?.ownerEmail === user?.email) {
      setVerifyFormShow(true);
    }
  }, [selectManageEntity]);

  return (
    <>
      <CompanyRegisterationWrapper wrapperStyle={{ background: 'white' }}>
        <Box sx={{ width: { xs: '100%', sm: '100%', md: '1340px' }, paddingInline: '1.5em' }}>
          <Box>
            <TextButton onClick={() => navigate('/account/entities')} sx={{ color: Color.textBlack, marginLeft: '-0.8em' }}>
              <ArrowBackIosIcon fontSize='small' />
              <span style={{ fontSize: '14px' }}>Back</span>
            </TextButton>
            <Heading24 sx={{ marginTop: '1em' }}>Verification</Heading24>
          </Box>
          <Box sx={{ display: 'flex', gap: '1em', alignItems: 'center', marginTop: '1em' }}>
            <AvatarComponent
              doNotShowBadge
              avatarName={selectManageEntity?.profile.detail.name[0]}
              src={selectManageEntity?.__logo ? mediaUrlGenerator(selectManageEntity.__logo) : ''}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                sx={{
                  fontSize: '14px !important',
                  fontWeight: '600',
                  marginTop: '5px',
                }}
              >
                {selectManageEntity?.profile.detail.name}
              </Typography>
              <Typography sx={{ color: Color.textHint, fontSize: '12px !important' }}>
                {selectManageEntity?.profile.type !== 'BUSINESS' ? ' Non-registered Individual' : 'Registered Business'}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '2em', flexDirection: 'column', width: '100%' }}>
            {verifyFormShow ? (
              (() => {
                switch (selectManageEntity?.profile.type) {
                  case 'FREELANCER':
                  case 'INDIVIDUAL':
                    return <VerifyNowFormComponent selectedCountry={selectedCountry} setVerifyFormShow={setVerifyFormShow} />;
                  case 'BUSINESS':
                    if (selectManageEntity.status === 'INVITING') {
                      return (
                        <VerifyNowLegalRepresentativeComponent
                          selectedCountry={selectedCountry}
                          setVerifyFormShow={setVerifyFormShow}
                        />
                      );
                    } else {
                      return (
                        <VerifyNowCompanyFormComponent selectedCountry={selectedCountry} setVerifyFormShow={setVerifyFormShow} />
                      );
                    }
                  default:
                    return null;
                }
              })()
            ) : (
              <VerifyAndChooseCountryComponent
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                setVerifyFormShow={setVerifyFormShow}
                selectedEntity={selectedEntity}
              />
            )}
          </Box>
        </Box>
      </CompanyRegisterationWrapper>
    </>
  );
};

export default VerifyNow;
