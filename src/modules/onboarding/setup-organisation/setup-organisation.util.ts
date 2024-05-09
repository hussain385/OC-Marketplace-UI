import React from 'react';
import { pictureCustomName, showToast, ToastTypes } from '../../../common/utils';
import waitSec from '../../../common/utils/helpers/setTimeout';
import { identityUserInfoTempDataUpdated, selectedEntityUpdated } from '../../../redux/reducers/authReducers';

export const signaporeComapnyConditions = (
  setData: React.Dispatch<React.SetStateAction<{ title: string; value: string }[]>>,
  setOfficerData: React.Dispatch<React.SetStateAction<{ title: string; value: string }[]>>,
  verifying_status: any,
  authPerson: boolean,
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
  ]);
  if (authPerson) {
    setOfficerData([
      {
        title: 'Full Name',
        value: verifying_status?.identificationName,
      },
      {
        title: 'Nationality',
        value: 'Singapore',
      },
      {
        title: 'ID',
        value: verifying_status?.officerInfo ? verifying_status?.officerInfo?.officerId : '',
      },
      {
        title: 'Business role',
        value: verifying_status?.officerInfo ? verifying_status?.officerInfo?.position : '',
      },
    ]);
  } else {
    setOfficerData([
      {
        title: 'Full Name',
        value: verifying_status?.identificationName,
      },
      {
        title: 'Email',
        value: verifying_status?.email,
      },
    ]);
  }
};

export const nonSignaporeComapnyConditions = (
  setData: React.Dispatch<React.SetStateAction<{ title: string; value: string }[]>>,
  setOfficerData: React.Dispatch<React.SetStateAction<{ title: string; value: string }[]>>,
  verifying_status: any,
  authPerson: boolean,
) => {
  setData([
    {
      title: 'Company registration number(CRN)',
      value: verifying_status.companyInfo.crn_num,
    },
    {
      title: 'Entity name',
      value: verifying_status.companyInfo.entity_name,
    },
    {
      title: 'Entity type',
      value: verifying_status.companyInfo.entity_type,
    },
    {
      title: 'Operation address 1',
      value: verifying_status.companyInfo.address1,
    },
    {
      title: 'Operation address 2',
      value: verifying_status.companyInfo.address2,
    },
    {
      title: 'Country',
      value: verifying_status.companyInfo.country,
    },
    {
      title: 'State / Province',
      value: verifying_status.companyInfo.state,
    },
    {
      title: 'City',
      value: verifying_status.companyInfo.city,
    },
    {
      title: 'Postal code',
      value: verifying_status.companyInfo.postal_code,
    },
  ]);
  if (authPerson) {
    setOfficerData([
      {
        title: 'Full Name',
        value: verifying_status.identificationName,
      },
      {
        title: 'Nationality',
        value: verifying_status.nationality,
      },
      {
        title: 'Identification number',
        value: verifying_status.identificationNumber,
      },
      {
        title: 'Business role',
        value: verifying_status.role,
      },
    ]);
  } else {
    setOfficerData([
      {
        title: 'Full Name',
        value: verifying_status.identificationName,
      },
      {
        title: 'Email',
        value: verifying_status.email,
      },
    ]);
  }
};

export const companyInviteSubmitHandler = async (
  refreshUserToken: any,
  refresh_token: string,
  dispatch: any,
  verifying_status: any,
  uploadUserVerificationMedia: any,
  entitySetup: any,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigation: any,
  authPerson: boolean,
  selectedEntityUid: string,
  step: number,
) => {
  await refreshUserToken({ refresh_token: refresh_token }).then(async (res: any) => {
    if ('error' in res) {
      showToast(res.error.data.message, ToastTypes.ERROR);
      dispatch(identityUserInfoTempDataUpdated({}));
      await waitSec(2000);
      navigation('/login');
    }
    if (res.data) {
      const promises: any[] = [];
      verifying_status.dataUrl.forEach((value: any, key: number) => {
        promises.push(
          (() => {
            const formData = new FormData();
            formData.append('media', pictureCustomName(value, `id-photo${key + 1}`, selectedEntityUid) as File);
            formData.append('type', 'ENTITIES');
            formData.append('resourceId', selectedEntityUid);
            formData.append(
              'target',
              key === 0
                ? 'mainMedia'
                : key === 1
                ? `${verifying_status.documentType === 'NATIONAL' ? 'backMedia' : 'selfieMedia'}`
                : 'selfieMedia',
            );
            return uploadUserVerificationMedia({ data: formData });
          })(),
        );
      });

      await Promise.all(promises).then(async (result) => {
        const data = {
          data: {
            identity: {
              type: verifying_status.documentType,
              'detail.fullname': verifying_status.identificationName,
              'detail.code': verifying_status.identificationNumber,
              'detail.nationality': verifying_status.nationality,
            },
            currentStep: step,
            status: 'PENDING',
          },
        };

        // Call `entitySetup` API after all promises in `promises` are resolved or rejected
        const tempEntity: any = await entitySetup({
          ...data,
          id: selectedEntityUid,
          token: res.data.access_token,
        });
        if (tempEntity.data) {
          dispatch(selectedEntityUpdated(tempEntity.data.data.updatedEntity));
          setLoading(false);
          navigation(`/setup-organisation/success${!authPerson ? `?authPerson=${verifying_status.identificationName}` : ''}`);
        } else {
          setLoading(false);
        }
      });
    }
  });
};
