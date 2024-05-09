// @flow
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Color } from '@/theme';
import { useForm } from 'react-hook-form';
import { storePictures } from '../../account/company-profile/company-profile.util';
import { isEmpty, isNull, isUndefined } from 'lodash';
import { useLazyGetCategoriesQuery } from '@/redux/apis/catalogApi';
import { WrapperMain } from '@/common/styles/navbar.styles';
import { AppThemeBtnComponent } from '@/common/components/app-theme-btn.component';
import { useCreateServiceMutation, useUpdateServicesMutation } from '@/redux/apis/marketplace';
import { showToast, ToastTypes } from '../../../../common/utils';
import ServiceImageComponent from '../../common-service-components/service-image.component';
import AboutServiceComponent from '../../common-service-components/about-service.component';
import ServiceCategorySelectComponent from '../../common-service-components/service-category-select.component';
import ServiceTitleComponent from '../../common-service-components/service-title.component';
import { yupResolver } from '@hookform/resolvers/yup';
import { ServicesSchema } from '../../common-service-components/overview-service.schema';
import useGetServiceInfo from '../../hooks/useGetServiceInfo';
import { allCategoriesUpdateAction } from '@/redux/reducers/catalogReducer';
import { serviceSetupUpdated } from '@/redux/reducers/companySetupReducers';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import QuitEditingModalComponent from '@/modules/seller/manage-listing/component/quit-editing-modal.component';
import RepresentativePersonComponent from '@/modules/seller/manage-listing/component/representative-person.component';
import { useNavigate } from 'react-router-dom';

type Props = {
  updateStepCount: (value: number) => void;
  step: number;
  isPreview?: boolean;
};

