// @flow
import React from 'react';
import { useAppSelector } from '../../../redux/hooks';

export const HiddenInputs = () => {
  const { packageCheckoutInfo } = useAppSelector((state) => state.mainState.buyerCatalog);
  return (
    <>
      <input type='hidden' name='currency' id='currency' value='SGD' />
      <input type='hidden' name='amount' value={packageCheckoutInfo.price.toFixed(2)} />
      <input type='hidden' name='orderid' value={packageCheckoutInfo.orderId} />
      <input type='hidden' name='merchant_id' value={packageCheckoutInfo.merchantId} />
      <input type='hidden' name='vkey' value={packageCheckoutInfo.vkey} />
      <input type='hidden' name='vcode' value={packageCheckoutInfo.vcode} />
      <input type='hidden' name='returnurl' value={packageCheckoutInfo.returnurl} />
      <input type='hidden' name='callbackurl' value={packageCheckoutInfo.callbackurl} />
      <input type='hidden' name='bill_name' value={packageCheckoutInfo.bill_name} />
      <input type='hidden' name='bill_email' value={packageCheckoutInfo.bill_email} />
      <input type='hidden' name='bill_mobile' value={packageCheckoutInfo.bill_mobile} />
      <input type='hidden' name='bill_desc' value={packageCheckoutInfo.bill_desc} />
    </>
  );
};
