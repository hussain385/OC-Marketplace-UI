import React from 'react';
import { Box, Typography } from '@mui/material';
import { Color } from '@/theme';
import { isEmpty } from 'lodash';
import { MuiBox } from '@/modules/seller/account/director-info-edit/upload-id-prove.component';
import { AiFillCheckCircle } from 'react-icons/ai';
import { GreyRoundedContainer } from '@/common/styles';
import ProfileReview from '@/modules/onboarding/verify-now/components/profile-review.components';

type componentPropType = {
  identityData: { value: string; title: string }[];
  profileData?: { value: string; title: string }[];
  imageUrl: { dataUrl: any }[];
  documentName: string;
  documents?: string;
  isCompany?: boolean;
  noAgreement?: boolean;
  notlegalRep?: boolean;
};

const imageContainer = {
  display: 'flex',
  position: 'relative',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
};

const ReviewDetailsComponent = ({
  identityData,
  imageUrl,
  noAgreement,
  documentName,
  isCompany,
  profileData,
  documents,
  notlegalRep,
}: componentPropType) => {
  return (
    <>
      {isCompany && <ProfileReview profileData={profileData} documents={documents}></ProfileReview>}
      <div style={{ marginTop: '2em' }}>
        <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>
          {isCompany ? 'Legal representative info' : 'Identity registration info'}
        </Typography>
        <Box sx={{ marginBlock: '1em', display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
          {identityData.map((identity, key) => {
            if (!isEmpty(identity.value)) {
              return (
                <div style={{ display: 'flex', gap: '1em', width: '100%', alignItems: 'center' }} key={key}>
                  <Box sx={{ width: '35%' }}>
                    <Typography
                      sx={{
                        fontSize: '14px !important',
                        fontWeight: '600',
                        color: Color.bgGreyDark,
                      }}
                    >
                      {identity.title}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '65%' }}>
                    <Typography
                      sx={{
                        fontSize: '14px !important',
                        fontWeight: '600',
                        wordWrap: 'break-word',
                      }}
                    >
                      {identity.value}
                    </Typography>
                  </Box>
                </div>
              );
            }
          })}
        </Box>
        {notlegalRep ? (
          <></>
        ) : (
          <>
            <Typography sx={{ fontSize: '16px', fontWeight: 600, marginBottom: '1em', marginTop: '2em' }}>
              Photo of National ID
            </Typography>
            <Box
              sx={{
                display: 'flex',
                marginTop: '1em',
                flexWrap: 'wrap',
                flexDirection: { xs: 'column', md: 'row' },
                gap: '16px',
              }}
            >
              {imageUrl.map((url, key) => (
                <MuiBox key={key} sx={{ border: 'none !important', backgroundColor: Color.bgGreyLight }}>
                  <Box sx={imageContainer}>
                    <img
                      src={(url.dataUrl as any) instanceof File ? URL.createObjectURL(url.dataUrl) : url.dataUrl}
                      alt=''
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                </MuiBox>
              ))}
            </Box>
            <Typography sx={{ fontSize: '16px', fontWeight: 600, marginBottom: '1em', marginTop: '2em' }}>
              Proof of residence
            </Typography>
            <GreyRoundedContainer sx={{ justifyContent: 'flex-start', gap: '12px', marginTop: '1em' }}>
              <img alt={'file'} src={require('@/assets/icons/file.svg').default} />
              <Typography>{isEmpty(documentName) ? 'No file uploaded' : documentName}</Typography>
            </GreyRoundedContainer>
          </>
        )}
        {!noAgreement && (
          <Typography
            sx={{
              fontSize: '14px !important',
              fontWeight: '600',
              maxWidth: { xs: '100%', md: '645px' },
              marginTop: '2em',
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
        )}
      </div>
    </>
  );
};

export default ReviewDetailsComponent;