export const subText = {
  fontWeight: '400',
  fontSize: '12px',
  color: '#7E7E7E',
  marginTop: '0.5em',
  width: '100%',
  maxWidth: '1440px',
  letterSpacing: '-0.5px',
};
export const OverviewView = ({ updateStepCount, step }: Props) => {
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [imageLoop, setImageLoop] = useState<{ id: number; image: string; name: string }[]>([
    { id: 0, image: '', name: 'image' },
  ]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.mainState.useInfo);
  const { serviceData } = useAppSelector((state) => state.mainState.companySetup);
  const [handleSubCategoriesRequest] = useLazyGetCategoriesQuery();
  const [createService, { error: serviceSetupError, isLoading }] = useCreateServiceMutation();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [updateServices, { error: serviceUpdateError, isLoading: updateIsLoading }] = useUpdateServicesMutation();
  const isEdit = useMemo(
    () => serviceData.edit && serviceData.step > 3,
    [serviceData.edit, serviceData.status, serviceData.step],
  );

  const individualEntityId = useMemo(() => (user ? user.id : ''), [user]);

  useEffect(() => {
    if (!isUndefined(serviceSetupError)) {
      const message = serviceSetupError as any;
      showToast(message.data.message, ToastTypes.ERROR);
      setSaveLoading(false);
    }
    if (!isUndefined(serviceUpdateError)) {
      const message = serviceUpdateError as any;
      showToast(message.data.message, ToastTypes.ERROR);
      setSaveLoading(false);
    }
  }, [serviceSetupError, serviceUpdateError]);

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isDirty },
  } = useForm<any>({
    resolver: yupResolver(ServicesSchema(imageLoop)),
    defaultValues: {
      servicePic1: [],
      servicePic2: [],
      servicePic3: [],
      servicePic4: [],
      subCategory: '',
      category: '',
      supporterId: individualEntityId,
      description: serviceData.about,
      name: serviceData.title,
    },
  });
  useGetServiceInfo({ setValue: setValue });

  useEffect(() => {
    const fetchCategories = async () => {
      await handleSubCategoriesRequest({}).then(({ data }) => {
        if (data) {
          dispatch(allCategoriesUpdateAction(data.data));
        }
      });
    };
    fetchCategories().then(null);
    if (!isEmpty(serviceData.servicePic)) {
      setImageLoop([]);
      serviceData.servicePic.forEach((pic: { picUrl: string; uid: string }, key: number) => {
        setImageLoop((prevState) => [...prevState, { id: key, image: pic.picUrl, name: pic.uid }]);
      });
      setImageLoop((prevState) => [...prevState, { id: prevState.length, image: '', name: 'image' }]);
    }
  }, [serviceData]);

  const onSubmitHandler = async (data: any, quitModalSubmit?: boolean) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('categoryL1', data.category);
    formData.append('categoryL2', data.subCategory);
    formData.append('supporters', `["${data.supporterId}"]`);
    if (imageLoop[0] && !isEmpty(imageLoop[0]?.image)) {
      formData.append(`medias.0`, await storePictures(`service0`, `${imageLoop[0]?.image}`, serviceData.uid, true));
    }
    if (imageLoop[1] && !isEmpty(imageLoop[1]?.image)) {
      formData.append(`medias.1`, await storePictures(`service1`, `${imageLoop[1]?.image}`, serviceData.uid, true));
    }
    if (imageLoop[2] && !isEmpty(imageLoop[2]?.image)) {
      formData.append(`medias.2`, await storePictures(`service2`, `${imageLoop[2]?.image}`, serviceData.uid, true));
    }
    if (imageLoop[3] && !isEmpty(imageLoop[3]?.image)) {
      formData.append(`medias.3`, await storePictures(`service3`, `${imageLoop[3]?.image}`, serviceData.uid, true));
    }
    if (serviceData.edit) {
      try {
        const latestServiceInfo = await updateServices({ body: formData, serviceId: serviceData.uid }).unwrap();
        dispatch(
          serviceSetupUpdated({
            ...serviceData,
            uid: latestServiceInfo.id,
            servicePic: imageLoop.map((picInfo) => ({ picUrl: picInfo.image, uid: picInfo.name })),
            step: latestServiceInfo.step,
            categories: latestServiceInfo.categories.map((c: { id: string }) => c.id),
            about: latestServiceInfo.description && !isNull(latestServiceInfo.description) ? latestServiceInfo.description : '',
            title: latestServiceInfo.name && !isNull(latestServiceInfo.name) ? latestServiceInfo.name : '',
            status: latestServiceInfo.status,
          }),
        );
        if (quitModalSubmit) {
          navigate('/account/manage-listing');
        }
        updateStepCount(step + 1);
      } catch (e) {
        return;
      }
    } else {
      try {
        const newServiceInfo = await createService({ data: formData }).unwrap();
        if (newServiceInfo) {
          dispatch(
            serviceSetupUpdated({
              edit: true,
              uid: newServiceInfo.id,
              servicePic: imageLoop.map((picInfo) => ({ picUrl: picInfo.image, uid: picInfo.name })),
              step: newServiceInfo.step,
              categories: newServiceInfo.categories.map((c: { id: string }) => c.id),
              about: newServiceInfo.description && !isNull(newServiceInfo.description) ? newServiceInfo.description : '',
              title: newServiceInfo.name && !isNull(newServiceInfo.name) ? newServiceInfo.name : '',
              status: newServiceInfo.status,
              package1: undefined,
              package2: undefined,
              package3: undefined,
            }),
          );
          if (quitModalSubmit) {
            navigate('/account/manage-listing');
          }
          updateStepCount(step + 1);
        }
      } catch (e) {
        return;
      }
    }
  };

  const listingEdit = serviceData.edit && !['DISABLE', 'DRAFT'].includes(serviceData.status) && serviceData.step > 2;

  return (
    <Box sx={{ position: 'relative' }}>
      <WrapperMain>
        <form onSubmit={handleSubmit((data) => onSubmitHandler(data, false))} noValidate>
          <Box
            sx={{
              width: '100%',
              maxWidth: '55em',
              margin: '0 auto',
              height: 'auto',
              paddingBottom: '20px',
            }}
          >
            <Box
              sx={{
                gap: '8px',
                paddingTop: { xs: '24px', sm: '41.5px' },
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={(theme) => ({
                  fontSize: '24px',
                  fontWeight: 'bold',
                  lineHeight: 'normal',
                  letterSpacing: '-0.48px',
                  color: Color.textBlack,

                  [theme.breakpoints.down(321)]: {
                    fontSize: '21px',
                  },
                })}
              >
                Service overview
              </Typography>
            </Box>
            <ServiceTitleComponent errors={errors} control={control} />
            <ServiceCategorySelectComponent errors={errors} control={control} setValue={setValue} />
            <AboutServiceComponent errors={errors} control={control} />
            <RepresentativePersonComponent errors={errors} control={control} />
            <ServiceImageComponent
              imageLoop={imageLoop}
              setValue={setValue}
              setImageLoop={setImageLoop}
              setError={setError}
              errors={errors}
              control={control}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                width: '100%',
                gap: '1em',
                justifyContent: 'center',
              }}
            >
              <AppThemeBtnComponent
                type='button'
                onClick={() => setOpenModal(true)}
                customButtonStyle={{
                  height: '40px',
                  border: `1px solid ${isEdit ? Color.priRed : Color.bgGreyDark}`,
                  display: { xs: 'block', md: isEdit ? 'none' : 'block' },
                }}
                color={isEdit ? Color.priRed : Color.bgGreyDark}
                backgroundColor={'white'}
                width={{ xs: '100%', md: '40%' }}
                fontSize={'14px'}
                text={!isEdit ? 'Cancel' : 'Quit editing'}
                hover={'#ffffff'}
              />
              {isEdit && (
                <AppThemeBtnComponent
                  type='button'
                  onClick={() => navigate(`/service-detail/${serviceData.uid}`, { state: { id: serviceData.uid } })}
                  customButtonStyle={{ height: '40px', border: `1px solid ${Color.positive}` }}
                  color={Color.positive}
                  backgroundColor={'white'}
                  width={{ xs: '100%', md: '40%' }}
                  fontSize={'14px'}
                  text={'Preview'}
                  hover={'#ffffff'}
                />
              )}
              <AppThemeBtnComponent
                type='submit'
                disabled={updateIsLoading || isLoading}
                customButtonStyle={{ height: '40px' }}
                color={updateIsLoading || isLoading ? Color.textBlack : Color.priWhite}
                backgroundColor={updateIsLoading || isLoading ? Color.bgGreyLight : Color.priBlue}
                width={{ xs: '100%', md: '40%' }}
                fontSize={'14px'}
                text={updateIsLoading || isLoading ? 'Please wait...' : listingEdit ? 'Save' : 'Save and continue'}
                hover={Color.textHint}
              />
            </Box>
            <QuitEditingModalComponent
              openModal={openModal}
              setOpenModal={setOpenModal}
              onSave={handleSubmit((data) => onSubmitHandler(data, true))}
              saveLoading={saveLoading}
              isDirty={isDirty}
            />
          </Box>
        </form>
      </WrapperMain>
    </Box>
  );
};
