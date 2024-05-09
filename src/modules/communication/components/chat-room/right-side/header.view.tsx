import React from 'react';
import { Box } from '@mui/material';
import { NameLabel, StyledTab, TextLabel } from '@/common/styles';
import { Color } from '@/theme';
import { ReactComponent as SheildIcon } from '@/assets/icons/shield-tick.svg';
import { IEntity } from '@/common/interface/entity-interface';
import { mediaUrlGenerator } from '@/common/utils';
import Tabs from '@mui/material/Tabs';
import { ReactComponent as BackIcon } from '@/modules/communication/assets/back.svg';
import { RenderIf, useMediaBreakpoint } from '@/common/components';
import { useNavigate } from '@/router';
import { NameOrPictureAvatar } from '@/common/components/name-avatar.component';

type Props = {
  entity?: IEntity | undefined | null;
  tabIndex: number;
  onChange: (event: any, value: any) => void;
};

const ConversationHeaderView = ({ entity, tabIndex, onChange }: Props) => {
  const { xs } = useMediaBreakpoint();
  const navigate = useNavigate();
  return (
    <Box>
      <Box
        sx={{
          flexDirection: 'row',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          justifyContent: xs ? 'start' : 'space-between',
          padding: '20px 16px',
          borderBottom: xs ? `1px solid ${Color.borderGray2}` : '',
        }}
      >
        <RenderIf value={xs}>
          <BackIcon style={{ marginRight: '5px' }} onClick={() => navigate('/chat')} />
        </RenderIf>
        <Box sx={{ display: 'flex', gap: '8px', alignItems: 'start', width: '100%' }}>
          <NameOrPictureAvatar
            name={entity?.profile.detail.name}
            url={entity?.__logo ? mediaUrlGenerator(entity?.__logo) : ''}
            style={{
              background: Color.priBlue,
              width: '32px',
              height: '32px',
              fontSize: '14px',
              fontWeight: 600,
              color: Color.priWhite,
            }}
          />
          <Box sx={{ display: 'flex', flex: '1', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: xs ? 'row' : 'column',
                justifyContent: xs ? 'space-between' : 'start',
                width: '100%',
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <NameLabel
                  sx={{
                    fontWeight: 700,
                    fontSize: '16px',
                    lineHeight: 'normal',
                  }}
                >
                  {entity?.profile?.detail.name}
                </NameLabel>
              </Box>
              {entity?.status === 'VERIFIED' ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SheildIcon />
                  <TextLabel
                    sx={{
                      color: Color.orderStatus.paid,
                      fontWeight: '600',
                      paddingLeft: '5px',
                      fontSize: '12px',
                    }}
                  >
                    Verified
                  </TextLabel>
                </Box>
              ) : (
                ''
              )}
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: '16px' }}>
          {/*<IconButton sx={{ p: 0 }}>*/}
          {/*  <DeleteIcon />*/}
          {/*</IconButton>*/}
        </Box>
      </Box>

      <Tabs
        value={tabIndex}
        onChange={onChange}
        TabIndicatorProps={{
          style: {
            backgroundColor: Color.priBlue,
            height: '4px',
          },
        }}
      >
        <StyledTab
          sx={{
            px: '40px',
            py: '16px',
            textTransform: 'initial',
            fontSize: '14px !important',
            letterSpacing: { xs: '-1.12px', sm: 0, md: 0, lg: 0 },
            flex: 1,
          }}
          label='Message'
        />
        <StyledTab
          sx={{
            px: '40px',
            py: '16px',
            textTransform: 'initial',
            fontSize: '14px !important',
            letterSpacing: { xs: '-1.12px', sm: 0, md: 0, lg: 0 },
            flex: 1,
          }}
          label='Files'
        />
      </Tabs>
    </Box>
  );
};

export default ConversationHeaderView;
