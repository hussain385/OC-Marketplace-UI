import React from 'react';
import { showToast, ToastTypes } from '../../../../common/utils';
import waitSec from '../../../../common/utils/helpers/setTimeout';
import { identityUserInfoTempDataUpdated, selectedEntityUpdated } from '../../../../redux/reducers/authReducers';
import { companySetupStepUpdated } from '@/redux/reducers/companySetupReducers';

export const singpassInfoMap = (
  setData: React.Dispatch<React.SetStateAction<{ title: string; value: string }[]>>,
  setOfficerData: React.Dispatch<React.SetStateAction<{ title: string; value: string }[]>>,
  verifying_status: any,
) => {
  setData([
    {
      title: 'UEN',
      value: verifying_status?.companyInfo?.uen,
    },
    {
      title: 'Entity name',
      value: verifying_status?.companyInfo?.companyName,
    },
    {
      title: 'Entity code',
      value: verifying_status?.companyInfo?.SSICNumber,
    },
    {
      title: 'Entity address',
      value: verifying_status?.companyInfo?.registerAddress,
    },
    {
      title: 'UEN status',
      value: 'REGISTERED',
    },
  ]);
  setOfficerData([
    {
      title: 'Full Name',
      value: verifying_status?.identificationName,
    },

    {
      title: 'ID',
      value: verifying_status?.identificationId,
    },
    {
      title: 'Nationality',
      value: verifying_status?.nationality,
    },
    // {
    //   title: 'Business role',
    //   value: verifying_status?.officerInfo ? verifying_status?.officerInfo?.position : '',
    // },
  ]);
};

export const singpassCompanySubmitHandler = async (
  refreshUserToken: any,
  refresh_token: string,
  dispatch: any,
  verifying_status: any,
  selectedOfficer: any,
  entitySetup: any,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigation: any,
  selectedEntityUid: string,
) => {
  await refreshUserToken({ refresh_token: refresh_token }).then(async (res: any) => {
    if ('error' in res) {
      showToast(res.error.data.message, ToastTypes.ERROR);
      dispatch(identityUserInfoTempDataUpdated({}));
      waitSec(2000);
      navigation('/login');
    }
    if (res.data) {
      const uid = selectedEntityUid;
      const data = {
        data: {
          profile: {
            type: 'LOCAL',
            'detail.name': verifying_status.companyInfo.companyName,
            'detail.registrationId': verifying_status.companyInfo.uen,
            'detail.firstAddress': verifying_status.companyInfo.registerAddress,
            'detail.officialEmail': verifying_status?.identificationEmail,
          },
          identity: {
            type: 'NATIONAL',
            'detail.code': verifying_status?.identificationId,
            'detail.fullname': verifying_status?.identificationName,
            'detail.nationality': verifying_status?.nationality,
          },
          currentStep: 2,
        },
      };
      const tempEntity: any = await entitySetup({ ...data, id: uid, token: res.data.access_token });
      if (tempEntity.data) {
        setLoading(false);
        dispatch(companySetupStepUpdated(1));
        dispatch(selectedEntityUpdated(tempEntity.data.data.updatedEntity));
        navigation(`/singpass/success?authPerson=${verifying_status.identificationName}`);
      }
    }
  });
};
