// @flow
import { boolean, object, string } from 'yup';
import { isEmpty } from 'lodash';
import { IPackagePrice } from '../../../../common/interface/service-interface';

type Props = {
  packages: number[];
  packagePrices: IPackagePrice;
};

export const ServicesSchema = ({ packages, packagePrices }: Props) => {
  return object().shape({
    package1: object().shape({
      name: string().test('title', 'This field must not be empty.', (value, testContext) => {
        return testContext.parent.status && !testContext.parent.isContactFirst ? !isEmpty(value) : true;
      }),
      description: string().test('description', 'This field must not be empty.', (value, testContext) => {
        return testContext.parent.status ? !isEmpty(value) : true;
      }),
      deliveryDays: string().test('deliveryDays', 'This field must not be empty.', (value, testContext) => {
        return testContext.parent.status && !testContext.parent.isContactFirst
          ? testContext.parent.paymentType === 'SUBSCRIPTION'
            ? true
            : !isEmpty(value)
          : true;
      }),
      paymentType: string().test('paymentType', 'This field must not be empty.', (value, testContext) => {
        return testContext.parent.status && !testContext.parent.isContactFirst ? !isEmpty(value) : true;
      }),
      maxRevision: string().test('maxRevision', 'This field must not be empty.', (value, testContext) => {
        return testContext.parent.status && !testContext.parent.isContactFirst ? !isEmpty(value) : true;
      }),
      prerequisite: string(),
      price: string()
        .test('price', 'This field must not be empty.', (value, testContext) => {
          return testContext.parent.status && !testContext.parent.isContactFirst ? !isEmpty(value) : true;
        })
        .test('priceLimit', 'Price should not exceed $2000', (value, context) =>
          context.parent.status && !context.parent.isContactFirst ? Number(value) <= 10000 : true,
        ),
      status: boolean(),
      isContactFirst: boolean(),
    }),
    package2:
      packages.length >= 2
        ? object().shape({
            name: string().test('title', 'This field must not be empty.', (value, testContext) => {
              return testContext.parent.status && !testContext.parent.isContactFirst ? !isEmpty(value) : true;
            }),
            description: string().test('description', 'This field must not be empty.', (value, testContext) => {
              return testContext.parent.status && !testContext.parent.isContactFirst ? !isEmpty(value) : true;
            }),
            paymentType: string().test('paymentType', 'This field must not be empty.', (value, testContext) => {
              return testContext.parent.status && !testContext.parent.isContactFirst ? !isEmpty(value) : true;
            }),
            deliveryDays: string().test('deliveryDays', 'This field must not be empty.', (value, testContext) => {
              return testContext.parent.status && !testContext.parent.isContactFirst
                ? testContext.parent.paymentType === 'SUBSCRIPTION'
                  ? true
                  : !isEmpty(value)
                : true;
            }),
            maxRevision: string().test('maxRevision', 'This field must not be empty.', (value, testContext) => {
              return testContext.parent.status && !testContext.parent.isContactFirst ? !isEmpty(value) : true;
            }),
            prerequisite: string(),
            price: string()
              .test('deliveryDays', 'This field must not be empty.', (value, testContext) => {
                return testContext.parent.status && !testContext.parent.isContactFirst ? !isEmpty(value) : true;
              })
              .test('priceLimit', 'Price should not exceed $2000', (value, context) =>
                context.parent.status && !context.parent.isContactFirst ? Number(value) <= 10000 : true,
              ),
            status: boolean(),
            isContactFirst: boolean(),
          })
        : object().shape({
            name: string(),
            description: string(),
            deliveryDays: string(),
            prerequisite: string(),
            price: string(),
          }),
    package3:
      packages.length >= 3
        ? object().shape({
            name: string().test('title', 'This field must not be empty.', (value, testContext) => {
              return testContext.parent.status && !testContext.parent.isContactFirst ? !isEmpty(value) : true;
            }),
            description: string().test('description', 'This field must not be empty.', (value, testContext) => {
              return testContext.parent.status && !testContext.parent.isContactFirst ? !isEmpty(value) : true;
            }),
            maxRevision: string().test('maxRevision', 'This field must not be empty.', (value, testContext) => {
              return testContext.parent.status && !testContext.parent.isContactFirst ? !isEmpty(value) : true;
            }),
            deliveryDays: string().test('deliveryDays', 'This field must not be empty.', (value, testContext) => {
              return testContext.parent.status && !testContext.parent.isContactFirst
                ? testContext.parent.paymentType === 'SUBSCRIPTION'
                  ? true
                  : !isEmpty(value)
                : true;
            }),
            paymentType: string().test('paymentType', 'This field must not be empty.', (value, testContext) => {
              return testContext.parent.status && !testContext.parent.isContactFirst ? !isEmpty(value) : true;
            }),
            prerequisite: string(),
            price: string()
              .test('deliveryDays', 'This field must not be empty.', (value, testContext) => {
                return testContext.parent.status && !testContext.parent.isContactFirst ? !isEmpty(value) : true;
              })
              .test('priceLimit', 'Price should not exceed $2000', (value, context) =>
                context.parent.status && !context.parent.isContactFirst ? Number(value) <= 10000 : true,
              ),
            status: boolean(),
            isContactFirst: boolean(),
          })
        : object().shape({
            name: string(),
            description: string(),
            deliveryDays: string(),
            prerequisite: string(),
            price: string(),
          }),
  });
};
