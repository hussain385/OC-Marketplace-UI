/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, CircularProgress, Typography } from '@mui/material';

import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import BackgroundBoxWrapper from '@/common/components/background-box.wrapper';

import PopupModalBox from '@/common/components/popup-modal-box';

import { IndividualStyles } from '@/common/styles/freelancer-verify-identity.styles';
import { useAppDispatch } from '@/redux/hooks';
import { Color } from '@/theme';
import { useRetrieveSingpassInfoMutation } from '@/redux/apis/authApi';
import { identityUserInfoTempDataUpdated } from '@/redux/reducers/authReducers';
import useQueryParams from '@/common/utils/hooks/useQueryParams';
import { useFilterOrganizationMutation } from '@/redux/apis/marketplace';
import usePayloadUseInfo from '@/common/utils/hooks/usePayloadUseInfo';

const SingpassRetrieveInfoBiz = () => {
  const [search] = useQueryParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // eslint-disable-next-line no-unused-vars
  const [verify, setVerify] = React.useState<boolean>(false);
  const [retrieveSingpassInfo, { data, isError }] = useRetrieveSingpassInfoMutation();
  const { verifying_status } = usePayloadUseInfo();
  const [filterOrganization] = useFilterOrganizationMutation();
  const initialized = useRef(false);

  useEffect(() => {
    const code = search.get('code');
    const state = search.get('state');

    if (!!code && !!state && !initialized.current) {
      initialized.current = true;
      retrieveSingpassInfo({
        code: code,
        state: state,
        route: 'myinfo-biz',
      });
    } else {
      dispatch(
        identityUserInfoTempDataUpdated({
          isRetrieve: false,
        }),
      );
      navigate('/singpass-review');
    }
  }, [dispatch, navigate, retrieveSingpassInfo, search]);

  useEffect(() => {
    if (isError) {
      dispatch(
        identityUserInfoTempDataUpdated({
          isRetrieve: false,
        }),
      );
      navigate('/singpass-review');
    }
  }, [dispatch, isError, navigate]);

  useEffect(() => {
    if (data) {
      const resData = data.entity;
      const resDataPerson = data.person;

      const objRes = {
        basicProfiles: resData?.['basic-profile'],
        appointment: resData.appointments,
        addresses: resData.addresses?.['addresses-list']?.[0],
        singpass_id: resDataPerson?.uinfin?.value,
        sessionId: data.sessionId,
      };

      filterOrganization({
        type: 'LOCAL',
        uen: objRes.basicProfiles?.uen?.value,
      }).then((res) => {
        if ('data' in res) {
          const entities = res?.data?.data?.entities;

          if (!isEmpty(entities)) {
            dispatch(
              identityUserInfoTempDataUpdated({
                ...verifying_status,
                isRetrieve: false,
                isExisted: true,
              }),
            );
            navigate('/singpass-review');
            setVerify(true);
          } else {
            const combinedAddress = objRes.addresses?.block?.value
              .concat(' ' + objRes.addresses?.building?.value)
              .concat(' ' + objRes.addresses?.floor?.value)
              .concat(' ' + objRes.addresses?.postal?.value)
              .concat(' ' + objRes.addresses?.street?.value)
              .concat(' ' + objRes.addresses?.unit?.value);

            const values = {
              uen: resData?.['basic-profile']?.uen?.value,
              SSICNumber: resData?.['basic-profile']?.['primary-activity']?.code,
              registerAddress: combinedAddress,
              companyName: resData?.['basic-profile']?.['entity-name']?.value,
            };

            const isExist = objRes.appointment?.['appointments-list']?.some(
              (value: any) => value?.['person-reference']?.idno?.value === objRes.singpass_id,
            );

            if (isExist) {
              objRes.appointment?.['appointments-list']
                ?.filter((value: any) => value?.['person-reference']?.idno?.value === objRes.singpass_id)
                .map((user: any) => {
                  dispatch(
                    identityUserInfoTempDataUpdated({
                      ...verifying_status,
                      companyInfo: values,
                      isRetrieve: true,
                      isExisted: false,
                      basicProfiles: objRes.basicProfiles,
                      appointment: objRes.appointment,
                      addresses: objRes.addresses,
                      identificationName: user?.['person-reference']?.['person-name']?.value,
                      identificationEmail: user?.['corppass-email']?.value,
                      nationality: user?.['person-reference']?.nationality?.desc,
                      identificationId: user?.['person-reference']?.idno?.value,
                      singpassId: objRes.sessionId,
                    }),
                  );
                });
            } else {
              dispatch(
                identityUserInfoTempDataUpdated({
                  ...verifying_status,
                  companyInfo: values,
                  isRetrieve: true,
                  isExisted: false,
                  basicProfiles: objRes.basicProfiles,
                  identificationName: resDataPerson?.name?.value,
                  nationality: resDataPerson?.nationality?.desc,
                  identificationId: resDataPerson?.uinfin?.value,
                  appointment: objRes.appointment,
                  addresses: objRes.addresses,
                  singpassId: objRes.sessionId,
                }),
              );
            }
          }
        } else {
          dispatch(
            identityUserInfoTempDataUpdated({
              isRetrieve: false,
              isExisted: false,
            }),
          );
        }

        setVerify(true);
        navigate('/singpass-review');
      });
    }
  }, [data, dispatch, filterOrganization, navigate, verifying_status]);

  return (
    <BackgroundBoxWrapper onCustomStyles={IndividualStyles.backgroundWrapperImage}>
      <PopupModalBox
        parentStyle={{ background: 'transparent' }}
        childrenStyle={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress sx={{ color: Color.textHint, fontWeight: 400 }} size={60} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant='caption' component='h6' color='text.secondary'>
              Loading
            </Typography>
          </Box>
        </Box>
      </PopupModalBox>
    </BackgroundBoxWrapper>
  );
};

export default SingpassRetrieveInfoBiz;
