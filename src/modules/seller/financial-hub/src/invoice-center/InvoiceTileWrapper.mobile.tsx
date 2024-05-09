import React, { useEffect } from 'react';
import { IInvoiceCenterResponse } from '@/modules/seller/financial-hub/src/interface/invoice-center-interface.ts';
import InvoiceTileMobile from '@/modules/seller/financial-hub/src/invoice-center/InvoiceTile.mobile.tsx';
import { useList } from 'react-use';

interface IInvoiceTileWrapperMobile {
  invoices: IInvoiceCenterResponse[];
  onSelectionChange: (selection: string[]) => void;
}

function InvoiceTileWrapperMobile({ invoices, onSelectionChange }: IInvoiceTileWrapperMobile) {
  const [selected, { push, removeAt }] = useList<string>();

  useEffect(() => {
    onSelectionChange(selected);
  }, [onSelectionChange, selected]);

  return (
    <>
      {invoices.map((i, index) => (
        <InvoiceTileMobile
          key={i.id}
          invoice={i}
          onChange={(s) => {
            if (s) {
              push(i.id);
            } else {
              removeAt(index);
            }
          }}
        />
      ))}
    </>
  );
}

export default InvoiceTileWrapperMobile;
