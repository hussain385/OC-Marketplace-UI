import { useEffect, useMemo } from 'react';
import { isEmpty, isNil, isNull, isUndefined } from 'lodash';
import {
  IMilestoneState,
  IPackage,
  IRequirementRes,
  IRequirementState,
} from '@/common/interface/busines-company-profile-interface';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useGetOverViewOfServicesQuery } from '@/redux/apis/catalogApi';
import { resetCompanySetupData, serviceSetupUpdated } from '@/redux/reducers/companySetupReducers';
import { IMilestoneResponse, IPackagePrice } from '@/common/interface/service-interface';
import { capitalize } from '@/common/utils';

type hooksPropType = {
  setValue?: any;
  setImageLoop?: (img: any[]) => void;
  setPackagePrices?: React.Dispatch<React.SetStateAction<IPackagePrice>>;
  setPackages?: React.Dispatch<React.SetStateAction<number[]>>;
  setRequirementData?: React.Dispatch<React.SetStateAction<IRequirementState[]>>;
  newQuery?: boolean;
};

const useGetServiceInfo = ({ setValue, setPackages, setPackagePrices, setRequirementData, newQuery }: hooksPropType) => {
  const dispatch = useAppDispatch();
  const { serviceData } = useAppSelector((state) => state.mainState.companySetup);
  const joinServiceQuery = useMemo(
    () => [
      'packages',
      'entity.profile',
      'requirements',
      'packages.milestones',
      'packages.milestones.items',
      'categories',
      `${newQuery}`,
    ],
    [newQuery],
  );
  const { data } = useGetOverViewOfServicesQuery(
    {
      code: serviceData.uid,
      queryObject: {
        join: joinServiceQuery,
      },
    },
    { refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    if (!isUndefined(data) && !isEmpty(serviceData.uid)) {
      if (!isEmpty(data.data)) {
        const service = data.data;
        const pic: { picUrl: string; uid: string }[] = [];
        service.medias.forEach((media: any) => {
          const { protocol, domain, container, uid } = media;
          pic.push({ picUrl: `${protocol}://${domain}/${container}/${uid}`, uid: uid });
        });
        setPackages && setPackages([]);
        const requirements: IRequirementState[] = service.requirements.map((requirement: IRequirementRes) => ({
          id: requirement.id,
          type: capitalize(requirement.type.replace('_', ' ').toLowerCase()),
          question: requirement.question,
          no: requirement.no,
          options: requirement.options,
          isAllowMultipleChoice: isNull(requirement.isAllowMultipleChoice) ? false : requirement.isAllowMultipleChoice,
          edit: false,
          isRequired: requirement.isRequired,
        }));
        setRequirementData && setRequirementData(requirements);
        const plans: IPackage[] = service.packages.map((serviceInfo: any) => {
          const milestone: IMilestoneState[] = serviceInfo.milestones.map((value: IMilestoneResponse) => ({
            price: value.items?.find((item) => item.type === 'PAYMENT')?.price ?? 0,
            deliverable: value.items?.find((item) => item.type === 'DELIVERABLE')?.deliverableText ?? '',
            inverted: !isUndefined(value.items?.find((item) => item.type === 'INITIAL_DEPOSIT')),
            id: value.no,
            duration: value.items?.find((item) => item.type === 'DELIVERABLE')?.deliveryDays ?? '',
            uid: value.id ?? '',
            isEscrow: value.items?.find((item) => item.type === 'PAYMENT')?.isEscrow ?? false,
            initialDepositPrice: value.items?.find((item) => item.type === 'INITIAL_DEPOSIT')?.price ?? 0,
            initialDepositId: value.items?.find((item) => item.type === 'INITIAL_DEPOSIT')?.id,
          }));
          return {
            id: serviceInfo.id,
            name: serviceInfo.name,
            no: serviceInfo.no,
            description: serviceInfo.description ? serviceInfo.description : '',
            deliveryDays: serviceInfo.deliveryDays ? serviceInfo.deliveryDays : '',
            prerequisite: serviceInfo.prerequisite ? serviceInfo.prerequisite : '',
            price: serviceInfo.price ?? '',
            isContactFirst: serviceInfo.isContactFirst ? serviceInfo.isContactFirst : false,
            maxRevision: serviceInfo.maxRevision ? serviceInfo.maxRevision : '',
            paymentFrequency: serviceInfo.paymentFrequency ? serviceInfo.paymentFrequency : '',
            subscriptionCount: serviceInfo.subscriptionCount ? serviceInfo.subscriptionCount : '',
            paymentType: serviceInfo.paymentType ? serviceInfo.paymentType : '',
            status: serviceInfo.status === 'ACTIVE',
            currency: 'SGD',
            milestones: milestone,
          };
        });
        setValue && setValue('name', service.name && !isNull(service.name) ? service.name : '');
        setValue &&
          setValue(
            'category',
            service.categories && service.categories.find((value: { id: string; level: number }) => value.level === 1)
              ? service?.categories?.find((value: { id: string; level: number }) => value.level === 1)?.id
              : '',
          );
        setValue &&
          setValue(
            'subCategory',
            service.categories && service.categories.find((value: { id: string; level: number }) => value.level === 2)
              ? service.categories?.find((value: { id: string; level: number }) => value.level === 2)?.id
              : '',
          );
        setValue && setValue('description', service.description && !isNull(service.description) ? service.description : '');
        setValue &&
          setValue('supporterId', isEmpty(service.supporters) || isNil(service.supporters) ? '' : service.supporters[0]);
        for (const x of Array(3).keys()) {
          if (!isUndefined(plans.find((value) => Number(value.no) === x + 1))) {
            setValue &&
              setValue(`package${x + 1}`, {
                ...plans.find((value) => Number(value.no) === x + 1),
              });
            setPackagePrices &&
              setPackagePrices((prevState) => ({
                ...prevState,
                [`package${x + 1}`]: plans.find((value) => Number(value.no) === x + 1)?.price ?? 0,
              }));
            setPackages && setPackages((prevState) => [...prevState, prevState.length]);
          }
        }
        setPackages && setPackages((prevState) => (isEmpty(prevState) ? [0] : prevState));
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
            package1: isUndefined(plans.find((value) => Number(value.no) === 1))
              ? undefined
              : plans.find((value) => Number(value.no) === 1),
            package2: isUndefined(plans.find((value) => Number(value.no) === 2))
              ? undefined
              : plans.find((value) => Number(value.no) === 2),
            package3: isUndefined(plans.find((value) => Number(value.no) === 3))
              ? undefined
              : plans.find((value) => Number(value.no) === 3),
          }),
        );
      } else {
        dispatch(resetCompanySetupData());
      }
    }
  }, [data]);
};

export default useGetServiceInfo;
