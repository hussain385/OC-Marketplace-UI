/* eslint-disable no-unused-vars */
import { useSetState } from 'react-use';
import moment from 'moment';
import { Quill } from 'react-quill';
import { isEmpty, isUndefined } from 'lodash';
import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { QuillToolbar, QuillToolbarWithoutHeader } from '.';
import RenderIf from '../render-if.component';
import { Color } from '../../../theme';
import { MessageAttachmentCard, TextButton } from '../../styles';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';

import 'react-quill/dist/quill.snow.css';
import { showToast, ToastTypes } from '../../utils';
import useMediaBreakpoint from '../breakpoint';

interface IQuillEditorProps {
  fileAttachmentSize?: number;
  onEditorTextChange?: (text: string) => void;
  onSendButton?: (e: any) => void;
}

interface StateTypes {
  text: string;
  quill: any;
  disableBtn: boolean;
  isDocumentAttached: boolean;
  open: boolean;
  timestamp: number;
}

/**
 *
 * @param {number} fileAttachmentSize size in mb
 * @callback onSendButton return object
 * @callback onEditorTextChange return string only
 */

const QuillEditorComponent = ({ fileAttachmentSize, onSendButton, onEditorTextChange }: IQuillEditorProps) => {
  const [{ text, quill, disableBtn, isDocumentAttached, open, timestamp }, setState] = useSetState<StateTypes>({
    text: '',
    quill: undefined,
    disableBtn: true,
    isDocumentAttached: false,
    open: false,
    timestamp: 0,
  });

  const setupQuillEditor = (container: HTMLDivElement) => {
    const Image = Quill.import('formats/image');
    Image.className = 'img-fluid';
    Quill.register(Image, true);

    if (container && isUndefined(quill)) {
      const quillRef: any = new Quill(container, {
        theme: 'snow',
        placeholder: 'Write a message...',
        modules: {
          toolbar: {
            container: '#toolbar',
            handlers: {
              image: () => {
                attachmentHandler(quillRef);
              },
            },
          },
          keyboard: {
            bindings: {
              enter: {
                key: 13,
                handler: function () {
                  sendMessage(quillRef.getText(), quillRef);
                },
              },
            },
          },
        },
      });
      setState({ quill: quillRef });

      quillRef.on('text-change', function () {
        const text = quillRef.getText() === '\n' ? quillRef.getText().replace('\n', '') : quillRef.getText();
        setState({ text: text });
        if (
          (text !== '' && !quillRef.attachment) ||
          (text === '' && quillRef.attachment) ||
          (text !== '' && quillRef.attachment)
        ) {
          setState({ disableBtn: false });
          onEditorTextChange && onEditorTextChange(text);
        } else {
          setState({ disableBtn: true });
        }
      });
      quillRef.on('selection-change', function () {
        /**
         * TODO callback when text change
         */
      });
    }
  };

  const sendMessage = (message: string, quill?: any) => {
    setState({ disableBtn: true });
    const messageBody = message === '\n' ? message.replace('\n', '') : message;
    if (messageBody !== '' || (quill.attachment && quill.attachment.length > 0)) {
      onSendButton && onSendButton(quill);
      if (quill && quill.attachment) {
        setState({ isDocumentAttached: false, disableBtn: true, timestamp: moment().unix() });
      }
    }
  };

  const _onSendMessageHandle = () => {
    sendMessage(text, quill);
  };

  const attachmentHandler = async (quill?: any) => {
    const maxAttachmentSize = fileAttachmentSize ? fileAttachmentSize : 20.0; // bytes 20971520 for 20mb
    const input: any = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('multiple', '');
    input.click();
    input.onchange = () => {
      const files: File[] = input.files;
      if (files) {
        const fileSizes =
          Array.from(files)
            .map((file) => file.size)
            .reduce((total, current) => total + current) /
          1024 /
          1024;
        if (fileSizes > maxAttachmentSize) {
          showToast(`File size should not be greater than ${maxAttachmentSize} MB.`, ToastTypes.ERROR);
          setState({ isDocumentAttached: false });
        } else {
          if (quill) {
            quill['attachment'] = [...files];
            setState({ timestamp: moment().unix(), isDocumentAttached: true, disableBtn: false });
          }
        }
      }
    };
  };

  const onClearAttachmentHandle = (index: number) => {
    quill['attachment'].splice(index, 1);
    if (quill['attachment'].length === 0) {
      setState({ isDocumentAttached: false, disableBtn: isEmpty(text) ? false : true, timestamp: moment().unix() });
    } else {
      setState({ timestamp: moment().unix() });
    }
  };

  const handleClick = () => {
    setState({ open: !open });
  };

  const handleClose = () => {
    setState({ open: false });
  };

  const { xs } = useMediaBreakpoint();

  const renderAttachments = () => {
    return isDocumentAttached && timestamp && quill['attachment'] && quill['attachment'].length > 0
      ? quill['attachment'].map((attachment: File, index: number) => (
          <MessageAttachmentCard key={attachment.name}>
            <Typography noWrap={true} fontSize='12px'>
              {attachment.name}
            </Typography>
            <a>
              <ClearIcon fontSize='small' onClick={() => onClearAttachmentHandle(index)} />
            </a>
          </MessageAttachmentCard>
        ))
      : null;
  };

  const renderAttachmentsResponsive = () => {
    return isDocumentAttached && timestamp && quill['attachment'] && quill['attachment'].length > 0
      ? quill['attachment'].map((attachment: File, index: number) => (
          <div key={attachment.name}>
            <Typography noWrap={true} fontSize='12px'>
              {attachment.name}
            </Typography>
            <a>
              <ClearIcon fontSize='small' onClick={() => onClearAttachmentHandle(index)} />
            </a>
          </div>
        ))
      : null;
  };

  return (
    <Box>
      <RenderIf value={!xs}>
        <Box sx={{ height: '36px' }}></Box>
      </RenderIf>
      <div className='ql-custom-editor'>
        <RenderIf value={xs}>
          <QuillToolbarWithoutHeader open={open} handlerClose={handleClose} handleClick={handleClick} />
        </RenderIf>
        <RenderIf value={!xs}>
          <QuillToolbar />
        </RenderIf>

        <div
          id='editor'
          ref={(el) => setupQuillEditor(el as HTMLDivElement)}
          style={xs ? { position: 'absolute', left: '40px', width: '100%', bottom: '0px' } : {}}
        ></div>
        <TextButton
          sx={{ color: Color.priBlue, position: 'absolute', right: '12px', bottom: '12px' }}
          onClick={() => _onSendMessageHandle()}
          endIcon={<SendIcon sx={{ color: disableBtn ? '#eaeaea' : null }} />}
          disabled={disableBtn}
        ></TextButton>
        {isDocumentAttached && !xs ? renderAttachments() : null}
      </div>
      {isDocumentAttached && xs ? renderAttachments() : null}
      {/*}
      <RenderIf value={xs}>
        <div style={{ bottom: '0px' }} className='ql-custom-editor overlap'>
          <QuillToolbarWithoutHeader open={open} handlerClose={handleClose} handleClick={handleClick} />
          <div
            style={{ paddingLeft: '20px', borderTop: '1px solid #eaeaea', borderBottom: '1px solid #eaeaea' }}
            id='editor'
            ref={(el) => setupQuillEditor(el as HTMLDivElement)}
          ></div>
          <TextButton
            sx={{ color: Color.priBlue, position: 'absolute', right: '0px', bottom: '15px' }}
            onClick={() => _onSendMessageHandle()}
            color='secondary'
            variant='text'
            endIcon={<SendIcon sx={{ color: disableBtn ? '#eaeaea' : null }} />}
            disabled={disableBtn}
          ></TextButton>
        </div>
        {isDocumentAttached ? (
          <Box
            className='overlapse-document'
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '12px',
              fontFamily: 'Manrope',
              color: Color.textBlack,
              background: Color.lightBlue,
              borderRadius: '6px',
              padding: '4px 10px',
              width: '100%',
              height: '32px',
              maxWidth: '100%',
              border: `1px solid ${Color.bgLine}`,
              bottom: '10px',
            }}
          >
            {renderAttachmentsResponsive()}
          </Box>
        ) : null}
      </RenderIf>
          */}
    </Box>
  );
};

export default QuillEditorComponent;
