import './@styles/serviceDetail.scss';

import * as Types from './@types';
import * as React from 'react';

import { useSetState } from 'react-use';
import { MessageSuccessBox } from '../components/message-success-box';
import { useCreateChatRoomFromServiceMutation, useSendChatMessageMutation } from '@/modules/communication/services';
import { useParams } from '@/router.ts';
import { mediaUrlGenerator } from '@/common/utils';
import { NameOrPictureAvatar } from '@/common/components/name-avatar.component.tsx';
import { Color } from '@/theme.ts';
import { useUploadMediaMutation } from '@/redux/apis/mediaApi.ts';

const quickTexts = [
  'Tell me more about your services.',
  'I have a question about a custom package.',
  'Is someone available to speak to me?',
];

export const QuickChat = (props: Types.ServiceDetailPage.QuickChat.TProps) => {
  const [CreateChat] = useCreateChatRoomFromServiceMutation();
  const { serviceId } = useParams('/service-detail/:serviceId');
  const [UploadFile] = useUploadMediaMutation();
  const [SendMessage] = useSendChatMessageMutation();

  const [isConfirmClose, setIsConfirmClose] = React.useState(false);
  const [submitData, setSubmitData] = React.useState<
    Required<{
      attachFiles: Array<File>;
    }> &
      Partial<{
        content: string | null;
      }>
  >({
    content: null,
    attachFiles: [],
  });

  const [{ confetti, roomId }, setState] = useSetState({
    roomId: '',
    confetti: false,
  });

  /**
   * On select files callback
   * @param e
   * @returns
   */
  const onSelectFiles = (e: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget } = e;

    const { content, attachFiles } = submitData;

    if (!currentTarget.files || currentTarget.files.length < 1) {
      return;
    }

    attachFiles.push(...[...currentTarget.files]);

    setSubmitData({
      content: content,
      attachFiles: attachFiles,
    });

    currentTarget.value = '';
  };

  /**
   * On submit send message callback
   * @param e
   * @returns
   */
  const onSendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { content, attachFiles } = submitData;

    if (!content && attachFiles.length < 1) {
      return;
    }

    const room = (
      await CreateChat({
        serviceId: serviceId,
      }).unwrap()
    ).newChatRoom;

    // Upload file(s) before create message
    const uploadFileResults = await Promise.all(
      attachFiles.map((file) => {
        const formData = new FormData();
        formData.append('type', 'CHAT_ROOMS');
        formData.append('media', file, file.name);
        formData.append('resourceId', room.uid);

        return UploadFile({
          data: formData,
        }).unwrap();
      }),
    );

    SendMessage({
      chatRoomId: room.uid,
      extraPopulate: ['__service'],
      message: {
        serviceId: serviceId,
        content: content ?? '',
        mediaIds: uploadFileResults.filter((f) => f.data?.newMedia).map((f) => f.data.newMedia.uid),
      },
    })
      .unwrap()
      .then(() => setState({ roomId: room.uid, confetti: true }));
  };

  /**
   * On click close send quick chat message callback
   * @param e
   * @returns
   */
  const onClickClose = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!props.onClickClose) {
      return;
    }

    const { content, attachFiles } = submitData;

    if (!content?.trim() && attachFiles.length < 1) {
      return props.onClickClose();
    }

    setIsConfirmClose(true);
  };

  const setQuickText = async (quickText: string) => {
    const { content, attachFiles } = submitData;

    if (content && content.length > 0) {
      return;
    }

    setSubmitData({
      content: quickText,
      attachFiles: attachFiles,
    });
  };

  /**
   * Remove selected file handler
   * @param args
   */
  const removeSeletedFile = (
    args: Required<{
      index: number;
    }>,
  ) => {
    const { attachFiles } = submitData;

    attachFiles.splice(args.index, 1);

    setSubmitData({
      attachFiles: attachFiles,
    });
  };

  if (confetti) {
    return <MessageSuccessBox isOpen roomId={roomId} onClose={props.onClickClose} />;
  }

  return (
    <div className='quick-chat'>
      <div className='container h-100'>
        <div className='row justify-content-center align-items-center h-100'>
          <div className='col-6'>
            <div className='quick-chat-card'>
              <div className='row flex-nowrap'>
                <div className='col-auto'>
                  <NameOrPictureAvatar
                    url={props.salesEntity.__logo ? mediaUrlGenerator(props.salesEntity.__logo) : undefined}
                    // className='sales-entity-logo'
                    name={props.salesEntity.profile?.detail?.name ?? ''}
                    style={{
                      width: '70px',
                      height: '70px',
                      bgcolor: Color.priBlue,
                    }}
                  />
                </div>
                <div className='col'>
                  <div className='row flex-column'>
                    <div className='sales-entity-name'>{props.salesEntity.profile?.detail?.name || '[Undefined]'}</div>
                    <div className='sales-entity-description mb-2'>
                      {props.salesEntity.profile?.detail?.about || '[Undefined]'}
                    </div>
                    <div className='sales-entity-verify'>
                      <img src='/assets/img/catalog/shield-tick.svg' className='align-middle' />
                      <span className='align-middle'>Verified</span>
                    </div>
                  </div>
                </div>
                <div className='col-auto'>
                  <button type='button' className='close-btn' onClick={onClickClose}>
                    <img src='/assets/img/catalog/close.svg' />
                  </button>
                </div>
              </div>
              <hr className='gap' />
              <textarea
                className='content'
                placeholder={`Ask${
                  !props.salesEntity.profile?.detail?.name ? '' : ` ${props.salesEntity.profile.detail.name}`
                } a question or your requirement on service details (requirement, project timeline...etc)`}
                value={submitData.content || ''}
                onInput={(e) => setSubmitData({ content: e.currentTarget.value, attachFiles: submitData.attachFiles })}
              ></textarea>
              {submitData.content && submitData.content?.length > 0 ? (
                <></>
              ) : (
                <>
                  <div className='row flex-column'>
                    {quickTexts.map((quickText, index) => (
                      <div key={`quick-text-${index}`} className='col'>
                        <button type='button' className='quick-text-btn' onClick={(e) => setQuickText(quickText)}>
                          {quickText}
                        </button>
                      </div>
                    ))}
                  </div>
                  {submitData.attachFiles.length < 1 ? <></> : <hr className='gap' />}
                </>
              )}
              {submitData.attachFiles.length < 1 ? (
                <></>
              ) : (
                <div className='row g-2'>
                  {submitData.attachFiles.map((file, index) => (
                    <div key={`file-${index}`} className='col-6'>
                      <div className='selected-file d-flex'>
                        <span className='flex-grow-1 align-middle text-truncate'>{file.name}</span>
                        <button
                          className='remove-selected-file-btn d-flex align-items-center'
                          onClick={() =>
                            removeSeletedFile({
                              index: index,
                            })
                          }
                        >
                          <img src='/assets/img/catalog/remove-selected-file.svg' />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <hr className='gap' />
              <div className='row align-items-center'>
                <div className='col'>
                  <label htmlFor='attach-chat-file' className='cursor-pointer'>
                    <img src='/assets/img/catalog/attach.svg' />
                  </label>
                  <input type='file' id='attach-chat-file' hidden={true} onChange={onSelectFiles} multiple={true} />
                </div>
                <div className='col-auto'>
                  <button
                    type='button'
                    className='send-message-btn'
                    disabled={!submitData.content && submitData.attachFiles.length < 1}
                    onClick={!submitData.content && submitData.attachFiles.length < 1 ? undefined : onSendMessage}
                  >
                    Send message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isConfirmClose ? (
        <></>
      ) : (
        <div className='confirm-discard'>
          <div className='container h-100'>
            <div className='row justify-content-center align-items-center h-100'>
              <div className='col-5'>
                <div className='discard-card'>
                  <div className='header'>
                    <h3 className='title'>Discard message?</h3>
                  </div>
                  <div className='body'>
                    <p className='detail'>{`You haven't sent your message yet. Discard anyway?`}</p>
                  </div>
                  <div className='footer'>
                    <div className='row gx-3'>
                      <div className='col-6'>
                        <button className='back-btn' onClick={(e) => setIsConfirmClose(false)}>
                          Edit message
                        </button>
                      </div>
                      <div className='col-6'>
                        <button className='discard-btn' onClick={props.onClickClose}>
                          Discard
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickChat;
