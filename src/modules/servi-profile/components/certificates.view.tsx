import React, { useState } from 'react';
import { TagLabel } from '../styles';
import { ICertificate, TAttributeStyle } from '../interfaces';
import { Box, ButtonBase, Typography } from '@mui/material';
import { RenderIf } from '@/common/components';
import { truncate } from '@/common/utils';
import { ActionButtonOutlinedSecondary, BorderContainerLight, Text12, Text16 } from '@/common/styles';
import { ReactComponent as CertificateIcon } from '@/assets/icons/certificates.svg';
import { Color } from '@/theme';
import { useGetCertificatesQuery } from '../service/profile.api';
import { ReactComponent as ShareIcon } from '@/assets/icons/share.svg';
import { ReactComponent as EditIcon } from '@/assets/icons/edit.svg';
import CertificateModal from '@/common/components/profile/edit/Certificate.modal.tsx';
import { useAppSelector } from '@/redux/hooks.tsx';
import { isEmpty } from 'lodash';

type Props = {
  style?: TAttributeStyle;
  showHeading?: boolean;
};

export const CertificateTags = ({ style = 'chip', showHeading }: Props) => {
  const { entityId } = useAppSelector((state) => state.mainState.useInfo.selectedRole!);
  const { data } = useGetCertificatesQuery({ filter: `entity.id||$eq||${entityId}` });

  const renderChipTag = (certificate: ICertificate) => {
    return <TagLabel key={certificate.id}>{certificate.title}</TagLabel>;
  };

  const renderPlainTag = (certificate: ICertificate) => {
    return (
      <Typography key={certificate.id} className='tag' sx={{ fontWeight: '600', fontSize: '14px' }}>
        {truncate(certificate.title, 40)}
      </Typography>
    );
  };
  return data && data.length > 0 ? (
    <div className='certificate tags height-overflow'>
      <RenderIf value={!!showHeading}>
        <Typography sx={{ fontWeight: '400', display: 'inline-block', marginRight: '5px' }}>Certificates: </Typography>
      </RenderIf>
      {data.map((certificate) => {
        return style === 'chip' ? renderChipTag(certificate) : renderPlainTag(certificate);
      })}
    </div>
  ) : null;
};

interface ICertTile {
  certificate: ICertificate;
  isEdit?: boolean;
  entityId?: string;
}

function CertTile({ certificate, isEdit, entityId }: ICertTile) {
  const [isModal, setIsModal] = useState(false);

  return (
    <BorderContainerLight>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Text12 sx={{ fontWeight: '700', fontSize: '15px' }}>{certificate.title}</Text12>
              <div style={{ margin: '0px 10px' }}>-</div>
              <Text12 sx={{ fontWeight: '400' }}>
                Issued {certificate.issuedMonth} {certificate.issuedYear}
              </Text12>
            </Box>

            {isEdit && (
              <ButtonBase onClick={() => setIsModal(true)}>
                <EditIcon width={16} height={16} />
              </ButtonBase>
            )}
          </Box>
          <Box>
            <Text12 sx={{ fontWeight: '400', color: Color.textGray7E }}>{certificate.issuer}</Text12>
          </Box>
          <Box sx={{ mt: '2px' }}>
            <ActionButtonOutlinedSecondary
              onClick={() => window.open(certificate.url, '_blank')}
              sx={{
                borderRadius: '20px',
                fontSize: '15px',
                fontWeight: 700,
                color: '#646465',
                padding: '6px 14px',
                letterSpacing: '-0.6px',
              }}
              endIcon={<ShareIcon />}
            >
              Show credential
            </ActionButtonOutlinedSecondary>
          </Box>
        </Box>
      </Box>
      <CertificateModal isOpen={isModal} onClose={() => setIsModal(false)} cert={certificate} entityId={entityId} />
    </BorderContainerLight>
  );
}

interface ICertificates {
  isHeading?: boolean;
  isEdit?: boolean;
  overRideEntity?: string;
}

export const Certificates = ({ isHeading = true, isEdit, overRideEntity }: ICertificates) => {
  const { entityId } = useAppSelector((state) => state.mainState.useInfo.selectedRole!);
  const { data } = useGetCertificatesQuery({ filter: `entity.id||$eq||${overRideEntity ?? entityId}` });

  const renderCertificates = () => {
    return (
      data &&
      data.map((certificate: ICertificate) => (
        <CertTile key={certificate.id} certificate={certificate} isEdit={isEdit} entityId={overRideEntity ?? entityId} />
      ))
    );
  };

  return (
    <Box>
      {isHeading && (
        <Box sx={{ display: 'flex' }}>
          <CertificateIcon /> <Text16 sx={{ marginLeft: '10px' }}>Certificates</Text16>
        </Box>
      )}
      <Box>
        <RenderIf value={!isEmpty(data)}>{renderCertificates()}</RenderIf>
        <RenderIf value={!isEdit && isEmpty(data)}>
          <Typography>No certificate</Typography>
        </RenderIf>
      </Box>
    </Box>
  );
};
