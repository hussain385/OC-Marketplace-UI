/* eslint-disable no-unused-vars */
import { isEmpty, isNil } from 'lodash';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import Zoom from 'react-medium-image-zoom';
import React, { useCallback } from 'react';
import { NameOrPictureAvatar } from '@/common/components/name-avatar.component';
import { ChatCard, NameLabel, Text12, Text14, TextLabel, TimestampLabel } from '@/common/styles';
import RenderIf from '@/common/components/render-if.component';
import FileAttachementView from './file-attachment.view';
import { Color } from '@/theme';
import { ALLOWED_IMAGE_EXT } from '@/common/constants';
import 'react-medium-image-zoom/dist/styles.css';
import { ImagePreviewModal, ImagePreviewSrc } from '@/common/utils/global_state.util';
import { IChatMessage } from '@/modules/communication/interface';
import { IEntity } from '@/common/interface/entity-interface';
import { mediaUrlGenerator } from '@/common/utils';
import { getTimeStamp } from '@/common/utils/helpers/timestamp.ts';
import { useMediaBreakpoint } from '@/common/components';
import { ILogo } from '@/common/interface';

type Props = {
  isMe: boolean;
  data: IChatMessage | any;
  shouldShowSenderName: boolean;
  salesEntity?: IEntity;
  showAvatar?: boolean;
};

const UserMessageBubbleView = (props: Props) => {
  const { content, createdAt, __service } = props.data;
  const navigate = useNavigate();
  const { xs } = useMediaBreakpoint();

  const [imagePreview, setImagePreview] = ImagePreviewModal();
  const [, setImageSrc] = ImagePreviewSrc();

  const isImageOpen = useCallback(
    (src: string) => {
      setImagePreview(!imagePreview);
      setImageSrc(src);
    },
    [imagePreview, setImagePreview, setImageSrc],
  );

  const navigateToServiceDetail = (serviceId: string) => {
    navigate(`/service-detail/${serviceId}`);
  };

  return (
    <Box
      sx={{
        width: { xs: '96%', sm: '100%', md: '100%' },
        mx: 'auto',
        display: 'flex',
        alignItems: 'end',
        marginBottom: '4px',
        justifyContent: props.isMe ? 'end' : 'first',
      }}
    >
      {props.showAvatar ? (
        <RenderIf value={!props.isMe}>
          <NameOrPictureAvatar
            url={props.salesEntity?.__logo ? mediaUrlGenerator(props.salesEntity.__logo) : undefined}
            name={props.salesEntity?.profile.detail.name}
          />
        </RenderIf>
      ) : !props.isMe ? (
        <div style={{ width: '40px', height: '40px', display: 'block' }}></div>
      ) : (
        ''
      )}
      <ChatCard
        sx={{
          marginLeft: '10px',
          marginRight: '10px',
          width: xs ? '100%' : 'auto',
          maxWidth: { xs: '100%', md: '60%' },
          wordBreak: 'break-word',
          flexDirection: 'column',
          alignItems: props.isMe ? 'end' : 'start',
        }}
      >
        <Box
          sx={{
            flexDirection: 'row',
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
            padding: { xs: '8px 5px', sm: '12px 16px', md: '12px 16px' },
            background: props.isMe ? Color.lightBlue : Color.bgGreyLight,
            width: { xs: '100%' },
          }}
        >
          <Box sx={{ display: 'flex', flex: '1', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <>
                  <RenderIf value={!props.isMe && props.shouldShowSenderName}>
                    <NameLabel sx={{ paddingRight: '4px', fontSize: '14px', fontWeight: 700 }}>
                      {props.salesEntity?.profile.detail.name}
                    </NameLabel>
                  </RenderIf>
                  <RenderIf value={props.isMe}>
                    <NameLabel sx={{ paddingRight: '4px', fontSize: '14px', fontWeight: 700 }}>{'Me'}</NameLabel>
                  </RenderIf>
                  <TimestampLabel sx={{ fontWeight: 600, fontSize: '12px', color: '#7A7A7A' }}>
                    {getTimeStamp(createdAt)}
                  </TimestampLabel>
                </>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box>
                  {!isEmpty(props.data['__medias']) && (
                    <Box
                      sx={{
                        width: 'auto',
                        display: 'flex',
                        gap: '2px',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        my: '8px',
                        flexWrap: 'wrap',
                        maxWidth: '402px',
                      }}
                    >
                      {props.data['__medias'].map((file: ILogo, index: number) => {
                        const url = `${file.protocol}://${file.domain}/${file.container}/${file.uid}${
                          !file.sasToken ? '' : `%3F${encodeURI(file.sasToken)}`
                        }`;
                        if (ALLOWED_IMAGE_EXT.includes(file.mimetype as string)) {
                          return (
                            <Box
                              key={index}
                              component='img'
                              src={url}
                              sx={{
                                width:
                                  props.data['__medias'].length > 1 ? { xs: '100%', sm: '200px' } : { xs: '100%', sm: '400px' },
                                aspectRatio: '1/1',
                                '&:hover': { cursor: 'pointer' },
                                objectFit: 'fill',
                              }}
                              onClick={() => isImageOpen(url)}
                            />
                          );
                        } else {
                          return (
                            <Box key={index} sx={{ display: 'block' }}>
                              <FileAttachementView fileUrl={url} name={file.originalname} />
                            </Box>
                          );
                        }
                      })}
                    </Box>
                  )}
                  <TextLabel
                    sx={{ display: 'block', fontSize: '14px', fontWeight: 400, '& p': { m: '0 !important' } }}
                    dangerouslySetInnerHTML={{ __html: content as string }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {/** Service box */}
        <RenderIf value={!isNil(__service)}>
          <Box sx={{ width: '100%', textAlign: 'left' }}>
            <Text12 sx={{ color: Color.textGray2 }}>This message relate to</Text12>
          </Box>
          <div style={{ width: '100%' }} onClick={() => navigateToServiceDetail(__service.uid)}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                border: `1px solid ${Color.borderGray2}`,
                width: '100%',
                cursor: 'pointer',
              }}
            >
              <Box sx={{ width: '122px', height: '72px' }}>
                {__service && __service.__medias && __service.__medias.length > 0
                  ? __service.__medias.map((media: ILogo) => (
                      <img
                        src={mediaUrlGenerator(media)}
                        key={media.id}
                        width='122px'
                        height='72'
                        title={__service ? __service.name : 'No image'}
                      />
                    ))
                  : null}
              </Box>
              <Box sx={{ padding: '8px 16px' }}>
                <Text14 sx={{ fontWeight: '700' }}>{__service ? __service.name : ''}</Text14>
                <Text14>{__service ? __service.description : ''}</Text14>
              </Box>
            </Box>
          </div>
        </RenderIf>
      </ChatCard>
    </Box>
  );
};
export default React.memo(UserMessageBubbleView);
