import { Box, Divider, Typography } from '@mui/material';
import { isUndefined } from 'lodash';
import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useLazyFindOneInvoiceQuery } from '@/redux/apis/transactionApi.ts';
import CircularLoading from '../../../../common/components/circular-loading';
import EmptyUI from '../../../../common/components/empty-ui.component';
import MainLayout from '@/common/layout/main.layout';
import InvoiceDetailsDocument from './invoice-document';
import DocumentPrintInvoice from './invoice-print';
import { IInvoiceResponse } from '../order/types';
import { onExportButtonClick } from '../../../seller/financial-hub/src/utils/functions';
import { Color } from '@/theme.ts';
import { BoxContainer } from '@/common/styles';
import { ReactComponent as PrintIcon } from '../../../../assets/invoice/print-icon.svg';
import { ReactComponent as FileDownloadIcon } from '../../../../assets/icons/file-download.svg';
import './print.css';
import NavBar from '@/common/components/navbar';

type Props = {
  data: IInvoiceResponse | undefined | null;
};

const InvoicePayment = ({ data }: Props) => {
  const navigate = useNavigate();
  return (
    <Box>
      <NavBar />
      <Box
        sx={{
          width: '92%',
          display: 'block',
          maxWidth: '1280px',
          margin: '0px auto',
        }}
      >
        <Box sx={{ maxWidth: '1440px', marginInline: 'auto', display: 'grid', gridTemplateColumnd: '1fr' }}>
          {/* link  */}

          <Box className='print-hide' sx={{ display: 'flex', gap: '10px', mt: '36px', mb: '8px' }}>
            <Typography
              onClick={() => navigate('/account')}
              sx={{
                fontWeight: 600,
                fontSize: '12px',
                letterSpacing: '-0.5px',
                cursor: 'pointer',
                '&:hover': { color: Color.priBlue },
              }}
            >
              Account
            </Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '12px', letterSpacing: '-0.5px', cursor: 'pointer' }}>&gt;</Typography>
            <Typography
              onClick={() => navigate('/account/billing')}
              sx={{ fontWeight: 600, fontSize: '12px', letterSpacing: '-0.5px', cursor: 'pointer' }}
            >
              Billing management
            </Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '12px', letterSpacing: '-0.5px', cursor: 'pointer' }}>&gt;</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '12px', letterSpacing: '-0.5px', cursor: 'pointer' }}>
              Transaction details
            </Typography>
          </Box>
          {/* end link */}

          {/* first item */}
          <Box className='print-hide' sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', mb: '16px' }}>
            <Typography title='Print' sx={{ fontWeight: 700, fontSize: '24px', letterSpacing: '-0.02em' }}>
              {data?.id}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography onClick={() => window.print()} sx={{ cursor: 'pointer' }}>
                <PrintIcon />
              </Typography>
              <Divider orientation='vertical' variant='middle' sx={{ marginX: '16px', height: '24px', background: Color.line }} />
              <Typography
                sx={{ cursor: 'pointer' }}
                onClick={() =>
                  onExportButtonClick({
                    url: `/invoices`,
                    defaultParams: { join: ['items', 'items.transaction'] },
                    newParams: { id: { $eq: data?.id } },
                    exportType: 'pdf',
                  })
                }
              >
                <FileDownloadIcon />
              </Typography>
            </Box>
          </Box>
        </Box>
        <InvoiceDetailsDocument data={data} />
      </Box>
      <DocumentPrintInvoice data={data} />
    </Box>
  );
};

const BillingInvoiceOrder = () => {
  const [search] = useSearchParams();
  const [findOneInvoice, { isFetching }] = useLazyFindOneInvoiceQuery();
  const [invoice, setInvoice] = useState<IInvoiceResponse | null>(null);

  useEffect(() => {
    loadInvoice();
  }, []);

  const loadInvoice = async () => {
    const id = search.get('id') as string;
    const { data, isSuccess } = await findOneInvoice(id);
    if (isSuccess) {
      setInvoice(data);
    }
  };

  if (isFetching) {
    return <CircularLoading />;
  }
  // if (!isUndefined(isInvoiceError)) {
  //   return <DisplayError errorMsg={isInvoiceError as object} />;
  // }

  if (isUndefined(invoice)) {
    return (
      <MainLayout
        pageTitle='Billing'
        breadcrumb={[
          { label: 'Dashboard', path: '/account' },
          { label: 'Billing', path: '/account/billing' },
          { label: 'Transaction details' },
        ]}
      >
        <BoxContainer sx={{ height: '50vh' }}>
          <EmptyUI text='No result found' />
        </BoxContainer>
      </MainLayout>
    );
  }

  return <InvoicePayment data={invoice} />;
};

export default BillingInvoiceOrder;
