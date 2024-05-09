import React from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { Typography } from '@mui/material';
import { Color } from '@/theme.ts';

const LegalRepresentativeApproval = () => {
  return (
    <>
      <Typography sx={{ marginBottom: '2em', lineHeight: '1.5', fontSize: '15px' }}>
        Users who are verified or awaiting verification won&apos;t need to re-submit identification. To approve this business
        account, simply submit this form.
      </Typography>
      <Typography
        sx={{
          fontSize: '14px !important',
          fontWeight: '600',
          maxWidth: { xs: '100%', md: '645px' },
          marginTop: '1em',
          cursor: 'pointer',
        }}
      >
        <AiFillCheckCircle fontSize={20} color={Color.priBlue} />
        {'  '}By clicking Submit, you agree to OPNCORP&apos;s{' '}
        <a target='_blank' href='/terms-conditions' style={{ color: Color.priBlue }}>
          Terms and conditions
        </a>{' '}
        and{' '}
        <a target='_blank' href='/privacy-policy' style={{ color: Color.priBlue }}>
          Privacy policy
        </a>{' '}
        and confirm that the information provided above are accurate.
      </Typography>
    </>
  );
};

export default LegalRepresentativeApproval;
