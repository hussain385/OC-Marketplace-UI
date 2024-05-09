/* eslint-disable @typescript-eslint/no-explicit-any */

export let validPhoneNumber = false;

export const ValidatePhoneNumber = (inputNumber: string, country: any, isDirty: boolean) => {
  if (isDirty) {
    if (inputNumber && inputNumber?.replace(country.dialCode, '')?.trim() === '') {
      validPhoneNumber = false;
      return false;
    }
    validPhoneNumber = true;
    return true;
  }
  validPhoneNumber = false;
  return false;
};
