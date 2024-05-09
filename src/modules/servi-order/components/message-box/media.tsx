import { isEmpty } from 'lodash';
import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { ReactComponent as AttachmentIcon } from '@/assets/icons/attach_icon_2.svg';
import { BLACKLIST_FILE_EXT } from '@/common/constants';
import { AttachedFile, UploadFilesButton } from '@/common/components/media-upload/media-upload.style.ts';
import { Text12 } from '@/common/styles';
import { showToast, ToastTypes, validateFileSize } from '@/common/utils';
import { Color } from '@/theme.ts';

interface IMediaUploadProps {
  name: string;
  maxUploadFileSize?: number;
  blackListExt?: string[];
  shouldClearAttachment?: boolean;
  uploadButtonElement?: React.ReactNode;
  onChange?: (response: FileList | undefined) => void;
  onError?: (e: any) => void;
  value?: FileList;
}

const MediaUpload = ({
  maxUploadFileSize,
  blackListExt,
  uploadButtonElement,
  shouldClearAttachment,
  onError,
  onChange,
  value,
  name,
}: IMediaUploadProps) => {
  const fileSize = maxUploadFileSize ? maxUploadFileSize : 1000000; //default 1 mb
  const blacklist = blackListExt ? blackListExt : BLACKLIST_FILE_EXT;
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (shouldClearAttachment) {
      if (inputRef && inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }, [shouldClearAttachment]);

  const __onClearFiles = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }

    if (onChange) {
      onChange(undefined);
    }
  };

  return (
    <Box>
      {isEmpty(value) ? (
        <label htmlFor={name} style={{ display: 'inline-block' }}>
          {uploadButtonElement ? (
            uploadButtonElement
          ) : (
            <UploadFilesButton sx={{ marginY: '16px' }}>
              <AttachmentIcon style={{ marginRight: '10px' }} />
              Upload files
            </UploadFilesButton>
          )}
        </label>
      ) : (
        <AttachedFile>
          <Text12>{value?.[0].name}</Text12>
          <ClearIcon sx={{ color: Color.negative, fontSize: '14px', marginLeft: '10px' }} onClick={() => __onClearFiles()} />
        </AttachedFile>
      )}
      <Box>
        <input
          type='file'
          name='file'
          id={name}
          hidden
          ref={(ref) => {
            if (ref) {
              inputRef.current = ref;
            }
          }}
          onChange={(e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const target = e.target as typeof e.target & {
              files: FileList;
              result: string;
            };

            if (validateFileSize(target.files[0], fileSize)) {
              const ext = target.files[0].name.split('.').pop() as string;
              if (blacklist.includes(ext)) {
                onError && onError({ message: 'Files are not allowd' });
                showToast('File should not be executable', ToastTypes.ERROR);
              } else {
                if (onChange) {
                  onChange(target.files);
                }
              }
            } else {
              showToast('File size is bigger than 100 mb', ToastTypes.ERROR);
              onError && onError({ message: 'File size is bigger' });
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default MediaUpload;
